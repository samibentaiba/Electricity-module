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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col relative max-h-[calc(100vh-6rem)] min-h-[500px]">

      {/* Header */}
      <div className="shrink-0 bg-slate-50 border-b border-slate-200 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-t-2xl">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        </div>
        <div className="text-lg text-slate-700 prose prose-slate dark:prose-invert max-w-none">
          {statement}
        </div>
      </div>

      {/* Toggle Bar */}
      <div className="shrink-0 bg-white p-4 border-b border-slate-200 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setView("ai")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
            view === "ai"
              ? "bg-indigo-500/20 text-indigo-500 border border-indigo-500/50 shadow-sm"
              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
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
              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <GraduationCap className="w-5 h-5" />
          Formal Exam Solution
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {view === "ai" && (
            <div className="space-y-8">
              {/* Question Section */}
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4">AI Explanation</h4>
                <div className="text-slate-700">
                  {aiExplanation}
                </div>
              </div>

              {visualization && (
                <div className="pt-8 border-t border-slate-200">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Interactive Simulation</h4>
                  {visualization}
                </div>
              )}
            </div>
          )}

          {view === "exam" && (
            <div>
              <div className="p-6 bg-slate-50 border-l-4 border-emerald-500 rounded-r-xl shadow-sm">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Exam Solution</h4>
                <div className="text-slate-700">
                  {examSolution}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 sticky bottom-0 z-20 bg-slate-50 border-t border-slate-200 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 rounded-b-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="text-sm font-medium text-slate-500">
          {view === "ai" ? "AI-powered learning mode" : "Formal exam preparation"}
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors">
            Previous Step
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            {view === "ai" ? "Check Answer" : "Next Question"}
          </button>
        </div>
      </div>

    </div>
  );
}