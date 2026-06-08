"use client";

import { useState } from "react";
import { Mafs, Coordinates, Line, Text, Point, Plot } from "mafs";
import "mafs/core.css";
import "mafs/font.css";

export function IdealSourcesVisualizer() {
  const [sourceType, setSourceType] = useState<"voltage" | "current">("voltage");
  const [loadResistance, setLoadResistance] = useState(10); // 1 to 50 ohms

  // Constants
  const V_source = 12; // 12V
  const I_source = 2; // 2A

  // Calculations
  const current = sourceType === "voltage" ? V_source / loadResistance : I_source;
  const voltage = sourceType === "voltage" ? V_source : I_source * loadResistance;
  const power = voltage * current;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
      {/* Controls */}
      <div className="p-6 bg-slate-800/50 md:w-1/3 flex flex-col justify-center space-y-6 border-b md:border-b-0 md:border-r border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Ideal Sources</h3>
          <p className="text-slate-400 text-sm">
            Observe how an ideal voltage source maintains constant voltage regardless of the load, whereas an ideal current source maintains constant current.
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-lg">
          <button
            onClick={() => setSourceType("voltage")}
            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${sourceType === "voltage" ? "bg-amber-500 text-slate-900" : "text-slate-400 hover:text-white"}`}
          >
            Voltage Source
          </button>
          <button
            onClick={() => setSourceType("current")}
            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${sourceType === "current" ? "bg-emerald-500 text-slate-900" : "text-slate-400 hover:text-white"}`}
          >
            Current Source
          </button>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2 font-mono">
            <span className="text-slate-400">R_load</span>
            <span className="text-indigo-400 font-bold">{loadResistance} Ω</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={loadResistance}
            onChange={(e) => setLoadResistance(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <div className="text-xs text-slate-500 mb-1 font-bold uppercase tracking-wider">Voltage (V)</div>
            <div className={`text-2xl font-mono font-bold ${sourceType === "voltage" ? "text-amber-400" : "text-rose-400 transition-all duration-300"}`}>
              {voltage.toFixed(1)} V
            </div>
            {sourceType === "voltage" && <div className="text-[10px] text-amber-500/50 uppercase mt-1">Constant</div>}
          </div>
          
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <div className="text-xs text-slate-500 mb-1 font-bold uppercase tracking-wider">Current (I)</div>
            <div className={`text-2xl font-mono font-bold ${sourceType === "current" ? "text-emerald-400" : "text-blue-400 transition-all duration-300"}`}>
              {current.toFixed(2)} A
            </div>
            {sourceType === "current" && <div className="text-[10px] text-emerald-500/50 uppercase mt-1">Constant</div>}
          </div>
        </div>
      </div>

      {/* Visualization - I-V Characteristic Curve */}
      <div className="p-8 md:w-2/3 flex items-center justify-center min-h-[350px] bg-slate-950">
        <div className="w-full h-full flex flex-col items-center">
          <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">I-V Characteristic Curve</h4>
          
          <Mafs zoom={false} pan={false} viewBox={{ x: [-2, 55], y: [-2, 110] }}>
            <Coordinates.Cartesian 
              xAxis={{ labels: (x) => (x % 10 === 0 && x > 0 ? `${x}Ω` : ""), axis: true, lines: 10 }}
              yAxis={{ labels: (y) => (y % 20 === 0 && y > 0 ? `${y}` : ""), axis: true, lines: 20 }}
            />
            
            <Text x={50} y={-10} color="#64748b" size={14}>R (Ω)</Text>
            <Text x={-8} y={100} color="#64748b" size={14}>Val</Text>

            {sourceType === "voltage" ? (
              <>
                {/* V is constant */}
                <Plot.OfX y={(x) => V_source * 4} color="#f59e0b" weight={3} />
                <Text x={10} y={V_source * 4 + 8} color="#f59e0b" size={16}>V = 12V</Text>
                
                {/* I = V/R */}
                <Plot.OfX y={(x) => x > 0.5 ? (V_source / x) * 20 : 0} color="#60a5fa" weight={3} />
                <Text x={40} y={(V_source / 40) * 20 + 8} color="#60a5fa" size={16}>I = V/R</Text>
                
                {/* Current operating point */}
                <Point x={loadResistance} y={(V_source / loadResistance) * 20} color="#60a5fa" />
                <Line.Segment point1={[loadResistance, 0]} point2={[loadResistance, (V_source / loadResistance) * 20]} style="dashed" color="#475569" />
              </>
            ) : (
              <>
                {/* I is constant */}
                <Plot.OfX y={(x) => I_source * 20} color="#10b981" weight={3} />
                <Text x={10} y={I_source * 20 + 8} color="#10b981" size={16}>I = 2A</Text>
                
                {/* V = I*R */}
                <Plot.OfX y={(x) => (I_source * x) * 0.8} color="#fb7185" weight={3} />
                <Text x={40} y={(I_source * 40) * 0.8 - 8} color="#fb7185" size={16}>V = I*R</Text>
                
                {/* Current operating point */}
                <Point x={loadResistance} y={(I_source * loadResistance) * 0.8} color="#fb7185" />
                <Line.Segment point1={[loadResistance, 0]} point2={[loadResistance, (I_source * loadResistance) * 0.8]} style="dashed" color="#475569" />
              </>
            )}
          </Mafs>
        </div>
      </div>
    </div>
  );
}
