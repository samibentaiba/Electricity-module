"use client";

import { useState, ReactNode } from "react";
import { MonitorPlay, ImageIcon } from "lucide-react";

interface LearningChunkProps {
  title?: string;
  simulation: ReactNode;
  imageSrc: string;
  imageAlt?: string;
  explanation: ReactNode;
}

export function LearningChunk({ title, simulation, imageSrc, imageAlt = "Diagram", explanation }: LearningChunkProps) {
  const [mode, setMode] = useState<"interactive" | "diagram">("interactive");

  return (
    <div className="w-full flex flex-col gap-4 my-8">
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      )}
      
      {/* Toggle */}
      <div className="flex items-center bg-slate-900/50 p-1 rounded-lg w-fit border border-slate-800">
        <button
          onClick={() => setMode("interactive")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            mode === "interactive" 
              ? "bg-slate-800 text-white shadow-sm" 
              : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
          }`}
        >
          <MonitorPlay className="w-4 h-4" />
          Interactive Simulation
        </button>
        <button
          onClick={() => setMode("diagram")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            mode === "diagram" 
              ? "bg-slate-800 text-white shadow-sm" 
              : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Static Diagram & Theory
        </button>
      </div>

      {/* Content */}
      <div className="relative w-full rounded-2xl border border-slate-800 bg-slate-950/50">
        {mode === "interactive" ? (
          <div className="w-full animate-in fade-in zoom-in-95 duration-200">
            {simulation}
          </div>
        ) : (
          <div className="w-full flex flex-col lg:flex-row gap-8 p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="lg:w-1/2 flex items-center justify-center bg-slate-900 rounded-xl overflow-hidden p-4 border border-slate-800">
              {/* Fallback to simple img tag for broader compatibility */}
              <img src={imageSrc} alt={imageAlt} className="w-full h-auto object-contain rounded" />
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center prose prose-invert">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 h-full">
                {explanation}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
