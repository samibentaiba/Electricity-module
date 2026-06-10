import React from "react";
import Latex from "react-latex-next";
import { FreeformCircuitStudio } from "@/components/simulations/sandbox/FreeformCircuitStudio";
import { BiasingCircuitSandbox } from "@/components/simulations/course/BiasingCircuitSandbox";

export interface Exercise {
  chapter?: string;
  topic?: string;
  difficulty?: string;
  id: string;
  title: string;
  problem: React.ReactNode;
  formalSolution?: React.ReactNode;
  aiExplanation?: React.ReactNode;
  diagramImageSrc?: string;
  solutionImageSrc?: string;
  solution?: React.ReactNode;
  source?: string;
}

export interface ExerciseSection {
  id: string;
  title: string;
  description?: string;
  color: "purple" | "amber" | "indigo" | "emerald" | "default";
  exercises: Exercise[];
  source?: string;
  type?: "worksheet" | "practice";
  originalPdf?: string;
}

export const exam2025Exercises: ExerciseSection[] = [
  {
    id: "exam-2025",
    title: "Electronic Fundamentals Exam 2025",
    originalPdf: "/Electronic Fundamentals Exam.pdf",
    description: "Saad Dahlab University of Blida - 1st Year LMD (C.S)",
    color: "indigo",
    type: "worksheet",
    source: "Saad Dahlab University of Blida",
    exercises: [
      {
        id: "exam2025-ex1",
        title: "Exercise 1: DC Circuits & Norton's Theorem (6pts)",
        chapter: "chapter-1",
        topic: "Norton's Theorem",
        difficulty: "Medium",
        diagramImageSrc: "/images/crops/exam/page-1_crop_1.png",
        solutionImageSrc: "/images/crops/examsol/page-1_crop_1.png",
        problem: (
          <div className="space-y-4">
            <p>
              Consider the circuit presented in Figure 1. A load resistor <Latex>{`$R_4$`}</Latex> is connected between the output terminals A and B.
            </p>
            <p>
              Given: <Latex>{`$E_1 = 4\\text{V}, R_1 = 16\\Omega, R_2 = 4\\Omega, R_3 = 6\\Omega$`}</Latex>, and <Latex>{`$R_4 = 24\\Omega$`}</Latex>.
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Determine the expression and calculate the equivalent resistance <Latex>{`$R_{eq}$`}</Latex> as a function of <Latex>{`$R_1, R_2, R_3$`}</Latex> and <Latex>{`$R_4$`}</Latex>.</li>
              <li>Calculate the current <Latex>{`$I_1$`}</Latex> using Kirchhoff's Voltage Law (loop law).</li>
              <li>Using Figure 1 and applying Norton's theorem, determine the expression of the Norton current <Latex>{`$I_N$`}</Latex> in terms of <Latex>{`$I_1, R_2$`}</Latex>, and <Latex>{`$R_3$`}</Latex> as seen across the load resistor <Latex>{`$R_4$`}</Latex>.</li>
              <li>Calculate the value of the Norton current <Latex>{`$I_N$`}</Latex>.</li>
              <li>Give the expression of Norton resistance <Latex>{`$R_N$`}</Latex> and calculate its numerical value.</li>
            </ol>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-indigo-400 mb-2">Interactive Circuit Simulation</h4>
              <p className="text-slate-300">
                Explore the circuit for Exercise 1! You can simulate the full circuit, or remove the load <Latex>{`$R_4$`}</Latex> (by replacing it with a wire to find <Latex>{`$I_N$`}</Latex>) to verify the Norton equivalent values.
              </p>
            </div>
            <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
              <FreeformCircuitStudio initialPreset="Exam 2025: Exercise 1" />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>1. Equivalent Resistance <Latex>{`$R_{eq}$`}</Latex>:</strong></p>
            <p>
              <Latex>{`$R_2$`}</Latex> and <Latex>{`$R_4$`}</Latex> are in series: <Latex>{`$R_{24} = R_2 + R_4 = 4 + 24 = 28\\Omega$`}</Latex>.
            </p>
            <p>
              This combination is in parallel with <Latex>{`$R_3$`}</Latex>: <Latex>{`$R_0 = \\frac{R_{24} \\cdot R_3}{R_{24} + R_3} = \\frac{28 \\cdot 6}{28 + 6} = 4.94\\Omega$`}</Latex>.
            </p>
            <p>
              The equivalent resistance is: <Latex>{`$R_{eq} = R_1 + R_0 = 16 + 4.94 = 20.94\\Omega$`}</Latex>.
            </p>
            <p><strong>2. Calculate Current <Latex>{`$I_1$`}</Latex>:</strong></p>
            <p>
              Using Ohm's Law for the equivalent circuit: <Latex>{`$I_1 = \\frac{E}{R_{eq}} = \\frac{4}{20.94} = 190\\text{mA}$`}</Latex>.
            </p>
            <p><strong>3. Norton Current Expression <Latex>{`$I_N$`}</Latex>:</strong></p>
            <p>
              To find <Latex>{`$I_N$`}</Latex>, short-circuit the load <Latex>{`$R_4$`}</Latex> (connect A and B). Now <Latex>{`$R_2$`}</Latex> and <Latex>{`$R_3$`}</Latex> are in parallel. Using the current divider rule on <Latex>{`$I_1$`}</Latex>:
            </p>
            <p>
              <Latex>{`$$I_N = I_1 \\frac{R_3}{R_2 + R_3}$$`}</Latex>
            </p>
            <p><strong>4. Calculate Norton Current <Latex>{`$I_N$`}</Latex>:</strong></p>
            <p>
              <Latex>{`$I_N = 190 \\cdot \\frac{6}{4 + 6} = 190 \\cdot 0.6 = 114\\text{mA}$`}</Latex>.
            </p>
            <p><strong>5. Norton Resistance <Latex>{`$R_N$`}</Latex>:</strong></p>
            <p>
              Turn off the voltage source <Latex>{`$E$`}</Latex> (short circuit it) and look into terminals A and B (with <Latex>{`$R_4$`}</Latex> removed). <Latex>{`$R_1$`}</Latex> and <Latex>{`$R_3$`}</Latex> are in parallel, and their combination is in series with <Latex>{`$R_2$`}</Latex>.
            </p>
            <p>
              <Latex>{`$R_N = \\frac{R_1 \\cdot R_3}{R_1 + R_3} + R_2 = \\frac{16 \\cdot 6}{16 + 6} + 4 = \\frac{96}{22} + 4 = 4.36 + 4 = 8.36\\Omega$`}</Latex>.
            </p>
          </div>
        )
      },
      {
        id: "exam2025-ex2",
        title: "Exercise 2: Rectifier Diodes (5pts)",
        chapter: "chapter-2",
        topic: "Diodes",
        difficulty: "Easy",
        diagramImageSrc: "/images/crops/exam/page-3_crop_1.png",
        problem: (
          <div className="space-y-4">
            <p>
              Four options are provided as possible answers to the following questions. Each question has only ONE correct answer.
            </p>
            <p>
              Consider a circuit with an input voltage <Latex>{`$e(t) = 100\\sqrt{2} \\sin(100\\pi t)$`}</Latex> and ideal diodes <Latex>{`$D_1$`}</Latex> and <Latex>{`$D_2$`}</Latex>. The output is taken across a resistor <Latex>{`$R$`}</Latex> as <Latex>{`$s(t)$`}</Latex>.
            </p>
            <ol className="list-decimal list-inside space-y-4">
              <li>
                When <Latex>{`$e(t) > 0$`}</Latex>, the diodes are:<br/>
                A. <Latex>{`$D_1$`}</Latex> conducting and <Latex>{`$D_2$`}</Latex> blocked<br/>
                B. <Latex>{`$D_1$`}</Latex> blocked and <Latex>{`$D_2$`}</Latex> conducting<br/>
                C. Both diodes conducting<br/>
                D. Both diodes blocked
              </li>
              <li>
                When <Latex>{`$e(t) < 0$`}</Latex>, the diodes are:<br/>
                A. <Latex>{`$D_1$`}</Latex> conducting and <Latex>{`$D_2$`}</Latex> blocked<br/>
                B. <Latex>{`$D_1$`}</Latex> blocked and <Latex>{`$D_2$`}</Latex> conducting<br/>
                C. Both diodes conducting<br/>
                D. Both diodes blocked
              </li>
              <li>
                The output voltage <Latex>{`$s(t)$`}</Latex> is equal to:<br/>
                A. <Latex>{`$e(t)$`}</Latex> for all values of t<br/>
                B. 0 for all values of t<br/>
                C. <Latex>{`$e(t)$`}</Latex> when <Latex>{`$e(t) > 0$`}</Latex>, and 0 when <Latex>{`$e(t) < 0$`}</Latex><br/>
                D. <Latex>{`$-e(t)$`}</Latex> when <Latex>{`$e(t) > 0$`}</Latex>
              </li>
              <li>
                Determine the value of the resistance <Latex>{`$R$`}</Latex> if the effective current through the resistor is equal to 10 mA.<br/>
                A. <Latex>{`$1\\text{k}\\Omega$`}</Latex> &nbsp; B. <Latex>{`$5\\text{k}\\Omega$`}</Latex> &nbsp; C. <Latex>{`$10\\text{k}\\Omega$`}</Latex> &nbsp; D. <Latex>{`$51\\text{k}\\Omega$`}</Latex>
              </li>
              <li>
                The maximum current through <Latex>{`$R$`}</Latex> is:<br/>
                A. 14.14 mA &nbsp; B. 11.11 mA &nbsp; C. 20.20 mA &nbsp; D. 19.19 mA
              </li>
            </ol>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-indigo-400 mb-2">Half-Wave Rectifier Simulation</h4>
              <p className="text-slate-300">
                This circuit functions as a half-wave rectifier with a protective clamping diode. When the AC source is positive, current flows through <Latex>{`$D_1$`}</Latex> and the resistor. When negative, <Latex>{`$D_1$`}</Latex> blocks and <Latex>{`$D_2$`}</Latex> shorts the reverse voltage to ground.
              </p>
            </div>
            <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0 bg-slate-950">
              <FreeformCircuitStudio initialPreset="Exam 2025: Exercise 2" />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>1. A:</strong> When <Latex>{`$e(t) > 0$`}</Latex>, <Latex>{`$D_1$`}</Latex> is forward-biased (conducting) and <Latex>{`$D_2$`}</Latex> is reverse-biased (blocked).</p>
            <p><strong>2. B:</strong> When <Latex>{`$e(t) < 0$`}</Latex>, <Latex>{`$D_1$`}</Latex> is reverse-biased (blocked) and <Latex>{`$D_2$`}</Latex> is forward-biased (conducting).</p>
            <p><strong>3. C:</strong> Due to the diodes, the positive half-cycle passes through to the resistor (<Latex>{`$s(t) = e(t)$`}</Latex>), while the negative half-cycle is blocked (<Latex>{`$s(t) = 0$`}</Latex>).</p>
            <p><strong>4. C:</strong> The source voltage <Latex>{`$e(t)$`}</Latex> has an RMS (effective) voltage of <Latex>{`$V_{eff} = \\frac{100\\sqrt{2}}{\\sqrt{2}} = 100\\text{V}$`}</Latex>. If the effective current is <Latex>{`$10\\text{mA}$`}</Latex>, the resistance is <Latex>{`$R = \\frac{100\\text{V}}{10\\text{mA}} = 10\\text{k}\\Omega$`}</Latex>.</p>
            <p><strong>5. A:</strong> The maximum voltage is <Latex>{`$V_{max} = 100\\sqrt{2} \\approx 141.4\\text{V}$`}</Latex>. The maximum current is <Latex>{`$I_{max} = \\frac{141.4\\text{V}}{10\\text{k}\\Omega} = 14.14\\text{mA}$`}</Latex>.</p>
          </div>
        )
      },
      {
        id: "exam2025-ex3",
        title: "Exercise 3: Transistor Biasing (9pts)",
        chapter: "chapter-3",
        topic: "BJT Transistors",
        difficulty: "Hard",
        diagramImageSrc: "/images/crops/exam/page-5_crop_1.png",
        problem: (
          <div className="space-y-4">
            <p>
              A silicon NPN transistor is biased using a resistor connected between the collector and the base (Collector Feedback Bias with Emitter Resistor).
            </p>
            <p>
              Given: <Latex>{`$\\beta = 65, V_{CC} = 10\\text{V}, V_{BE} = 0.7\\text{V}, R_B = 17\\text{k}\\Omega, R_C = 1\\text{k}\\Omega$`}</Latex>, and <Latex>{`$R_E = 100\\Omega$`}</Latex>.
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Give the relationships between the three currents (<Latex>{`$I_B, I_C$`}</Latex>, and <Latex>{`$I_E$`}</Latex>).</li>
              <li>Establish the equation of the DC load line <Latex>{`$I_C = f(V_{CE})$`}</Latex> (output characteristic).</li>
              <li>Determine the saturation current <Latex>{`$I_{Csat}$`}</Latex> corresponding to the condition <Latex>{`$V_{CE} = 0\\text{V}$`}</Latex>.</li>
              <li>Determine the cutoff voltage <Latex>{`$V_{CE}$`}</Latex> corresponding to the condition <Latex>{`$I_C = 0\\text{A}$`}</Latex>.</li>
              <li>Establish the equation of the input line <Latex>{`$I_B = f(V_{BE})$`}</Latex> (input characteristic).</li>
              <li>Calculate the values of <Latex>{`$I_C$`}</Latex> and <Latex>{`$I_B$`}</Latex> required so that <Latex>{`$V_{CE} = 5\\text{V}$`}</Latex>, while keeping the other parameters unchanged.</li>
            </ol>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-indigo-400 mb-2">Collector Feedback Bias Sandbox</h4>
              <p className="text-slate-300">
                This simulation explores the stability of Collector Feedback Bias! Adjust Beta and notice how the collector voltage feeds back to the base, resisting drastic changes in the operating point.
              </p>
            </div>
            <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0 bg-slate-950 p-4">
              <BiasingCircuitSandbox />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>1. Current Relationships:</strong></p>
            <p>
              <Latex>{`$I_E = I_B + I_C$`}</Latex><br/>
              <Latex>{`$I_C = \\beta I_B$`}</Latex><br/>
              <Latex>{`$I_E = (1 + \\beta) I_B$`}</Latex>
            </p>
            <p><strong>2. DC Load Line Equation:</strong></p>
            <p>
              Applying Kirchhoff's Voltage Law to the output loop:<br/>
              <Latex>{`$V_{CC} = (I_C + I_B) R_C + V_{CE} + I_E R_E$`}</Latex><br/>
              Since <Latex>{`$I_B$`}</Latex> is very small compared to <Latex>{`$I_C$`}</Latex>, we approximate <Latex>{`$I_E \\approx I_C$`}</Latex> and <Latex>{`$I_C + I_B \\approx I_C$`}</Latex>.<br/>
              <Latex>{`$V_{CC} = I_C(R_C + R_E) + V_{CE} \\implies I_C = \\frac{V_{CC} - V_{CE}}{R_C + R_E}$`}</Latex>
            </p>
            <p><strong>3. Saturation Current <Latex>{`$I_{Csat}$`}</Latex>:</strong></p>
            <p>
              When <Latex>{`$V_{CE} = 0\\text{V}$`}</Latex>:<br/>
              <Latex>{`$I_{Csat} = \\frac{V_{CC}}{R_C + R_E + \\frac{R_C + R_E}{\\beta}} \\approx \\frac{V_{CC}}{R_C + R_E} = \\frac{10}{1100} = 9.09\\text{mA}$`}</Latex>
            </p>
            <p><strong>4. Cutoff Voltage:</strong></p>
            <p>
              When <Latex>{`$I_C = 0\\text{A}$`}</Latex>:<br/>
              <Latex>{`$V_{CE} = V_{CC} = 10\\text{V}$`}</Latex>
            </p>
            <p><strong>5. Input Characteristic:</strong></p>
            <p>
              Applying KVL to the input loop:<br/>
              <Latex>{`$V_{CC} = (I_B + I_C) R_C + I_B R_B + V_{BE} + I_E R_E$`}</Latex><br/>
              <Latex>{`$V_{CC} = I_B(1 + \\beta) R_C + I_B R_B + V_{BE} + I_B(1 + \\beta) R_E$`}</Latex><br/>
              <Latex>{`$I_B = \\frac{V_{CC} - V_{BE}}{R_B + (R_C + R_E)(1 + \\beta)}$`}</Latex>
            </p>
            <p><strong>6. Required <Latex>{`$I_C$`}</Latex> and <Latex>{`$I_B$`}</Latex> for <Latex>{`$V_{CE} = 5\\text{V}$`}</Latex>:</strong></p>
            <p>
              Using the precise load line equation:<br/>
              <Latex>{`$I_C = \\frac{V_{CC} - V_{CE}}{(R_C + R_E)(1 + \\frac{1}{\\beta})} = \\frac{10 - 5}{1100 \\times (1 + \\frac{1}{65})} = \\frac{5}{1116.9} = 4.47\\text{mA}$`}</Latex> (or approx 4.54 mA depending on simplification).<br/>
              <Latex>{`$I_B = \\frac{I_C}{\\beta} = \\frac{4.54\\text{mA}}{65} = 69.84\\mu\\text{A}$`}</Latex>
            </p>
          </div>
        )
      }
    ]
  }
];

