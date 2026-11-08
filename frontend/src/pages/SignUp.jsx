import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Sparkles } from "lucide-react";
import { StringTilt, StringMagnetic } from "@fiddle-digital/string-tune";
import bg from "../assets/authBg.png";
import useAuth from "../hooks/useAuth";
import useStringTune from "../hooks/useStringTune";
import Input from "../components/common/Input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import Alert from "../components/common/Alert";
import ThemeToggle from "../components/common/ThemeToggle";

export function SignUp() {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Initialize StringTune subtle tilt and magnetic effects
  useStringTune([StringTilt, StringMagnetic]);

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
      setErrorMessage(
        error.message || "Failed to create account. Please try again."
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
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-colors duration-500" />

      {/* Top right Theme Toggle */}
      <ThemeToggle className="absolute top-6 right-6 z-20" />

      <Card
        string="tilt"
        string-tilt-max="5"
        className="w-full max-w-md bg-card/85 backdrop-blur-2xl border-border/80 shadow-2xl rounded-3xl z-10"
      >
        <form onSubmit={handleSignUp}>
          <CardHeader className="text-center pb-4 space-y-1.5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mx-auto mb-2 border border-primary/20 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <CardTitle className="text-3xl font-extrabold tracking-tight">
              Create an <span className="text-primary">Account</span>
            </CardTitle>
            <CardDescription className="text-sm">
              Design and control your personalized AI voice assistant.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
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
              label="Full Name"
              type="text"
              placeholder="Alex Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-2">
            <Button
              type="submit"
              string="magnetic"
              string-magnetic-strength="0.3"
              variant="default"
              size="lg"
              disabled={loading}
              className="w-full h-12 rounded-xl font-semibold shadow-lg shadow-primary/20 gap-2"
            >
              <UserPlus className="w-4 h-4" />
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <p className="text-muted-foreground text-sm text-center">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-primary hover:text-primary/80 font-semibold underline underline-offset-4 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default SignUp;
