# Virtual Assistant — Backend

Modern, scalable, and fortified Node.js & Express 5 REST API server for the Virtual Assistant platform.

---

## Folder Structure

```
backend/
├── config/                   # System & third-party client configurations
│   ├── env.config.js         # Centralized environment variable parsing & validation
│   ├── db.config.js          # MongoDB connection handler
│   └── cloudinary.config.js  # Cloudinary SDK client configuration
├── controllers/              # Thin HTTP request & response handlers
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── assistant.controller.js
│   ├── conversation.controller.js
│   └── message.controller.js
├── middlewares/              # Security & utility Express middlewares
│   ├── security.middleware.js# Security headers (HSTS, CSP, X-Frame, X-Content-Type)
│   ├── sanitize.middleware.js# NoSQL Injection & XSS sanitization
│   ├── rateLimiter.middleware.js # Multi-tier sliding window rate limiters (API, Auth, AI)
│   ├── auth.middleware.js    # JWT session validation (cookies & Bearer headers)
│   ├── validate.middleware.js# Request payload schema validation
│   ├── multer.middleware.js  # File upload configuration with 5MB limit & extension checking
│   └── error.middleware.js   # Centralized error handler & 404 responder
├── models/                   # Mongoose schemas & domain models
│   ├── index.js              # Barrel export for models
│   ├── user.model.js
│   ├── assistant.model.js
│   ├── conversation.model.js
│   ├── message.model.js
│   ├── workspace.model.js
│   └── project.model.js
├── routes/                   # Scalable Express routers
│   ├── index.js              # Central API gateway (/api & /api/v1)
│   ├── auth.routes.js        # /api/auth (register, login, logout, me with Auth rate limiter)
│   ├── user.routes.js        # /api/users (current, update, ask with AI rate limiter)
│   ├── assistant.routes.js   # /api/assistants (CRUD, visibility)
│   ├── conversation.routes.js# /api/conversations (CRUD, threads)
│   └── message.routes.js     # /api/messages (CRUD, pin)
├── services/                 # Pure business logic layer
│   ├── ai.service.js         # Gemini prompt orchestration & intent parsing
│   ├── auth.service.js       # User auth & onboarding
│   ├── user.service.js       # Profile & voice command processing
│   ├── assistant.service.js  # Assistant CRUD operations
│   ├── conversation.service.js# Conversation threads
│   ├── message.service.js    # Message storage & pinning
│   └── upload.service.js     # Cloudinary media uploads & temp cleanup
├── utils/                    # Core shared utilities
│   ├── apiResponse.js        # Standardized { success, message, data } response envelope
│   ├── apiError.js           # Custom ApiError class with status & stack
│   ├── asyncHandler.js       # Async error propagation wrapper
│   └── token.util.js         # JWT signing and verification utility
├── validations/              # Request validation schemas
│   ├── auth.validation.js    # Input checks for signup & signin
│   └── user.validation.js    # Input checks for voice commands & assistant updates
├── tests/                    # Automated Node.js test runner suites (15 tests)
│   ├── config-utils.test.js  # Unit tests for env, ApiResponse, ApiError
│   ├── security.test.js      # Unit tests for security headers, sanitization, rate limiters
│   ├── token-util.test.js    # Unit tests for JWT signing & verification
│   └── validation.test.js    # Unit tests for input validators
├── app.js                    # Express app configuration & middleware pipeline
├── index.js                  # Server entry point with graceful shutdown
└── .env.example              # Environment variables template
```

---

## Zero-Vulnerability Security Architecture

1. **Multi-Tier Rate Limiting (`rateLimiter.middleware.js`)**:
   - **General API Limiter**: Enforces a 150 request / 15-minute quota across all `/api` and `/api/v1` routes to prevent DDoS and abuse.
   - **Auth Brute-Force Limiter**: Enforces a strict 10 request / 15-minute quota on `/api/auth/login` and `/api/auth/register` to defeat credential stuffing attacks.
   - **AI Quota Limiter**: Limits voice/AI command processing (`/api/users/asktoassistant`) to 25 requests / minute per client to prevent credit burn and Gemini API quota exhaustion.

2. **NoSQL Injection & XSS Sanitization (`sanitize.middleware.js`)**:
   - Recursively scrubs incoming `req.body`, `req.query`, and `req.params`.
   - Strips dangerous MongoDB operator keys starting with `$` (e.g. `$gt`, `$ne`, `$where`) or containing dot notation.
   - Neutralizes malicious HTML/script tags and inline event handlers (`<script>`, `onerror=`, `onload=`, `javascript:`).

3. **HTTP Security Headers (`security.middleware.js`)**:
   - `X-Content-Type-Options: nosniff` (prevents MIME confusion attacks).
   - `X-Frame-Options: DENY` (clickjacking defense).
   - `X-XSS-Protection: 1; mode=block`.
   - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` (enforces HTTPS).
   - `Content-Security-Policy: default-src 'self'; frame-ancestors 'none'; object-src 'none'`.
   - Disables `X-Powered-By: Express` fingerprinting.

4. **Upload Security Hardening (`multer.middleware.js`)**:
   - Verifies both MIME type and file extension against a strict allowlist (`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`).
   - Rejects executable files, double extensions, and dangerous SVG vectors.
   - Enforces a 5MB payload ceiling and randomized unique filename sanitization.

5. **Cookie Security**:
   - Authentication tokens transmitted in `httpOnly`, `sameSite: "strict"`, and `secure` (in production) cookies.

---

## API Endpoints Summary

### Authentication (`/api/auth`)
* `POST /api/auth/register` — Create account with validated payload
* `POST /api/auth/login` — Sign in and issue secure HTTP-only cookie
* `POST /api/auth/logout` — Revoke and clear session cookie
* `GET  /api/auth/me` — Retrieve authenticated user profile

### User & Voice Assistant (`/api/users`)
* `GET  /api/users/current` — Current user profile and active assistant
* `POST /api/users/update` — Update assistant name and upload custom avatar to Cloudinary
* `POST /api/users/asktoassistant` — Send speech command to Google Gemini AI

### Assistants Domain (`/api/assistants`)
* `GET    /api/assistants` — List user assistants
* `POST   /api/assistants` — Create a new assistant
* `GET    /api/assistants/:id` — Get assistant details
* `PUT    /api/assistants/:id` — Update assistant properties
* `DELETE /api/assistants/:id` — Delete assistant
* `PATCH  /api/assistants/:id/visibility` — Toggle assistant public/private visibility

---

## Getting Started

```bash
# 1. Install dependencies
pnpm install # or npm install

# 2. Configure environment
cp .env.example .env
# Fill in your MONGODB_URL, JWT_SECRET, GEMINI_API_URL, and Cloudinary keys

# 3. Run automated tests (15 unit tests)
npm test

# 4. Start development server
npm run dev
```
