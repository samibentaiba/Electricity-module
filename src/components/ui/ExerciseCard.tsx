"use client";

import { useState, ReactNode } from "react";
import { Brain, GraduationCap, ImageIcon, MonitorPlay, FileCheck2 } from "lucide-react";

interface ExerciseCardProps {
  title?: string;
  problem: ReactNode;
  formalSolution?: ReactNode;
  aiExplanation?: ReactNode;
  diagramImageSrc?: string;
  solutionImageSrc?: string;
  // Fallback for backwards compatibility
  solution?: ReactNode;
  // Source of this exercise (e.g., external resource, internal)
  source?: string;
}

export function ExerciseCard({ title = "Exercise", problem, formalSolution, aiExplanation, diagramImageSrc, solutionImageSrc, solution, source }: ExerciseCardProps) {
  // Determine available modes
  const hasAI = !!aiExplanation;
  const hasFormal = !!formalSolution || !!solution;
  const hasDiagram = !!diagramImageSrc;
  const hasSolutionDiagram = !!solutionImageSrc;

  // Default mode: prefer AI if available, otherwise formal, otherwise diagram, then solution diagram
  const [mode, setMode] = useState<'ai' | 'formal' | 'diagram' | 'solution-diagram'>(
    hasAI ? 'ai' : hasFormal ? 'formal' : hasDiagram ? 'diagram' : 'solution-diagram'
  );

  // Fallbacks if only 'solution' is passed
  const displayFormal = formalSolution || solution;
  const displayAI = aiExplanation;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl mb-8">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-1 items-center space-x-2">
            <h3 className="text-xl font-bold text-slate-100">{title}</h3>
            {source && (
              <span className="text-xs font-medium bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                {source}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="text-lg text-slate-300 mb-8">
        {problem}
      </div>

      {/* Mode Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-4">
        {hasAI && (
          <button
            onClick={() => setMode('ai')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'ai'
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                : 'bg-slate-900 text-slate-500 border border-slate-800 hover:bg-slate-800 hover:text-slate-300'
            }`}
          >
            <MonitorPlay className="w-4 h-4" />
            AI Explained & Interactive Simulation
          </button>
        )}
        {hasFormal && (
          <button
            onClick={() => setMode('formal')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'formal'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                : 'bg-slate-900 text-slate-500 border border-slate-800 hover:bg-slate-800 hover:text-slate-300'
            }`}
          >
            <GraduationCap size={18} />
            Formal Exam Solution
          </button>
        )}
        {hasDiagram && (
          <button
            onClick={() => setMode('diagram')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'diagram'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-lg shadow-purple-500/10'
                : 'bg-slate-900 text-slate-500 border border-slate-800 hover:bg-slate-800 hover:text-slate-300'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Reference Diagram
          </button>
        )}
        {hasSolutionDiagram && (
          <button
            onClick={() => setMode('solution-diagram')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'solution-diagram'
                ? 'bg-pink-500/20 text-pink-400 border border-pink-500/50 shadow-lg shadow-pink-500/10'
                : 'bg-slate-900 text-slate-500 border border-slate-800 hover:bg-slate-800 hover:text-slate-300'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            Solution Diagram
          </button>
        )}
      </div>

      {/* Mode Content */}
      {mode === 'ai' && displayAI && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-slate-950/50 p-6 rounded-xl border border-indigo-500/20">
          {displayAI}
        </div>
      )}

      {mode === 'formal' && displayFormal && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-slate-950/50 p-6 rounded-xl border border-emerald-500/20">
          <div className="text-lg text-slate-300">
            {displayFormal}
          </div>
        </div>
      )}

      {mode === 'diagram' && hasDiagram && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-slate-950/50 p-6 rounded-xl border border-purple-500/20 flex justify-center">
          <img src={diagramImageSrc} alt="Reference diagram" className="max-w-full h-auto object-contain rounded" />
        </div>
      )}

      {mode === 'solution-diagram' && hasSolutionDiagram && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-slate-950/50 p-6 rounded-xl border border-pink-500/20 flex justify-center">
          <img src={solutionImageSrc} alt="Solution diagram" className="max-w-full h-auto object-contain rounded" />
        </div>
      )}
    </div>
  );
}
