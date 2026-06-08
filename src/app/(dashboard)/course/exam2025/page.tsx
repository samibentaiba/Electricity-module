"use client";

import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ExerciseCard } from "@/components/ui/ExerciseCard";
import Latex from "react-latex-next";
import { FreeformCircuitStudio } from "@/components/simulations/sandbox/FreeformCircuitStudio";
import { RectifierVisualizer } from "@/components/simulations/course/RectifierVisualizer";


export default function Exam2025Page() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="Electronic Fundamentals Exam Correction" 
        description="Interactive step-by-step solutions based on the official exam."
        color="primary"
      />
      
      <div className="space-y-12 mt-8">
        
        {/* Exercise 1 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-l-4 border-amber-500 pl-4">Exercise 1: DC Circuit Analysis (6pts)</h2>
          <p className="text-lg">
            Consider a circuit with a voltage source <Latex>{`$E = 4\\text{V}$`}</Latex> and four resistors: <Latex>{`$R_1 = 16\\Omega$`}</Latex>, <Latex>{`$R_2 = 4\\Omega$`}</Latex>, <Latex>{`$R_3 = 6\\Omega$`}</Latex>, and <Latex>{`$R_4 = 24\\Omega$`}</Latex>.
          </p>
          
          <ExerciseCard 
            title="Question 1 & 2: Equivalent Resistance & Total Current"
            problem={
              <div className="space-y-4">
                <p><strong>1.</strong> Determine the expression and calculate the equivalent resistance <Latex>{`$R_{eq}$`}</Latex> as a function of <Latex>{`$R_1, R_2, R_3, R_4$`}</Latex>.</p>
                <p><strong>2.</strong> Calculate the current <Latex>{`$I_1$`}</Latex> using Kirchhoff&apos;s Voltage Law.</p>
              </div>
            }
            aiExplanation={
              <div className="space-y-6">
                <div className="mb-4">
                  <h4 className="font-bold text-indigo-400 mb-2">Interactive Simulation: Build it yourself!</h4>
                  <p className="text-slate-300">
                    Before doing any math, let&apos;s build the circuit and see how current actually flows. 
                    Notice how the current splits at node <b>n3</b> into two branches.
                    You can hover over <b>R1</b> to see the total current <Latex>{`$I_1$`}</Latex> flowing out of the battery!
                  </p>
                </div>
                <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
                   <FreeformCircuitStudio initialPreset="Exam 2025: Q1" />
                </div>
              </div>
            }
            formalSolution={
              <div className="space-y-6">
                <div>
                  <p className="font-bold text-lg mb-2">Step 1: Simplify the Resistors</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><Latex>{`$R_2$`}</Latex> and <Latex>{`$R_4$`}</Latex> are in series: <Latex>{`$R_{24} = R_2 + R_4 = 4\\Omega + 24\\Omega = 28\\Omega$`}</Latex>.</li>
                    <li><Latex>{`$R_3$`}</Latex> is in parallel with <Latex>{`$R_{24}$`}</Latex>: <Latex>{`$R' = \\frac{R_{24} \\times R_3}{R_{24} + R_3} = \\frac{28 \\times 6}{28 + 6} = \\frac{168}{34} = 4.94\\Omega$`}</Latex>.</li>
                    <li><Latex>{`$R_1$`}</Latex> is in series with <Latex>{`$R'$`}</Latex>: <Latex>{`$R_{eq} = R_1 + R' = 16 + 4.94 = 20.94\\Omega$`}</Latex>.</li>
                  </ul>
                  <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                     <p className="font-bold text-emerald-500 text-center text-xl"><Latex>{`$R_{eq} = 20.94\\Omega$`}</Latex></p>
                  </div>
                </div>

                <div>
                  <p className="font-bold text-lg mb-2">Step 2: Calculate the Total Current <Latex>{`$I_1$`}</Latex></p>
                  <p>Using Ohm&apos;s Law (derived from KVL for the main loop):</p>
                  <p><Latex>{`$$ I_1 = \\frac{E}{R_{eq}} = \\frac{4}{20.94} \\approx 0.190\\text{A} = 190\\text{mA} $$`}</Latex></p>
                  <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                     <p className="font-bold text-emerald-500 text-center text-xl"><Latex>{`$I_1 = 190\\text{mA}$`}</Latex></p>
                  </div>
                </div>
              </div>
            }
          />
        </section>

        {/* Exercise 2 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-4">Exercise 2: Diode Circuits (5pts)</h2>
          <p className="text-lg">
            Consider a circuit with an input voltage <Latex>{`$e(t) = 100\\sqrt{2} \\sin(100\\pi t)$`}</Latex>, two ideal diodes <Latex>{`$D_1$`}</Latex> and <Latex>{`$D_2$`}</Latex>, and a resistor <Latex>{`$R$`}</Latex>.
          </p>
          
          <ExerciseCard 
            title="Questions 1-3: Diode States and Output Voltage"
            problem={
              <ul className="space-y-4">
                <li><strong>1.</strong> When <Latex>{`$e(t) > 0$`}</Latex>, what are the states of the diodes?</li>
                <li><strong>2.</strong> When <Latex>{`$e(t) < 0$`}</Latex>, what are the states of the diodes?</li>
                <li><strong>3.</strong> What is the output voltage <Latex>{`$s(t)$`}</Latex> equal to?</li>
              </ul>
            }
            aiExplanation={
              <div className="space-y-6">
                <div className="mb-4">
                  <h4 className="font-bold text-indigo-400 mb-2">Interactive Visualization: Half-Wave Rectification</h4>
                  <p className="text-slate-300">
                    When <Latex>{`$e(t) > 0$`}</Latex>, the diode conducts and acts like a closed switch. 
                    When <Latex>{`$e(t) < 0$`}</Latex>, it blocks the current and acts like an open switch, chopping off the negative half of the sine wave!
                  </p>
                </div>
                <div className="w-full">
                  <RectifierVisualizer />
                </div>
              </div>
            }
            formalSolution={
              <div className="space-y-6">
                <div className="space-y-4">
                  <p><strong>1. Positive Half-Cycle (<Latex>{`$e(t) > 0$`}</Latex>):</strong></p>
                  <p>The positive terminal of the source is at the top. This forward-biases <Latex>{`$D_1$`}</Latex> and reverse-biases <Latex>{`$D_2$`}</Latex>.</p>
                  <p className="font-bold text-amber-500">Answer A: <Latex>{`$D_1$`}</Latex> conducting and <Latex>{`$D_2$`}</Latex> blocked.</p>
                </div>

                <div className="space-y-4">
                  <p><strong>2. Negative Half-Cycle (<Latex>{`$e(t) < 0$`}</Latex>):</strong></p>
                  <p>The polarity reverses. This forward-biases <Latex>{`$D_2$`}</Latex> and reverse-biases <Latex>{`$D_1$`}</Latex>.</p>
                  <p className="font-bold text-amber-500">Answer B: <Latex>{`$D_1$`}</Latex> blocked and <Latex>{`$D_2$`}</Latex> conducting.</p>
                </div>

                <div className="space-y-4">
                  <p><strong>3. Output Voltage <Latex>{`$s(t)$`}</Latex>:</strong></p>
                  <p>When <Latex>{`$e(t) > 0$`}</Latex>, <Latex>{`$D_1$`}</Latex> conducts, so <Latex>{`$s(t) = e(t)$`}</Latex>. When <Latex>{`$e(t) < 0$`}</Latex>, <Latex>{`$D_1$`}</Latex> blocks the current from reaching <Latex>{`$R$`}</Latex> via the top branch, and <Latex>{`$D_2$`}</Latex> shorts the source backwards (or depending on exact topology, <Latex>{`$s(t)$`}</Latex> across the resistor is 0). This is a Half-Wave Rectifier!</p>
                  <p className="font-bold text-amber-500">Answer C: <Latex>{`$e(t)$`}</Latex> when <Latex>{`$e(t) > 0$`}</Latex>, and <Latex>{`$0$`}</Latex> when <Latex>{`$e(t) < 0$`}</Latex>.</p>
                </div>
              </div>
            }
          />
        </section>

      </div>
    </div>
  );
}
