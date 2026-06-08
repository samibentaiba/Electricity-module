"use client";

import { useState } from "react";
import Latex from "react-latex-next";
import { Slider } from "@/components/ui/slider";
import { calculateVoltageDivider } from "@/lib/circuit-utils";

export function VoltageDivider() {
  const [vin, setVin] = useState(12);
  const [r1, setR1] = useState(10);
  const [r2, setR2] = useState(10);

  const vout = calculateVoltageDivider(vin, r1, r2);
  
  // Percentages for the visual voltage bar
  const r1DropPct = ((vin - vout) / vin) * 100;
  const r2DropPct = (vout / vin) * 100;

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Visual Circuit */}
        <div className="bg-slate-950 p-8 rounded-2xl flex justify-center items-center relative overflow-hidden border border-border/50 shadow-inner min-h-[450px]">
           <h3 className="absolute top-4 left-4 font-bold text-slate-400 text-sm tracking-wider uppercase z-10">Voltage Divider Circuit</h3>
           
           <div className="relative w-48 h-72 mt-8">
              {/* High Voltage Wire (Red) */}
              <div className="absolute bottom-1/2 left-0 w-1 h-36 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
              <div className="absolute top-0 left-0 w-[75%] h-1 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
              
              {/* Mid Voltage Wire (Rose) */}
              <div className="absolute top-0 right-0 w-[25%] h-1 bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]" />
              <div className="absolute top-0 right-0 w-1 h-36 bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]" />

              {/* Ground Wire (Blue) */}
              <div className="absolute bottom-0 right-0 w-1 h-36 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <div className="absolute bottom-0 left-0 w-1 h-36 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />

              {/* Vin Source */}
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 py-3 flex flex-col items-center justify-center gap-1 z-10">
                 <div className="text-red-500 font-bold text-xl leading-none">+</div>
                 <div className="w-10 h-1 bg-amber-500 rounded-full" />
                 <div className="w-5 h-2 bg-amber-500 rounded-full" />
                 <div className="text-blue-500 font-bold text-xl leading-none">-</div>
                 <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-amber-500 font-bold text-sm text-right leading-tight whitespace-nowrap">
                   V_in<br/><span className="text-lg">{vin}V</span>
                 </div>
              </div>

              {/* R1 */}
              <div className="absolute top-0 left-[75%] -translate-x-1/2 -translate-y-1/2 bg-slate-950 px-3 flex flex-col items-center justify-center z-10">
                <div className="absolute -top-8 text-indigo-400 font-bold whitespace-nowrap bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                  R1 = {r1}Ω
                </div>
                <div className="w-16 h-4 bg-indigo-500 rounded-sm border-2 border-indigo-400" />
              </div>

              {/* R2 */}
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-slate-950 py-3 flex flex-col items-center justify-center z-10">
                <div className="absolute -right-24 text-purple-400 font-bold whitespace-nowrap bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                  R2 = {r2}Ω
                </div>
                <div className="w-4 h-16 bg-purple-500 rounded-sm border-2 border-purple-400" />
              </div>

              {/* Vout Node */}
              <div className="absolute top-0 right-0 w-4 h-4 bg-rose-500 rounded-full translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(244,63,94,1)] z-20" />
              <div className="absolute top-0 right-0 h-1 w-12 bg-rose-400 translate-x-full z-10" />
              <div className="absolute -right-36 -top-4 text-rose-500 font-bold bg-slate-900 px-3 py-1.5 rounded-lg border border-rose-500/50 shadow-lg whitespace-nowrap z-20">
                V_out: <span className="text-xl">{vout.toFixed(2)}V</span>
              </div>
              
              {/* Ground reference */}
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full translate-x-1/2 translate-y-1/2 z-20" />
              <div className="absolute bottom-0 right-0 h-1 w-12 bg-blue-500 translate-x-full z-10" />
              <div className="absolute -right-32 bottom-0 translate-y-1/2 text-blue-400 font-bold whitespace-nowrap z-20 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
                0V (GND)
              </div>

              {/* Voltage Drop Thermometer */}
              <div className="absolute inset-0 m-auto w-12 rounded-xl overflow-hidden flex flex-col bg-slate-800 border-2 border-slate-700 shadow-xl">
                 <div 
                    className="w-full bg-red-500/80 transition-all duration-300 relative flex flex-col items-center justify-center border-b-2 border-slate-900" 
                    style={{ height: `${r1DropPct}%` }}
                 >
                    {r1DropPct > 15 && (
                      <span className="text-[10px] font-bold text-white text-center leading-tight drop-shadow-md">
                        R1 DROP<br/>{(vin - vout).toFixed(1)}V
                      </span>
                    )}
                 </div>
                 <div 
                    className="w-full bg-rose-500/80 transition-all duration-300 relative flex flex-col items-center justify-center" 
                    style={{ height: `${r2DropPct}%` }}
                 >
                    {r2DropPct > 15 && (
                      <span className="text-[10px] font-bold text-white text-center leading-tight drop-shadow-md">
                        R2 DROP<br/>{vout.toFixed(1)}V
                      </span>
                    )}
                 </div>
              </div>
           </div>
        </div>

        {/* Adjustments & Results */}
        <div className="flex flex-col gap-6 bg-muted/30 p-6 rounded-xl border border-border/50 justify-center">
           <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-amber-500">Input Voltage (Vin)</label>
                <span className="font-mono bg-amber-500/10 text-amber-500 px-2 py-1 rounded text-sm">{vin} V</span>
              </div>
              <Slider min={1} max={100} step={1} value={[vin]} onValueChange={(val) => setVin((Array.isArray(val) ? val[0] : val))} className="**:data-[slot=slider-range]:bg-amber-500 **:data-[slot=slider-thumb]:ring-amber-500" />
           </div>

           <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-indigo-400">Resistor 1 (R1)</label>
                <span className="font-mono bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded text-sm">{r1} Ω</span>
              </div>
              <Slider min={1} max={100} step={1} value={[r1]} onValueChange={(val) => setR1((Array.isArray(val) ? val[0] : val))} className="**:data-[slot=slider-range]:bg-indigo-400 **:data-[slot=slider-thumb]:ring-indigo-400" />
           </div>

           <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-purple-400">Resistor 2 (R2)</label>
                <span className="font-mono bg-purple-500/10 text-purple-400 px-2 py-1 rounded text-sm">{r2} Ω</span>
              </div>
              <Slider min={1} max={100} step={1} value={[r2]} onValueChange={(val) => setR2((Array.isArray(val) ? val[0] : val))} className="**:data-[slot=slider-range]:bg-purple-400 **:data-[slot=slider-thumb]:ring-purple-400" />
           </div>

           <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold mb-4 text-center">Output Voltage (Vout)</p>
              <div className="text-center text-5xl font-black text-rose-500 mb-4 drop-shadow-[0_0_10px_rgba(244,63,94,0.4)]">
                 {vout.toFixed(2)} V
              </div>
              <div className="text-center">
                <Latex>{`$$ V_{out} = V_{in} \\times \\frac{R_2}{R_1 + R_2} $$`}</Latex>
                <div className="mt-2 text-sm text-slate-400">
                  <Latex>{`$$ V_{out} = ${vin} \\times \\frac{${r2}}{${r1} + ${r2}} = ${vout.toFixed(2)}\\text{ V} $$`}</Latex>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
