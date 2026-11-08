# Virtual Assistant — Frontend

Modern, voice-enabled React 19 web application built with **Vite**, **Tailwind CSS v4**, **shadcn/ui** (Radix UI), and **StringTune** animation engine.

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
│   │   ├── ui/                   # Official shadcn/ui component library
│   │   │   ├── index.js          # Barrel export for UI primitives
│   │   │   ├── button.jsx        # Radix Slot + CVA button (default, outline, glass, destructive, etc.)
│   │   │   ├── buttonVariants.js # Fast Refresh compliant variant styles
│   │   │   ├── input.jsx         # Accessible form input with focus ring tokens
│   │   │   ├── card.jsx          # Modular Card, CardHeader, CardTitle, CardContent, CardFooter
│   │   │   ├── dialog.jsx        # Radix Dialog primitive for modals & overlays
│   │   │   ├── badge.jsx         # Status indicators (active, speaking, listening)
│   │   │   ├── badgeVariants.js  # Badge variant definitions
│   │   │   ├── avatar.jsx        # Radix Avatar with fallback
│   │   │   ├── separator.jsx     # Accessible dividing lines
│   │   │   ├── scroll-area.jsx   # Radix ScrollArea for smooth command history
│   │   │   ├── alert.jsx         # Status alert banner (destructive, warning, success, info)
│   │   │   └── alertVariants.js  # Alert variant definitions
│   │   ├── common/               # Shared compound UI components
│   │   │   ├── index.js          # Barrel export
│   │   │   ├── Button.jsx        # Button component mapped to shadcn/ui
│   │   │   ├── Input.jsx         # Input with password toggle and error messages
│   │   │   ├── Alert.jsx         # Alert banner with Lucide status icons
│   │   │   ├── Spinner.jsx       # Animated loading indicator
│   │   │   └── ErrorBoundary.jsx # React error boundary component
│   │   ├── assistant/            # Assistant-specific UI components
│   │   │   ├── index.js          # Barrel export
│   │   │   ├── AvatarCard.jsx    # 3D interactive avatar preview & selection card
│   │   │   ├── VoiceVisualizer.jsx # 3D perspective assistant portrait with audio glow
│   │   │   └── HistoryDrawer.jsx # Slide-out control panel & command history sheet
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
│   │   ├── useAssistantCustomization.js # Wizard state for assistant avatar & name
│   │   └── useStringTune.js      # StringTune modular animation lifecycle hook
│   ├── lib/
│   │   └── utils.js              # Canonical cn(...) combining clsx and tailwind-merge
│   ├── services/                 # Frontend business logic services
│   │   └── intentExecutor.service.js # Browser action dispatcher for assistant intents
│   ├── pages/                    # Route page views
│   │   ├── SignIn.jsx            # Sign in view (shadcn Card + StringTilt)
│   │   ├── SignUp.jsx            # Registration view (shadcn Card + StringTilt)
│   │   ├── Customize.jsx         # 2-Step assistant avatar & name wizard
│   │   └── Home.jsx              # Main voice dashboard with magnetic controls
│   ├── App.jsx                   # Route configurations & error boundary
│   ├── index.css                 # Tailwind CSS v4 styles & shadcn token variables
│   └── main.jsx                  # React DOM entry point
├── .env.example                  # Environment variables template
└── vite.config.js                # Vite build configuration
```

---

## Design System & UI Architecture

### 1. shadcn/ui Component Primitives
* **Standard Component Tokens**: Built using pure `@radix-ui` primitives, styled with Tailwind CSS v4 design tokens (`--background`, `--foreground`, `--card`, `--primary`, `--secondary`, `--border`, `--ring`).
* **Clean Variant Separation**: Variant style objects (`buttonVariants`, `badgeVariants`, `alertVariants`) are isolated in dedicated `*Variants.js` modules to ensure strict compliance with React 19 Fast Refresh rules.
* **Component Reuse**: No ad-hoc styled tags or raw HTML button/input primitives are used in layout views. All screens consume standard shadcn components from `components/ui/`.

### 2. StringTune Motion & Micro-Interactions
* **3D Perspective Tilt (`StringTilt`)**: Integrated on the central Assistant avatar card, preset avatar selector cards, and authentication forms (`string="tilt"` with customizable max angles).
* **Magnetic Cursor Attraction (`StringMagnetic`)**: Added to key interaction points (Header Menu, Navigation buttons, Submit actions) for fluid responsiveness to mouse velocity.
* **Declarative React Hook**: Managed via `useStringTune([StringTilt, StringMagnetic, StringSpotlight])`, which handles component mount/unmount and singleton lifecycle cleanly.

### 3. Separation of UI and Business Logic
* **Presentation**: Page views (`Home.jsx`, `Customize.jsx`) are purely presentational and consume headless custom hooks.
* **Browser Intent Execution**: Delegated to `intentExecutor.service.js` for handling external actions (Google searches, YouTube playback, weather queries, calculator).
* **Customization Wizard**: `useAssistantCustomization.js` encapsulates 2-step navigation, file validation, object URL lifetimes, and Cloudinary upload triggers.
* **Network Isolation**: All network requests pass through `src/api/` Axios modules with centralized error handling.

---

## Getting Started

```bash
# 1. Install dependencies
pnpm install # or npm install

# 2. Configure environment
cp .env.example .env
# Set VITE_API_BASE_URL=http://localhost:8000

# 3. Run development server
npm run dev

# 4. Run ESLint verification (Must pass with 0 errors)
npm run lint

# 5. Build for production
npm run build

# 6. Preview production bundle
npm run preview
```
