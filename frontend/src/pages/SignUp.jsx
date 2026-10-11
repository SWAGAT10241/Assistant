import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bg from "../assets/authBg.png";
import useAuth from "../hooks/useAuth";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export function SignUp() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      setErrorMessage("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      await register({ name, email, password });
      navigate("/customize");
    } catch (error) {
      setErrorMessage(error.message || "Failed to create account. Please try again.");
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
        onSubmit={handleSignUp}
      >
        <div className="text-center mb-2">
          <h1 className="text-white text-3xl font-extrabold tracking-tight">
            Register to <span className="text-blue-400">Virtual Assistant</span>
          </h1>
          <p className="text-gray-300 text-sm mt-1">
            Create your account to design your custom AI assistant.
          </p>
        </div>

        {errorMessage && (
          <div className="w-full bg-red-500/15 border border-red-500/30 text-red-300 text-sm rounded-2xl px-4 py-2.5 text-center">
            {errorMessage}
          </div>
        )}

        <Input
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />

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
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full mt-2"
        >
          Sign Up
        </Button>

        <p className="text-gray-300 text-sm text-center mt-2">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4 transition-colors"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
