import assert from "node:assert/strict";
import test from "node:test";
import { securityHeaders } from "../middlewares/security.middleware.js";
import { sanitizeValue } from "../middlewares/sanitize.middleware.js";
import { createRateLimiter } from "../middlewares/rateLimiter.middleware.js";
import ApiError from "../utils/apiError.js";

test("securityHeaders sets all critical protection headers", () => {
  const headers = {};
  const req = {};
  const res = {
    setHeader: (key, val) => {
      headers[key] = val;
    },
    removeHeader: (key) => {
      delete headers[key];
    },
  };

  let nextCalled = false;
  securityHeaders(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(headers["X-Content-Type-Options"], "nosniff");
  assert.equal(headers["X-Frame-Options"], "DENY");
  assert.equal(headers["X-XSS-Protection"], "1; mode=block");
  assert.equal(headers["Referrer-Policy"], "strict-origin-when-cross-origin");
  assert.ok(headers["Content-Security-Policy"]);
});

test("sanitizeValue strips NoSQL injection operators starting with $ or containing dot", () => {
  const maliciousInput = {
    email: { $gt: "" },
    password: "secretPassword123",
    "metadata.role": "admin",
    nested: {
      $ne: null,
      validKey: "validValue",
    },
  };

  const clean = sanitizeValue(maliciousInput);

  assert.equal(clean.email.$gt, undefined);
  assert.equal(clean["metadata.role"], undefined);
  assert.equal(clean.nested.$ne, undefined);
  assert.equal(clean.nested.validKey, "validValue");
  assert.equal(clean.password, "secretPassword123");
});

test("sanitizeValue strips XSS scripts and dangerous event handlers from strings", () => {
  const xssPayload = '<script>alert("hack")</script>Hello World';
  const sanitized = sanitizeValue(xssPayload);
  assert.equal(sanitized, "Hello World");

  const eventPayload = 'test onclick="evil()"';
  const sanitizedEvent = sanitizeValue(eventPayload);
  assert.ok(!sanitizedEvent.includes("onclick="));
});

test("createRateLimiter allows requests up to max and blocks thereafter with 429", () => {
  const limiter = createRateLimiter({
    windowMs: 1000,
    max: 2,
    message: "Rate limit exceeded",
  });

  const req = { ip: "127.0.0.1", headers: {} };
  const headers = {};
  const res = {
    setHeader: (key, val) => {
      headers[key] = val;
    },
  };

  // 1st request - pass
  let called1 = false;
  limiter(req, res, () => {
    called1 = true;
  });
  assert.equal(called1, true);
  assert.equal(headers["RateLimit-Remaining"], 1);

  // 2nd request - pass
  let called2 = false;
  limiter(req, res, () => {
    called2 = true;
  });
  assert.equal(called2, true);
  assert.equal(headers["RateLimit-Remaining"], 0);

  // 3rd request - must throw ApiError 429
  assert.throws(
    () => {
      limiter(req, res, () => {});
    },
    (err) => {
      return err instanceof ApiError && err.statusCode === 429;
    }
  );
  assert.ok(headers["Retry-After"] !== undefined);
});

