# Virtual Assistant — Frontend

Modern, voice-enabled React 19 web application built with **Vite** and **Tailwind CSS**.

---

## Folder Structure

```
frontend/
├── src/
│   ├── api/                      # Scalable API client layer
│   │   ├── index.js              # Barrel export for API modules
│   │   ├── apiClient.js          # Centralized Axios client with error normalization
│   │   ├── auth.api.js           # Auth endpoints (login, register, logout, me)
│   │   ├── assistant.api.js      # Assistant settings & AI voice queries
│   │   ├── conversation.api.js   # Conversation threads CRUD
│   │   └── message.api.js        # Message CRUD & pin status
│   ├── assets/                   # Preset avatar images and animations
│   ├── components/
│   │   ├── common/               # Reusable UI components
│   │   │   ├── index.js          # Barrel export
│   │   │   ├── Button.jsx        # Configurable button with loading states
│   │   │   ├── Input.jsx         # Input with password toggle and error states
│   │   │   ├── Alert.jsx         # Standard alert banner (error, warning, success, info)
│   │   │   ├── Spinner.jsx       # Animated loading indicator
│   │   │   └── ErrorBoundary.jsx # React error boundary component
│   │   ├── assistant/            # Assistant-specific UI components
│   │   │   ├── index.js          # Barrel export
│   │   │   ├── AvatarCard.jsx    # Avatar preview & selection card
│   │   │   ├── VoiceVisualizer.jsx # Glow & wave audio visualizer
│   │   │   └── HistoryDrawer.jsx # Slide-over command history drawer
│   │   └── routes/               # Route authorization guards
│   │       ├── ProtectedRoute.jsx# Auth & setup guard
│   │       └── PublicRoute.jsx   # Public redirect guard
│   ├── config/
│   │   └── env.config.js         # Centralized frontend environment configuration
│   ├── context/                  # React state management
│   │   ├── index.js              # Barrel export
│   │   ├── authContextDef.js     # React Context definition (Fast Refresh compliant)
│   │   └── AuthContext.jsx       # AuthProvider managing user session & authentication
│   ├── hooks/                    # Reusable React hooks
│   │   ├── useAuth.js            # Consumer hook for AuthContext
│   │   ├── useSpeechAssistant.js # Speech Recognition & Synthesis orchestration
│   │   └── useAssistantCustomization.js # Wizard state for assistant avatar & name
│   ├── services/                 # Frontend business logic services
│   │   └── intentExecutor.service.js # Browser action dispatcher for assistant intents
│   ├── pages/                    # Route page views
│   │   ├── SignIn.jsx            # Sign in view
│   │   ├── SignUp.jsx            # Registration view
│   │   ├── Customize.jsx         # 2-Step assistant avatar & name wizard
│   │   └── Home.jsx              # Main voice dashboard
│   ├── App.jsx                   # Route configurations & error boundary
│   ├── index.css                 # Tailwind CSS styles
│   └── main.jsx                  # React DOM entry point
├── .env.example                  # Environment variables template
└── vite.config.js                # Vite build configuration
```

---

## Architectural Patterns

1. **Separation of UI and Business Logic**:
   - `Home.jsx` is purely presentational, consuming the `useSpeechAssistant` custom hook.
   - `useSpeechAssistant` delegates browser actions (e.g. Google searches, YouTube, weather) to `intentExecutor.service.js`.
   - `Customize.jsx` uses `useAssistantCustomization` to manage step progression, object URL lifetimes, and validation without polluting global authentication state.
   - API interactions are completely isolated in `api/` modules.

2. **State Management**:
   - `AuthContext`: Dedicated strictly to user session state, authentication actions, and profile updates.
   - Fast Refresh compliance: Context definitions are separated in `authContextDef.js` to ensure clean Hot Module Replacement (HMR).

3. **Error Handling & Resilience**:
   - Centralized Axios response interceptors normalize server and network errors.
   - `ErrorBoundary` catches unexpected render exceptions and displays user-friendly recovery controls.
   - Microphone permission denials and unsupported browser warnings are handled gracefully with `Alert`.

---

## Running Frontend

```bash
# Install dependencies
pnpm install # or npm install

# Run in development mode
npm run dev

# Run ESLint linter
npm run lint

# Build production bundle
npm run build

# Preview production build
npm run preview
```
