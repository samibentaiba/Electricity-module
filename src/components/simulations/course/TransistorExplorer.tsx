"use client";

import { useState } from "react";
import { Mafs, Polygon, Line, Text, Point } from "mafs";
import "mafs/core.css";
import "mafs/font.css";

export function TransistorExplorer() {
  const [type, setType] = useState<"NPN" | "PNP">("NPN");

  // Colors
  const nLayerColor = "#bfdbfe"; // blue-200
  const pLayerColor = "#fecdd3"; // rose-200

  // Configuration based on type
  const c1 = type === "NPN" ? nLayerColor : pLayerColor;
  const c2 = type === "NPN" ? pLayerColor : nLayerColor;
  const c3 = type === "NPN" ? nLayerColor : pLayerColor;

  const t1 = type === "NPN" ? "N" : "P";
  const t2 = type === "NPN" ? "P" : "N";
  const t3 = type === "NPN" ? "N" : "P";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
      {/* Controls */}
      <div className="p-6 bg-slate-800/50 md:w-1/3 flex flex-col justify-center space-y-6 border-b md:border-b-0 md:border-r border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Transistor Structure & Symbol</h3>
          <p className="text-slate-400 text-sm mb-4">
            A Bipolar Junction Transistor (BJT) consists of three doped semiconductor layers. 
            The emitter arrow on the symbol always points in the direction of conventional current.
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-lg">
          <button
            onClick={() => setType("NPN")}
            className={`flex-1 py-3 rounded-md text-sm font-bold transition-all ${type === "NPN" ? "bg-indigo-500 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
          >
            NPN Transistor
          </button>
          <button
            onClick={() => setType("PNP")}
            className={`flex-1 py-3 rounded-md text-sm font-bold transition-all ${type === "PNP" ? "bg-purple-500 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
          >
            PNP Transistor
          </button>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-sm text-slate-300">
          <div className="font-mono text-amber-400 font-bold border-b border-slate-800 pb-2 mb-2">Current Rule: I_E = I_B + I_C</div>
          
          {type === "NPN" ? (
            <ul className="space-y-2 list-disc pl-4">
              <li><strong>Emitter (N):</strong> Heavily doped, emits electrons.</li>
              <li><strong>Base (P):</strong> Very thin, lightly doped. Passes electrons.</li>
              <li><strong>Collector (N):</strong> Moderately doped, collects electrons.</li>
              <li className="text-emerald-400 pt-2 font-bold">Arrow points OUT (Not Pointing iN).</li>
            </ul>
          ) : (
            <ul className="space-y-2 list-disc pl-4">
              <li><strong>Emitter (P):</strong> Heavily doped, emits holes.</li>
              <li><strong>Base (N):</strong> Very thin, lightly doped. Passes holes.</li>
              <li><strong>Collector (P):</strong> Moderately doped, collects holes.</li>
              <li className="text-emerald-400 pt-2 font-bold">Arrow points IN (Pointing iN Proudly).</li>
            </ul>
          )}
        </div>
      </div>

      {/* Visualization */}
      <div className="p-8 md:w-2/3 flex flex-col items-center justify-center min-h-[450px] bg-slate-950 space-y-8">
        
        {/* Physical Structure */}
        <div className="w-full flex justify-center">
          <div className="h-40 w-full max-w-[400px]">
            <Mafs zoom={false} pan={false} viewBox={{ x: [0, 8], y: [-1, 2] }} preserveAspectRatio={false}>
               {/* Emitter */}
             <Polygon points={[[1, 0], [3, 0], [3, 2], [1, 2]]} color={c1} fillOpacity={0.5} />
             <Text x={2} y={1} color="#1e293b" size={24}>{t1}</Text>
             <Text x={2} y={2.5} color="#cbd5e1">Emitter</Text>

             {/* Base */}
             <Polygon points={[[3, 0], [4, 0], [4, 2], [3, 2]]} color={c2} fillOpacity={0.5} />
             <Text x={3.5} y={1} color="#1e293b" size={24}>{t2}</Text>
             <Text x={3.5} y={-0.5} color="#cbd5e1">Base</Text>

             {/* Collector */}
             <Polygon points={[[4, 0], [7, 0], [7, 2], [4, 2]]} color={c3} fillOpacity={0.5} />
             <Text x={5.5} y={1} color="#1e293b" size={24}>{t3}</Text>
             <Text x={5.5} y={2.5} color="#cbd5e1">Collector</Text>

             {/* Terminals */}
             <Line.Segment point1={[0, 1]} point2={[1, 1]} color="#94a3b8" weight={3} />
             <Line.Segment point1={[3.5, 0]} point2={[3.5, -0.8]} color="#94a3b8" weight={3} />
             <Line.Segment point1={[7, 1]} point2={[8, 1]} color="#94a3b8" weight={3} />
             
             <Point x={0} y={1} color="#94a3b8" />
             <Point x={3.5} y={-0.8} color="#94a3b8" />
             <Point x={8} y={1} color="#94a3b8" />
             
             {/* Current Arrows */}
             {type === "NPN" ? (
               <>
                 <Polygon points={[[0.4, 1.2], [0.8, 1], [0.4, 0.8]]} color="#fbbf24" />
                 <Text x={0.6} y={1.5} color="#fbbf24" size={12}>I_E</Text>
                 
                 <Polygon points={[[3.3, -0.6], [3.5, -0.2], [3.7, -0.6]]} color="#fbbf24" />
                 <Text x={3.9} y={-0.4} color="#fbbf24" size={12}>I_B</Text>
                 
                 <Polygon points={[[7.6, 1.2], [7.2, 1], [7.6, 0.8]]} color="#fbbf24" />
                 <Text x={7.4} y={1.5} color="#fbbf24" size={12}>I_C</Text>
               </>
             ) : (
               <>
                 <Polygon points={[[0.8, 1.2], [0.4, 1], [0.8, 0.8]]} color="#fbbf24" />
                 <Text x={0.6} y={1.5} color="#fbbf24" size={12}>I_E</Text>
                 
                 <Polygon points={[[3.3, -0.2], [3.5, -0.6], [3.7, -0.2]]} color="#fbbf24" />
                 <Text x={3.9} y={-0.4} color="#fbbf24" size={12}>I_B</Text>
                 
                 <Polygon points={[[7.2, 1.2], [7.6, 1], [7.2, 0.8]]} color="#fbbf24" />
                 <Text x={7.4} y={1.5} color="#fbbf24" size={12}>I_C</Text>
               </>
             )}
            </Mafs>
          </div>
        </div>

        {/* Schematic Symbol */}
        <div className="w-full flex justify-center border-t border-slate-800 pt-8">
          <div className="h-40 w-full max-w-[300px]">
            <Mafs zoom={false} pan={false} viewBox={{ x: [-2, 2], y: [-2, 2] }} preserveAspectRatio={false}>
              {/* The circle */}
            <Polygon 
               points={Array.from({length: 40}).map((_, i) => [1.5 * Math.cos(i * 2 * Math.PI / 40), 1.5 * Math.sin(i * 2 * Math.PI / 40)])} 
               color="#cbd5e1" 
               fillOpacity={0} 
               weight={2} 
            />

            {/* Base line */}
            <Line.Segment point1={[-0.5, 0.8]} point2={[-0.5, -0.8]} color="#cbd5e1" weight={4} />
            
            {/* Base terminal */}
            <Line.Segment point1={[-2, 0]} point2={[-0.5, 0]} color="#94a3b8" weight={2} />
            <Text x={-1.8} y={0.3} color="#94a3b8" size={14}>B</Text>

            {/* Collector terminal */}
            <Line.Segment point1={[-0.5, 0.5]} point2={[1, 1.5]} color="#94a3b8" weight={2} />
            <Line.Segment point1={[1, 1.5]} point2={[1, 2]} color="#94a3b8" weight={2} />
            <Text x={1.3} y={1.8} color="#94a3b8" size={14}>C</Text>

            {/* Emitter terminal */}
            <Line.Segment point1={[-0.5, -0.5]} point2={[1, -1.5]} color="#94a3b8" weight={2} />
            <Line.Segment point1={[1, -1.5]} point2={[1, -2]} color="#94a3b8" weight={2} />
            <Text x={1.3} y={-1.8} color="#94a3b8" size={14}>E</Text>

            {/* The Emitter Arrow */}
            {type === "NPN" ? (
               // Pointing OUT (towards E)
               <Polygon points={[[0.8, -1.5], [1, -1.1], [0.5, -1.2]]} color="#cbd5e1" />
            ) : (
               // Pointing IN (towards B)
               <Polygon points={[[-0.2, -0.5], [0.1, -0.9], [0.3, -0.3]]} color="#cbd5e1" />
            )}

            </Mafs>
          </div>
        </div>

      </div>
    </div>
  );
}
