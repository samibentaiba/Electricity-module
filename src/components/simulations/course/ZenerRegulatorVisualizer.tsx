"use client";

import React, { useState, useEffect } from "react";
import { Mafs, Coordinates, Plot, Theme, Line, Point, Polygon, Text } from "mafs";
import { Play, Pause } from "lucide-react";
import "mafs/core.css";
import "mafs/font.css";

export function ZenerRegulatorVisualizer() {
  const [vinDC, setVinDC] = useState(12);
  const [rippleAmplitude, setRippleAmplitude] = useState(3);
  const [vz, setVz] = useState(5.1);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Time loop for animation
  useEffect(() => {
    if (!isPlaying) return;
    let animationFrameId: number;
    let lastTime = performance.now();
    const loop = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setTime((prev) => (prev + deltaTime * 0.5) % 4); // loops at 4s
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]);

  // Input voltage with ripple: V_in(t) = V_DC + V_ripple * sin(2*pi*f*t)
  const inputSignal = (t: number) => vinDC + rippleAmplitude * Math.sin(2 * Math.PI * 2 * t);
  const vin = inputSignal(time);
  
  // Output voltage is clamped by the Zener diode
  const vout = Math.min(vin, vz);
  const isRegulating = vin > vz;

  // Helpers for drawing circuit
  const drawResistor = (x: number, y: number, isVertical: boolean = true, label: string) => {
    const size = 0.6;
    return (
      <g>
        {isVertical ? (
          <Polygon 
            points={[[x - 0.2, y + size], [x + 0.2, y + size], [x + 0.2, y - size], [x - 0.2, y - size]]}
            color={Theme.blue}
            fillOpacity={0.2}
          />
        ) : (
          <Polygon 
            points={[[x - size, y + 0.2], [x + size, y + 0.2], [x + size, y - 0.2], [x - size, y - 0.2]]}
            color={Theme.blue}
            fillOpacity={0.2}
          />
        )}
        <Text x={isVertical ? x + 0.5 : x} y={isVertical ? y : y + 0.5} color={Theme.foreground} size={14}>{label}</Text>
      </g>
    );
  };

  const drawZener = (x: number, y: number, isRegulating: boolean) => {
    const color = isRegulating ? Theme.green : Theme.red;
    return (
      <g>
        {/* Triangle (pointing DOWN because it's reverse biased, so cathode is UP) */}
        <Polygon points={[[x - 0.4, y - 0.3], [x + 0.4, y - 0.3], [x, y + 0.3]]} color={color} fillOpacity={isRegulating ? 0.8 : 0.2} />
        {/* Zener Bar (with the little flags) */}
        <Line.Segment point1={[x - 0.4, y + 0.3]} point2={[x + 0.4, y + 0.3]} color={color} weight={3} />
        <Line.Segment point1={[x - 0.4, y + 0.3]} point2={[x - 0.4, y + 0.5]} color={color} weight={3} />
        <Line.Segment point1={[x + 0.4, y + 0.3]} point2={[x + 0.4, y + 0.1]} color={color} weight={3} />
        
        {/* Wire through it */}
        <Line.Segment point1={[x, y + 0.3]} point2={[x, y + 1]} color={Theme.foreground} weight={2} />
        <Line.Segment point1={[x, y - 0.3]} point2={[x, y - 1]} color={Theme.foreground} weight={2} />
        
        <Text x={x + 0.7} y={y} color={color} size={14}>D_z</Text>
        <Text x={x + 0.7} y={y - 0.4} color={color} size={12}>{isRegulating ? "REGULATING" : "OFF"}</Text>
      </g>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Header & Controls */}
      <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row gap-6 bg-slate-800/50">
        <div className="md:w-1/3 space-y-4">
          <h3 className="text-xl font-bold text-slate-100 m-0 uppercase tracking-wider">Zener Regulator</h3>
          
          <div>
            <div className="flex justify-between text-sm mb-1 font-mono">
              <span className="text-slate-400 text-xs">V_in (DC Offset)</span>
              <span className="text-blue-400 font-bold">{vinDC}V</span>
            </div>
            <input type="range" min="2" max="20" step="1" value={vinDC} onChange={(e) => setVinDC(parseFloat(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1 font-mono">
              <span className="text-slate-400 text-xs">Ripple</span>
              <span className="text-purple-400 font-bold">±{rippleAmplitude}V</span>
            </div>
            <input type="range" min="0" max="10" step="0.5" value={rippleAmplitude} onChange={(e) => setRippleAmplitude(parseFloat(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1 font-mono">
              <span className="text-slate-400 text-xs">Zener Voltage</span>
              <span className="text-emerald-400 font-bold">{vz}V</span>
            </div>
            <input type="range" min="2" max="15" step="0.1" value={vz} onChange={(e) => setVz(parseFloat(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
          </div>
        </div>

        <div className="md:w-2/3 flex flex-col justify-end gap-4">
           <div className="flex items-center gap-4 bg-slate-950 px-4 py-3 rounded-lg border border-slate-800 w-full">
             <button onClick={() => setIsPlaying(!isPlaying)} className="text-slate-300 hover:text-white">
               {isPlaying ? <Pause size={20} /> : <Play size={20} />}
             </button>
             <input
               type="range" min="0" max="4" step="0.01" value={time}
               onChange={(e) => { setTime(parseFloat(e.target.value)); setIsPlaying(false); }}
               className="w-full h-2 bg-slate-700 rounded-lg appearance-none accent-primary"
             />
           </div>
           
           <div className={`p-3 rounded-xl border text-center transition-colors ${isRegulating ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
              <span className="font-bold block text-sm uppercase tracking-wider mb-1">{isRegulating ? 'Regulating Successfully' : 'Regulation Failed (Vin < Vz)'}</span>
              <span className="font-mono text-xl">V_out = {vout.toFixed(2)}V</span>
           </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[400px]">
        {/* Left: Circuit Schematic */}
        <div className="lg:w-1/2 p-6 flex items-center justify-center bg-slate-950 relative border-b lg:border-b-0 lg:border-r border-slate-800">
          <h4 className="absolute top-4 left-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Live Schematic</h4>
          <Mafs zoom={false} pan={false} viewBox={{ x: [-3, 3], y: [-2, 2] }}>
            
            {/* Input Source */}
            <Polygon points={[[-2.5, 0.5], [-1.5, 0.5], [-1.5, -0.5], [-2.5, -0.5]]} color={Theme.blue} fillOpacity={0.1} />
            <Text x={-2} y={0} color={Theme.blue} size={16}>V_in</Text>
            <Text x={-2} y={-0.8} color={Theme.blue} size={14}>{vin.toFixed(1)}V</Text>

            {/* Top Wire and Series Resistor Rp */}
            <Line.Segment point1={[-2, 0.5]} point2={[-2, 1.5]} color={Theme.foreground} weight={2} />
            <Line.Segment point1={[-2, 1.5]} point2={[-1.2, 1.5]} color={Theme.foreground} weight={2} />
            {drawResistor(-0.6, 1.5, false, "Rp")}
            <Line.Segment point1={[0, 1.5]} point2={[2, 1.5]} color={Theme.foreground} weight={2} />

            {/* Zener Branch */}
            <Line.Segment point1={[0, 1.5]} point2={[0, 1]} color={Theme.foreground} weight={2} />
            {drawZener(0, 0, isRegulating)}
            <Line.Segment point1={[0, -1]} point2={[0, -1.5]} color={Theme.foreground} weight={2} />

            {/* Load Branch */}
            <Line.Segment point1={[2, 1.5]} point2={[2, 0.6]} color={Theme.foreground} weight={2} />
            {drawResistor(2, 0, true, "Load")}
            <Line.Segment point1={[2, -0.6]} point2={[2, -1.5]} color={Theme.foreground} weight={2} />

            {/* Bottom Wire (Ground) */}
            <Line.Segment point1={[2, -1.5]} point2={[-2, -1.5]} color={Theme.foreground} weight={2} />
            <Line.Segment point1={[-2, -1.5]} point2={[-2, -0.5]} color={Theme.foreground} weight={2} />

            {/* Ground symbol */}
            <Line.Segment point1={[0, -1.5]} point2={[0, -1.8]} color={Theme.foreground} weight={2} />
            <Line.Segment point1={[-0.3, -1.8]} point2={[0.3, -1.8]} color={Theme.foreground} weight={2} />
            <Line.Segment point1={[-0.15, -1.9]} point2={[0.15, -1.9]} color={Theme.foreground} weight={2} />

            {/* Voltage Labels */}
            <Text x={0} y={1.8} color={isRegulating ? Theme.green : Theme.red} size={16}>{vout.toFixed(1)}V</Text>
            
            {/* Current Arrows */}
            {vin > 0 && <Polygon points={[[-1, 1.7], [-1, 1.3], [-0.7, 1.5]]} color={Theme.blue} />}
            {isRegulating && <Polygon points={[[0.2, 0.8], [-0.2, 0.8], [0, 0.5]]} color={Theme.green} />}
            
          </Mafs>
        </div>

        {/* Right: Math Plot */}
        <div className="lg:w-1/2 p-6 relative">
          <h4 className="absolute top-4 right-4 text-xs font-bold text-slate-500 uppercase tracking-widest z-10">Live Plot</h4>
          <Mafs viewBox={{ x: [0, 4], y: [-2, 25] }} preserveAspectRatio={false}>
            <Coordinates.Cartesian 
              xAxis={{ lines: 1, labels: (x) => `${x}s` }} 
              yAxis={{ lines: 5, labels: (y) => `${y}V` }} 
            />
            
            {/* Vz threshold line */}
            <Line.Segment point1={[0, vz]} point2={[4, vz]} color={Theme.red} weight={2} style="dashed" opacity={0.5} />
            <Text x={0.5} y={vz + 1} color={Theme.red} size={14}>V_z = {vz}V</Text>

            {/* Input Voltage */}
            <Plot.OfX y={inputSignal} color={Theme.blue} weight={2} opacity={0.4} />

            {/* Regulated Output Voltage */}
            <Plot.OfX y={(t) => Math.min(inputSignal(t), vz)} color={Theme.green} weight={4} />

            {/* Time Tracking Indicator */}
            <Line.Segment point1={[time, -2]} point2={[time, 25]} color={Theme.foreground} weight={1} opacity={0.5} />
            
            <Point x={time} y={vout} color={Theme.green} />
            <Point x={time} y={vin} color={Theme.blue} opacity={0.5} />
          </Mafs>
        </div>
      </div>
    </div>
  );
}
