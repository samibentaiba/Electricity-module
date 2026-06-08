"use client";

import { useState, ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExerciseCardProps {
  title?: string;
  problem: ReactNode;
  solution: ReactNode;
  simulation?: ReactNode;
}

export function ExerciseCard({ title = "Exercise", problem, solution, simulation }: ExerciseCardProps) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="rounded-2xl border border-border/50 bg-background/50 p-4 md:p-6 shadow-sm mb-8 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-primary">{title}</h3>
      </div>
      
      <div className="text-lg mb-6">
        {problem}
      </div>
      
      {simulation && (
        <div className="my-6 w-full">
          {simulation}
        </div>
      )}

      <button 
        onClick={() => setShowSolution(!showSolution)}
        className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors bg-muted/50 px-4 py-2 rounded-lg"
      >
        {showSolution ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        {showSolution ? "Hide Solution" : "Reveal Solution"}
      </button>

      {showSolution && (
        <div className="mt-4 md:mt-6 p-4 md:p-6 rounded-xl border border-primary/20 bg-primary/5 animate-in slide-in-from-top-2 fade-in duration-300">
          <h4 className="font-semibold text-primary mb-2">Solution:</h4>
          <div className="text-lg">
            {solution}
          </div>
        </div>
      )}
    </div>
  );
}
