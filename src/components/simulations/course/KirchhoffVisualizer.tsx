"use client";

import { useState } from "react";
import Latex from "react-latex-next";
import { Slider } from "@/components/ui/slider";
import { solveKirchhoff2Loop } from "@/lib/circuit-utils";

export function KirchhoffVisualizer() {
  const [V1, setV1] = useState(10);
  const [V2, setV2] = useState(5);
  const [R1, setR1] = useState(10);
  const [R2, setR2] = useState(20);
  const [R3, setR3] = useState(40);

  const { I1, I2, I3 } = solveKirchhoff2Loop(V1, V2, R1, R2, R3);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Interactive Circuit Schematic */}
        <div className="rounded-2xl border border-border/50 bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden shadow-inner min-h-[350px]">
          <h3 className="absolute top-4 left-4 font-bold text-slate-400 text-sm tracking-wider uppercase z-10">2-Loop Circuit</h3>
          
          <div className="relative w-full max-w-sm aspect-4/3 border-4 border-slate-700 rounded-xl mt-6">
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-slate-700 -translate-x-1/2" />
            
            {/* V1 Battery */}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 w-16 h-16 flex flex-col items-center justify-center gap-1.5 z-10">
               <div className="absolute -top-1 left-2 text-amber-500 font-bold text-lg leading-none">+</div>
               <div className="w-10 h-1 bg-amber-500 rounded-full" />
               <div className="w-5 h-2 bg-amber-500 rounded-full" />
               <div className="absolute -bottom-1 left-2 text-amber-500 font-bold text-lg leading-none">-</div>
               <div className="absolute -left-12 text-amber-500 font-bold text-sm whitespace-nowrap">V1={V1}V</div>
            </div>

            {/* V2 Battery */}
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-slate-950 w-16 h-16 flex flex-col items-center justify-center gap-1.5 z-10">
               <div className="absolute -top-1 right-2 text-emerald-500 font-bold text-lg leading-none">+</div>
               <div className="w-10 h-1 bg-emerald-500 rounded-full" />
               <div className="w-5 h-2 bg-emerald-500 rounded-full" />
               <div className="absolute -bottom-1 right-2 text-emerald-500 font-bold text-lg leading-none">-</div>
               <div className="absolute -right-12 text-emerald-500 font-bold text-sm whitespace-nowrap">V2={V2}V</div>
            </div>

            {/* R1 Resistor */}
            <div className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-1/2 bg-slate-950 w-16 h-8 flex items-center justify-center">
              <div className="w-16 h-4 bg-indigo-500 rounded-full" />
              <div className="absolute -top-6 text-indigo-400 font-bold">R1={R1}Ω</div>
              <div className="absolute top-6 text-red-400 text-xs font-bold">I₁={I1.toFixed(2)}A →</div>
            </div>

            {/* R2 Resistor */}
            <div className="absolute top-0 right-1/4 translate-x-1/2 -translate-y-1/2 bg-slate-950 w-16 h-8 flex items-center justify-center">
              <div className="w-16 h-4 bg-purple-500 rounded-full" />
              <div className="absolute -top-6 text-purple-400 font-bold">R2={R2}Ω</div>
              <div className="absolute top-6 text-red-400 text-xs font-bold">← I₂={I2.toFixed(2)}A</div>
            </div>

            {/* R3 Resistor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 w-8 h-16 flex flex-col items-center justify-center">
              <div className="w-4 h-16 bg-pink-500 rounded-full" />
              <div className="absolute -right-14 text-pink-400 font-bold">R3={R3}Ω</div>
              <div className="absolute -left-20 text-red-400 text-xs font-bold">↓ I₃={I3.toFixed(2)}A</div>
            </div>

            <div className="absolute top-0 left-1/2 w-3 h-3 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_red]" />
            <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_10px_blue]" />
          </div>
        </div>

        {/* Adjust Parameters */}
        <div className="flex flex-col gap-4 bg-muted/30 p-6 rounded-xl border border-border/50">
          <h3 className="font-bold text-lg">Circuit Parameters</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
             <div className="flex flex-col gap-1">
               <label className="text-xs font-semibold text-amber-500">V1 (Volts)</label>
               <Slider min={0} max={24} step={1} value={[V1]} onValueChange={val => setV1((Array.isArray(val) ? val[0] : val))} className="**:data-[slot=slider-range]:bg-amber-500 **:data-[slot=slider-thumb]:ring-amber-500" />
             </div>
             <div className="flex flex-col gap-1">
               <label className="text-xs font-semibold text-emerald-500">V2 (Volts)</label>
               <Slider min={0} max={24} step={1} value={[V2]} onValueChange={val => setV2((Array.isArray(val) ? val[0] : val))} className="**:data-[slot=slider-range]:bg-emerald-500 **:data-[slot=slider-thumb]:ring-emerald-500" />
             </div>
             <div className="flex flex-col gap-1">
               <label className="text-xs font-semibold text-indigo-400">R1 (Ohms)</label>
               <Slider min={1} max={100} step={1} value={[R1]} onValueChange={val => setR1((Array.isArray(val) ? val[0] : val))} className="**:data-[slot=slider-range]:bg-indigo-500 **:data-[slot=slider-thumb]:ring-indigo-500" />
             </div>
             <div className="flex flex-col gap-1">
               <label className="text-xs font-semibold text-purple-400">R2 (Ohms)</label>
               <Slider min={1} max={100} step={1} value={[R2]} onValueChange={val => setR2((Array.isArray(val) ? val[0] : val))} className="**:data-[slot=slider-range]:bg-purple-500 **:data-[slot=slider-thumb]:ring-purple-500" />
             </div>
             <div className="flex flex-col gap-1 col-span-2">
               <label className="text-xs font-semibold text-pink-400">R3 (Ohms)</label>
               <Slider min={1} max={100} step={1} value={[R3]} onValueChange={val => setR3((Array.isArray(val) ? val[0] : val))} className="**:data-[slot=slider-range]:bg-pink-500 **:data-[slot=slider-thumb]:ring-pink-500" />
             </div>
          </div>
        </div>

      </div>

      <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
        <h3 className="font-bold text-lg mb-4">Kirchhoff Equations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
           <div>
              <p className="text-sm text-muted-foreground mb-2">Loop 1 (Left)</p>
              <Latex>{`$$ ${V1} - ${R1} I_1 - ${R3} I_3 = 0 $$`}</Latex>
           </div>
           <div>
              <p className="text-sm text-muted-foreground mb-2">Loop 2 (Right)</p>
              <Latex>{`$$ ${V2} - ${R2} I_2 - ${R3} I_3 = 0 $$`}</Latex>
           </div>
           <div className="md:col-span-2 mt-4 pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-2">KCL at Top Node</p>
              <Latex>{`$$ I_1 + I_2 = I_3 $$`}</Latex>
              <div className="mt-4 flex gap-4 justify-center items-center text-lg text-primary">
                 <span><Latex>{`$I_1 = ${I1.toFixed(3)}\\text{ A}$`}</Latex></span>
                 <span className="text-muted-foreground">|</span>
                 <span><Latex>{`$I_2 = ${I2.toFixed(3)}\\text{ A}$`}</Latex></span>
                 <span className="text-muted-foreground">|</span>
                 <span className="font-bold text-amber-500"><Latex>{`$I_3 = ${I3.toFixed(3)}\\text{ A}$`}</Latex></span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
