"use client";

import { useState } from "react";
import { Mafs, Line, Text, Polygon } from "mafs";
import "mafs/core.css";
import "mafs/font.css";

type BiasType = "two-source" | "fixed" | "feedback" | "divider";

export function BiasingCircuitSandbox() {
  const [biasType, setBiasType] = useState<BiasType>("divider");

  // Global variables
  const [vcc, setVcc] = useState(12);
  const [beta] = useState(100);
  const vbe = 0.7;

  // Type specific variables
  const [vbb, setVbb] = useState(5);
  const [rb, setRb] = useState(100); // kOhms
  const [rc, setRc] = useState(2); // kOhms
  const [re, setRe] = useState(1); // kOhms (used in divider)
  const [r1, setR1] = useState(10); // kOhms (divider)
  const [r2, setR2] = useState(2.2); // kOhms (divider)

  // Calculations
  let ib = 0; // mA
  let ic = 0; // mA
  let vce = 0; // V

  if (biasType === "two-source") {
    ib = (vbb - vbe) / rb;
    ic = beta * ib;
    vce = vcc - ic * rc;
  } else if (biasType === "fixed") {
    ib = (vcc - vbe) / rb;
    ic = beta * ib;
    vce = vcc - ic * rc;
  } else if (biasType === "feedback") {
    // Vcc - Ic*Rc - Ib*Rb - Vbe = 0 -> Ib = (Vcc - Vbe) / (Rb + beta*Rc)
    ib = (vcc - vbe) / (rb + beta * rc);
    ic = beta * ib;
    vce = vcc - ic * rc - ib * rb; // Wait, Vce is Vc (since E is grounded)
    vce = vcc - (ic + ib) * rc;
  } else if (biasType === "divider") {
    // Exact calculation using Thevenin equivalent
    const rth = (r1 * r2) / (r1 + r2);
    const eth = vcc * (r2 / (r1 + r2));
    ib = (eth - vbe) / (rth + (beta + 1) * re);
    ic = beta * ib;
    vce = vcc - ic * rc - (ic + ib) * re;
  }

  // Formatting helper
  const formatCurrent = (i_mA: number) => {
    if (i_mA < 0.001) return "0.00 mA";
    if (i_mA < 0.1) return (i_mA * 1000).toFixed(1) + " µA";
    return i_mA.toFixed(2) + " mA";
  };

  const drawResistor = (x: number, y: number, vertical: boolean = false) => {
    const segments = [];
    const points = 6;
    const width = 1;
    const height = 0.3;
    
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
      <>
        {segments.slice(0, -1).map((p1, i) => (
          <Line.Segment key={`res-${x}-${y}-${i}`} point1={p1 as [number, number]} point2={segments[i + 1] as [number, number]} color="#94a3b8" weight={3} />
        ))}
      </>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
      {/* Controls */}
      <div className="p-6 bg-slate-800/50 md:w-1/3 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Biasing Circuits</h3>
            <p className="text-slate-400 text-sm">
              Explore 4 different methods of biasing a BJT to set its Q-Point.
            </p>
          </div>

          <select 
            value={biasType}
            onChange={(e) => setBiasType(e.target.value as BiasType)}
            className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-lg font-bold"
          >
            <option value="two-source">1. Two Voltage Sources</option>
            <option value="fixed">2. Fixed Bias (Base Resistor)</option>
            <option value="feedback">3. Collector-Feedback Bias</option>
            <option value="divider">4. Voltage Divider Bias</option>
          </select>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-slate-400">V_CC</span>
                <span className="text-blue-400 font-bold">{vcc}V</span>
              </div>
              <input type="range" min="5" max="24" step="1" value={vcc} onChange={(e) => setVcc(parseInt(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none accent-blue-500" />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-slate-400">R_C</span>
                <span className="text-amber-400 font-bold">{rc} kΩ</span>
              </div>
              <input type="range" min="0.5" max="10" step="0.5" value={rc} onChange={(e) => setRc(parseFloat(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none accent-amber-500" />
            </div>

            {biasType === "two-source" && (
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-slate-400">V_BB</span>
                  <span className="text-blue-400 font-bold">{vbb}V</span>
                </div>
                <input type="range" min="1" max="12" step="0.5" value={vbb} onChange={(e) => setVbb(parseFloat(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none accent-blue-500" />
              </div>
            )}

            {(biasType === "two-source" || biasType === "fixed" || biasType === "feedback") && (
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-slate-400">R_B</span>
                  <span className="text-amber-400 font-bold">{rb} kΩ</span>
                </div>
                <input type="range" min="10" max="1000" step="10" value={rb} onChange={(e) => setRb(parseInt(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none accent-amber-500" />
              </div>
            )}

            {biasType === "divider" && (
              <>
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-slate-400">R_1</span>
                    <span className="text-amber-400 font-bold">{r1} kΩ</span>
                  </div>
                  <input type="range" min="1" max="100" step="1" value={r1} onChange={(e) => setR1(parseInt(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none accent-amber-500" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-slate-400">R_2</span>
                    <span className="text-amber-400 font-bold">{r2} kΩ</span>
                  </div>
                  <input type="range" min="1" max="50" step="0.5" value={r2} onChange={(e) => setR2(parseFloat(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none accent-amber-500" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-slate-400">R_E</span>
                    <span className="text-amber-400 font-bold">{re} kΩ</span>
                  </div>
                  <input type="range" min="0.1" max="5" step="0.1" value={re} onChange={(e) => setRe(parseFloat(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none accent-amber-500" />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 mt-6">
          <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-3">Q-Point Results</div>
          
          {vce < 0.2 ? (
            <div className="text-rose-400 font-bold text-center bg-rose-500/10 p-2 rounded border border-rose-500/20">
              SATURATION (V_CE = 0.2V)
            </div>
          ) : ic < 0 ? (
            <div className="text-slate-400 font-bold text-center bg-slate-800 p-2 rounded border border-slate-700">
              CUTOFF (I_C = 0)
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400 font-mono text-sm">I_B</span>
                <span className="text-emerald-400 font-mono font-bold">{formatCurrent(ib)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400 font-mono text-sm">I_C</span>
                <span className="text-emerald-400 font-mono font-bold">{formatCurrent(ic)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-mono text-sm">V_CE</span>
                <span className="text-emerald-400 font-mono font-bold">{vce.toFixed(2)} V</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Visualization */}
      <div className="p-8 md:w-2/3 flex items-center justify-center min-h-[500px] bg-slate-950 relative overflow-hidden">
        <Mafs zoom={false} pan={false} viewBox={{ x: [-4, 4], y: [-3, 5] }} preserveAspectRatio={false}>
          
          {/* Ground */}
          <Line.Segment point1={[-4, -2]} point2={[4, -2]} color="#475569" weight={2} />
          
          {/* Vcc Rail (for all except two-source, where it's specific nodes) */}
          {(biasType === "fixed" || biasType === "feedback" || biasType === "divider") && (
            <>
               <Line.Segment point1={[-2, 4]} point2={[2, 4]} color="#3b82f6" weight={4} />
               <Text x={0} y={4.5} color="#3b82f6" size={16}>V_CC = {vcc}V</Text>
            </>
          )}

          {/* NPN Transistor Symbol at center (0, 0) */}
          <Polygon points={[[0.8, -0.6], [1, -0.2], [0.5, -0.3]]} color="#cbd5e1" /> {/* Arrow OUT */}
          <Line.Segment point1={[-0.5, 0.8]} point2={[-0.5, -0.8]} color="#cbd5e1" weight={4} />
          <Line.Segment point1={[-1, 0]} point2={[-0.5, 0]} color="#94a3b8" weight={2} />
          <Line.Segment point1={[-0.5, 0.5]} point2={[1, 1]} color="#94a3b8" weight={2} />
          <Line.Segment point1={[-0.5, -0.5]} point2={[1, -1]} color="#94a3b8" weight={2} />
          <Text x={-1} y={0.3} color="#94a3b8" size={12}>B</Text>
          <Text x={1.2} y={1.2} color="#94a3b8" size={12}>C</Text>
          <Text x={1.2} y={-1.2} color="#94a3b8" size={12}>E</Text>
          
          {/* Collector Resistor Rc */}
          <Line.Segment point1={[1, 1]} point2={[1, 1.5]} color="#94a3b8" weight={2} />
          {drawResistor(1, 2, true)}
          <Text x={1.6} y={2} color="#94a3b8" size={14}>R_C</Text>
          <Line.Segment point1={[1, 2.5]} point2={[1, 4]} color="#94a3b8" weight={2} />

          {/* Emitter Connection */}
          {biasType === "divider" ? (
             <>
               <Line.Segment point1={[1, -1]} point2={[1, -1.2]} color="#94a3b8" weight={2} />
               {drawResistor(1, -1.5, false)} {/* Wait, should be vertical. Let's adjust coords. */}
               {/* Oops drawResistor expects (x,y) and vertical boolean. Let's manually draw Re vertical: */}
             </>
          ) : (
             <Line.Segment point1={[1, -1]} point2={[1, -2]} color="#94a3b8" weight={2} />
          )}
          
          {/* Special handling for Re */}
          {biasType === "divider" && (
            <>
              {drawResistor(1, -1.5, true)}
              <Text x={1.6} y={-1.5} color="#94a3b8" size={14}>R_E</Text>
              <Line.Segment point1={[1, -1]} point2={[1, -1.2]} color="#94a3b8" weight={2} />
              <Line.Segment point1={[1, -1.8]} point2={[1, -2]} color="#94a3b8" weight={2} />
            </>
          )}

          {/* Base Circuits */}
          {biasType === "two-source" && (
             <>
               <Line.Segment point1={[-1, 0]} point2={[-2, 0]} color="#94a3b8" weight={2} />
               {drawResistor(-2.5, 0, false)}
               <Text x={-2.5} y={0.5} color="#94a3b8" size={14}>R_B</Text>
               <Line.Segment point1={[-3, 0]} point2={[-3.5, 0]} color="#94a3b8" weight={2} />
               <Line.Segment point1={[-3.5, 0]} point2={[-3.5, -1.5]} color="#94a3b8" weight={2} />
               
               {/* Vbb Source */}
               <Line.Segment point1={[-3.8, -1.5]} point2={[-3.2, -1.5]} color="#3b82f6" weight={3} />
               <Line.Segment point1={[-3.6, -1.7]} point2={[-3.4, -1.7]} color="#3b82f6" weight={3} />
               <Line.Segment point1={[-3.5, -1.7]} point2={[-3.5, -2]} color="#94a3b8" weight={2} />
               <Text x={-4} y={-1.6} color="#3b82f6" size={14}>V_BB</Text>

               {/* Vcc Source */}
               <Line.Segment point1={[1, 4]} point2={[1, 3.5]} color="#94a3b8" weight={2} />
               <Line.Segment point1={[0.7, 3.5]} point2={[1.3, 3.5]} color="#3b82f6" weight={3} />
               <Line.Segment point1={[0.8, 3.3]} point2={[1.2, 3.3]} color="#3b82f6" weight={3} />
               <Text x={1.6} y={3.4} color="#3b82f6" size={14}>V_CC</Text>
             </>
          )}

          {biasType === "fixed" && (
             <>
               <Line.Segment point1={[-1, 0]} point2={[-2, 0]} color="#94a3b8" weight={2} />
               <Line.Segment point1={[-2, 0]} point2={[-2, 1]} color="#94a3b8" weight={2} />
               {drawResistor(-2, 1.5, true)}
               <Text x={-2.5} y={1.5} color="#94a3b8" size={14}>R_B</Text>
               <Line.Segment point1={[-2, 2]} point2={[-2, 4]} color="#94a3b8" weight={2} />
             </>
          )}

          {biasType === "feedback" && (
             <>
               <Line.Segment point1={[-1, 0]} point2={[-2, 0]} color="#94a3b8" weight={2} />
               <Line.Segment point1={[-2, 0]} point2={[-2, 1.5]} color="#94a3b8" weight={2} />
               <Line.Segment point1={[-2, 1.5]} point2={[-1, 1.5]} color="#94a3b8" weight={2} />
               {drawResistor(-0.5, 1.5, false)}
               <Text x={-0.5} y={2} color="#94a3b8" size={14}>R_B</Text>
               <Line.Segment point1={[0, 1.5]} point2={[1, 1.5]} color="#94a3b8" weight={2} />
             </>
          )}

          {biasType === "divider" && (
             <>
               <Line.Segment point1={[-1, 0]} point2={[-2, 0]} color="#94a3b8" weight={2} />
               
               {/* R1 (Top) */}
               <Line.Segment point1={[-2, 0]} point2={[-2, 1.5]} color="#94a3b8" weight={2} />
               {drawResistor(-2, 2, true)}
               <Text x={-2.5} y={2} color="#94a3b8" size={14}>R_1</Text>
               <Line.Segment point1={[-2, 2.5]} point2={[-2, 4]} color="#94a3b8" weight={2} />

               {/* R2 (Bottom) */}
               <Line.Segment point1={[-2, 0]} point2={[-2, -0.5]} color="#94a3b8" weight={2} />
               {drawResistor(-2, -1, true)}
               <Text x={-2.5} y={-1} color="#94a3b8" size={14}>R_2</Text>
               <Line.Segment point1={[-2, -1.5]} point2={[-2, -2]} color="#94a3b8" weight={2} />
             </>
          )}

        </Mafs>
      </div>
    </div>
  );
}
