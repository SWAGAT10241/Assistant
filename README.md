# Virtual Assistant (AI Operating System)

A full-stack, voice-interactive intelligent Virtual Assistant web application powered by **React 19**, **Vite**, **shadcn/ui**, **StringTune**, **Node.js / Express 5**, **Google Gemini AI**, and **MongoDB**. 

Engineered with a strict layered architecture, zero-vulnerability security standard, pre-built design system tokens, physics-driven micro-interactions, automated testing, and continuous delivery.

---

## Architecture Overview

```
Assistant/
├── backend/                  # Node.js + Express 5 API Server
│   ├── config/              # Centralized environment, DB, & Cloudinary configurations
│   ├── controllers/         # Thin HTTP request & response handlers
│   ├── middlewares/         # Multi-tier rate limiting, sanitization, auth & validation
│   ├── models/              # Mongoose domain models (User, Assistant, Conversation, Message)
│   ├── routes/              # Versioned REST API routers (/api & /api/v1)
│   ├── services/            # Pure business logic (Auth, AI Gemini, Assistant, User, Upload)
│   ├── utils/               # Standardized ApiResponse, ApiError, asyncHandler & JWT token utilities
│   ├── validations/         # Schema validation rules for requests
│   └── tests/               # Automated Node.js test runner suite (15 unit tests)
│
├── frontend/                 # React 19 + Vite + Tailwind CSS v4 Client
│   ├── src/
│   │   ├── api/             # Centralized Axios API client modules
│   │   ├── components/
│   │   │   ├── ui/          # Official shadcn/ui component library (Button, Card, Dialog, etc.)
│   │   │   ├── common/      # Shared components (Button, Input, Alert, Spinner, ErrorBoundary)
│   │   │   ├── assistant/   # Domain components (VoiceVisualizer, AvatarCard, HistoryDrawer)
│   │   │   └── routes/      # ProtectedRoute & PublicRoute route guards
│   │   ├── context/         # Fast-Refresh compliant React context state providers
│   │   ├── hooks/           # Custom reusable hooks (useAuth, useSpeechAssistant, useStringTune)
│   │   ├── lib/             # Canonical cn(...) styling utility
│   │   ├── pages/           # Route views (Home, Customize, SignIn, SignUp)
│   │   └── services/        # Client-side intent execution (Google, YouTube, Weather, etc.)
│   └── public/              # Static assets
│
└── graphify-out/             # Knowledge graph & codebase visualization
    ├── graph.html           # Interactive 3D/2D visual graph of all files & connections
    └── GRAPH_REPORT.md      # Architectural analysis, god nodes, and community clusters
```

---

## Key Features & Engineering Highlights

### 1. shadcn/ui Design System
* **Pre-Built Primitives**: All UI views are constructed using **shadcn/ui** built with Radix UI headless primitives (`@radix-ui/react-dialog`, `@radix-ui/react-avatar`, `@radix-ui/react-scroll-area`, `@radix-ui/react-separator`, `@radix-ui/react-slot`).
* **Design Token System**: Deeply integrated into Tailwind CSS v4 using CSS variable tokens (`--background`, `--foreground`, `--card`, `--primary`, `--secondary`, `--border`, `--ring`).
* **Clean Variant Separation**: Variant styling objects are cleanly separated into dedicated `*Variants.js` modules, preserving React 19 Fast Refresh compliance.

### 2. StringTune Animation Engine
* **Interactive 3D Tilt (`StringTilt`)**: Assistant visualizer portrait, avatar picker cards, and authentication forms tilt fluidly based on pointer location.
* **Magnetic Micro-Interactions (`StringMagnetic`)**: Control panel toggle, action triggers, and navigation buttons dynamically attract to cursor velocity.
* **Declarative React Hook**: Managed through [`useStringTune.js`](file:///Users/swagatsouravdhar/WEB%20DEVELOPMENT/Assistant/frontend/src/hooks/useStringTune.js).

### 3. Voice Interaction & Intent Pipeline
* **Speech Synthesis & Recognition**: Web Speech API wrapper in `useSpeechAssistant.js` for continuous listening, wake-word activation, and vocal responses.
* **Gemini AI Intent Parser**: Google Gemini AI parses natural language commands and returns structured JSON intents.
* **Client-Side Intent Execution**: `intentExecutor.service.js` automatically executes real-time actions (opening Google searches, YouTube videos, checking live weather, or launching productivity apps).

### 4. Zero-Vulnerability Security Standard
* **Multi-Tier Sliding-Window Rate Limiting**:
  * `/api/auth/*`: 10 req / 15 min (credential stuffing protection).
  * `/api/users/asktoassistant`: 25 req / min (AI credit protection).
  * General API: 150 req / 15 min (DDoS protection).
* **NoSQL Injection & XSS Sanitization**: Recursively scrubs payloads, stripping `$` operator keys and dangerous HTML/script tags.
* **Security Headers**: HSTS, CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff.
* **Strict Upload Filters**: 5MB ceiling, randomized filenames, and MIME/extension validation.
* **0 Vulnerabilities**: Fully verified with `npm audit` and `pnpm audit`.

---

## Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- pnpm or npm
- MongoDB Atlas or local MongoDB instance

---

### Backend Setup

```bash
cd backend

# Install dependencies
pnpm install # or npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your MONGODB_URL, JWT_SECRET, GEMINI_API_URL, and Cloudinary keys

# Run unit tests (15 tests)
npm test

# Run development server
npm run dev
```

---

### Frontend Setup

```bash
cd frontend

# Install dependencies
pnpm install # or npm install

# Configure environment variables
cp .env.example .env
# Set VITE_API_BASE_URL=http://localhost:8000

# Run linter
npm run lint

# Run development server
npm run dev

# Build for production
npm run build
```

---

## Verification Gates (Pre-Push Quality Standard)

Before any code is committed or merged, all verification pipelines must pass:

```bash
# 1. Backend Unit Tests & Syntax Verification
cd backend && npm test

# 2. Frontend Linting & Production Build
cd ../frontend && npm run lint && npm run build

# 3. Security Vulnerability Audits
npm audit --prefix backend
npm audit --prefix frontend
```

---

## CI/CD & Deployment Model

This project follows an industry-standard deployment lifecycle:
* `feature/*` &rarr; Feature development branches.
* `develop` &rarr; System Integration Testing (SIT).
* `release/*` &rarr; User Acceptance Testing (UAT).
* `main` &rarr; Production (tagged and rollback-ready).

Automated GitHub Actions workflows enforce:
- **CI Pipeline**: Matrix testing across Node 20.x and 22.x, syntax validation, unit tests, and production builds.
- **CD Deployment Pipeline**: Automated build integrity checks.
- **Secret Leak Detection**: Gitleaks automated secret scanning.
- **CodeQL**: Deep semantic code scanning for security vulnerabilities.
- **Automated Release**: Automatic changelog generation and semantic version tagging.

---

## Codebase Knowledge Graph

An interactive visual knowledge graph of the entire monorepo is available at:
* [`graphify-out/graph.html`](file:///Users/swagatsouravdhar/WEB%20DEVELOPMENT/Assistant/graphify-out/graph.html) (Open in Chrome/Safari to view 500+ interconnected nodes, god nodes, and 15 clustered communities).
* [`graphify-out/GRAPH_REPORT.md`](file:///Users/swagatsouravdhar/WEB%20DEVELOPMENT/Assistant/graphify-out/GRAPH_REPORT.md) (Architectural analysis report).
