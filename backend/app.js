import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./config/env.js";
import apiRouter from "./routes/index.js";
import securityHeaders from "./middlewares/security.middleware.js";
import sanitizeRequest from "./middlewares/sanitize.middleware.js";
import { generalLimiter } from "./middlewares/rateLimiter.middleware.js";
import {
  notFoundHandler,
  errorHandler,
} from "./middlewares/error.middleware.js";

const app = express();

// Disable information disclosure
app.disable("x-powered-by");

// Trust reverse proxy for accurate client IP detection & rate limiting
app.set("trust proxy", 1);

// Mount Security HTTP Headers
app.use(securityHeaders);

// CORS configuration supporting development, production, and multiple origins
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin) return callback(null, true);

      if (
        env.CORS_ORIGIN.includes(origin) ||
        env.NODE_ENV === "development"
      ) {
        return callback(null, true);
      }

      return callback(new Error(`CORS origin ${origin} not allowed by server`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400, // Cache CORS preflight for 24 hours
  })
);

// Payload size limiting to prevent Denial of Service (DoS) attacks
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Sanitize all inputs against NoSQL injections and XSS payloads
app.use(sanitizeRequest);

// Static file hosting for temporary uploads with directory indexing disabled
app.use("/public", express.static("public", { dotfiles: "ignore", index: false }));

// Global Rate Limiting across all API routes
app.use("/api", generalLimiter);

// Mount Root API routes (both /api and /api/v1 for versioned scalability)
app.use("/api/v1", apiRouter);
app.use("/api", apiRouter);

// 404 handler for unmatched routes
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

export default app;
