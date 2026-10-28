import assert from "node:assert/strict";
import test from "node:test";

import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

const defaultCorsOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://assistant-ox8s.onrender.com",
];

const originalCorsOrigin = process.env.CORS_ORIGIN;

test("ApiResponse sets success and message for successful payloads", () => {
  const response = new ApiResponse(200, { id: 42 }, "Fetched user");

  assert.equal(response.statusCode, 200);
  assert.equal(response.success, true);
  assert.equal(response.message, "Fetched user");
  assert.deepEqual(response.data, { id: 42 });
});

test("ApiResponse marks 4xx/5xx responses as unsuccessful", () => {
  const response = new ApiResponse(404, null, "User not found");

  assert.equal(response.statusCode, 404);
  assert.equal(response.success, false);
  assert.equal(response.message, "User not found");
  assert.equal(response.data, null);
});

test("ApiError keeps a useful default payload and captures a stack", () => {
  const error = new ApiError(401, "Unauthorized");

  assert.equal(error.statusCode, 401);
  assert.equal(error.success, false);
  assert.equal(error.message, "Unauthorized");
  assert.equal(error.data, null);
  assert.deepEqual(error.errors, []);
  assert.match(error.stack, /ApiError/);
});

test("env trims and parses comma-separated CORS origins", async () => {
  process.env.CORS_ORIGIN = " https://alpha.example.com , http://localhost:3000 , https://beta.example.com ";

  const envModule = await import(
    `../config/env.js?cors=${Date.now()}`
  );

  assert.deepEqual(envModule.default.CORS_ORIGIN, [
    "https://alpha.example.com",
    "http://localhost:3000",
    "https://beta.example.com",
  ]);
});

test("env falls back to the default local app origins when CORS_ORIGIN is unset", async () => {
  delete process.env.CORS_ORIGIN;

  const envModule = await import(
    `../config/env.js?fallback=${Date.now()}`
  );

  assert.deepEqual(envModule.default.CORS_ORIGIN, defaultCorsOrigins);
});

test.after(() => {
  if (originalCorsOrigin === undefined) {
    delete process.env.CORS_ORIGIN;
  } else {
    process.env.CORS_ORIGIN = originalCorsOrigin;
  }
});
