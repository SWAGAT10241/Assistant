import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Customize from "./pages/Customize";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import ErrorBoundary from "./components/common/ErrorBoundary";
import useAuth from "./hooks/useAuth";
import Spinner from "./components/common/Spinner";

function HomeRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen bg-background flex flex-col items-center justify-center gap-4 text-foreground">
        <Spinner size="lg" />
        <p className="text-muted-foreground text-sm">Loading Virtual Assistant...</p>
      </div>
    );
  }

  if (!user) {
    return <Landing />;
  }

  return (
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Dynamic Root Route: Shows Landing for guests, Home for authenticated users */}
        <Route path="/" element={<HomeRoute />} />

        {/* Dedicated Landing Page */}
        <Route path="/landing" element={<Landing />} />

        {/* Protected Customization Wizard */}
        <Route
          path="/customize"
          element={
            <ProtectedRoute>
              <Customize />
            </ProtectedRoute>
          }
        />
        {/* Backward-compatibility alias for step 2 / customize2 */}
        <Route
          path="/customize2"
          element={<Navigate to="/customize" replace />}
        />

        {/* Public Authentication Routes */}
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
