import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Mic,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Globe,
  Radio,
  Palette,
} from "lucide-react";
import { StringTilt, StringMagnetic, StringSpotlight } from "@fiddle-digital/string-tune";
import useStringTune from "../hooks/useStringTune";
import { useTheme } from "../hooks/useTheme";
import ThemeToggle from "../components/common/ThemeToggle";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

import aiImg from "../assets/ai.gif";
import userImg from "../assets/user.gif";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";

export function Landing() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  // Initialize StringTune 3D tilt, magnetic hover, and spotlight effects
  useStringTune([StringTilt, StringMagnetic, StringSpotlight], { fps: 60 });

  const features = [
    {
      icon: Mic,
      title: "Voice-First Intelligence",
      description:
        "Real-time continuous speech recognition and vocal synthesis powered by browser Web Speech API and Gemini AI.",
      badge: "Speech AI",
    },
    {
      icon: Palette,
      title: "Adaptive Dark & Light Themes",
      description:
        "Seamless toggle between Obsidian Dark and Crisp Slate Light themes with synchronized CSS design tokens.",
      badge: "Dynamic Themes",
    },
    {
      icon: Layers,
      title: "3D Motion & Physics Engine",
      description:
        "Interactive 3D perspective tilt and magnetic cursor attractions built with StringTune for rich tactile feedback.",
      badge: "StringTune 3D",
    },
    {
      icon: ShieldCheck,
      title: "Zero-Vulnerability Security",
      description:
        "Multi-tier rate limiters, recursive NoSQL and XSS sanitization, HSTS security headers, and zero dependency CVEs.",
      badge: "Hardened API",
    },
    {
      icon: Sliders,
      title: "Customizable Personas",
      description:
        "Choose custom wake words, bespoke avatar portraits, and cloud-synced profile configurations.",
      badge: "Personalization",
    },
    {
      icon: Globe,
      title: "System-Level Intent Dispatcher",
      description:
        "Directly opens search queries, YouTube streams, weather forecasts, and automation tasks on command.",
      badge: "Automations",
    },
  ];

  const avatarShowcase = [
    { img: image1, name: "Nexus Prime", role: "Analytical Strategist" },
    { img: image2, name: "Aura 7", role: "Creative Collaborator" },
    { img: image3, name: "Cypher", role: "Dev & Code Copilot" },
    { img: image4, name: "Valkyrie", role: "Productivity Commander" },
  ];

  return (
    <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden selection:bg-primary/20">
      {/* ------------------------------------------------------------- */}
      {/* Navigation Header                                              */}
      {/* ------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Virtual Assistant
            </span>
            <Badge variant="outline" className="hidden sm:inline-flex text-[10px] font-mono py-0">
              v1.2.0
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/signin">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex font-medium">
                Sign In
              </Button>
            </Link>
            <Button
              string="magnetic"
              string-magnetic-strength="0.3"
              variant="default"
              size="sm"
              onClick={() => navigate("/signup")}
              className="rounded-xl shadow-md shadow-primary/20 font-semibold gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* Hero Section with Interactive 3D Perspective                  */}
      {/* ------------------------------------------------------------- */}
      <section className="relative px-6 pt-16 pb-24 md:pt-24 md:pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Glow ambient backdrops */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <Badge
          variant="outline"
          className="mb-6 px-3.5 py-1.5 rounded-full bg-card/60 backdrop-blur-md border-border/80 gap-2 shadow-sm animate-in fade-in duration-500"
        >
          <Radio className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span className="text-xs font-semibold text-foreground">
            Next-Gen Voice AI Operating System
          </span>
        </Badge>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl text-foreground leading-[1.1] mb-6">
          Your Voice. Your Identity.{" "}
          <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Your Personal AI.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed font-normal">
          A voice-enabled assistant powered by Google Gemini, designed with pre-built{" "}
          <strong className="text-foreground font-semibold">shadcn/ui</strong> primitives, physics-driven{" "}
          <strong className="text-foreground font-semibold">StringTune 3D tilt</strong>, and adaptive dual themes.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Button
            string="magnetic"
            string-magnetic-strength="0.3"
            variant="default"
            size="lg"
            onClick={() => navigate("/signup")}
            className="h-12 px-8 rounded-xl font-semibold shadow-xl shadow-primary/25 gap-2"
          >
            <Mic className="w-4 h-4" />
            <span>Launch Assistant</span>
          </Button>

          <Button
            string="magnetic"
            string-magnetic-strength="0.3"
            variant="outline"
            size="lg"
            onClick={toggleTheme}
            className="h-12 px-6 rounded-xl font-medium gap-2"
          >
            <Palette className="w-4 h-4 text-primary" />
            <span>Switch Theme ({isDark ? "Light" : "Dark"})</span>
          </Button>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* Interactive 3D Hero Mockup Container                        */}
        {/* ----------------------------------------------------------- */}
        <div className="relative w-full max-w-4xl perspective-[1200px]">
          {/* Main 3D Interactive Card */}
          <Card
            string="tilt"
            string-tilt-max="14"
            className="relative w-full rounded-3xl border-2 border-border/80 bg-card/85 backdrop-blur-2xl shadow-2xl p-6 sm:p-8 cursor-pointer overflow-hidden transition-all duration-300"
          >
            <div className="flex items-center justify-between pb-6 border-b border-border/60">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <Badge variant="secondary" className="font-mono text-xs">
                Status: Voice Interactive Active
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-6">
              {/* Left Column: 3D Assistant Portrait */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="absolute -inset-2 rounded-2xl bg-primary/25 blur-xl group-hover:bg-primary/40 transition-all duration-500" />
                  <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border-2 border-primary/50 shadow-xl bg-black/80">
                    <img
                      src={aiImg}
                      alt="Assistant Portrait"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                      <Badge variant="outline" className="bg-background/90 backdrop-blur-md px-3 py-1 gap-2 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[11px] font-bold tracking-wide uppercase">Listening...</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Conversational Voice Stream */}
              <div className="flex flex-col gap-4 text-left">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-foreground">Interactive Audio Core</h3>
                  <p className="text-xs text-muted-foreground">
                    Try hovering and tilting the frame in 3D space with your mouse.
                  </p>
                </div>

                <Card className="p-4 bg-background/60 border-border/60 rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                    <Radio className="w-3.5 h-3.5" />
                    <span>User Voice Command</span>
                  </div>
                  <p className="text-xs italic text-muted-foreground">
                    "Open YouTube and play calming lo-fi music."
                  </p>
                </Card>

                <Card className="p-4 bg-primary/10 border-primary/30 rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span>Assistant Intent Execution</span>
                  </div>
                  <p className="text-xs text-foreground font-medium">
                    "Opening YouTube and playing lo-fi chill beats for focus."
                  </p>
                </Card>

                {/* Animated Waveform */}
                <div className="flex items-center justify-center pt-2">
                  <img src={userImg} alt="Voice waveform" className="h-10 opacity-70" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Separator />

      {/* ------------------------------------------------------------- */}
      {/* 3D Avatars Showcase Section                                   */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <Badge variant="outline" className="mb-4 px-3 py-1 text-xs font-medium">
          Personalized Avatars
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Interactive 3D Persona Gallery
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-12">
          Each avatar card tilts in real-time 3D space with StringTune motion tracking.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {avatarShowcase.map((avatar, idx) => (
            <Card
              key={idx}
              string="tilt"
              string-tilt-max="16"
              className="group overflow-hidden rounded-2xl border border-border/80 bg-card/70 hover:border-primary/80 transition-all duration-300 hover:shadow-xl p-0 cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-black/60 relative">
                <img
                  src={avatar.img}
                  alt={avatar.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <p className="text-white text-sm font-bold">{avatar.name}</p>
                  <p className="text-white/70 text-[10px] font-medium">{avatar.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* ------------------------------------------------------------- */}
      {/* Features Grid Powered by shadcn Cards                         */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="outline" className="px-3 py-1 text-xs font-medium">
            Full-Stack Architecture
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Engineered for Precision & Fluidity
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Every layer from backend rate limiting to frontend shadcn components is architected for zero vulnerability and elite aesthetic appeal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                string="tilt"
                string-tilt-max="10"
                className="rounded-2xl border border-border/70 bg-card/60 hover:bg-card/90 transition-all duration-200 hover:shadow-lg p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="secondary" className="text-[11px] font-medium">
                      {item.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold mb-2">{item.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Call to Action Banner                                         */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <Card
          string="tilt"
          string-tilt-max="8"
          className="rounded-3xl border-2 border-primary/30 bg-gradient-to-r from-card/90 via-primary/5 to-card/90 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Ready to meet your Virtual Assistant?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Set up your custom persona, choose your wake word, and command your system with voice intelligence.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                string="magnetic"
                string-magnetic-strength="0.3"
                variant="default"
                size="lg"
                onClick={() => navigate("/signup")}
                className="rounded-xl px-8 h-12 font-semibold shadow-lg shadow-primary/25 gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Create Free Account</span>
              </Button>
              <Link to="/signin">
                <Button variant="outline" size="lg" className="rounded-xl h-12 px-6">
                  Sign In to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Footer                                                        */}
      {/* ------------------------------------------------------------- */}
      <footer className="border-t border-border/60 py-8 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Virtual Assistant AI Operating System</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/signin" className="hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="hover:text-foreground transition-colors">
              Register
            </Link>
            <a
              href="https://github.com/SWAGAT10241/Assistant"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
          <p>© {new Date().getFullYear()} Swagat Sourav Dhar. MIT License.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
