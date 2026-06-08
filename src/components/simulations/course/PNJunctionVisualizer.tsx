"use client";

import { useState, useEffect } from "react";

export function PNJunctionVisualizer() {
  const [biasVoltage, setBiasVoltage] = useState(0); // -5V to +1V

  // Calculate depletion region width (0 to 100 percentage of the center)
  // At 0V, width is 20%. 
  // At -5V, width is 80%.
  // At +0.7V, width is 0%.
  
  let depletionWidth = 20;
  let isConducting = false;

  if (biasVoltage < 0) {
    // Reverse bias: expands
    depletionWidth = 20 + (Math.abs(biasVoltage) / 5) * 60;
  } else if (biasVoltage >= 0 && biasVoltage < 0.7) {
    // Forward bias, below threshold: shrinks
    depletionWidth = 20 - (biasVoltage / 0.7) * 20;
  } else if (biasVoltage >= 0.7) {
    // Forward bias, conducting: disappears
    depletionWidth = 0;
    isConducting = true;
  }

  // We'll generate 20 carriers to scatter around
  const carriers = Array.from({ length: 20 }, (_, i) => i);

  // Pre-calculate random positions and animation durations for stable renders
  const [holeAnimations] = useState<{top: string, left: string, duration: number}[]>(() =>
    Array.from({ length: 5 }, () => ({
      top: `${20 + Math.random() * 60}%`,
      left: `${Math.random() * 100}%`,
      duration: 1 + Math.random()
    }))
  );
  const [electronAnimations] = useState<{top: string, right: string, duration: number}[]>(() =>
    Array.from({ length: 5 }, () => ({
      top: `${20 + Math.random() * 60}%`,
      right: `${Math.random() * 100}%`,
      duration: 1 + Math.random()
    }))
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
      {/* Controls */}
      <div className="p-6 bg-slate-800/50 md:w-1/3 flex flex-col justify-center space-y-6 border-b md:border-b-0 md:border-r border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">PN Junction Bias</h3>
          <p className="text-slate-400 text-sm">
            Adjust the voltage to see how the depletion region (the &quot;dead zone&quot;) reacts. Forward bias shrinks it, reverse bias expands it.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2 font-mono">
              <span className="text-slate-400">Reverse (-5V)</span>
              <span className={biasVoltage >= 0.7 ? "text-emerald-400 font-bold" : "text-white"}>{biasVoltage.toFixed(1)}V</span>
              <span className="text-slate-400">Forward (+1V)</span>
            </div>
            <input
              type="range"
              min="-5"
              max="1"
              step="0.1"
              value={biasVoltage}
              onChange={(e) => setBiasVoltage(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <div className="text-sm text-slate-400 mb-1">State:</div>
            {biasVoltage === 0 && <div className="text-lg font-bold text-amber-500">Zero Bias</div>}
            {biasVoltage < 0 && <div className="text-lg font-bold text-red-400">Reverse Bias (Blocked)</div>}
            {biasVoltage > 0 && biasVoltage < 0.7 && <div className="text-lg font-bold text-yellow-400">Forward Bias (Sub-threshold)</div>}
            {biasVoltage >= 0.7 && <div className="text-lg font-bold text-emerald-400 animate-pulse">Conducting!</div>}
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="p-8 md:w-2/3 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden bg-slate-950">
        
        {/* Battery / Wire path */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-full h-[200px] border-4 border-slate-500 rounded-lg absolute"></div>
        </div>

        {/* The Semiconductor Block */}
        <div className="relative w-full max-w-[400px] h-32 flex rounded-lg overflow-hidden border-2 border-slate-600 shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-slate-800">
          
          {/* P-Type (Left) */}
          <div className="flex-1 bg-blue-900/50 relative overflow-hidden flex items-center justify-center border-r border-blue-800/30">
            <span className="absolute top-2 left-2 font-bold text-blue-300">P-Type</span>
            
            {/* Holes (Empty circles) */}
            <div className="absolute inset-0 flex flex-wrap gap-2 p-4 content-center justify-center opacity-40">
              {carriers.map(i => (
                <div key={`h-${i}`} className="w-3 h-3 rounded-full border-2 border-blue-400"></div>
              ))}
            </div>

            {/* Conducting Animation (Holes moving right) */}
            {isConducting && (
              <div className="absolute inset-0">
                {carriers.slice(0, 5).map((i, index) => (
                  <div 
                    key={`h-anim-${i}`} 
                    className="absolute w-3 h-3 rounded-full border-2 border-blue-400"
                    style={{
                      top: holeAnimations[index]?.top,
                      left: holeAnimations[index]?.left,
                      animation: `moveRight ${holeAnimations[index]?.duration}s linear infinite`
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>

          {/* Depletion Region (Center) */}
          <div 
            className="h-full bg-slate-700/80 border-x-2 border-slate-500/50 transition-all duration-300 ease-out flex items-center justify-center z-10"
            style={{ width: `${depletionWidth}%` }}
          >
            {depletionWidth > 5 && (
              <span className="text-xs font-bold text-slate-400 rotate-90 md:rotate-0 whitespace-nowrap">Depletion Region</span>
            )}
          </div>

          {/* N-Type (Right) */}
          <div className="flex-1 bg-red-900/50 relative overflow-hidden flex items-center justify-center border-l border-red-800/30">
            <span className="absolute top-2 right-2 font-bold text-red-300">N-Type</span>

            {/* Electrons (Filled circles) */}
            <div className="absolute inset-0 flex flex-wrap gap-2 p-4 content-center justify-center opacity-40">
              {carriers.map(i => (
                <div key={`e-${i}`} className="w-3 h-3 rounded-full bg-red-400"></div>
              ))}
            </div>

            {/* Conducting Animation (Electrons moving left) */}
            {isConducting && (
              <div className="absolute inset-0">
                {carriers.slice(0, 5).map((i, index) => (
                  <div 
                    key={`e-anim-${i}`} 
                    className="absolute w-3 h-3 rounded-full bg-red-400"
                    style={{
                      top: electronAnimations[index]?.top,
                      right: electronAnimations[index]?.right,
                      animation: `moveLeft ${electronAnimations[index]?.duration}s linear infinite`
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CSS Animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes moveRight {
            0% { transform: translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(300px); opacity: 0; }
          }
          @keyframes moveLeft {
            0% { transform: translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(-300px); opacity: 0; }
          }
        `}} />

      </div>
    </div>
  );
}
