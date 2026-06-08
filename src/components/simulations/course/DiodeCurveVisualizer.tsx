"use client";

import { useState } from "react";
import { Mafs, Coordinates, Line, Text, Point, Plot } from "mafs";
import "mafs/core.css";
import "mafs/font.css";

export function DiodeCurveVisualizer() {
  const [voltage, setVoltage] = useState(0);

  // Zener Diode characteristics
  const V_f = 0.7; // Forward voltage drop
  const V_z = -5; // Zener breakdown voltage
  const I_s = 0.05; // Reverse saturation current (mA) scale for visual purposes

  // Calculate current based on voltage
  const calculateCurrent = (v: number) => {
    if (v > V_f) {
      // Forward bias exponential growth
      return Math.pow(v - V_f + 1, 3) * 5; 
    } else if (v > V_z) {
      // Reverse bias leakage
      return -I_s;
    } else {
      // Breakdown region
      return -Math.pow(Math.abs(v - V_z) + 1, 3) * 5;
    }
  };

  const current = calculateCurrent(voltage);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
      {/* Controls */}
      <div className="p-6 bg-slate-800/50 md:w-1/3 flex flex-col justify-center space-y-6 border-b md:border-b-0 md:border-r border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Zener Diode I-V Curve</h3>
          <p className="text-slate-400 text-sm">
            Explore the non-linear relationship between voltage and current in a Zener diode.
          </p>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2 font-mono">
            <span className="text-slate-400">-8V</span>
            <span className="text-amber-400 font-bold">V = {voltage.toFixed(2)}V</span>
            <span className="text-slate-400">+3V</span>
          </div>
          <input
            type="range"
            min="-8"
            max="3"
            step="0.1"
            value={voltage}
            onChange={(e) => setVoltage(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-sm font-bold text-slate-400">Current (I)</span>
            <span className="text-xl font-mono text-blue-400">{current > 100 || current < -100 ? "∞" : current.toFixed(2)} mA</span>
          </div>
          
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Operating Region:</span>
            {voltage > V_f && <span className="inline-block px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded text-sm font-bold">Forward Bias (Conducting)</span>}
            {voltage > 0 && voltage <= V_f && <span className="inline-block px-2 py-1 bg-amber-500/20 text-amber-300 rounded text-sm font-bold">Pre-Threshold</span>}
            {voltage <= 0 && voltage > V_z && <span className="inline-block px-2 py-1 bg-slate-700 text-slate-300 rounded text-sm font-bold">Reverse Bias (Blocked)</span>}
            {voltage <= V_z && <span className="inline-block px-2 py-1 bg-rose-500/20 text-rose-300 rounded text-sm font-bold">Avalanche Breakdown (Zener)</span>}
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="p-8 md:w-2/3 flex items-center justify-center min-h-[400px] bg-slate-950 relative overflow-hidden">
        <Mafs zoom={false} pan={false} viewBox={{ x: [-8, 4], y: [-50, 50] }}>
          <Coordinates.Cartesian 
            xAxis={{ labels: (x) => `${x}V`, axis: true, lines: 1 }}
            yAxis={{ labels: (y) => y % 25 === 0 && y !== 0 ? `${y}mA` : "", axis: true, lines: 25 }}
          />

          {/* Forward Bias Curve */}
          <Plot.OfX y={(x) => x > V_f ? Math.pow(x - V_f + 1, 3) * 5 : 0} color="#10b981" weight={3} />
          
          {/* Reverse Bias Leakage (exaggerated for visibility) */}
          <Plot.OfX y={(x) => (x > V_z && x <= V_f) ? -I_s : 0} color="#64748b" weight={3} />
          
          {/* Zener Breakdown Curve */}
          <Plot.OfX y={(x) => x <= V_z ? -Math.pow(Math.abs(x - V_z) + 1, 3) * 5 : 0} color="#f43f5e" weight={3} />

          {/* Annotations */}
          <Line.Segment point1={[V_f, -5]} point2={[V_f, 5]} color="#10b981" style="dashed" />
          <Text x={V_f + 1} y={-10} color="#10b981" size={14}>V_f (0.7V)</Text>

          <Line.Segment point1={[V_z, -5]} point2={[V_z, 5]} color="#f43f5e" style="dashed" />
          <Text x={V_z - 1} y={10} color="#f43f5e" size={14}>V_z (-5V)</Text>

          {/* Interactive Operating Point */}
          <Point x={voltage} y={current} color="#fbbf24" />
          <Line.Segment point1={[voltage, 0]} point2={[voltage, current]} color="#fbbf24" style="dashed" />
          <Line.Segment point1={[0, current]} point2={[voltage, current]} color="#fbbf24" style="dashed" />

        </Mafs>
      </div>
    </div>
  );
}
