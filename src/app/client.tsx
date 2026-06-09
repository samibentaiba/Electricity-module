"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useHome } from "./hook";

export function ClientHome() {
  // Using the hook to adhere to the FSD architecture
  useHome();

    const topics = [
    {
      href: "/course/chapter-1",
      title: "Chapter 1: DC Circuits",
      description:
        "Master direct current fundamentals, Ohm's law, and Kirchhoff's laws through interactive lessons.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      href: "/course/chapter-2",
      title: "Chapter 2: AC Circuits",
      description:
        "Understand alternating current, waveforms, and complex impedances dynamically.",
      color: "from-green-500 to-emerald-400",
    },
    {
      href: "/simulations/freeform-studio",
      title: "Interactive Sandbox",
      description:
        "Build, visualize, and simulate electronic circuits in a freeform 2D environment.",
      color: "from-purple-500 to-fuchsia-400",
    },
    {
      href: "/calculators/equivalent-resistance",
      title: "Smart Calculators",
      description:
        "Easily compute equivalent resistance, voltage dividers, and color codes for resistors.",
      color: "from-amber-500 to-orange-400",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Hero Section */}
      <div className="space-y-6 relative">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4 backdrop-blur-md">
          <Sparkles size={16} /> Welcome to the future of learning
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
          Electronic <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-primary via-purple-400 to-cyan-400">
            Learning Hub
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-[700px] mx-auto font-light leading-relaxed">
          Your personal interactive space to master fundamental electricity, circuit analysis, and electronic components through real-time, dynamic visualizations.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mt-8 px-4 z-10">
        {topics.map((topic, idx) => (
          <Link
            href={topic.href}
            key={topic.href}
            className="group relative rounded-3xl border border-border/40 bg-background/40 backdrop-blur-xl p-8 hover:bg-background/60 transition-all duration-500 hover:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] hover:-translate-y-1 text-left overflow-hidden"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <div
              className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${topic.color} opacity-50 group-hover:opacity-100 transition-opacity`}
            />
            <h2 className="text-2xl font-bold mb-3 group-hover:text-foreground transition-colors">
              {topic.title}
            </h2>
            <p className="text-muted-foreground mb-8 text-lg font-light leading-relaxed">
              {topic.description}
            </p>
            <div
              className={`inline-flex items-center gap-2 font-semibold bg-clip-text text-transparent bg-gradient-to-r ${topic.color}`}
            >
              Start Exploring{" "}
              <ArrowRight
                size={18}
                className="text-current group-hover:translate-x-1 transition-transform"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
