"use client";

import { useState } from "react";
import Latex from "react-latex-next";
import { Slider } from "@/components/ui/slider";
import { calculateVoltageDivider } from "@/lib/circuit-utils";
import { Mafs, Line, Polygon, Text, Point, Theme } from "mafs";
import "mafs/core.css";
import "mafs/font.css";

export function VoltageDivider() {
  const [vin, setVin] = useState(12);
  const [r1, setR1] = useState(10);
  const [r2, setR2] = useState(10);

  const vout = calculateVoltageDivider(vin, r1, r2);

  // Helper to draw a European-style resistor
  const drawResistor = (
    x: number,
    y: number,
    isVertical: boolean,
    label: string,
    color: string,
    valueStr: string,
  ) => {
    const w = isVertical ? 0.3 : 0.75;
    const h = isVertical ? 0.75 : 0.3;
    return (
      <g>
        <Polygon
          points={[
            [x - w, y + h],
            [x + w, y + h],
            [x + w, y - h],
            [x - w, y - h],
          ]}
          color={color}
          fillOpacity={0.2}
        />
        <Text
          x={isVertical ? x + 0.8 : x}
          y={isVertical ? y + 0.2 : y + 0.6}
          color={color}
          size={16}
        >
          {label}
        </Text>
        <Text
          x={isVertical ? x + 0.8 : x}
          y={isVertical ? y - 0.2 : y + 0.9}
          color={color}
          size={14}
        >
          {valueStr}
        </Text>
      </g>
    );
  };

  const drawGround = (x: number, y: number) => (
    <g>
      <Line.Segment
        point1={[x, y]}
        point2={[x, y - 0.3]}
        color={Theme.foreground}
        weight={2}
      />
      <Line.Segment
        point1={[x - 0.3, y - 0.3]}
        point2={[x + 0.3, y - 0.3]}
        color={Theme.foreground}
        weight={2}
      />
      <Line.Segment
        point1={[x - 0.15, y - 0.4]}
        point2={[x + 0.15, y - 0.4]}
        color={Theme.foreground}
        weight={2}
      />
    </g>
  );

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Visual Circuit */}
        <div className="bg-slate-950 p-6 rounded-2xl flex flex-col relative overflow-hidden border border-slate-800 shadow-inner min-h-[450px]">
          <h3 className="font-bold text-slate-500 text-xs tracking-widest uppercase mb-4">
            Live Schematic
          </h3>

          <div className="flex-1 w-full h-full">
            <Mafs zoom={false} pan={false} viewBox={{ x: [-3, 3], y: [-3, 3] }}>
              {/* V_in DC Source */}
              <Line.Segment
                point1={[-2, -2]}
                point2={[-2, -0.2]}
                color={Theme.foreground}
                weight={2}
              />
              <Line.Segment
                point1={[-2.3, -0.2]}
                point2={[-1.7, -0.2]}
                color={Theme.foreground}
                weight={3}
              />{" "}
              {/* Negative Plate */}
              <Line.Segment
                point1={[-2.5, 0.2]}
                point2={[-1.5, 0.2]}
                color={Theme.orange}
                weight={4}
              />{" "}
              {/* Positive Plate */}
              <Line.Segment
                point1={[-2, 0.2]}
                point2={[-2, 2]}
                color={Theme.foreground}
                weight={2}
              />
              <Text x={-2.7} y={0.2} color={Theme.orange} size={16}>
                +
              </Text>
              <Text x={-2.8} y={-0.3} color={Theme.foreground} size={16}>
                -
              </Text>
              <Text x={-2.8} y={0.8} color={Theme.orange} size={16}>
                V_in
              </Text>
              <Text x={-2.8} y={-0.8} color={Theme.orange} size={14}>
                {vin}V
              </Text>
              {/* Top Wire */}
              <Line.Segment
                point1={[-2, 2]}
                point2={[0, 2]}
                color={Theme.foreground}
                weight={2}
              />
              {/* R1 */}
              <Line.Segment
                point1={[0, 2]}
                point2={[0, 1.75]}
                color={Theme.foreground}
                weight={2}
              />
              {drawResistor(0, 1, true, "R1", Theme.indigo, `${r1}Ω`)}
              <Line.Segment
                point1={[0, 0.25]}
                point2={[0, 0]}
                color={Theme.foreground}
                weight={2}
              />
              {/* R2 */}
              <Line.Segment
                point1={[0, 0]}
                point2={[0, -0.25]}
                color={Theme.foreground}
                weight={2}
              />
              {drawResistor(0, -1, true, "R2", Theme.violet, `${r2}Ω`)}
              <Line.Segment
                point1={[0, -1.75]}
                point2={[0, -2]}
                color={Theme.foreground}
                weight={2}
              />
              {/* Ground connections */}
              <Line.Segment
                point1={[-2, -2]}
                point2={[0, -2]}
                color={Theme.foreground}
                weight={2}
              />
              {drawGround(-2, -2)}
              {drawGround(0, -2)}
              {/* Middle Node (V_out) */}
              <Point x={0} y={0} color={Theme.foreground} />
              <Line.Segment
                point1={[0, 0]}
                point2={[2, 0]}
                color={Theme.foreground}
                weight={2}
              />
              {/* V_out Terminals */}
              <circle
                cx={2}
                cy={0}
                r={0.1}
                stroke={Theme.foreground}
                fill="transparent"
                strokeWidth="2"
              />
              <circle
                cx={2}
                cy={-2}
                r={0.1}
                stroke={Theme.foreground}
                fill="transparent"
                strokeWidth="2"
              />
              <Line.Segment
                point1={[0, -2]}
                point2={[2, -2]}
                color={Theme.foreground}
                weight={2}
              />
              {/* V_out label and arrow */}
              <Text x={2.5} y={-1} color={Theme.red} size={18}>
                V_out
              </Text>
              <Text x={2.5} y={-1.5} color={Theme.red} size={16}>
                {vout.toFixed(2)}V
              </Text>
              {/* Voltage Drop labels */}
              <Text x={-0.8} y={1} color={Theme.indigo} size={12}>
                -{(vin - vout).toFixed(1)}V
              </Text>
              <Text x={-0.8} y={-1} color={Theme.violet} size={12}>
                -{vout.toFixed(1)}V
              </Text>
            </Mafs>
          </div>
        </div>

        {/* Adjustments & Results */}
        <div className="flex flex-col gap-6 bg-slate-900/50 p-6 rounded-xl border border-slate-800 justify-center">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-amber-500">
                Input Voltage (V_in)
              </label>
              <span className="font-mono bg-amber-500/10 text-amber-500 px-2 py-1 rounded text-sm">
                {vin} V
              </span>
            </div>
            <Slider
              min={1}
              max={100}
              step={1}
              value={[vin]}
              onValueChange={(val) => setVin(Array.isArray(val) ? val[0] : val)}
              className="**:data-[slot=slider-range]:bg-amber-500 **:data-[slot=slider-thumb]:ring-amber-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-indigo-400">
                Resistor 1 (R1)
              </label>
              <span className="font-mono bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded text-sm">
                {r1} Ω
              </span>
            </div>
            <Slider
              min={1}
              max={100}
              step={1}
              value={[r1]}
              onValueChange={(val) => setR1(Array.isArray(val) ? val[0] : val)}
              className="**:data-[slot=slider-range]:bg-indigo-400 **:data-[slot=slider-thumb]:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-purple-400">
                Resistor 2 (R2)
              </label>
              <span className="font-mono bg-purple-500/10 text-purple-400 px-2 py-1 rounded text-sm">
                {r2} Ω
              </span>
            </div>
            <Slider
              min={1}
              max={100}
              step={1}
              value={[r2]}
              onValueChange={(val) => setR2(Array.isArray(val) ? val[0] : val)}
              className="**:data-[slot=slider-range]:bg-purple-400 **:data-[slot=slider-thumb]:ring-purple-400"
            />
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800">
            <p className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-4 text-center">
              Output Voltage (V_out)
            </p>
            <div className="text-center text-5xl font-black text-rose-500 mb-4 drop-shadow-[0_0_10px_rgba(244,63,94,0.4)]">
              {vout.toFixed(2)} V
            </div>
            <div className="text-center text-slate-300">
              <Latex>{`$$ V_{out} = V_{in} \\times \\frac{R_2}{R_1 + R_2} $$`}</Latex>
              <div className="mt-2 text-sm text-slate-400">
                <Latex>{`$$ V_{out} = ${vin} \\times \\frac{${r2}}{${r1} + ${r2}} = ${vout.toFixed(2)}\\text{ V} $$`}</Latex>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
