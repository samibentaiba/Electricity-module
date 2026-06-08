"use client";

import { useState } from "react";
import { Brain, GraduationCap } from "lucide-react";

interface ExerciseSolverProps {
  title: string;
  statement: React.ReactNode;
  aiExplanation: React.ReactNode;
  examSolution: React.ReactNode;
  visualization?: React.ReactNode;
}

export function ExerciseSolver({ title, statement, aiExplanation, examSolution, visualization }: ExerciseSolverProps) {
  const [view, setView] = useState<"ai" | "exam">("ai");

  return (
    <div className="w-full border border-border/50 rounded-2xl overflow-hidden bg-background shadow-sm animate-in fade-in duration-500">
      
      {/* Exercise Statement Header */}
      <div className="bg-muted/30 p-4 md:p-6 border-b border-border/50">
        <h3 className="text-xl font-bold text-primary mb-4">{title}</h3>
        <div className="text-lg prose prose-slate dark:prose-invert max-w-none">
          {statement}
        </div>
      </div>

      {/* Toggle Bar */}
      <div className="bg-background p-4 border-b border-border/50 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setView("ai")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
            view === "ai" 
              ? "bg-indigo-500/20 text-indigo-500 border border-indigo-500/50 shadow-sm" 
              : "bg-muted/50 text-muted-foreground hover:bg-muted"
          }`}
        >
          <Brain className="w-5 h-5" />
          AI Explained & Interactive Simulation
        </button>

        <button
          onClick={() => setView("exam")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
            view === "exam" 
              ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/50 shadow-sm" 
              : "bg-muted/50 text-muted-foreground hover:bg-muted"
          }`}
        >
          <GraduationCap className="w-5 h-5" />
          Formal Exam Solution
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 md:p-8 min-h-[400px]">
        {view === "ai" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
            <div>
              {aiExplanation}
            </div>
            {visualization && (
              <div className="pt-8 border-t border-border/50">
                {visualization}
              </div>
            )}
          </div>
        )}
        
        {view === "exam" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 bg-background border-l-4 border-emerald-500 rounded-r-xl shadow-sm">
              {examSolution}
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}
