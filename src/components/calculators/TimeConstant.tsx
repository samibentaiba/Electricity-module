"use client";

import { useState } from "react";
import Latex from "react-latex-next";
import { Slider } from "@/components/ui/slider";
import { Mafs, Coordinates, Plot, Theme, Text, Line, Point } from "mafs";
import "mafs/core.css";
import "mafs/font.css";

export function TimeConstant() {
  const [vs, setVs] = useState(12);
  const [r, setR] = useState(10); // in kOhms
  const [c, setC] = useState(100); // in uF

  // tau = R * C
  // (kOhm * uF) = (1e3 * 1e-6) = 1e-3 seconds = ms
  // Let's just scale it: R(kOhm) * C(uF) = tau in ms
  const tauMs = r * c;
  const tauS = tauMs / 1000;

  // Charging curve: V_c(t) = Vs * (1 - e^(-t/tau))
  const vc = (t: number) => vs * (1 - Math.exp(-t / tauS));

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Visual Plot */}
        <div className="bg-slate-950 p-6 rounded-2xl flex flex-col relative overflow-hidden border border-slate-800 shadow-inner min-h-[450px]">
          <h3 className="font-bold text-slate-500 text-xs tracking-widest uppercase mb-4 z-10">
            RC Charging Curve
          </h3>

          <div className="flex-1 w-full h-full">
            <Mafs
              viewBox={{ x: [-0.5, tauS * 5.5], y: [-2, vs + 2] }}
              preserveAspectRatio={false}
            >
              <Coordinates.Cartesian
                xAxis={{ lines: tauS, labels: (x) => `${x.toFixed(1)}s` }}
                yAxis={{ lines: 2, labels: (y) => `${y}V` }}
              />
              {/* Source Voltage Line */}
              <Line.Segment
                point1={[0, vs]}
                point2={[tauS * 6, vs]}
                color={Theme.orange}
                style="dashed"
              />
              <Text x={tauS * 2.5} y={vs + 1} color={Theme.orange} size={14}>
                Max Voltage (Vs) = {vs}V
              </Text>{" "}
              {/* Tau markers */}
              <Line.Segment
                point1={[tauS, 0]}
                point2={[tauS, vc(tauS)]}
                color={Theme.foreground}
                style="dashed"
                opacity={0.5}
              />
              <Point x={tauS} y={vc(tauS)} color={Theme.blue} />
              <Text
                x={tauS + 0.2}
                y={vc(tauS) - 1}
                color={Theme.blue}
                size={12}
              >
                1τ (63.2%)
              </Text>
              <Line.Segment
                point1={[tauS * 5, 0]}
                point2={[tauS * 5, vc(tauS * 5)]}
                color={Theme.foreground}
                style="dashed"
                opacity={0.5}
              />
              <Point x={tauS * 5} y={vc(tauS * 5)} color={Theme.blue} />
              <Text
                x={tauS * 5}
                y={vc(tauS * 5) - 1}
                color={Theme.blue}
                size={12}
              >
                5τ (99.3%)
              </Text>
              {/* Capacitor Voltage Plot */}
              <Plot.OfX y={vc} color={Theme.blue} weight={4} />
            </Mafs>
          </div>
        </div>

        {/* Adjustments & Results */}
        <div className="flex flex-col gap-6 bg-slate-900/50 p-6 rounded-xl border border-slate-800 justify-center">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-amber-500">
                Source Voltage (Vs)
              </label>
              <span className="font-mono bg-amber-500/10 text-amber-500 px-2 py-1 rounded text-sm">
                {vs} V
              </span>
            </div>
            <Slider
              min={1}
              max={24}
              step={1}
              value={[vs]}
              onValueChange={(val) => setVs(Array.isArray(val) ? val[0] : val)}
              className="**:data-[slot=slider-range]:bg-amber-500 **:data-[slot=slider-thumb]:ring-amber-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-indigo-400">
                Resistance (R)
              </label>
              <span className="font-mono bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded text-sm">
                {r} kΩ
              </span>
            </div>
            <Slider
              min={1}
              max={100}
              step={1}
              value={[r]}
              onValueChange={(val) => setR(Array.isArray(val) ? val[0] : val)}
              className="**:data-[slot=slider-range]:bg-indigo-400 **:data-[slot=slider-thumb]:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-purple-400">
                Capacitance (C)
              </label>
              <span className="font-mono bg-purple-500/10 text-purple-400 px-2 py-1 rounded text-sm">
                {c} μF
              </span>
            </div>
            <Slider
              min={10}
              max={1000}
              step={10}
              value={[c]}
              onValueChange={(val) => setC(Array.isArray(val) ? val[0] : val)}
              className="**:data-[slot=slider-range]:bg-purple-400 **:data-[slot=slider-thumb]:ring-purple-400"
            />
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 text-center">
            <p className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-4">
              Time Constant (τ)
            </p>
            <div className="text-5xl font-black text-blue-400 mb-2 drop-shadow-[0_0_10px_rgba(96,165,250,0.4)]">
              {tauMs.toFixed(0)} ms
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Time to reach 63.2% of max voltage.
            </p>

            <div className="text-center text-slate-300 border-t border-slate-800 pt-4">
              <Latex>{`$$ \\tau = R \\times C $$`}</Latex>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
