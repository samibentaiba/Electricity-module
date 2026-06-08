"use client";

import { useState } from "react";
import { Mafs, Line, Text, Polygon } from "mafs";
import "mafs/core.css";
import "mafs/font.css";

export function SuperpositionVisualizer() {
  const [v1Active, setV1Active] = useState(true);
  const [v2Active, setV2Active] = useState(true);

  // Constants
  const R1 = 10;
  const R2 = 20;
  const R3 = 30;
  const V1_val = 12;
  const V2_val = 15;

  // Actual values based on toggles
  const V1 = v1Active ? V1_val : 0;
  const V2 = v2Active ? V2_val : 0;

  // Calculate Node A voltage (top middle)
  const g1 = 1 / R1;
  const g2 = 1 / R2;
  const g3 = 1 / R3;
  const Va = (V1 * g1 + V2 * g2) / (g1 + g2 + g3);

  // Calculate branch currents
  const I1 = (V1 - Va) / R1; // Current from V1 rightwards
  const I2 = (V2 - Va) / R2; // Current from V2 leftwards
  const I3 = Va / R3;        // Current down through R3

  // For display purposes, we break it down by superposition components
  // V1 active, V2 shorted:
  const Va_from_V1 = (V1_val * g1) / (g1 + g2 + g3);
  const I3_from_V1 = v1Active ? Va_from_V1 / R3 : 0;

  // V2 active, V1 shorted:
  const Va_from_V2 = (V2_val * g2) / (g1 + g2 + g3);
  const I3_from_V2 = v2Active ? Va_from_V2 / R3 : 0;

  // Helper to draw a resistor
  const drawResistor = (x: number, y: number, vertical: boolean = false) => {
    const segments = [];
    const points = 6;
    const width = 1;
    const height = 0.4;
    
    if (vertical) {
      for (let i = 0; i < points; i++) {
        segments.push([
          x + (i % 2 === 0 ? height : -height), 
          y + (i * width) / points - width / 2
        ]);
      }
    } else {
      for (let i = 0; i < points; i++) {
        segments.push([
          x + (i * width) / points - width / 2, 
          y + (i % 2 === 0 ? height : -height)
        ]);
      }
    }

    return (
      <Polyline points={segments as [number, number][]} color="#94a3b8" weight={3} />
    );
  };

  const Polyline = ({ points, color, weight }: { points: [number, number][], color: string, weight: number }) => {
    return (
      <>
        {points.slice(0, -1).map((p1, i) => (
          <Line.Segment key={i} point1={p1} point2={points[i + 1]} color={color} weight={weight} />
        ))}
      </>
    );
  };

  // Helper to draw an arrow indicating current flow
  // Pos is [x, y], direction is angle in degrees (0 = right, 90 = up)
  const CurrentArrow = ({ x, y, direction, color, value }: { x: number, y: number, direction: number, color: string, value: number }) => {
    if (Math.abs(value) < 0.001) return null; // No current
    
    // If current is negative, reverse direction
    const actualDir = value < 0 ? direction + 180 : direction;
    const absVal = Math.abs(value);
    
    // Fixed scale for a clean look
    const scale = 0.25;
    
    const rad = (actualDir * Math.PI) / 180;
    const p1 = [x + Math.cos(rad) * scale, y + Math.sin(rad) * scale];
    const p2 = [x + Math.cos(rad + 2.5) * scale * 0.8, y + Math.sin(rad + 2.5) * scale * 0.8];
    const p3 = [x + Math.cos(rad - 2.5) * scale * 0.8, y + Math.sin(rad - 2.5) * scale * 0.8];

    return (
      <>
        {/* Draw a subtle trail/shaft */}
        <Line.Segment 
           point1={[x - Math.cos(rad) * scale * 1.5, y - Math.sin(rad) * scale * 1.5]} 
           point2={[x + Math.cos(rad) * scale * 0.5, y + Math.sin(rad) * scale * 0.5]} 
           color={color} 
           weight={3} 
        />
        {/* Arrow head */}
        <Polygon points={[p1 as [number, number], p2 as [number, number], p3 as [number, number]]} color={color} />
        {/* Value Label */}
        <Text 
           x={x + Math.cos(rad - Math.PI/2) * 0.5} 
           y={y + Math.sin(rad - Math.PI/2) * 0.5} 
           color={color} 
           size={16}
        >
          {absVal.toFixed(2)}A
        </Text>
      </>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
      {/* Controls */}
      <div className="p-6 bg-slate-800/50 md:w-1/3 flex flex-col justify-center space-y-6 border-b md:border-b-0 md:border-r border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Superposition</h3>
          <p className="text-slate-400 text-sm">
            Watch how the total currents in the circuit (blue arrows) match the mathematical sum of the currents produced by each battery independently.
          </p>
        </div>

        <div className="space-y-4">
          <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${v1Active ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-800 border-slate-700'}`}>
            <div>
              <div className={`font-bold ${v1Active ? 'text-amber-500' : 'text-slate-500'}`}>Battery 1 (V1)</div>
              <div className="text-sm text-slate-400">{V1_val}V</div>
            </div>
            <button
              onClick={() => setV1Active(!v1Active)}
              className={`px-4 py-2 rounded-lg font-bold transition-colors ${v1Active ? 'bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
            >
              {v1Active ? 'ACTIVE' : 'SHORTED'}
            </button>
          </div>

          <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${v2Active ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}`}>
            <div>
              <div className={`font-bold ${v2Active ? 'text-emerald-500' : 'text-slate-500'}`}>Battery 2 (V2)</div>
              <div className="text-sm text-slate-400">{V2_val}V</div>
            </div>
            <button
              onClick={() => setV2Active(!v2Active)}
              className={`px-4 py-2 rounded-lg font-bold transition-colors ${v2Active ? 'bg-emerald-500 text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
            >
              {v2Active ? 'ACTIVE' : 'SHORTED'}
            </button>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
          <div className="text-sm text-slate-400 mb-2">Current through R3 (I_R3):</div>
          <div className="text-3xl font-mono text-white flex justify-between items-center mb-3">
            <span>=</span>
            <span className="text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)] font-black">
              {I3.toFixed(3)} A
            </span>
          </div>
          
          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 text-xs font-mono items-center bg-slate-900 p-3 rounded-lg border border-slate-800">
             <div className="text-center">
                <div className="text-amber-500/70 mb-1">From V1</div>
                <div className={v1Active ? "text-amber-400 font-bold" : "text-slate-600"}>{I3_from_V1.toFixed(3)}A</div>
             </div>
             <div className="text-slate-500 font-black text-lg">+</div>
             <div className="text-center">
                <div className="text-emerald-500/70 mb-1">From V2</div>
                <div className={v2Active ? "text-emerald-400 font-bold" : "text-slate-600"}>{I3_from_V2.toFixed(3)}A</div>
             </div>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="p-6 md:w-2/3 flex items-center justify-center min-h-[450px]">
        <Mafs zoom={false} pan={false} viewBox={{ x: [-4, 4], y: [-3, 3] }}>
          
          {/* Main Circuit Wires */}
          <Line.Segment point1={[-3, 2]} point2={[3, 2]} color="#475569" weight={2} />
          <Line.Segment point1={[-3, -2]} point2={[3, -2]} color="#475569" weight={2} />
          
          <Line.Segment point1={[-3, 2]} point2={[-3, 0.5]} color="#475569" weight={2} />
          <Line.Segment point1={[-3, -0.5]} point2={[-3, -2]} color="#475569" weight={2} />
          
          <Line.Segment point1={[3, 2]} point2={[3, 0.5]} color="#475569" weight={2} />
          <Line.Segment point1={[3, -0.5]} point2={[3, -2]} color="#475569" weight={2} />

          <Line.Segment point1={[0, 2]} point2={[0, 1]} color="#475569" weight={2} />
          <Line.Segment point1={[0, -1]} point2={[0, -2]} color="#475569" weight={2} />

          {/* V1 Battery (Left) */}
          {v1Active ? (
            <>
              <Line.Segment point1={[-3.5, 0.5]} point2={[-2.5, 0.5]} color="#f59e0b" weight={4} />
              <Line.Segment point1={[-3.2, -0.5]} point2={[-2.8, -0.5]} color="#f59e0b" weight={4} />
              <Text x={-3.8} y={0} color="#f59e0b" size={20}>V1</Text>
              <Text x={-2.2} y={0.5} color="#f59e0b" size={16}>+</Text>
              <Text x={-2.2} y={-0.5} color="#f59e0b" size={16}>-</Text>
            </>
          ) : (
            <>
              <Line.Segment point1={[-3, 0.5]} point2={[-3, -0.5]} color="#f59e0b" weight={4} style="dashed" />
              <Text x={-3.8} y={0} color="#64748b" size={14}>Shorted</Text>
            </>
          )}

          {/* V2 Battery (Right) */}
          {v2Active ? (
            <>
              <Line.Segment point1={[2.5, 0.5]} point2={[3.5, 0.5]} color="#10b981" weight={4} />
              <Line.Segment point1={[2.8, -0.5]} point2={[3.2, -0.5]} color="#10b981" weight={4} />
              <Text x={3.8} y={0} color="#10b981" size={20}>V2</Text>
              <Text x={2.2} y={0.5} color="#10b981" size={16}>+</Text>
              <Text x={2.2} y={-0.5} color="#10b981" size={16}>-</Text>
            </>
          ) : (
            <>
              <Line.Segment point1={[3, 0.5]} point2={[3, -0.5]} color="#10b981" weight={4} style="dashed" />
              <Text x={3.8} y={0} color="#64748b" size={14}>Shorted</Text>
            </>
          )}

          {/* Resistors */}
          {drawResistor(-1.5, 2, false)}
          <Text x={-1.5} y={2.5} color="#cbd5e1">R1 (10Ω)</Text>

          {drawResistor(1.5, 2, false)}
          <Text x={1.5} y={2.5} color="#cbd5e1">R2 (20Ω)</Text>

          {drawResistor(0, 0, true)}
          <Text x={0.8} y={0} color="#cbd5e1">R3 (30Ω)</Text>

          {/* Current Flow Arrows on the Wires */}
          <CurrentArrow x={-3} y={1.25} direction={90} color={v1Active && v2Active ? "#818cf8" : (v1Active ? "#f59e0b" : "#64748b")} value={I1} />
          <CurrentArrow x={-2.2} y={2} direction={0} color={v1Active && v2Active ? "#818cf8" : (v1Active ? "#f59e0b" : "#64748b")} value={I1} />
          
          <CurrentArrow x={3} y={1.25} direction={90} color={v1Active && v2Active ? "#818cf8" : (v2Active ? "#10b981" : "#64748b")} value={I2} />
          <CurrentArrow x={2.2} y={2} direction={180} color={v1Active && v2Active ? "#818cf8" : (v2Active ? "#10b981" : "#64748b")} value={I2} />

          <CurrentArrow x={0} y={1} direction={270} color="#818cf8" value={I3} />

        </Mafs>
      </div>
    </div>
  );
}
