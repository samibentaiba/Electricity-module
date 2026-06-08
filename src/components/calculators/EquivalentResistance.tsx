"use client";

import { useState } from "react";
import Latex from "react-latex-next";
import { Slider } from "@/components/ui/slider";
import { calculateEquivalentResistance } from "@/lib/circuit-utils";

export function EquivalentResistance() {
  const [r1, setR1] = useState(10);
  const [r2, setR2] = useState(10);
  const [mode, setMode] = useState<"series" | "parallel">("series");

  const req = calculateEquivalentResistance(r1, r2, mode);

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      
      {/* Mode Selector */}
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => setMode("series")}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${mode === "series" ? "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" : "bg-slate-800 hover:bg-slate-700"} ${mode === "series" ? "text-slate-950" : "text-slate-400"}`}
        >
          Series Connection
        </button>
        <button 
          onClick={() => setMode("parallel")}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${mode === "parallel" ? "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" : "bg-slate-800 hover:bg-slate-700"} ${mode === "parallel" ? "text-white" : "text-slate-400"}`}
        >
          Parallel Connection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Visual Circuit */}
        <div className="bg-slate-950 p-8 rounded-2xl flex justify-center items-center relative overflow-hidden border border-border/50 shadow-inner h-[300px]">
           <h3 className="absolute top-4 left-4 font-bold text-slate-400 text-sm tracking-wider uppercase z-10">Schematic</h3>
           
           <div className="relative w-full h-full flex items-center justify-center">
             {mode === "series" ? (
               <div className="flex items-center">
                 <div className="w-8 h-1 bg-slate-400" />
                 <div className="relative w-16 h-6 bg-slate-950 border-4 border-amber-500 rounded flex items-center justify-center">
                    <span className="absolute -top-6 text-amber-500 font-bold">{r1}Ω</span>
                 </div>
                 <div className="w-8 h-1 bg-slate-400" />
                 <div className="relative w-16 h-6 bg-slate-950 border-4 border-amber-500 rounded flex items-center justify-center">
                    <span className="absolute -top-6 text-amber-500 font-bold">{r2}Ω</span>
                 </div>
                 <div className="w-8 h-1 bg-slate-400" />
               </div>
             ) : (
               <div className="relative w-48 h-32 flex flex-col justify-between items-center">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-400" />
                 <div className="absolute right-0 top-0 bottom-0 w-1 bg-slate-400" />
                 
                 <div className="w-full flex items-center justify-between mt-2">
                    <div className="w-10 h-1 bg-slate-400" />
                    <div className="relative w-16 h-6 bg-slate-950 border-4 border-indigo-500 rounded flex items-center justify-center">
                       <span className="absolute -top-6 text-indigo-400 font-bold">{r1}Ω</span>
                    </div>
                    <div className="w-10 h-1 bg-slate-400" />
                 </div>

                 <div className="w-full flex items-center justify-between mb-2">
                    <div className="w-10 h-1 bg-slate-400" />
                    <div className="relative w-16 h-6 bg-slate-950 border-4 border-indigo-500 rounded flex items-center justify-center">
                       <span className="absolute -top-6 text-indigo-400 font-bold">{r2}Ω</span>
                    </div>
                    <div className="w-10 h-1 bg-slate-400" />
                 </div>

                 {/* Connection wires to the outside */}
                 <div className="absolute left-0 top-1/2 w-8 h-1 bg-slate-400 -translate-x-full" />
                 <div className="absolute right-0 top-1/2 w-8 h-1 bg-slate-400 translate-x-full" />
               </div>
             )}
           </div>
        </div>

        {/* Adjustments & Results */}
        <div className="flex flex-col gap-6 bg-muted/30 p-6 rounded-xl border border-border/50 justify-center">
           <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-300">Resistor 1 (R1)</label>
                <span className="font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded text-sm">{r1} Ω</span>
              </div>
              <Slider min={1} max={100} step={1} value={[r1]} onValueChange={(val) => setR1((Array.isArray(val) ? val[0] : val))} />
           </div>

           <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-300">Resistor 2 (R2)</label>
                <span className="font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded text-sm">{r2} Ω</span>
              </div>
              <Slider min={1} max={100} step={1} value={[r2]} onValueChange={(val) => setR2((Array.isArray(val) ? val[0] : val))} />
           </div>

           <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold mb-4 text-center">Equivalent Resistance</p>
              <div className="text-center text-4xl font-black text-primary mb-4">
                 {req.toFixed(2)} Ω
              </div>
              <div className="text-center">
                {mode === "series" ? (
                  <Latex>{`$$ R_{eq} = R_1 + R_2 = ${r1} + ${r2} = ${req.toFixed(2)}\\Omega $$`}</Latex>
                ) : (
                  <Latex>{`$$ R_{eq} = \\frac{R_1 R_2}{R_1 + R_2} = \\frac{${r1} \\times ${r2}}{${r1} + ${r2}} = ${req.toFixed(2)}\\Omega $$`}</Latex>
                )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
