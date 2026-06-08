"use client";

import { useState } from "react";
import { Mafs, Coordinates, Plot, Theme, Line, Text } from "mafs";
import "mafs/core.css";
import "mafs/font.css";

export function ZenerRegulatorVisualizer() {
  const [vinDC, setVinDC] = useState(12);
  const [rippleAmplitude, setRippleAmplitude] = useState(3);
  const [vz, setVz] = useState(5.1);

  // Input voltage with ripple: V_in(t) = V_DC + V_ripple * sin(2*pi*f*t)
  const inputSignal = (t: number) => vinDC + rippleAmplitude * Math.sin(2 * Math.PI * 2 * t);
  
  // Output voltage is clamped by the Zener diode
  // If Vin > Vz, Vout = Vz. Otherwise Vout = Vin
  const outputSignal = (t: number) => Math.min(inputSignal(t), vz);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
      {/* Controls */}
      <div className="p-6 bg-slate-800/50 md:w-1/3 flex flex-col justify-center space-y-6 border-b md:border-b-0 md:border-r border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Zener Voltage Regulation</h3>
          <p className="text-slate-400 text-sm mb-4">
            A Zener diode is used to maintain a constant output voltage, even if the input voltage has significant &quot;ripple&quot; (fluctuations).
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1 font-mono">
              <span className="text-slate-400 text-xs">V_in (DC Offset)</span>
              <span className="text-blue-400 font-bold">{vinDC}V</span>
            </div>
            <input
              type="range"
              min="2"
              max="20"
              step="1"
              value={vinDC}
              onChange={(e) => setVinDC(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1 font-mono">
              <span className="text-slate-400 text-xs">Ripple Amplitude</span>
              <span className="text-purple-400 font-bold">±{rippleAmplitude}V</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={rippleAmplitude}
              onChange={(e) => setRippleAmplitude(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1 font-mono">
              <span className="text-slate-400 text-xs">Zener Voltage (Vz)</span>
              <span className="text-emerald-400 font-bold">{vz}V</span>
            </div>
            <input
              type="range"
              min="2"
              max="15"
              step="0.1"
              value={vz}
              onChange={(e) => setVz(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-2 mt-4">
          <div className="text-sm text-slate-400">Current Output State:</div>
          {vinDC - rippleAmplitude > vz ? (
            <div className="text-lg font-bold text-emerald-400 bg-emerald-500/10 py-2 rounded-lg border border-emerald-500/20">
              Perfect Regulation ({vz}V)
            </div>
          ) : (
            <div className="text-lg font-bold text-amber-400 bg-amber-500/10 py-2 rounded-lg border border-amber-500/20">
              Poor Regulation (V_in drops below V_z)
            </div>
          )}
        </div>
      </div>

      {/* Visualization */}
      <div className="p-8 md:w-2/3 flex items-center justify-center min-h-[400px] bg-slate-950 relative overflow-hidden">
        <Mafs viewBox={{ x: [0, 4], y: [-2, 25] }} preserveAspectRatio={false}>
          <Coordinates.Cartesian 
            xAxis={{ lines: 1, labels: (x) => `${x}s` }} 
            yAxis={{ lines: 5, labels: (y) => `${y}V` }} 
          />
          
          {/* Input Signal (Unregulated) */}
          <Plot.OfX 
            y={inputSignal} 
            color={Theme.blue} 
            weight={2}
            opacity={0.4}
            style="dashed"
          />

          {/* Output Signal (Regulated) */}
          <Plot.OfX 
            y={outputSignal} 
            color="#10b981" 
            weight={4} 
          />

          {/* Vz Threshold Line */}
          <Line.Segment point1={[0, vz]} point2={[4, vz]} color="#10b981" weight={1} opacity={0.5} style="dashed" />
          <Text x={0.2} y={vz + 1} color="#10b981" size={14}>V_z Threshold</Text>

        </Mafs>

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur border border-slate-700 p-4 rounded-xl shadow-xl space-y-2">
           <div className="flex items-center gap-3">
             <div className="w-6 h-0.5 border-b-2 border-dashed border-blue-400/50" />
             <span className="text-sm font-medium text-slate-300">V_in (Unregulated)</span>
           </div>
           <div className="flex items-center gap-3">
             <div className="w-6 h-1 rounded-full bg-emerald-500" />
             <span className="text-sm font-medium text-emerald-400">V_out (Regulated)</span>
           </div>
        </div>
      </div>
    </div>
  );
}
