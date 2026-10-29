# AI Agent Coding Guidelines & Repository Rules

> **Target Audience**: AI Coding Assistants, LLM Agents, and Automated Workflows operating on the **Virtual Assistant** codebase.
> **Status**: Active & Mandatory.

---

## 1. Core Operating Principles

1. **Maintain Architectural Integrity**: Always preserve the established layered architecture. Never bypass abstraction layers (e.g., do not place database queries or AI API calls directly inside route handlers or React components).
2. **Zero-Vulnerability Security Standard**: Every feature, bug fix, or refactor must uphold zero vulnerabilities. Never introduce packages with active CVEs or bypass security middleware.
3. **Verified Execution**: Never assume code works. Before finalizing any task or pushing to Git, run the test and build verification pipelines.
4. **Atomic, Conventional Commits**: Commit changes in small, logical, well-scoped units adhering to the Conventional Commits specification.

---

## 2. Project Architecture & Code Structure

The repository is structured as a full-stack monorepo:

```
├── backend/                  # Node.js + Express 5 API Server
│   ├── config/              # Centralized environment & service configurations
│   ├── controllers/         # Request handling & HTTP response orchestration
│   ├── middlewares/         # Auth, rate limiting, sanitization, validation, upload
│   ├── models/              # Mongoose schemas & data models
│   ├── routes/              # Express API route declarations
│   ├── services/            # Pure business logic (Auth, AI, Assistant, User, etc.)
│   ├── utils/               # Centralized ApiError, ApiResponse, helpers
│   └── test/                # Unit & integration test suites
│
├── frontend/                 # React 19 + Vite + Tailwind CSS v4 Client
│   ├── src/
│   │   ├── api/             # Centralized Axios API client modules
│   │   ├── components/      # Common & feature-specific modular UI components
│   │   ├── context/         # React Context state providers (Auth, etc.)
│   │   ├── hooks/           # Custom reusable React hooks
│   │   ├── pages/           # Route views (Home, Auth, Customize)
│   │   └── services/        # Client-side business logic (Intent execution, etc.)
│   └── public/              # Static assets
│
└── graphify-out/             # Knowledge graph & codebase visualization (git-ignored)
```

---

## 3. Backend Development Rules

### A. Layering & Separation of Concerns
* **Routes (`routes/*.js`)**: Define endpoints, attach rate limiters and middleware, and bind to controllers. *No business logic.*
* **Controllers (`controllers/*.js`)**: Parse HTTP requests, call appropriate `services`, and return uniform responses via `ApiResponse`. *No direct database queries.*
* **Services (`services/*.js`)**: Contain pure business logic, database queries (`models`), and third-party integrations (Gemini, Cloudinary).
* **Models (`models/*.js`)**: Define Mongoose schemas with strict types, indexes, and validation. Export barrel from `models/index.js`.
* **Config (`config/env.config.js`)**: All environment variables MUST be read and validated here. Never access `process.env` directly in controllers or services.

### B. Standardized Responses & Error Handling
* **Success Responses**: Always return using `ApiResponse`:
  ```javascript
  return res.status(200).json(new ApiResponse(200, data, "Success message"));
  ```
* **Error Handling**: Always throw or pass `ApiError`:
  ```javascript
  throw new ApiError(404, "Resource not found");
  ```
* All async controller functions must handle rejections cleanly or propagate to `errorHandler.middleware.js`.

### C. Security Requirements
* **Rate Limiting**: Apply sliding-window rate limiters to all endpoints:
  * Authentication endpoints (`/api/auth/*`): `authLimiter` (10 req/15 min).
  * AI & Voice endpoints (`/api/user/ask`): `aiLimiter` (25 req/min).
  * General API endpoints: `generalLimiter` (150 req/15 min).
* **Sanitization**: Protect against NoSQL injection (`$`, `.`) and XSS attacks using `sanitizeMiddleware` on all request bodies, params, and queries.
* **HTTP Security Headers**: Keep security headers enabled via `security.middleware.js` (HSTS, CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff).
* **File Uploads**: Restrict uploads strictly via `multer.middleware.js` to `image/jpeg`, `image/png`, and `image/webp` with a 5MB maximum file size.
* **Cookies**: Auth tokens must always be transmitted in `httpOnly`, `secure` (in production), `sameSite: "strict"` cookies.

---

## 4. Frontend Development Rules

### A. React & Component Architecture
* **React 19 & Fast Refresh**: Keep Context definitions (`*ContextDef.js`) separate from Provider components (`*Context.jsx`) to avoid React Fast Refresh warnings.
* **UI vs Business Logic**: UI components must only render views and manage local display state. Delegate complex business logic to custom hooks (`hooks/`) or client services (`services/`).
* **Reusable Common Components**: Use shared components from `components/common/` (`Button`, `Input`, `Alert`, `Spinner`, `ErrorBoundary`, `AvatarCard`).
* **Styling**: Use Tailwind CSS v4 utility classes. Avoid inline style objects.

### B. API Client Layer
* Never use raw `fetch()` or inline `axios` inside React components.
* All network requests must go through `frontend/src/api/` (`auth.api.js`, `assistant.api.js`, `conversation.api.js`, etc.).
* Handle loading states and errors gracefully using `ErrorBoundary` or user-facing `Alert` banners.

---

## 5. Verification Gates (Run Before Every Git Push)

Before committing or pushing any code, an AI agent **must** run and pass all of the following verification commands:

```bash
# 1. Backend Unit Tests & Syntax Verification
cd backend && npm test

# 2. Frontend Linting & Production Build
cd ../frontend && npm run lint && npm run build

# 3. Security Audits (Zero Vulnerability Standard)
npm audit --prefix backend
npm audit --prefix frontend
```

If any check fails:
1. Fix the root cause immediately.
2. Do not bypass lint rules with `eslint-disable` or suppress warnings without explicit permission.
3. Re-run the verification suite until all checks are completely green.

---

## 6. Git Workflow & Commit Guidelines

* **Industry Deployment Model**:
  * `feature/*` &rarr; Feature development branches.
  * `develop` &rarr; System Integration Testing (SIT).
  * `release/*` &rarr; User Acceptance Testing (UAT).
  * `main` &rarr; Production (tagged and rollback ready).
* **Commit Message Format**:
  Follow Conventional Commits: `<type>(<scope>): <subject>`
  * `feat(assistant)`: Add speech rate controls
  * `fix(auth)`: Correct cookie expiration handling
  * `refactor(backend)`: Decouple Gemini AI logic into ai.service.js
  * `security(middleware)`: Strengthen upload MIME-type validation
  * `test(backend)`: Add unit tests for rate limiter
  * `chore(deps)`: Bump lockfile dependencies
* **Atomic Commits**: Each commit must contain only related changes. Do not bundle unrelated refactoring, dependencies, and features into a single commit.
