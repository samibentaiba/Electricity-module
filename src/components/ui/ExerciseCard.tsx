"use client";

import { useState, ReactNode } from "react";
import { Brain, GraduationCap } from "lucide-react";

interface ExerciseCardProps {
  title?: string;
  problem: ReactNode;
  formalSolution?: ReactNode;
  aiExplanation?: ReactNode;
  // Fallback for backwards compatibility
  solution?: ReactNode; 
}

export function ExerciseCard({ title = "Exercise", problem, formalSolution, aiExplanation, solution }: ExerciseCardProps) {
  // If aiExplanation exists, default to 'ai', otherwise default to 'formal'
  const [activeTab, setActiveTab] = useState<'ai' | 'formal'>(aiExplanation ? 'ai' : 'formal');

  // Fallbacks if only 'solution' is passed
  const displayFormal = formalSolution || solution;
  const displayAI = aiExplanation;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl mb-8 overflow-hidden">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        </div>
      )}
      
      <div className="text-lg text-slate-300 mb-8">
        {problem}
      </div>
      
      {(displayAI || displayFormal) && (
        <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-4">
          {displayAI && (
            <button 
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'ai' 
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50 shadow-lg shadow-indigo-500/10' 
                  : 'bg-slate-900 text-slate-500 border border-slate-800 hover:bg-slate-800 hover:text-slate-300'
              }`}
            >
              <Brain size={18} />
              AI Explained & Interactive Simulation
            </button>
          )}
          {displayFormal && (
            <button 
              onClick={() => setActiveTab('formal')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'formal' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-lg shadow-emerald-500/10' 
                  : 'bg-slate-900 text-slate-500 border border-slate-800 hover:bg-slate-800 hover:text-slate-300'
              }`}
            >
              <GraduationCap size={18} />
              Formal Exam Solution
            </button>
          )}
        </div>
      )}

      {displayAI && activeTab === 'ai' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-slate-950/50 p-6 rounded-xl border border-indigo-500/20">
          {displayAI}
        </div>
      )}

      {displayFormal && activeTab === 'formal' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-slate-950/50 p-6 rounded-xl border border-emerald-500/20">
          <div className="text-lg text-slate-300">
            {displayFormal}
          </div>
        </div>
      )}
    </div>
  );
}
