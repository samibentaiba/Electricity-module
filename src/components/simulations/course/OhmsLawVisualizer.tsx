"use client";

import { useState, useEffect } from "react";
import { Mafs, Coordinates, Plot, Theme, Point, Text, Line } from "mafs";
import Latex from "react-latex-next";
import { Slider } from "@/components/ui/slider";

export function OhmsLawVisualizer() {
  const [voltage, setVoltage] = useState(9); // Volts
  const [resistance, setResistance] = useState(3); // Ohms
  const current = voltage / resistance; // Amperes

  const [time, setTime] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setTime(t => t + current * 0.05); // Speed depends on current
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [current]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        
        {/* Circuit Diagram with Animated Particles */}
        <div className="rounded-2xl border border-border/50 bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden shadow-inner h-[300px]">
          <h3 className="absolute top-4 left-4 font-bold text-slate-400 text-sm tracking-wider uppercase">Circuit Model</h3>
          
          <div className="relative w-64 h-40 border-4 border-slate-700 rounded-xl mt-4">
            {/* Battery */}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 w-16 h-16 flex flex-col items-center justify-center gap-1.5 z-10">
               <div className="absolute -top-1 left-2 text-amber-500 font-bold text-lg leading-none">+</div>
               <div className="w-10 h-1 bg-amber-500 rounded-full" />
               <div className="w-5 h-2 bg-amber-500 rounded-full" />
               <div className="absolute -bottom-1 left-2 text-amber-500 font-bold text-lg leading-none">-</div>
               <div className="absolute -left-10 text-amber-500 font-bold text-sm whitespace-nowrap">{voltage} V</div>
            </div>

            {/* Resistor */}
            <div className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 w-8 h-20 flex flex-col items-center justify-center">
              <svg width="20" height="60" viewBox="0 0 20 60" className="stroke-indigo-400 stroke-2 fill-none">
                <path d="M10,0 L10,10 L0,15 L20,25 L0,35 L20,45 L10,50 L10,60" />
              </svg>
              <div className="absolute -right-8 text-indigo-400 font-bold text-sm">{resistance}Ω</div>
            </div>

            {/* Animated electrons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
                const totalLength = 64 * 2 + 40 * 2; // Rough perimeter
                const pos = ((time + i * (totalLength / 8)) % totalLength) / totalLength;
                
                // Map pos (0 to 1) to coordinates along the border
                let x = 0, y = 0;
                if (pos < 0.25) { x = pos * 4; y = 0; } // top edge
                else if (pos < 0.5) { x = 1; y = (pos - 0.25) * 4; } // right edge
                else if (pos < 0.75) { x = 1 - (pos - 0.5) * 4; y = 1; } // bottom edge
                else { x = 0; y = 1 - (pos - 0.75) * 4; } // left edge

                return (
                  <div 
                    key={i} 
                    className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)] -ml-1 -mt-1"
                    style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
                  />
                );
              })}
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 text-blue-400 font-mono text-lg font-bold">
            I = {current.toFixed(2)}A
          </div>
        </div>

        {/* V-I Graph */}
        <div className="rounded-2xl border border-border/50 bg-background/50 flex flex-col items-center justify-center shadow-sm overflow-hidden h-[300px] relative">
           <h3 className="absolute top-4 left-4 font-bold text-slate-400 text-sm tracking-wider uppercase z-10">V-I Curve</h3>
           <Mafs height={300} viewBox={{ y: [-1, 6], x: [-1, 25] }} preserveAspectRatio={false}>
            <Coordinates.Cartesian subdivisions={2} xAxis={{ labels: (x) => x % 5 === 0 ? x : "" }} yAxis={{ labels: (y) => y % 2 === 0 ? y : "" }} />
            <Text x={23} y={-0.5} color={Theme.foreground}>Voltage (V)</Text>
            <Text x={-0.5} y={5.5} color={Theme.foreground}>Current (A)</Text>
            
            {/* The line I = V / R */}
            <Plot.OfX y={(v) => v / resistance} color={Theme.indigo} weight={2} />
            
            {/* Current Operating Point */}
            <Point x={voltage} y={current} color={Theme.orange} />
            <Line.Segment 
               point1={[-1, current]} 
               point2={[voltage, current]} 
               color={Theme.orange} 
               style="dashed"
            />
            <Line.Segment 
               point1={[voltage, -1]} 
               point2={[voltage, current]} 
               color={Theme.orange} 
               style="dashed"
            />
          </Mafs>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-xl border border-border/50">
        <div className="flex flex-col gap-6">
          <h3 className="font-bold text-lg">Adjust Parameters</h3>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-amber-500">Voltage (V)</label>
              <span className="font-mono bg-amber-500/10 text-amber-500 px-2 py-1 rounded text-sm">{voltage} V</span>
            </div>
            <Slider 
              min={0} max={24} step={0.5} 
              value={[voltage]} 
              onValueChange={(val) => setVoltage((Array.isArray(val) ? val[0] : val))} 
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-indigo-400">Resistance (R)</label>
              <span className="font-mono bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded text-sm">{resistance} Ω</span>
            </div>
            <Slider 
              min={1} max={20} step={0.5} 
              value={[resistance]} 
              onValueChange={(val) => setResistance((Array.isArray(val) ? val[0] : val))} 
            />
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center font-mono text-xl border-l border-border/50 pl-6">
          <div className="text-center mb-6 space-y-4">
             <div className="text-sm text-muted-foreground uppercase tracking-wider font-sans font-bold">Ohm&apos;s Law</div>
             <Latex>{`$$ I = \\frac{V}{R} $$`}</Latex>
             <div className="pt-2">
                <Latex>{`$$ I = \\frac{${voltage}}{${resistance}} = \\mathbf{${current.toFixed(2)}\\text{ A}} $$`}</Latex>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
