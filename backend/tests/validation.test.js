import assert from "node:assert/strict";
import test from "node:test";
import {
  registerValidator,
  loginValidator,
} from "../validations/auth.validation.js";
import {
  askCommandValidator,
  updateAssistantValidator,
} from "../validations/user.validation.js";

test("registerValidator catches invalid name, email, and short password", () => {
  const req = {
    body: {
      name: "",
      email: "not-an-email",
      password: "123",
    },
  };

  const errors = registerValidator(req);
  assert.equal(errors.length, 3);
  assert.ok(errors.some((e) => e.includes("Full name")));
  assert.ok(errors.some((e) => e.includes("valid email")));
  assert.ok(errors.some((e) => e.includes("6 characters")));
});

test("registerValidator passes valid payload", () => {
  const req = {
    body: {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    },
  };

  const errors = registerValidator(req);
  assert.equal(errors.length, 0);
});

test("loginValidator validates email format and password presence", () => {
  const req = {
    body: {
      email: "invalid-email",
      password: "",
    },
  };

  const errors = loginValidator(req);
  assert.equal(errors.length, 2);
});

test("askCommandValidator requires non-empty command", () => {
  const reqEmpty = { body: { command: "   " } };
  const errors = askCommandValidator(reqEmpty);
  assert.equal(errors.length, 1);
  assert.ok(errors[0].includes("Command text"));

  const reqValid = { body: { command: "what time is it?" } };
  assert.equal(askCommandValidator(reqValid).length, 0);
});

