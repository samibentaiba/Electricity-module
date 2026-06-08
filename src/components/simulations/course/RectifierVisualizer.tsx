"use client";

import React, { useState, useEffect } from "react";
import { Mafs, Coordinates, Plot, Theme, Line, Point, Polygon, Text } from "mafs";
import { Play, Pause } from "lucide-react";
import "mafs/core.css";
import "mafs/font.css";

export function RectifierVisualizer() {
  const [rectifierType, setRectifierType] = useState<"half" | "full">("half");
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const frequency = 1;
  const amplitude = 3;

  useEffect(() => {
    if (!isPlaying) return;
    let animationFrameId: number;
    let lastTime = performance.now();
    const loop = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setTime((prev) => (prev + deltaTime * 0.5) % 4); // 0.5x speed, loops at 4s
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]);

  const inputSignal = (t: number) => amplitude * Math.sin(2 * Math.PI * frequency * t);
  const vin = inputSignal(time);
  
  const vout = rectifierType === "half" 
    ? Math.max(0, vin) 
    : Math.abs(vin);

  // Determine which diode is conducting
  const d1Conducting = vin > 0;
  const d2Conducting = rectifierType === "full" && vin < 0;

  // Helpers for drawing
  const drawDiode = (x: number, y: number, isConducting: boolean, label: string) => {
    const color = isConducting ? Theme.green : Theme.red;
    return (
      <g>
        {/* Triangle */}
        <Polygon points={[[x - 0.4, y + 0.3], [x - 0.4, y - 0.3], [x + 0.4, y]]} color={color} fillOpacity={isConducting ? 0.8 : 0.2} />
        {/* Bar */}
        <Line.Segment point1={[x + 0.4, y + 0.4]} point2={[x + 0.4, y - 0.4]} color={color} weight={3} />
        {/* Wire through it */}
        <Line.Segment point1={[x - 0.8, y]} point2={[x - 0.4, y]} color={Theme.foreground} weight={2} />
        <Line.Segment point1={[x + 0.4, y]} point2={[x + 0.8, y]} color={Theme.foreground} weight={2} />
        <Text x={x} y={y + 0.7} color={color} size={14}>{label}</Text>
        {isConducting && (
          <Text x={x} y={y - 0.7} color={Theme.green} size={12}>ON</Text>
        )}
      </g>
    );
  };

  const drawResistor = (x: number, y: number, isVertical: boolean = true) => {
    const size = 0.8;
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
        <Text x={isVertical ? x + 0.6 : x} y={isVertical ? y : y + 0.6} color={Theme.foreground} size={14}>Load R</Text>
      </g>
    );
  };


  const drawGround = (x: number, y: number) => (
    <g>
      <Line.Segment point1={[x, y]} point2={[x, y - 0.3]} color={Theme.foreground} weight={2} />
      <Line.Segment point1={[x - 0.3, y - 0.3]} point2={[x + 0.3, y - 0.3]} color={Theme.foreground} weight={2} />
      <Line.Segment point1={[x - 0.15, y - 0.4]} point2={[x + 0.15, y - 0.4]} color={Theme.foreground} weight={2} />
    </g>
  );

  return (
    <div className="w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
      {/* Header & Controls */}
      <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-800/50">
        <div>
          <h3 className="text-xl font-bold text-slate-100 m-0 uppercase tracking-wider">Interactive Rectifier</h3>
        </div>
        
        <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
          <button
            onClick={() => setRectifierType("half")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              rectifierType === "half" ? "bg-primary text-primary-foreground shadow-sm" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Half-Wave
          </button>
          <button
            onClick={() => setRectifierType("full")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              rectifierType === "full" ? "bg-primary text-primary-foreground shadow-sm" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Full-Wave
          </button>
        </div>

        <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 w-full sm:w-auto">
          <button onClick={() => setIsPlaying(!isPlaying)} className="text-slate-300 hover:text-white">
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <input
            type="range" min="0" max="4" step="0.05" value={time}
            onChange={(e) => { setTime(parseFloat(e.target.value)); setIsPlaying(false); }}
            className="w-full sm:w-32 h-2 bg-slate-700 rounded-lg appearance-none accent-primary"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[400px]">
        {/* Left: Circuit Schematic */}
        <div className="lg:w-1/2 p-6 flex items-center justify-center bg-slate-950 relative border-b lg:border-b-0 lg:border-r border-slate-800">
          <h4 className="absolute top-4 left-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Live Schematic</h4>
          <Mafs zoom={false} pan={false} viewBox={{ x: [-4, 4], y: [-3, 3] }}>
            
            {rectifierType === "half" ? (
              // Half Wave Circuit
              <>
                <Line.Segment point1={[-2, 0.5]} point2={[-2, 2]} color={Theme.foreground} weight={2} />
                <Line.Segment point1={[-2, 2]} point2={[-1, 2]} color={Theme.foreground} weight={2} />
                {drawDiode(0, 2, d1Conducting, "D1")}
                <Line.Segment point1={[1, 2]} point2={[2, 2]} color={Theme.foreground} weight={2} />
                <Line.Segment point1={[2, 2]} point2={[2, 1]} color={Theme.foreground} weight={2} />
                
                {drawResistor(2, 0, true)}
                
                <Line.Segment point1={[2, -1]} point2={[2, -2]} color={Theme.foreground} weight={2} />
                <Line.Segment point1={[2, -2]} point2={[-2, -2]} color={Theme.foreground} weight={2} />
                <Line.Segment point1={[-2, -2]} point2={[-2, -0.5]} color={Theme.foreground} weight={2} />
                
                {/* AC Source Circle manually drawn since component nesting in Mafs is tricky */}
                <Polygon points={[[-2.5, 0.5], [-1.5, 0.5], [-1.5, -0.5], [-2.5, -0.5]]} color={Theme.blue} fillOpacity={0.1} />
                <Text x={-2} y={0} color={Theme.blue} size={20}>~</Text>
                <Text x={-2.8} y={0} color={Theme.blue} size={14}>{vin.toFixed(1)}V</Text>

                {/* Current Arrow */}
                {d1Conducting && (
                  <Polygon points={[[1, 2.2], [1, 1.8], [1.3, 2]]} color={Theme.green} />
                )}
              </>
            ) : (
              // Full Wave Circuit (Center Tapped)
              <>
                {/* Center tap Ground */}
                {drawGround(-2.5, 0)}
                
                {/* Top Coil */}
                <Polygon points={[[-3, 2], [-2, 2], [-2, 0], [-3, 0]]} color={Theme.blue} fillOpacity={0.1} />
                <Text x={-2.5} y={1} color={Theme.blue} size={16}>~</Text>
                <Text x={-3.2} y={1} color={Theme.blue} size={14}>{vin.toFixed(1)}V</Text>

                {/* Bottom Coil */}
                <Polygon points={[[-3, 0], [-2, 0], [-2, -2], [-3, -2]]} color={Theme.blue} fillOpacity={0.1} />
                <Text x={-2.5} y={-1} color={Theme.blue} size={16}>~</Text>
                <Text x={-3.2} y={-1} color={Theme.blue} size={14}>{(-vin).toFixed(1)}V</Text>

                {/* Top branch (D1) */}
                <Line.Segment point1={[-2, 2]} point2={[-1, 2]} color={Theme.foreground} weight={2} />
                {drawDiode(-0.2, 2, d1Conducting, "D1")}
                <Line.Segment point1={[0.6, 2]} point2={[1.5, 2]} color={Theme.foreground} weight={2} />

                {/* Bottom branch (D2) */}
                <Line.Segment point1={[-2, -2]} point2={[-1, -2]} color={Theme.foreground} weight={2} />
                {drawDiode(-0.2, -2, d2Conducting, "D2")}
                <Line.Segment point1={[0.6, -2]} point2={[1.5, -2]} color={Theme.foreground} weight={2} />

                {/* Common Junction (Vertical wire) */}
                <Line.Segment point1={[1.5, 2]} point2={[1.5, -2]} color={Theme.foreground} weight={2} />

                {/* Output Wire to Load */}
                <Line.Segment point1={[1.5, 0]} point2={[2.5, 0]} color={Theme.foreground} weight={2} />

                {/* Load Resistor (Vertical to Ground) */}
                <Line.Segment point1={[2.5, 0]} point2={[2.5, -0.6]} color={Theme.foreground} weight={2} />
                {drawResistor(2.5, -1, true)}
                <Line.Segment point1={[2.5, -1.4]} point2={[2.5, -2]} color={Theme.foreground} weight={2} />
                
                {/* Load Ground */}
                {drawGround(2.5, -2)}

                {/* Current Arrows */}
                {/* D1 Arrow */}
                {d1Conducting && <Polygon points={[[0.8, 2.2], [0.8, 1.8], [1.1, 2]]} color={Theme.green} />}
                {/* D2 Arrow */}
                {d2Conducting && <Polygon points={[[0.8, -1.8], [0.8, -2.2], [1.1, -2]]} color={Theme.green} />}
                
                {/* Load Current Arrow ALWAYS points DOWN */}
                <Polygon points={[[2.3, -0.2], [2.7, -0.2], [2.5, -0.5]]} color={Theme.green} />
              </>
            )}
          </Mafs>
        </div>

        {/* Right: Math Plot */}
        <div className="lg:w-1/2 p-6 relative">
          <h4 className="absolute top-4 right-4 text-xs font-bold text-slate-500 uppercase tracking-widest z-10">Live Plot</h4>
          <Mafs viewBox={{ x: [0, 4], y: [-4, 4] }} preserveAspectRatio={false}>
            <Coordinates.Cartesian 
               xAxis={{ lines: 1, labels: (x) => `${x}s` }} 
               yAxis={{ lines: 1, labels: (y) => `${y}V` }} 
            />
            
            <Plot.OfX y={inputSignal} color={Theme.blue} weight={2} opacity={0.3} style="dashed" />
            <Plot.OfX y={(t) => rectifierType === "half" ? Math.max(0, inputSignal(t)) : Math.abs(inputSignal(t))} color={rectifierType === "half" ? Theme.orange : Theme.green} weight={4} />

            {/* Time Tracking Indicator */}
            <Line.Segment point1={[time, -4]} point2={[time, 4]} color={Theme.foreground} weight={1} opacity={0.5} />
            <Point x={time} y={vout} color={Theme.green} />
            <Point x={time} y={vin} color={Theme.blue} opacity={0.5} />
          </Mafs>
          
          <div className="absolute bottom-6 right-6 flex flex-col items-end">
            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-700 text-sm">
              <div className="text-blue-400">V_in: {vin.toFixed(2)}V</div>
              <div className="text-emerald-400 font-bold">V_out: {vout.toFixed(2)}V</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
