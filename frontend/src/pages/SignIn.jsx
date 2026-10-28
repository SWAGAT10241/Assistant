import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bg from "../assets/authBg.png";
import useAuth from "../hooks/useAuth";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";

export function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await login({ email, password });
      navigate("/");
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to sign in. Please verify your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex justify-center items-center p-4 relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" />

      <form
        className="w-full max-w-md bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl flex flex-col items-center gap-5 p-8 sm:p-10 z-10"
        onSubmit={handleSignIn}
      >
        <div className="text-center mb-2">
          <h1 className="text-white text-3xl font-extrabold tracking-tight">
            Sign In to <span className="text-blue-400">Virtual Assistant</span>
          </h1>
          <p className="text-gray-300 text-sm mt-1">
            Welcome back! Please enter your details.
          </p>
        </div>

        {errorMessage && (
          <Alert
            variant="error"
            onDismiss={() => setErrorMessage("")}
            className="w-full"
          >
            {errorMessage}
          </Alert>
        )}

        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full mt-2"
        >
          Sign In
        </Button>

        <p className="text-gray-300 text-sm text-center mt-2">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4 transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
