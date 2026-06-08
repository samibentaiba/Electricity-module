"use client";

import { useState } from "react";
import { Mafs, Coordinates, Plot, Theme, Text } from "mafs";
import Latex from "react-latex-next";

export function ACWaveformsVisualizer() {
  const [amplitude, setAmplitude] = useState(5); // V
  const [frequency, setFrequency] = useState(1); // Hz
  const [phase, setPhase] = useState(0); // Degrees

  // Convert phase to radians
  const phaseRad = (phase * Math.PI) / 180;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        
        {/* Interactive Waveform Plot */}
        <div className="rounded-2xl border border-border/50 bg-background/50 flex flex-col items-center justify-center shadow-sm overflow-hidden h-[400px] relative w-full lg:col-span-2">
           <h3 className="absolute top-4 left-4 font-bold text-slate-400 text-sm tracking-wider uppercase z-10">V(t) Waveform</h3>
           <Mafs height={400} viewBox={{ y: [-10, 10], x: [0, 5] }} preserveAspectRatio={false}>
            <Coordinates.Cartesian 
               subdivisions={2} 
               xAxis={{ lines: 1, labels: (x) => x % 1 === 0 ? `\${x}s` : "" }} 
               yAxis={{ lines: 2, labels: (y) => y % 2 === 0 ? `\${y}V` : "" }} 
            />
            
            {/* The sine wave */}
            <Plot.OfX 
               y={(t) => amplitude * Math.sin(2 * Math.PI * frequency * t + phaseRad)} 
               color={Theme.violet} 
               weight={3} 
            />

            {/* RMS Line */}
            <Plot.OfX
               y={() => amplitude * 0.707}
               color={Theme.blue}
               weight={1}
               style="dashed"
            />
            <Plot.OfX
               y={() => -amplitude * 0.707}
               color={Theme.blue}
               weight={1}
               style="dashed"
            />
            <Text x={0.2} y={amplitude * 0.707 + 0.5} color={Theme.blue} size={12}>+RMS</Text>
            <Text x={0.2} y={-amplitude * 0.707 - 1} color={Theme.blue} size={12}>-RMS</Text>

          </Mafs>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-xl border border-border/50">
        <div className="flex flex-col gap-6">
          <h3 className="font-bold text-lg">Adjust Parameters</h3>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-purple-400">Amplitude (<Latex>{`$V_{peak}$`}</Latex>)</label>
              <span className="font-mono bg-purple-500/10 text-purple-400 px-2 py-1 rounded text-sm">{amplitude} V</span>
            </div>
            <input 
              type="range" min="1" max="10" step="0.5" 
              value={amplitude} 
              onChange={(e) => setAmplitude(parseFloat(e.target.value))} 
              className="accent-purple-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-emerald-400">Frequency (f)</label>
              <span className="font-mono bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-sm">{frequency} Hz</span>
            </div>
            <input 
              type="range" min="0.1" max="5" step="0.1" 
              value={frequency} 
              onChange={(e) => setFrequency(parseFloat(e.target.value))} 
              className="accent-emerald-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-amber-400">Phase (<Latex>{`$\\phi$`}</Latex>)</label>
              <span className="font-mono bg-amber-500/10 text-amber-400 px-2 py-1 rounded text-sm">{phase}°</span>
            </div>
            <input 
              type="range" min="-180" max="180" step="15" 
              value={phase} 
              onChange={(e) => setPhase(parseFloat(e.target.value))} 
              className="accent-amber-400 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" 
            />
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center font-mono text-xl border-l border-border/50 pl-6">
          <div className="text-center mb-6 space-y-4">
             <div className="text-sm text-muted-foreground uppercase tracking-wider font-sans font-bold">Equation</div>
             <Latex>{`$$ V(t) = ${amplitude} \\sin(2\\pi (${frequency}) t + ${phase}^\\circ) $$`}</Latex>
             <div className="pt-2 text-sm text-blue-400">
                <Latex>{`$$ V_{rms} = \\frac{${amplitude}}{\\sqrt{2}} \\approx ${(amplitude * 0.707).toFixed(2)}\\text{ V} $$`}</Latex>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
