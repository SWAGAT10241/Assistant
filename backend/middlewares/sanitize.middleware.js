/**
 * Sanitization Middleware
 * Protects against NoSQL injection, MongoDB operator tampering, and XSS payloads.
 */

// Characters/patterns commonly used in Cross-Site Scripting (XSS)
const DANGEROUS_HTML_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|javascript:|onerror\s*=|onload\s*=|onclick\s*=/gi;

/**
 * Recursively cleans an object or value:
 * 1. Strips MongoDB query operators starting with '$' or containing '.' (NoSQL Injection protection)
 * 2. Neutralizes script tags and inline event handlers in strings
 */
export const sanitizeValue = (value) => {
  if (value === null || value === undefined) {
    return value;
  }

  // Handle strings: strip dangerous scripts and trim
  if (typeof value === "string") {
    return value.replace(DANGEROUS_HTML_REGEX, "").trim();
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  // Handle objects: remove keys starting with '$' or containing '.'
  if (typeof value === "object" && value.constructor === Object) {
    const cleanObj = {};
    for (const key of Object.keys(value)) {
      // Disallow MongoDB operators ($where, $gt, etc.) and dot notation traversal
      if (key.startsWith("$") || key.includes(".")) {
        continue;
      }
      cleanObj[key] = sanitizeValue(value[key]);
    }
    return cleanObj;
  }

  return value;
};

/**
 * Express middleware to sanitize req.body, req.query, and req.params
 */
export const sanitizeRequest = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeValue(req.body);
  }
  if (req.query) {
    req.query = sanitizeValue(req.query);
  }
  if (req.params) {
    req.params = sanitizeValue(req.params);
  }
  next();
};

export default sanitizeRequest;

