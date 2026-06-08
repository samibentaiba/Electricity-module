"use client";

import React, { useState } from "react";
import { Mafs, Coordinates, Plot, Theme, Line } from "mafs";
import "mafs/core.css";
import "mafs/font.css";

export function RectifierVisualizer() {
  const [rectifierType, setRectifierType] = useState<"half" | "full">("half");
  
  // Frequency and amplitude for the input AC signal
  const frequency = 1;
  const amplitude = 3;

  // Input signal: V_in(t) = A * sin(2 * pi * f * t)
  const inputSignal = (t: number) => amplitude * Math.sin(2 * Math.PI * frequency * t);

  // Output signal based on rectifier type
  const outputSignal = (t: number) => {
    const vin = inputSignal(t);
    if (rectifierType === "half") {
      // Half-wave: only positive half-cycles pass through
      return Math.max(0, vin);
    } else {
      // Full-wave: negative half-cycles are inverted
      return Math.abs(vin);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100 m-0 uppercase tracking-wider">Rectification Visualizer</h3>
          <p className="text-slate-400 text-sm mt-1">Observe how a diode converts AC into DC</p>
        </div>
        
        <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
          <button
            onClick={() => setRectifierType("half")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              rectifierType === "half" 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            Half-Wave
          </button>
          <button
            onClick={() => setRectifierType("full")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              rectifierType === "full" 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            Full-Wave
          </button>
        </div>
      </div>

      <div className="p-6 relative">
        <div className="h-[400px] w-full rounded-xl overflow-hidden bg-black/40 border border-slate-800/50">
          <Mafs viewBox={{ x: [0, 4], y: [-4, 4] }} preserveAspectRatio={false}>
            <Coordinates.Cartesian 
               xAxis={{ lines: 1, labels: (x) => `${x}s` }} 
               yAxis={{ lines: 1, labels: (y) => `${y}V` }} 
            />
            
            {/* Input Signal (Ghosted/Dashed) */}
            <Plot.OfX 
               y={inputSignal} 
               color={Theme.blue} 
               weight={2}
               opacity={0.3}
               style="dashed"
            />

            {/* Output Signal (Solid) */}
            <Plot.OfX 
               y={outputSignal} 
               color={rectifierType === "half" ? Theme.orange : Theme.green} 
               weight={4} 
            />

            {/* Baseline */}
            <Line.Segment point1={[0, 0]} point2={[4, 0]} color={Theme.foreground} weight={1} opacity={0.5} />
          </Mafs>
        </div>

        {/* Legend */}
        <div className="absolute top-10 right-10 bg-slate-900/90 backdrop-blur border border-slate-700 p-4 rounded-xl shadow-xl">
           <div className="flex items-center gap-3 mb-2">
             <div className="w-6 h-0.5 border-b-2 border-dashed border-blue-400/50" />
             <span className="text-sm font-medium text-slate-300">Input AC Voltage</span>
           </div>
           <div className="flex items-center gap-3">
             <div className={`w-6 h-1 rounded-full ${rectifierType === "half" ? "bg-orange-500" : "bg-emerald-500"}`} />
             <span className="text-sm font-medium text-slate-300">Output Rectified Voltage</span>
           </div>
        </div>
      </div>
    </div>
  );
}
