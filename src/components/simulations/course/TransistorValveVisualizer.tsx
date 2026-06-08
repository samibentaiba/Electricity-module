"use client";

import { useState } from "react";

export function TransistorValveVisualizer() {
  const [baseCurrent, setBaseCurrent] = useState(0); // 0 to 50 uA
  
  const beta = 100;
  const collectorCurrent = baseCurrent * beta; // 0 to 5000 uA (5mA)
  
  // Calculate visual properties
  // Valve rotation: 0 degrees (closed) to 90 degrees (fully open)
  const valveRotation = (baseCurrent / 50) * 90;
  
  // Water flow speed: faster when there's more current
  const flowDuration = baseCurrent === 0 ? 0 : Math.max(0.1, 2 - (collectorCurrent / 5000) * 1.9);
  const baseFlowDuration = baseCurrent === 0 ? 0 : Math.max(0.5, 3 - (baseCurrent / 50) * 2.5);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
      {/* Controls */}
      <div className="p-6 bg-slate-800/50 md:w-1/3 flex flex-col justify-center space-y-6 border-b md:border-b-0 md:border-r border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">The Water Valve Analogy</h3>
          <p className="text-slate-400 text-sm">
            Adjust the Base Current (the knob). Notice how turning the knob just a tiny bit causes a massive rush of water from the Collector to the Emitter.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2 font-mono">
              <span className="text-slate-400">0 µA</span>
              <span className="text-amber-400 font-bold">I_B = {baseCurrent} µA</span>
              <span className="text-slate-400">50 µA</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={baseCurrent}
              onChange={(e) => setBaseCurrent(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-2">
            <div className="text-sm text-slate-400">Resulting Collector Current:</div>
            <div className="text-2xl font-mono font-bold text-blue-400">
              I_C = {collectorCurrent} µA
            </div>
            <div className="text-xs text-slate-500 font-mono">
              (I_C = {beta} × {baseCurrent})
            </div>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="p-8 md:w-2/3 flex items-center justify-center min-h-[400px] bg-slate-950 relative overflow-hidden">
        
        {/* The Pipe System */}
        <div className="relative w-64 h-80">
          
          {/* Main vertical pipe (Collector to Emitter) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-24 bg-slate-800 rounded-lg border-x-4 border-slate-600 overflow-hidden shadow-inner flex flex-col">
            
            {/* Top water (Collector) */}
            <div className="h-1/2 w-full bg-blue-500/80 relative overflow-hidden border-b-4 border-slate-900">
              <span className="absolute top-2 left-1/2 -translate-x-1/2 font-bold text-blue-950">Collector</span>
              
              {/* Animated water flow down */}
              {baseCurrent > 0 && (
                <div 
                  className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjUpIi8+PC9zdmc+')] opacity-50"
                  style={{ animation: `flowDown ${flowDuration}s linear infinite` }}
                ></div>
              )}
            </div>

            {/* Bottom water (Emitter) */}
            <div className="h-1/2 w-full bg-slate-900 relative overflow-hidden">
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-bold text-slate-500">Emitter</span>
              
              {/* The water filling the bottom when valve opens */}
              <div 
                className="absolute top-0 w-full bg-blue-500/80 transition-all duration-300 ease-out"
                style={{ height: baseCurrent > 0 ? '100%' : '0%' }}
              >
                {baseCurrent > 0 && (
                  <div 
                    className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjUpIi8+PC9zdmc+')] opacity-50"
                    style={{ animation: `flowDown ${flowDuration}s linear infinite` }}
                  ></div>
                )}
              </div>
            </div>
            
            {/* The Valve (controlled by Base) */}
            <div 
              className="absolute top-1/2 left-0 right-0 h-4 bg-amber-500 shadow-lg transform -translate-y-1/2 transition-transform duration-300 origin-left z-20 border-y border-amber-600"
              style={{ transform: `translateY(-50%) rotate(${-valveRotation}deg)` }}
            ></div>
          </div>

          {/* Horizontal pipe (Base) */}
          <div className="absolute top-1/2 -translate-y-1/2 right-[50%] ml-12 w-32 h-10 bg-slate-800 rounded-l-lg border-y-4 border-l-4 border-slate-600 overflow-hidden flex items-center justify-end z-10">
            <span className="absolute left-2 font-bold text-amber-500/50">Base</span>
            
            {/* Base water (small flow) */}
            <div 
              className="h-full bg-amber-500/80 transition-all duration-300"
              style={{ width: `${(baseCurrent / 50) * 100}%` }}
            >
              {baseCurrent > 0 && (
                <div 
                  className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjUpIi8+PC9zdmc+')] opacity-50"
                  style={{ animation: `flowLeft ${baseFlowDuration}s linear infinite` }}
                ></div>
              )}
            </div>
          </div>

        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes flowDown {
            from { background-position: 0 0; }
            to { background-position: 0 100px; }
          }
          @keyframes flowLeft {
            from { background-position: 0 0; }
            to { background-position: -100px 0; }
          }
        `}} />

      </div>
    </div>
  );
}
