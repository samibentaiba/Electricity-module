"use client";

import { useState } from "react";
import { Mafs, Coordinates, Plot, Line, Text, Point, Theme } from "mafs";
import "mafs/core.css";
import "mafs/font.css";

export function TransistorLoadLineVisualizer() {
  const [ib, setIb] = useState(20); // Base current in uA (10, 20, 30, 40)
  const [vcc, setVcc] = useState(12); // Supply voltage in V
  const [rc, setRc] = useState(1); // Collector resistor in kOhms

  // Transistor parameters
  const beta = 100;

  // Maximum scale values for the graph
  const maxVce = 20;
  const maxIc = 20; // mA

  // Load line endpoints
  // Ic = (Vcc - Vce) / Rc
  // When Vce = 0, Ic = Vcc / Rc
  // When Ic = 0, Vce = Vcc
  const loadLineMaxIc = vcc / rc;

  // The transistor characteristic curves
  // Each curve corresponds to a specific Ib
  const ibValues = [10, 20, 30, 40, 50]; // uA

  // Generate a curve function for a specific Ib
  // It has a linear ohmic region then saturates at Ic = beta * Ib
  const generateCurve = (currentIb: number) => {
    const satIc = (beta * currentIb) / 1000; // converted to mA
    return (vce: number) => {
      if (vce < 0) return 0;
      // Exponential rise then flattening out with a slight Early effect slope
      const earlyEffect = 0.01 * vce;
      const saturationK = 5; // how fast it saturates
      return satIc * (1 - Math.exp(-saturationK * vce)) + earlyEffect;
    };
  };

  // Find Q-Point: intersection of load line and the selected Ib curve
  // We'll approximate it numerically or by plugging into the function since it's monotonic
  let qVce = vcc;
  let qIc = 0;
  
  // Numerical approximation for Q-point
  const activeCurve = generateCurve(ib);
  for (let v = 0; v <= vcc; v += 0.1) {
    const curveIc = activeCurve(v);
    const loadIc = (vcc - v) / rc;
    if (curveIc >= loadIc) {
      qVce = v;
      qIc = loadIc;
      break;
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
      {/* Controls */}
      <div className="p-6 bg-slate-800/50 md:w-1/3 flex flex-col justify-center space-y-6 border-b md:border-b-0 md:border-r border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Load Line & Q-Point</h3>
          <p className="text-slate-400 text-sm">
            Adjust the base current and external circuit components to see how the Operating Point (Q-Point) shifts along the Load Line.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1 font-mono">
              <span className="text-slate-400 text-xs">Base Current (I_B)</span>
              <span className="text-amber-400 font-bold">{ib} µA</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={ib}
              onChange={(e) => setIb(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1 font-mono">
              <span className="text-slate-400 text-xs">Supply Voltage (V_CC)</span>
              <span className="text-blue-400 font-bold">{vcc} V</span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              step="1"
              value={vcc}
              onChange={(e) => setVcc(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1 font-mono">
              <span className="text-slate-400 text-xs">Collector Resistor (R_C)</span>
              <span className="text-purple-400 font-bold">{rc} kΩ</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              value={rc}
              onChange={(e) => setRc(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-2 mt-4">
          <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Q-Point Coordinates</div>
          <div className="flex justify-around">
             <div>
                <div className="text-xs text-slate-400">V_CEQ</div>
                <div className="text-xl font-mono text-emerald-400">{qVce.toFixed(1)}V</div>
             </div>
             <div className="w-px bg-slate-800" />
             <div>
                <div className="text-xs text-slate-400">I_CQ</div>
                <div className="text-xl font-mono text-emerald-400">{qIc.toFixed(1)}mA</div>
             </div>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="p-8 md:w-2/3 flex items-center justify-center min-h-[450px] bg-slate-950 relative overflow-hidden">
        
        <div className="w-full h-full">
           <Mafs viewBox={{ x: [-2, maxVce + 2], y: [-2, maxIc + 2] }} preserveAspectRatio={false}>
             <Coordinates.Cartesian 
               xAxis={{ labels: (x) => x > 0 && x % 5 === 0 ? `${x}V` : "", axis: true, lines: 5 }}
               yAxis={{ labels: (y) => y > 0 && y % 5 === 0 ? `${y}mA` : "", axis: true, lines: 5 }}
             />
             
             {/* Axis Labels */}
             <Text x={maxVce} y={-1.5} color="#64748b" size={14}>V_CE</Text>
             <Text x={-1.5} y={maxIc} color="#64748b" size={14}>I_C</Text>

             {/* Background curves for various I_b values */}
             {ibValues.map((val) => (
                <Plot.OfX 
                  key={val} 
                  y={generateCurve(val)} 
                  color="#475569" 
                  weight={1} 
                  opacity={0.5} 
                />
             ))}
             
             {/* Labels for the background curves */}
             {ibValues.map((val) => (
                <Text key={`text-${val}`} x={maxVce - 2} y={generateCurve(val)(maxVce - 2) + 0.5} color="#475569" size={12}>
                  {val}µA
                </Text>
             ))}

             {/* Active curve for selected I_b */}
             <Plot.OfX 
               y={generateCurve(ib)} 
               color="#f59e0b" 
               weight={3} 
             />
             <Text x={maxVce - 2} y={generateCurve(ib)(maxVce - 2) + 0.8} color="#f59e0b" size={14} svgTextProps={{ fontWeight: "bold" }}>
                I_B = {ib}µA
             </Text>

             {/* The Load Line */}
             <Line.Segment 
               point1={[0, loadLineMaxIc]} 
               point2={[vcc, 0]} 
               color={Theme.blue} 
               weight={2} 
             />
             
             {/* Load Line Endpoints */}
             <Point x={0} y={loadLineMaxIc} color={Theme.blue} />
             <Text x={2} y={loadLineMaxIc} color={Theme.blue} size={12}>V_CC / R_C</Text>
             
             <Point x={vcc} y={0} color={Theme.blue} />
             <Text x={vcc} y={-1} color={Theme.blue} size={12}>V_CC</Text>

             {/* The Q-Point */}
             {qVce < vcc && qIc < maxIc && (
               <>
                 <Line.Segment point1={[0, qIc]} point2={[qVce, qIc]} color="#10b981" style="dashed" opacity={0.5} />
                 <Line.Segment point1={[qVce, 0]} point2={[qVce, qIc]} color="#10b981" style="dashed" opacity={0.5} />
                 <Point x={qVce} y={qIc} color="#10b981" />
                 <Text x={qVce + 1.5} y={qIc + 1} color="#10b981" size={16} svgTextProps={{ fontWeight: "bold" }}>Q</Text>
               </>
             )}

           </Mafs>
        </div>

      </div>
    </div>
  );
}
