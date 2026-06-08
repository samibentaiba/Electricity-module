"use client";

import { useState } from "react";


const COLORS = [
  { name: "Black", value: 0, multiplier: 1, color: "#000000", textColor: "white" },
  { name: "Brown", value: 1, multiplier: 10, color: "#8B4513", textColor: "white" },
  { name: "Red", value: 2, multiplier: 100, color: "#FF0000", textColor: "white" },
  { name: "Orange", value: 3, multiplier: 1000, color: "#FFA500", textColor: "black" },
  { name: "Yellow", value: 4, multiplier: 10000, color: "#FFFF00", textColor: "black" },
  { name: "Green", value: 5, multiplier: 100000, color: "#008000", textColor: "white" },
  { name: "Blue", value: 6, multiplier: 1000000, color: "#0000FF", textColor: "white" },
  { name: "Violet", value: 7, multiplier: 10000000, color: "#EE82EE", textColor: "black" },
  { name: "Gray", value: 8, multiplier: 100000000, color: "#808080", textColor: "white" },
  { name: "White", value: 9, multiplier: 1000000000, color: "#FFFFFF", textColor: "black" },
];

const TOLERANCES = [
  { name: "Gold", value: 5, color: "#FFD700" },
  { name: "Silver", value: 10, color: "#C0C0C0" },
];

export function ResistorColorCode() {
  const [band1, setBand1] = useState(COLORS[1]); // Brown
  const [band2, setBand2] = useState(COLORS[0]); // Black
  const [multiplier, setMultiplier] = useState(COLORS[2]); // Red
  const [tolerance, setTolerance] = useState(TOLERANCES[0]); // Gold

  const resistance = (band1.value * 10 + band2.value) * multiplier.multiplier;

  const formatResistance = (r: number) => {
    if (r >= 1000000) return (r / 1000000).toFixed(2) + " MΩ";
    if (r >= 1000) return (r / 1000).toFixed(2) + " kΩ";
    return r + " Ω";
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      {/* Visual Resistor */}
      <div className="bg-slate-950 p-12 rounded-2xl flex justify-center items-center relative overflow-hidden border border-border/50 shadow-inner">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
         
         {/* Wires */}
         <div className="w-full h-2 bg-slate-400 absolute top-1/2 -translate-y-1/2" />
         
         {/* Body */}
         <div className="relative w-64 h-24 bg-[#E2C290] rounded-3xl border-4 border-[#C8A270] flex items-center justify-between px-6 z-10 shadow-xl">
            {/* Band 1 */}
            <div className="w-4 h-full" style={{ backgroundColor: band1.color }} />
            {/* Band 2 */}
            <div className="w-4 h-full" style={{ backgroundColor: band2.color }} />
            {/* Multiplier */}
            <div className="w-4 h-full" style={{ backgroundColor: multiplier.color }} />
            {/* Gap */}
            <div className="w-6 h-full" />
            {/* Tolerance */}
            <div className="w-4 h-full" style={{ backgroundColor: tolerance.color }} />
         </div>
      </div>

      <div className="bg-muted/30 border border-border/50 rounded-xl p-6 text-center shadow-lg">
         <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold mb-2">Calculated Resistance</p>
         <div className="text-5xl font-black bg-clip-text text-transparent bg-linear-to-r from-amber-400 to-orange-500">
            {formatResistance(resistance)} <span className="text-3xl text-slate-400">±{tolerance.value}%</span>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Band 1 Selector */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300 block text-center">Band 1 (1st Digit)</label>
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
            {COLORS.map(c => (
              <button 
                key={c.name}
                onClick={() => setBand1(c)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border \${band1 === c ? 'border-primary bg-primary/10' : 'border-transparent hover:bg-slate-800'}`}
              >
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-slate-700" style={{ backgroundColor: c.color }} />
                  {c.name}
                </span>
                <span className="font-mono text-muted-foreground">{c.value}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Band 2 Selector */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300 block text-center">Band 2 (2nd Digit)</label>
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
            {COLORS.map(c => (
              <button 
                key={c.name}
                onClick={() => setBand2(c)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border \${band2 === c ? 'border-primary bg-primary/10' : 'border-transparent hover:bg-slate-800'}`}
              >
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-slate-700" style={{ backgroundColor: c.color }} />
                  {c.name}
                </span>
                <span className="font-mono text-muted-foreground">{c.value}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Multiplier Selector */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300 block text-center">Multiplier</label>
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
            {COLORS.map(c => (
              <button 
                key={c.name}
                onClick={() => setMultiplier(c)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border \${multiplier === c ? 'border-primary bg-primary/10' : 'border-transparent hover:bg-slate-800'}`}
              >
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-slate-700" style={{ backgroundColor: c.color }} />
                  {c.name}
                </span>
                <span className="font-mono text-muted-foreground text-xs">x10^{c.value}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tolerance Selector */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300 block text-center">Tolerance</label>
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
            {TOLERANCES.map(c => (
              <button 
                key={c.name}
                onClick={() => setTolerance(c)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border \${tolerance === c ? 'border-primary bg-primary/10' : 'border-transparent hover:bg-slate-800'}`}
              >
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-slate-700" style={{ backgroundColor: c.color }} />
                  {c.name}
                </span>
                <span className="font-mono text-muted-foreground">±{c.value}%</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
