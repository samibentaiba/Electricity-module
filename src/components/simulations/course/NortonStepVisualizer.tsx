"use client";

import { useState } from "react";
import { Mafs, Line, Text, Point, Polygon } from "mafs";
import "mafs/core.css";
import "mafs/font.css";

export function NortonStepVisualizer() {
  const [step, setStep] = useState(1);

  // V = 12V, R1 = 4Ω, R2 = 8Ω, R_load = 5Ω
  const V_src = 12;
  const R1 = 4;
  const R2 = 8;
  const R_L = 5;

  // Norton calculations
  const I_N = V_src / R1; // Shorting A to B shorts out R2, so I_N = 12/4 = 3A
  const R_N = (R1 * R2) / (R1 + R2); // (4*8)/12 = 32/12 = 2.67Ω

  // Polyline helper
  const Polyline = ({ points, color, weight, style = "solid" }: { points: [number, number][], color: string, weight: number, style?: "solid" | "dashed" }) => {
    return (
      <>
        {points.slice(0, -1).map((p1, i) => (
          <Line.Segment key={i} point1={p1} point2={points[i + 1]} color={color} weight={weight} style={style} />
        ))}
      </>
    );
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
    return <Polyline points={segments as [number, number][]} color="#94a3b8" weight={3} />;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
      {/* Controls */}
      <div className="p-6 bg-slate-800/50 md:w-1/3 flex flex-col justify-center space-y-6 border-b md:border-b-0 md:border-r border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Norton Equivalent Steps</h3>
          <p className="text-slate-400 text-sm mb-4">
            Follow the steps to convert a complex circuit into its Norton Equivalent.
          </p>
          
          <div className="space-y-2">
            {[1, 2, 3, 4].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all border ${
                  step === s 
                    ? "bg-blue-500/20 border-blue-500 text-blue-300 font-bold" 
                    : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300"
                }`}
              >
                <span className="inline-block w-6 h-6 text-center rounded-full bg-slate-800 mr-3 text-xs leading-6">{s}</span>
                {s === 1 && "Original Circuit"}
                {s === 2 && "Short Terminals (Find I_N)"}
                {s === 3 && "Short Source (Find R_N)"}
                {s === 4 && "Equivalent Circuit"}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-500 font-mono mb-2 uppercase tracking-wider">Calculations:</div>
          {step === 1 && <div className="text-sm text-slate-300">Target: simplify circuit for Load R_L.</div>}
          {step === 2 && (
            <div className="text-sm font-mono text-blue-400">
              I_N = V_src / R1 (R2 is shorted)<br/>
              I_N = {V_src} / {R1} = {I_N.toFixed(2)}A
            </div>
          )}
          {step === 3 && (
            <div className="text-sm font-mono text-amber-400">
              R_N = R1 || R2<br/>
              R_N = ({R1} × {R2}) / ({R1+R2}) = {R_N.toFixed(2)}Ω
            </div>
          )}
          {step === 4 && (
            <div className="text-sm font-mono text-emerald-400">
              I_Load = I_N × (R_N / (R_N + R_L))<br/>
              I_Load = {I_N.toFixed(2)} × ({R_N.toFixed(2)} / {(R_N + R_L).toFixed(2)}) = {(I_N * (R_N / (R_N + R_L))).toFixed(3)}A
            </div>
          )}
        </div>
      </div>

      {/* Visualization */}
      <div className="p-8 md:w-2/3 flex items-center justify-center min-h-[400px] bg-slate-950">
        <Mafs zoom={false} pan={false} viewBox={{ x: [-4, 6], y: [-3, 3] }}>
          
          {(step === 1 || step === 2 || step === 3) && (
            <>
              {/* Outer Loop */}
              <Line.Segment point1={[-3, 2]} point2={[3, 2]} color="#475569" weight={2} />
              <Line.Segment point1={[-3, -2]} point2={[3, -2]} color="#475569" weight={2} />
              
              <Line.Segment point1={[-3, 2]} point2={[-3, 0.5]} color="#475569" weight={2} />
              <Line.Segment point1={[-3, -0.5]} point2={[-3, -2]} color="#475569" weight={2} />
              
              <Line.Segment point1={[3, 2]} point2={[3, -2]} color="#475569" weight={2} />

              {/* Middle branch */}
              <Line.Segment point1={[0, 2]} point2={[0, 1]} color="#475569" weight={2} />
              <Line.Segment point1={[0, -1]} point2={[0, -2]} color="#475569" weight={2} />

              {/* Components */}
              {drawResistor(-1.5, 2, false)}
              <Text x={-1.5} y={2.5} color="#94a3b8">R1 (4Ω)</Text>

              {drawResistor(0, 0, true)}
              <Text x={1} y={0} color="#94a3b8">R2 (8Ω)</Text>

              {/* Voltage Source */}
              {step === 3 ? (
                 <Line.Segment point1={[-3, 0.5]} point2={[-3, -0.5]} color="#f59e0b" weight={4} style="dashed" />
              ) : (
                <>
                  <Line.Segment point1={[-3.5, 0.5]} point2={[-2.5, 0.5]} color="#f59e0b" weight={4} />
                  <Line.Segment point1={[-3.2, -0.5]} point2={[-2.8, -0.5]} color="#f59e0b" weight={4} />
                  <Text x={-3.8} y={0} color="#f59e0b" size={20}>V</Text>
                </>
              )}

              {/* Nodes A and B */}
              <Point x={3} y={1} color="#e2e8f0" />
              <Text x={3.4} y={1} color="#e2e8f0">A</Text>
              <Point x={3} y={-1} color="#e2e8f0" />
              <Text x={3.4} y={-1} color="#e2e8f0">B</Text>

              {/* Terminals extending to the right */}
              <Line.Segment point1={[3, 1]} point2={[4, 1]} color="#e2e8f0" weight={2} />
              <Line.Segment point1={[3, -1]} point2={[4, -1]} color="#e2e8f0" weight={2} />
              <Point x={4} y={1} color="#e2e8f0" />
              <Point x={4} y={-1} color="#e2e8f0" />

              {/* Load resistor */}
              {step === 1 && (
                <>
                  <Line.Segment point1={[4, 1]} point2={[4, 0.5]} color="#fb7185" weight={2} />
                  <Line.Segment point1={[4, -1]} point2={[4, -0.5]} color="#fb7185" weight={2} />
                  {drawResistor(4, 0, true)}
                  <Text x={5.2} y={0} color="#fb7185">R_Load</Text>
                </>
              )}
              
              {/* Highlight I_N */}
              {step === 2 && (
                <>
                  <Line.Segment point1={[4, 1]} point2={[4, -1]} color="#60a5fa" weight={4} />
                  <Polygon points={[[4, 0], [3.8, 0.2], [4.2, 0.2]]} color="#60a5fa" />
                  <Text x={4.8} y={0} color="#60a5fa">I_N</Text>
                </>
              )}

              {/* Highlight R_N */}
              {step === 3 && (
                <>
                  <Polygon points={[[4.2, 0], [4.6, 0.2], [4.6, -0.2]]} color="#fcd34d" />
                  <Line.Segment point1={[4.6, 0]} point2={[5.2, 0]} color="#fcd34d" weight={2} style="dashed" />
                  <Text x={5.6} y={0} color="#fcd34d">R_N</Text>
                </>
              )}
            </>
          )}

          {/* Step 4: Norton Equivalent */}
          {step === 4 && (
             <>
                <Line.Segment point1={[-2, 1]} point2={[4, 1]} color="#475569" weight={2} />
                <Line.Segment point1={[-2, -1]} point2={[4, -1]} color="#475569" weight={2} />
                <Line.Segment point1={[-2, 1]} point2={[-2, -1]} color="#475569" weight={2} />
                
                {/* Current Source I_N */}
                <Polygon points={[[-2, 0], [-2.3, -0.4], [-1.7, -0.4]]} color="#60a5fa" />
                <Text x={-2.8} y={0} color="#60a5fa">I_N</Text>

                {/* Parallel R_N */}
                <Line.Segment point1={[1, 1]} point2={[1, 0.5]} color="#475569" weight={2} />
                <Line.Segment point1={[1, -1]} point2={[1, -0.5]} color="#475569" weight={2} />
                {drawResistor(1, 0, true)}
                <Text x={2} y={0} color="#fcd34d">R_N</Text>

                {/* Terminals A and B */}
                <Point x={3} y={1} color="#e2e8f0" />
                <Text x={2.8} y={1.4} color="#e2e8f0">A</Text>
                <Point x={3} y={-1} color="#e2e8f0" />
                <Text x={2.8} y={-1.4} color="#e2e8f0">B</Text>

                {/* Load */}
                <Line.Segment point1={[4, 1]} point2={[4, 0.5]} color="#fb7185" weight={2} />
                <Line.Segment point1={[4, -1]} point2={[4, -0.5]} color="#fb7185" weight={2} />
                {drawResistor(4, 0, true)}
                <Text x={5} y={0} color="#fb7185">R_Load</Text>
             </>
          )}

        </Mafs>
      </div>
    </div>
  );
}
