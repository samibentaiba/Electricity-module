"use client";

import { useState } from "react";
import { Mafs, Line, Text, Polygon } from "mafs";
import "mafs/core.css";
import "mafs/font.css";

export function SuperpositionVisualizer() {
  const [e1Active, setE1Active] = useState(true);
  const [e2Active, setE2Active] = useState(true);

  // Constants
  const R1 = 10;
  const R2 = 20;
  const E1_val = 12;
  const E2_val = 15;

  // Actual values based on toggles
  const E1 = e1Active ? E1_val : 0;
  const E2 = e2Active ? E2_val : 0;

  // Calculate U (voltage between top middle and bottom middle)
  const U_from_E1 = e1Active ? E1_val * (R2 / (R1 + R2)) : 0;
  const U_from_E2 = e2Active ? E2_val * (R1 / (R1 + R2)) : 0;
  const U_total = U_from_E1 + U_from_E2;

  // Calculate current I (clockwise)
  const I_total = (E1 - E2) / (R1 + R2);

  // Helper to draw a European-style resistor (rectangle)
  const drawResistor = (x: number, y: number) => {
    // A rectangle centered at (x,y) with width 1.5 and height 0.6
    const w = 0.75;
    const h = 0.3;
    return (
      <Polygon 
        points={[
          [x - w, y + h],
          [x + w, y + h],
          [x + w, y - h],
          [x - w, y - h]
        ]}
        color="#cbd5e1"
        fillOpacity={0.1}
      />
    );
  };

  // Helper to draw an arrow indicating current flow
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
        <Line.Segment 
           point1={[x - Math.cos(rad) * scale * 1.5, y - Math.sin(rad) * scale * 1.5]} 
           point2={[x + Math.cos(rad) * scale * 0.5, y + Math.sin(rad) * scale * 0.5]} 
           color={color} 
           weight={3} 
        />
        <Polygon points={[p1 as [number, number], p2 as [number, number], p3 as [number, number]]} color={color} />
        <Text 
           x={x + Math.cos(rad - Math.PI/2) * 0.6} 
           y={y + Math.sin(rad - Math.PI/2) * 0.6} 
           color={color} 
           size={14}
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
            Watch how the total voltage U matches the mathematical sum of the voltages produced by each battery independently.
          </p>
        </div>

        <div className="space-y-4">
          <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${e1Active ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-800 border-slate-700'}`}>
            <div>
              <div className={`font-bold ${e1Active ? 'text-amber-500' : 'text-slate-500'}`}>Battery 1 (E1)</div>
              <div className="text-sm text-slate-400">{E1_val}V</div>
            </div>
            <button
              onClick={() => setE1Active(!e1Active)}
              className={`px-4 py-2 rounded-lg font-bold transition-colors ${e1Active ? 'bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
            >
              {e1Active ? 'ACTIVE' : 'SHORTED'}
            </button>
          </div>

          <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${e2Active ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}`}>
            <div>
              <div className={`font-bold ${e2Active ? 'text-emerald-500' : 'text-slate-500'}`}>Battery 2 (E2)</div>
              <div className="text-sm text-slate-400">{E2_val}V</div>
            </div>
            <button
              onClick={() => setE2Active(!e2Active)}
              className={`px-4 py-2 rounded-lg font-bold transition-colors ${e2Active ? 'bg-emerald-500 text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
            >
              {e2Active ? 'ACTIVE' : 'SHORTED'}
            </button>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
          <div className="text-sm text-slate-400 mb-2">Voltage U (Middle):</div>
          <div className="text-3xl font-mono text-white flex justify-between items-center mb-3">
            <span>=</span>
            <span className="text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)] font-black">
              {U_total.toFixed(2)} V
            </span>
          </div>
          
          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 text-xs font-mono items-center bg-slate-900 p-3 rounded-lg border border-slate-800">
             <div className="text-center">
                <div className="text-amber-500/70 mb-1">From E1</div>
                <div className={e1Active ? "text-amber-400 font-bold" : "text-slate-600"}>{U_from_E1.toFixed(2)}V</div>
             </div>
             <div className="text-slate-500 font-black text-lg">+</div>
             <div className="text-center">
                <div className="text-emerald-500/70 mb-1">From E2</div>
                <div className={e2Active ? "text-emerald-400 font-bold" : "text-slate-600"}>{U_from_E2.toFixed(2)}V</div>
             </div>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="p-6 md:w-2/3 flex items-center justify-center min-h-[450px]">
        <Mafs zoom={false} pan={false} viewBox={{ x: [-4, 4], y: [-3, 3] }}>
          
          {/* Main Circuit Wires */}
          <Line.Segment point1={[-3, 2]} point2={[-1.75, 2]} color="#475569" weight={2} />
          <Line.Segment point1={[-0.25, 2]} point2={[0.25, 2]} color="#475569" weight={2} />
          <Line.Segment point1={[1.75, 2]} point2={[3, 2]} color="#475569" weight={2} />
          
          <Line.Segment point1={[-3, -2]} point2={[3, -2]} color="#475569" weight={2} />
          
          <Line.Segment point1={[-3, 2]} point2={[-3, 0.5]} color="#475569" weight={2} />
          <Line.Segment point1={[-3, -0.5]} point2={[-3, -2]} color="#475569" weight={2} />
          
          <Line.Segment point1={[3, 2]} point2={[3, 0.5]} color="#475569" weight={2} />
          <Line.Segment point1={[3, -0.5]} point2={[3, -2]} color="#475569" weight={2} />

          {/* E1 Battery (Left) */}
          {e1Active ? (
            <>
              <Line.Segment point1={[-3.5, 0.5]} point2={[-2.5, 0.5]} color="#f59e0b" weight={4} />
              <Line.Segment point1={[-3.2, -0.5]} point2={[-2.8, -0.5]} color="#f59e0b" weight={4} />
              <Text x={-3.8} y={0} color="#f59e0b" size={20}>E1</Text>
            </>
          ) : (
            <>
              <Line.Segment point1={[-3, 0.5]} point2={[-3, -0.5]} color="#f59e0b" weight={4} style="dashed" />
              <Text x={-3.8} y={0} color="#64748b" size={14}>Shorted</Text>
            </>
          )}

          {/* E2 Battery (Right) */}
          {e2Active ? (
            <>
              <Line.Segment point1={[2.5, 0.5]} point2={[3.5, 0.5]} color="#10b981" weight={4} />
              <Line.Segment point1={[2.8, -0.5]} point2={[3.2, -0.5]} color="#10b981" weight={4} />
              <Text x={3.8} y={0} color="#10b981" size={20}>E2</Text>
            </>
          ) : (
            <>
              <Line.Segment point1={[3, 0.5]} point2={[3, -0.5]} color="#10b981" weight={4} style="dashed" />
              <Text x={3.8} y={0} color="#64748b" size={14}>Shorted</Text>
            </>
          )}

          {/* Resistors (European style) */}
          {drawResistor(-1, 2)}
          <Text x={-1} y={2.6} color="#cbd5e1">R1</Text>

          {drawResistor(1, 2)}
          <Text x={1} y={2.6} color="#cbd5e1">R2</Text>

          {/* Measurement U arrow (Middle) */}
          <Line.Segment point1={[0, -2]} point2={[0, 2]} color="#475569" weight={1} style="dashed" />
          <Polygon 
             points={[[0, 1.8], [-0.15, 1.5], [0.15, 1.5]]}
             color="#f43f5e" 
          />
          <Line.Segment point1={[0, -1.8]} point2={[0, 1.8]} color="#f43f5e" weight={2} />
          <Text x={0.3} y={0} color="#f43f5e" size={24} weight="bold">U</Text>

          {/* Current Flow Arrow */}
          <CurrentArrow x={-3} y={1.25} direction={I_total >= 0 ? 90 : 270} color="#818cf8" value={Math.abs(I_total)} />

        </Mafs>
      </div>
    </div>
  );
}
