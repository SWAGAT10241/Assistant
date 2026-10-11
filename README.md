# Virtual Assistant (AI Operating System)

A full-stack, voice-enabled intelligent Virtual Assistant powered by **React 19**, **Node.js/Express 5**, **Google Gemini AI**, and **MongoDB**. Designed with a modular, scalable architecture separating UI from business logic, centralized configurations, robust error handling, and reusable components.

---

## Architecture Overview

```
Assistant/
├── backend/
│   ├── config/             # Centralized environment, DB, Cloudinary & JWT configs
│   ├── controllers/        # Thin HTTP request & response handlers
│   ├── middlewares/        # Authentication, file upload, & global error handling
│   ├── models/             # Mongoose schemas (User, Assistant, Conversation, Message, etc.)
│   ├── routes/             # Scalable versioned REST API routes mounted under /api
│   ├── services/           # Decoupled business logic & Gemini AI intent processing
│   ├── utils/              # ApiResponse, ApiError, & asyncHandler utilities
│   ├── app.js              # Express app initialization with CORS & middlewares
│   ├── index.js            # Server entrypoint with DB connection & graceful shutdown
│   └── .env.example        # Backend environment variables template
│
└── frontend/
    ├── src/
    │   ├── api/            # Centralized API client (Axios) & service functions
    │   ├── components/     # Reusable UI components
    │   │   ├── common/     # Generic UI elements (Button, Input, Spinner)
    │   │   ├── assistant/  # Voice visualizer, avatar card, history drawer
    │   │   └── routes/     # ProtectedRoute & PublicRoute guards
    │   ├── config/         # Environment configuration module
    │   ├── context/        # Auth & application state management
    │   ├── hooks/          # Custom hooks (useAuth, useSpeechAssistant)
    │   ├── pages/          # View pages (Home, Customize, SignIn, SignUp)
    │   ├── App.jsx         # Declarative client routes
    │   └── main.jsx        # App root initialization
    └── .env.example        # Frontend environment variables template
```

---

## Key Features & Refactoring Highlights

1. **Clean Separation of Concerns**:
   - Controllers handle HTTP status codes, headers, and request validation.
   - Services (`AuthService`, `UserService`, `AiService`, `AssistantService`, `ConversationService`, `MessageService`) handle business logic, queries, and external API calls.
   - UI components are strictly presentational, powered by custom hooks (`useSpeechAssistant`, `useAuth`).

2. **Decoupled Environment Configurations**:
   - Backend: Centralized in `backend/config/env.js`, validated with sane defaults and multi-origin CORS support.
   - Frontend: Centralized in `frontend/src/config/env.config.js` reading `VITE_API_BASE_URL`.

3. **Robust Error Handling**:
   - Custom `ApiError` class with standardized status codes.
   - Universal `asyncHandler` wrapper eliminating repetitive `try/catch` boilerplate.
   - Centralized Express error handler catching Mongoose validation, MongoDB duplicate keys (11000), JWT failures, and 404s.
   - Normalized Axios interceptors in the frontend ensuring clean error messages across the application.

4. **Speech & AI Integration**:
   - Uses Web Speech API for real-time speech recognition and synthesis.
   - Gemini AI intent detection supporting web search, YouTube playback, weather queries, calculator, social media, and dynamic real-time dates/times.
   - Safe fallbacks preventing UI crashes when offline or rate-limited.

5. **Eliminated Dead & Duplicate Code**:
   - Removed 0-byte stub files and legacy `gemini.js`.
   - Unified `Customize.jsx` and `Customize2.jsx` into a cohesive, multi-step assistant customization wizard.
   - Resolved all ESLint errors and warnings across the codebase.

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- pnpm or npm
- MongoDB Atlas or local MongoDB instance

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
   Required variables:
   - `PORT`: Server port (e.g., `8000`)
   - `MONGODB_URL`: MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT tokens
   - `GEMINI_API_URL`: Google Gemini API endpoint with your API key
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: Cloudinary credentials
   - `CORS_ORIGIN`: Allowed origins (e.g., `http://localhost:5173`)

4. Run the development server:
   ```bash
   npm run dev
   ```

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Set `VITE_API_BASE_URL=http://localhost:8000` for local development.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

---

## API Documentation Summary

### Health Check
- `GET /api/health` — Check server status and timestamp

### Authentication (`/api/auth`)
- `POST /api/auth/register` (alias: `/signup`) — Register a new account
- `POST /api/auth/login` (alias: `/signin`) — Authenticate and receive HTTP-only cookie
- `POST /api/auth/logout` (or `GET /logout`) — Clear authentication cookie
- `GET /api/auth/me` — Retrieve active user session

### User & Assistant (`/api/user`)
- `GET /api/user/current` — Get current user profile
- `POST /api/user/update` — Update assistant avatar (file upload or URL) and name
- `POST /api/user/asktoassistant` — Process voice/text command with Gemini AI

### Assistants (`/api/assistants`)
- `GET /api/assistants` — List all assistants owned by user
- `POST /api/assistants` — Create a custom assistant
- `GET /api/assistants/:id` — Get assistant details
- `PUT /api/assistants/:id` — Update assistant
- `DELETE /api/assistants/:id` — Delete assistant

### Conversations (`/api/conversations`)
- `GET /api/conversations` — List conversation threads
- `POST /api/conversations` — Create a conversation thread
- `GET /api/conversations/:id` — Get conversation details
- `PUT /api/conversations/:id` — Rename conversation thread
- `DELETE /api/conversations/:id` — Delete conversation thread and messages

---

## CI/CD Pipeline (GitHub Actions)

The repository includes enterprise-grade GitHub Actions workflows located in `.github/workflows/`:

### 1. Continuous Integration (`ci.yml`)
Automatically triggers on **pull requests** and **pushes** to `main`:
- **Backend CI**:
  - Tests across Node.js `20.x` and `22.x` matrix.
  - Installs dependencies via `pnpm` with automated caching.
  - Executes syntax checks and unit verification (`pnpm test`).
- **Frontend CI**:
  - Installs dependencies with frozen lockfile checks.
  - Runs ESLint validation (`pnpm run lint`).
  - Executes production Vite bundle compilation (`pnpm run build`).
- **Security Audit**:
  - Scans both frontend and backend for high and critical security vulnerabilities.

### 2. Continuous Deployment (`cd.yml`)
Automatically triggers on **push to `main`** or manual **`workflow_dispatch`**:
- Validates build integrity before deploying.
- Triggers cloud deployment hooks (e.g., Render Web Services) securely using repository secrets.

#### Setting Up GitHub Repository Secrets for Auto-Deploy:
To connect automatic cloud deployment, navigate to your GitHub repository **Settings → Secrets and variables → Actions** and add:
- `RENDER_BACKEND_DEPLOY_HOOK_URL`: Your Render backend service deploy hook URL
- `RENDER_FRONTEND_DEPLOY_HOOK_URL`: Your Render frontend service deploy hook URL

---

## Security & Maintenance Automation Workflows

In addition to CI/CD, the repository features automated security analysis and project maintenance workflows:

| Workflow | File | Trigger | Description |
|---|---|---|---|
| **CodeQL Analysis** | [codeql.yml](file:///.github/workflows/codeql.yml) | Push, PR & Weekly Schedule | Semantic static application security testing (SAST) to detect SQL/NoSQL injections, XSS, prototype pollution, and CVE vulnerabilities. |
| **Secret Leak Detection** | [secret-scan.yml](file:///.github/workflows/secret-scan.yml) | Push & PR | Scans commit diffs with Gitleaks to prevent leaking API keys (Gemini, Cloudinary, MongoDB URIs, JWT secrets). |
| **Dependency Review** | [dependency-review.yml](file:///.github/workflows/dependency-review.yml) | Pull Requests | Blocks PRs that introduce vulnerable dependencies or licensing issues. |
| **Automated Updates (Dependabot)** | [dependabot.yml](file:///.github/dependabot.yml) | Weekly (Mondays) | Monitors backend, frontend, and GitHub Actions dependencies to create automated security patch PRs. |
| **Automated Release & Changelog** | [release.yml](file:///.github/workflows/release.yml) | Push to `main` | Generates semantic release tags (`v1.0.x`) and categorized changelogs upon merge. |
| **PR Quality & Compliance** | [pr-health.yml](file:///.github/workflows/pr-health.yml) | Pull Request events | Enforces Conventional Commits standards on PR titles (`feat:`, `fix:`, `refactor:`, `chore:`). |