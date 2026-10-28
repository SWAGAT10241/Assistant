# Virtual Assistant (AI Operating System)

A full-stack, voice-enabled intelligent Virtual Assistant powered by **React 19**, **Node.js/Express 5**, **Google Gemini AI**, and **MongoDB**. Architected with clean separation of UI from business logic, modular reusable components, centralized configurations, robust error handling, automated request validation, and a scalable versioned API structure.

---

## Architecture Overview

```
Assistant/
├── backend/
│   ├── config/             # Centralized environment, DB, & Cloudinary configurations
│   │   ├── env.js          # Sane defaults, CORS origin parsing, & env typing
│   │   ├── db.js           # Mongoose MongoDB connection
│   │   └── cloudinary.js   # Cloudinary storage SDK configuration
│   ├── controllers/        # Thin HTTP request & response handlers
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── assistant.controller.js
│   │   ├── conversation.controller.js
│   │   └── message.controller.js
│   ├── middlewares/        # Security, auth, validation, uploads & errors
│   │   ├── security.middleware.js # Security headers (HSTS, CSP, X-Frame, X-Content-Type)
│   │   ├── sanitize.middleware.js # NoSQL Injection & XSS sanitization
│   │   ├── rateLimiter.middleware.js # Multi-tier rate limiters (API, Auth, AI)
│   │   ├── auth.middleware.js     # JWT verification (cookie & Bearer header)
│   │   ├── validate.middleware.js # Request payload schema validator
│   │   ├── multer.middleware.js   # 5MB file upload limit & extension checking
│   │   └── error.middleware.js    # Normalized error handler & 404 responder
│   ├── models/             # Mongoose schemas & domain models
│   │   ├── index.js        # Centralized barrel export
│   │   ├── user.model.js
│   │   ├── assistant.model.js
│   │   ├── conversation.model.js
│   │   ├── message.model.js
│   │   ├── workspace.model.js
│   │   └── project.model.js
│   ├── routes/             # Scalable versioned REST API routers (/api & /api/v1)
│   │   ├── index.js        # Root router aggregation & health check
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── assistant.routes.js
│   │   ├── conversation.routes.js
│   │   └── message.routes.js
│   ├── services/           # Decoupled business logic & external integrations
│   │   ├── ai.service.js          # Gemini prompt orchestration & intent parsing
│   │   ├── auth.service.js        # Registration, login & workspace onboarding
│   │   ├── user.service.js        # Profile retrieval & voice command logging
│   │   ├── assistant.service.js   # Assistant management & visibility
│   │   ├── conversation.service.js# Conversation threads
│   │   ├── message.service.js     # Message storage & pinning
│   │   └── upload.service.js      # Cloudinary upload handler & temp file cleanup
│   ├── utils/              # Shared helper utilities
│   │   ├── apiResponse.js  # Standardized { statusCode, success, message, data } envelope
│   │   ├── apiError.js     # Custom ApiError with status codes & error list
│   │   ├── asyncHandler.js # Async error propagation wrapper
│   │   └── token.util.js   # JWT signing and verification utility
│   ├── validations/        # Request payload validation rules
│   │   ├── auth.validation.js
│   │   └── user.validation.js
│   ├── tests/              # Automated Node.js test runner suite (15 unit tests)
│   │   ├── config-utils.test.js
│   │   ├── security.test.js
│   │   ├── token-util.test.js
│   │   └── validation.test.js
│   ├── app.js              # Express app configuration & middleware pipeline
│   ├── index.js            # Server entrypoint with DB connection & graceful shutdown
│   └── .env.example        # Backend environment variables template
│
└── frontend/
    ├── src/
    │   ├── api/            # Centralized API client (Axios) & service functions
    │   │   ├── index.js          # Barrel export
    │   │   ├── apiClient.js      # Axios instance with normalized error interceptors
    │   │   ├── auth.api.js       # Auth API client
    │   │   ├── assistant.api.js  # Assistant & AI voice query client
    │   │   ├── conversation.api.js # Conversation threads API client
    │   │   └── message.api.js    # Message API client
    │   ├── components/     # Modular and reusable UI components
    │   │   ├── common/     # Generic UI elements
    │   │   │   ├── Button.jsx        # Configurable button with loading states
    │   │   │   ├── Input.jsx         # Input with password toggle and error states
    │   │   │   ├── Alert.jsx         # Accessible alert banner (error, warning, success, info)
    │   │   │   ├── Spinner.jsx       # Animated loading indicator
    │   │   │   └── ErrorBoundary.jsx # React error boundary component
    │   │   ├── assistant/  # Domain-specific assistant components
    │   │   │   ├── AvatarCard.jsx    # Avatar preview & selection card
    │   │   │   ├── VoiceVisualizer.jsx # Glow & wave audio visualizer
    │   │   │   └── HistoryDrawer.jsx # Slide-over command history drawer
    │   │   └── routes/     # ProtectedRoute & PublicRoute guards
    │   ├── config/         # Environment configuration module
    │   │   └── env.config.js
    │   ├── context/        # Clean state management
    │   │   ├── authContextDef.js # Fast Refresh compliant context definition
    │   │   └── AuthContext.jsx   # Dedicated user session & auth state provider
    │   ├── hooks/          # Custom React hooks
    │   │   ├── useAuth.js            # Auth context consumer hook
    │   │   ├── useSpeechAssistant.js # Speech Recognition & Synthesis hook
    │   │   └── useAssistantCustomization.js # Wizard state for assistant setup
    │   ├── services/       # Frontend business logic services
    │   │   └── intentExecutor.service.js # Intent action dispatcher (Google, YouTube, Weather, etc.)
    │   ├── pages/          # View pages
    │   │   ├── Home.jsx              # Main voice dashboard
    │   │   ├── Customize.jsx         # 2-Step assistant avatar & name wizard
    │   │   ├── SignIn.jsx            # Sign in view
    │   │   └── SignUp.jsx            # Registration view
    │   ├── App.jsx         # Declarative client routes with ErrorBoundary
    │   ├── main.jsx        # App root initialization
    │   └── index.css       # Tailwind CSS styles
    └── .env.example        # Frontend environment variables template
```

---

## Refactoring & Engineering Highlights

1. **Clean Separation of UI and Business Logic**:
   - **Backend**: Controllers are thin delegates that parse HTTP requests and return standard `ApiResponse` objects. All business logic, DB queries, and external APIs (Gemini, Cloudinary) live inside dedicated service classes.
   - **Frontend**: Components focus strictly on JSX presentation. Browser intent actions are decoupled into `intentExecutor.service.js`. Assistant customization step management, validation, and object URL lifetimes are encapsulated in `useAssistantCustomization.js`. Global user session state is cleanly isolated in `AuthContext.jsx`.

2. **Eliminated Duplicate & Dead Code**:
   - **Backend**: Removed redundant re-export files (`controllers/user.controllers.js`, `middlewares/isAuth.js`, `middlewares/multer.js`) and dead models (`file.model.js`, `task.model.js`, `note.model.js`, `memory.model.js`).
   - **Frontend**: Removed redundant duplicate cards (`components/Card.jsx` vs `components/assistant/Card.jsx`) in favor of `AvatarCard.jsx`. Removed `Customize2.jsx` and `UserContext.jsx` aliases.

3. **Consistent Naming Conventions**:
   - Backend follows strict file-type suffixes: `*.controller.js`, `*.service.js`, `*.routes.js`, `*.middleware.js`, `*.model.js`, `*.util.js`, `*.validation.js`.
   - Frontend enforces PascalCase for React components, camelCase with `use` prefix for hooks, and `*.api.js` / `*.service.js` for data & business services.

4. **Robust Error Handling Everywhere**:
   - **Backend**: Custom `ApiError` class, centralized error handling middleware capturing MongoDB CastErrors, ValidationErrors, duplicate key constraints (11000), JWT expirations, and Multer file size limits. Incoming requests are pre-validated using lightweight schema validation middleware.
   - **Frontend**: Centralized Axios response interceptors handle network disconnects, timeouts, and formatted API error messages. A React `ErrorBoundary` prevents application crashes, and reusable `Alert` components give clear feedback for speech recognition, authentication, and form errors.

5. **Decoupled Environment Configurations**:
   - Backend configurations are centralized in `backend/config/env.js` with CORS origin parsing, development fallback origins, and typed properties.
   - Frontend configurations live in `frontend/src/config/env.config.js` reading `VITE_API_BASE_URL` with development/production mode indicators.
   - Both have comprehensive, safe `.env.example` templates.

6. **Scalable API Architecture**:
   - Root API router mounted at `/api` and `/api/v1` for versioning support.
   - Uniform response envelopes: `{ statusCode, success, message, data }` for success and `{ statusCode, success: false, message, errors }` for failures across all endpoints.
   - Full frontend client coverage for `auth`, `assistant`, `conversation`, and `message` resources.

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
   pnpm install # or npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your `MONGODB_URL`, `JWT_SECRET`, `GEMINI_API_URL`, and Cloudinary keys.

4. Run tests:
   ```bash
   npm test
   ```

5. Run development server:
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
   pnpm install # or npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Set `VITE_API_BASE_URL=http://localhost:8000` for local development.

4. Run linter:
   ```bash
   npm run lint
   ```

5. Run development server:
   ```bash
   npm run dev
   ```

6. Build for production:
   ```bash
   npm run build
   ```

---

## API Documentation Summary

### Health Check
- `GET /api/health` — Check server status and timestamp

### Authentication (`/api/auth`)
- `POST /api/auth/register` (alias: `/signup`) — Register a new account with validation
- `POST /api/auth/login` (alias: `/signin`) — Authenticate and receive HTTP-only cookie
- `POST /api/auth/logout` (or `GET /logout`) — Clear authentication cookie
- `GET /api/auth/me` — Retrieve active user session

### User & Assistant (`/api/users` & `/api/user`)
- `GET /api/users/current` (or `/me`) — Get current user profile
- `POST /api/users/update` — Update assistant avatar (file upload or URL) and name
- `POST /api/users/asktoassistant` (or `/ask`) — Process voice/text command with Gemini AI

### Assistants (`/api/assistants`)
- `GET /api/assistants` — List all assistants owned by user
- `POST /api/assistants` — Create a custom assistant
- `GET /api/assistants/:id` — Get assistant details
- `PUT /api/assistants/:id` — Update assistant
- `DELETE /api/assistants/:id` — Delete assistant
- `PATCH /api/assistants/:id/visibility` — Toggle assistant visibility

### Conversations (`/api/conversations`)
- `GET /api/conversations` — List conversation threads
- `POST /api/conversations` — Create a conversation thread
- `GET /api/conversations/:id` — Get conversation details
- `PUT /api/conversations/:id` — Rename conversation thread
- `DELETE /api/conversations/:id` — Delete conversation thread and messages

### Messages (`/api/messages`)
- `POST /api/messages` — Send message in conversation thread
- `GET /api/messages/:conversationId` — Fetch messages for thread
- `DELETE /api/messages/:id` — Delete message
- `PATCH /api/messages/:id/pin` — Toggle pinned message status
