"use client";

import { useState } from "react";
import Latex from "react-latex-next";
import { Slider } from "@/components/ui/slider";
import { Mafs, Line, Polygon, Text, Point, Theme } from "mafs";
import "mafs/core.css";
import "mafs/font.css";

export function CurrentDivider() {
  const [iin, setIin] = useState(10);
  const [r1, setR1] = useState(10);
  const [r2, setR2] = useState(20);

  // Req = 1 / (1/R1 + 1/R2)
  const req = 1 / (1 / r1 + 1 / r2);
  const i1 = iin * (req / r1);
  const i2 = iin * (req / r2);

  const drawResistor = (x: number, y: number, isVertical: boolean, label: string, color: string, valueStr: string) => {
    const w = isVertical ? 0.3 : 0.75;
    const h = isVertical ? 0.75 : 0.3;
    return (
      <g>
        <Polygon points={[[x - w, y + h], [x + w, y + h], [x + w, y - h], [x - w, y - h]]} color={color} fillOpacity={0.2} />
        <Text x={isVertical ? x + 0.8 : x} y={isVertical ? y + 0.2 : y + 0.6} color={color} size={16}>{label}</Text>
        <Text x={isVertical ? x + 0.8 : x} y={isVertical ? y - 0.2 : y + 0.9} color={color} size={14}>{valueStr}</Text>
      </g>
    );
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Visual Circuit */}
        <div className="bg-slate-950 p-6 rounded-2xl flex flex-col relative overflow-hidden border border-slate-800 shadow-inner min-h-[450px]">
           <h3 className="font-bold text-slate-500 text-xs tracking-widest uppercase mb-4">Live Schematic</h3>
           
           <div className="flex-1 w-full h-full">
             <Mafs zoom={false} pan={false} viewBox={{ x: [-3, 3], y: [-3, 3] }}>
                
                {/* Current Source */}
                <circle cx={-2} cy={0} r={0.6} stroke={Theme.foreground} fill="transparent" strokeWidth={2} />
                <Line.Segment point1={[-2, -0.4]} point2={[-2, 0.4]} color={Theme.foreground} weight={2} />
                <Polygon points={[[-2, 0.5], [-2.15, 0.2], [-1.85, 0.2]]} color={Theme.foreground} />
                <Line.Segment point1={[-2, 0.6]} point2={[-2, 2]} color={Theme.foreground} weight={2} />
                <Line.Segment point1={[-2, -0.6]} point2={[-2, -2]} color={Theme.foreground} weight={2} />
                
                <Text x={-2.8} y={0.3} color={Theme.amber} size={16}>I_in</Text>
                <Text x={-2.8} y={-0.3} color={Theme.amber} size={14}>{iin}A</Text>

                {/* Top Wire */}
                <Line.Segment point1={[-2, 2]} point2={[1, 2]} color={Theme.foreground} weight={2} />

                {/* Branch 1 */}
                <Point x={-0.5} y={2} color={Theme.foreground} />
                <Line.Segment point1={[-0.5, 2]} point2={[-0.5, 1.75]} color={Theme.foreground} weight={2} />
                {drawResistor(-0.5, 1, true, "R1", Theme.indigo, `${r1}Ω`)}
                <Line.Segment point1={[-0.5, 0.25]} point2={[-0.5, -2]} color={Theme.foreground} weight={2} />
                <Point x={-0.5} y={-2} color={Theme.foreground} />

                {/* Branch 2 */}
                <Line.Segment point1={[1, 2]} point2={[1, 1.75]} color={Theme.foreground} weight={2} />
                {drawResistor(1, 1, true, "R2", Theme.purple, `${r2}Ω`)}
                <Line.Segment point1={[1, 0.25]} point2={[1, -2]} color={Theme.foreground} weight={2} />

                {/* Bottom Wire */}
                <Line.Segment point1={[-2, -2]} point2={[1, -2]} color={Theme.foreground} weight={2} />

                {/* Current Arrows & Labels */}
                <Polygon points={[[-1.3, 2.2], [-1.3, 1.8], [-1, 2]]} color={Theme.amber} />
                <Text x={-1.1} y={2.5} color={Theme.amber} size={14}>{iin}A</Text>

                <Polygon points={[[-0.7, 0.2], [-0.3, 0.2], [-0.5, -0.1]]} color={Theme.indigo} />
                <Text x={-1.2} y={0} color={Theme.indigo} size={14}>I1 = {i1.toFixed(2)}A</Text>

                <Polygon points={[0.8, 0.2], [1.2, 0.2], [1, -0.1]} color={Theme.purple} />
                <Text x={0.3} y={0} color={Theme.purple} size={14}>I2 = {i2.toFixed(2)}A</Text>

             </Mafs>
           </div>
        </div>

        {/* Adjustments & Results */}
        <div className="flex flex-col gap-6 bg-slate-900/50 p-6 rounded-xl border border-slate-800 justify-center">
           <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-amber-500">Total Current (I_in)</label>
                <span className="font-mono bg-amber-500/10 text-amber-500 px-2 py-1 rounded text-sm">{iin} A</span>
              </div>
              <Slider min={1} max={100} step={1} value={[iin]} onValueChange={(val) => setIin(Array.isArray(val) ? val[0] : val)} className="**:data-[slot=slider-range]:bg-amber-500 **:data-[slot=slider-thumb]:ring-amber-500" />
           </div>

           <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-indigo-400">Branch 1 (R1)</label>
                <span className="font-mono bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded text-sm">{r1} Ω</span>
              </div>
              <Slider min={1} max={100} step={1} value={[r1]} onValueChange={(val) => setR1(Array.isArray(val) ? val[0] : val)} className="**:data-[slot=slider-range]:bg-indigo-400 **:data-[slot=slider-thumb]:ring-indigo-400" />
           </div>

           <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-purple-400">Branch 2 (R2)</label>
                <span className="font-mono bg-purple-500/10 text-purple-400 px-2 py-1 rounded text-sm">{r2} Ω</span>
              </div>
              <Slider min={1} max={100} step={1} value={[r2]} onValueChange={(val) => setR2(Array.isArray(val) ? val[0] : val)} className="**:data-[slot=slider-range]:bg-purple-400 **:data-[slot=slider-thumb]:ring-purple-400" />
           </div>

           <div className="mt-4 pt-4 border-t border-slate-800 flex justify-around">
              <div className="text-center">
                <p className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-2">I1 Output</p>
                <div className="text-3xl font-black text-indigo-400">{i1.toFixed(2)} A</div>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-2">I2 Output</p>
                <div className="text-3xl font-black text-purple-400">{i2.toFixed(2)} A</div>
              </div>
           </div>
           
           <div className="text-center text-slate-300 border-t border-slate-800 pt-4">
              <Latex>{`$$ I_x = I_{in} \\times \\frac{R_{eq}}{R_x} $$`}</Latex>
           </div>
        </div>
      </div>
    </div>
  );
}
