/**
 * Security Headers Middleware
 * Protects against XSS, clickjacking, MIME-sniffing, and SSL strip attacks
 */
export const securityHeaders = (req, res, next) => {
  // Prevent MIME-sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Prevent Clickjacking
  res.setHeader("X-Frame-Options", "DENY");

  // Legacy XSS filter for older browsers
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Strict Transport Security (HSTS) - enforce HTTPS in production
  if (process.env.NODE_ENV === "production") {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }

  // Control referrer information sent in requests
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Restrict sensitive browser permissions
  res.setHeader(
    "Permissions-Policy",
    "camera=(), geolocation=(), payment=(), microphone=(self)"
  );

  // Content Security Policy (API baseline)
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; frame-ancestors 'none'; object-src 'none';"
  );

  // Remove Express footprint
  res.removeHeader("X-Powered-By");

  next();
};

export default securityHeaders;

