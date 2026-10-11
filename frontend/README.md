# Virtual Assistant — Frontend

Modern, voice-enabled React 19 web application built with **Vite** and **Tailwind CSS**.

---

## Folder Structure

```
frontend/
├── src/
│   ├── api/
│   │   ├── apiClient.js          # Centralized Axios client with interceptors
│   │   ├── auth.api.js           # Authentication API calls
│   │   └── assistant.api.js      # Assistant settings & AI voice queries
│   ├── assets/                   # Preset avatar images and animations
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx        # Configurable button with loading states
│   │   │   ├── Input.jsx         # Input with password toggle and error states
│   │   │   └── Spinner.jsx       # Animated loading indicator
│   │   ├── assistant/
│   │   │   ├── Card.jsx          # Avatar preview & selection card
│   │   │   ├── VoiceVisualizer.jsx # Glow & wave audio visualizer
│   │   │   └── HistoryDrawer.jsx # Slide-over command history drawer
│   │   └── routes/
│   │       ├── ProtectedRoute.jsx# Auth & setup guard
│   │       └── PublicRoute.jsx   # Public redirect guard
│   ├── config/
│   │   └── env.config.js         # Centralized environment config
│   ├── context/
│   │   ├── authContextDef.js     # React Context definition
│   │   ├── AuthContext.jsx       # AuthProvider implementation
│   │   └── UserContext.jsx       # Backwards-compatibility re-export
│   ├── hooks/
│   │   ├── useAuth.js            # Consumer hook for AuthContext
│   │   └── useSpeechAssistant.js # Speech Recognition & Speech Synthesis hook
│   ├── pages/
│   │   ├── SignIn.jsx            # Sign in view
│   │   ├── SignUp.jsx            # Registration view
│   │   ├── Customize.jsx         # 2-Step assistant avatar & name wizard
│   │   ├── Customize2.jsx        # Route alias for step 2
│   │   └── Home.jsx              # Main voice dashboard
│   ├── App.jsx                   # Route configurations
│   ├── index.css                 # Tailwind CSS styles
│   └── main.jsx                  # React DOM entry point
├── .env.example                  # Environment variables template
└── vite.config.js                # Vite build configuration
```

---

## Architectural Patterns

1. **Separation of UI and Business Logic**:
   - `Home.jsx` is purely presentational, consuming the `useSpeechAssistant` custom hook which manages speech recognition, speech synthesis, intent execution, and microphone permissions.
   - API calls are fully isolated in `api/` services rather than scattered inside components.

2. **State Management**:
   - `AuthContext` provides global session state, user details, and assistant customization steps.
   - Fast Refresh compliance: Context definitions are separated from provider components to ensure clean HMR during development.

3. **Routing & Guards**:
   - `ProtectedRoute`: Verifies authentication session and ensures assistant is configured before allowing access to the dashboard.
   - `PublicRoute`: Redirects authenticated users from `/signin` and `/signup` back to `/`.
