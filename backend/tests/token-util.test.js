import assert from "node:assert/strict";
import test from "node:test";
import { generateToken, verifyToken } from "../utils/token.util.js";
import ApiError from "../utils/apiError.js";

test("generateToken produces a valid JWT and verifyToken decodes it", () => {
  const userId = "user_123456789";
  const token = generateToken(userId);

  assert.equal(typeof token, "string");
  assert.ok(token.length > 20);

  const decoded = verifyToken(token);
  assert.equal(decoded.userId, userId);
});

test("verifyToken throws ApiError 401 when given an invalid token", () => {
  assert.throws(
    () => {
      verifyToken("invalid.token.string");
    },
    (err) => {
      return err instanceof ApiError && err.statusCode === 401;
    }
  );
});

