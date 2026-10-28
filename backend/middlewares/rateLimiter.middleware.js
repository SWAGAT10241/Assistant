import ApiError from "../utils/apiError.js";

/**
 * In-memory sliding-window rate limiter implementation
 * Provides enterprise-grade rate limiting with automatic IP cleanup and standard headers
 */
export const createRateLimiter = ({
  windowMs = 15 * 60 * 1000, // 15 minutes
  max = 100, // max requests per window
  message = "Too many requests. Please try again later.",
  statusCode = 429,
  skipSuccessfulRequests = false,
} = {}) => {
  const store = new Map();

  // Periodic cleanup of expired IP records every 5 minutes
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      if (now > record.resetTime) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000);

  // Unref interval to allow clean node process shutdown
  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }

  return (req, res, next) => {
    // Extract client IP address accurately
    const forwarded = req.headers["x-forwarded-for"];
    const ip = (typeof forwarded === "string" ? forwarded.split(",")[0].trim() : null) ||
      req.ip ||
      req.socket?.remoteAddress ||
      "unknown-client";

    const now = Date.now();
    let clientRecord = store.get(ip);

    if (!clientRecord || now > clientRecord.resetTime) {
      clientRecord = {
        count: 1,
        resetTime: now + windowMs,
      };
      store.set(ip, clientRecord);
    } else {
      clientRecord.count += 1;
    }

    const remaining = Math.max(0, max - clientRecord.count);
    const resetSeconds = Math.ceil((clientRecord.resetTime - now) / 1000);

    // Set standard rate limiting response headers
    res.setHeader("RateLimit-Limit", max);
    res.setHeader("RateLimit-Remaining", remaining);
    res.setHeader("RateLimit-Reset", resetSeconds);

    if (clientRecord.count > max) {
      res.setHeader("Retry-After", resetSeconds);
      throw new ApiError(statusCode, message);
    }

    next();
  };
};

/**
 * General API Rate Limiter: 150 requests per 15 minutes per IP
 */
export const generalLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 150,
  message: "Too many requests from this IP address. Please try again after 15 minutes.",
});

/**
 * Sensitive Auth Rate Limiter: 10 attempts per 15 minutes per IP
 * Protects against brute-force password guessing & credential stuffing
 */
export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many authentication attempts. Please wait 15 minutes before trying again.",
});

/**
 * AI Voice/Chat Assistant Rate Limiter: 25 queries per 1 minute per IP
 * Protects Gemini AI quota, prevents credit burn & DoS
 */
export const aiLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 25,
  message: "Assistant is processing too many requests from your device. Please wait a minute.",
});

