import React from "react";
import Latex from "react-latex-next";
import { FreeformCircuitStudio } from "@/components/simulations/sandbox/FreeformCircuitStudio";
import { DiodeCurveVisualizer } from "@/components/simulations/course/DiodeCurveVisualizer";
import { RectifierVisualizer } from "@/components/simulations/course/RectifierVisualizer";
import { TheveninStepVisualizer } from "@/components/simulations/course/TheveninStepVisualizer";
import { NortonStepVisualizer } from "@/components/simulations/course/NortonStepVisualizer";
import { BiasingCircuitSandbox } from "@/components/simulations/course/BiasingCircuitSandbox";
import { TransistorLoadLineVisualizer } from "@/components/simulations/course/TransistorLoadLineVisualizer";
import { TransistorExplorer } from "@/components/simulations/course/TransistorExplorer";
import { cropImages, courseImages } from "@/lib/images";

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

export const physicsExercises: ExerciseSection[] = [
  {
    id: "dc-circuits",
    title: "DC Circuits (Ohm&apos;s Law & Power)",
    color: "amber",
    type: "practice",
    source: "Internal",
    exercises: [
      {
        id: "basic-series",
        title: "Exercise 1: Basic Series Circuit",
        problem: (
          <div className="space-y-2">
            <p>
              A circuit consists of a <Latex>{`$12\\text{V}$`}</Latex> battery
              and two resistors in series: <Latex>{`$R_1 = 4\\Omega$`}</Latex>{" "}
              and <Latex>{`$R_2 = 8\\Omega$`}</Latex>.
            </p>
            <ol className="list-decimal list-inside">
              <li>Find the equivalent resistance.</li>
              <li>Calculate the total current flowing in the circuit.</li>
              <li>
                Determine the voltage drop across <Latex>{`$R_1$`}</Latex>.
              </li>
            </ol>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <p>
              <strong>1. Equivalent Resistance:</strong> For series resistors,{" "}
              <Latex>{`$R_{eq} = R_1 + R_2$`}</Latex>.
            </p>
            <p>
              <Latex>{`$$R_{eq} = 4\\Omega + 8\\Omega = 12\\Omega$$`}</Latex>
            </p>
            <p>
              <strong>2. Total Current:</strong> Using Ohm&apos;s Law,{" "}
              <Latex>{`$I = \\frac{V}{R_{eq}}$`}</Latex>.
            </p>
            <p>
              <Latex>{`$$I = \\frac{12\\text{V}}{12\\Omega} = 1\\text{A}$$`}</Latex>
            </p>
            <p>
              <strong>
                3. Voltage Drop across <Latex>{`$R_1$`}</Latex>:
              </strong>{" "}
              <Latex>{`$V_1 = 1\\text{A} \\times 4\\Omega = 4\\text{V} $$`}</Latex>
            </p>
          </div>
        ),
      },
    ],
  },
  {
    id: "ac-circuits",
    title: "AC Circuits",
    color: "purple",
    type: "practice",
    source: "Internal",
    exercises: [
      {
        id: "rms-voltage",
        title: "Exercise 2: RMS Voltage Calculation",
        problem: (
          <p>
            An AC power supply generates a voltage waveform given by{" "}
            <Latex>{`$V(t) = 170 \\sin(377t)$`}</Latex>. What is the RMS
            voltage?
          </p>
        ),
        solution: (
          <div className="space-y-4">
            <p>
              The standard equation is{" "}
              <Latex>{`$V(t) = V_{peak} \\sin(\\omega t)$`}</Latex>. Here,{" "}
              <Latex>{`$V_{peak} = 170\\text{V}$`}</Latex>.
            </p>
            <p>The RMS voltage is calculated as:</p>
            <p>
              <Latex>{`$$V_{rms} = \\frac{V_{peak}}{\\sqrt{2}}$$`}</Latex>
            </p>
            <p>
              <Latex>{`$$V_{rms} = \\frac{170}{1.414} \\approx 120.2\\text{V}$$`}</Latex>
            </p>
            <p>
              This is the standard voltage of a wall outlet in North America!
            </p>
          </div>
        ),
        },
    ],
  },
  {
    id: "serie1",
    title: "Serie 1: Fundamental Electronic",
    originalPdf: "/serie 1 electronic.docx",
    description: "Saad Dahlab University of Blida - Exercise Series 1",
    color: "amber",
    type: "worksheet", // This forces it to appear in the Worksheets layout
    source: "Saad Dahlab University of Blida - Exercise Series 1",
    exercises: [
      {
        id: "serie1-ex1",
        title: "Exercise 1: Branch Currents",
        chapter: "chapter-1",
        topic: "Kirchhoff",
        difficulty: "Medium",
        diagramImageSrc: cropImages.ws1.page1_crop1,
        solutionImageSrc: cropImages.ws1sol.page1_crop1,
        problem: (
          <div className="space-y-4">
            <p>Determine the current intensities in the three branches.</p>
            <p>
              Given:{" "}
              <Latex>{`$R_1 = 2\\Omega; R_2 = 5\\Omega; R_3 = 10\\Omega; E_1 = 20\\text{V}; E_2 = 70\\text{V}$`}</Latex>
              .
            </p>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-indigo-400 mb-2">
                Interactive Simulation
              </h4>
              <p className="text-slate-300">
                Explore the circuit! Hover over the resistors to see the current
                flowing through each branch.
              </p>
            </div>
            <div className="w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
              <FreeformCircuitStudio initialPreset="Serie 1: Exercise 1" />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p>Using Kirchhoff&apos;s Laws:</p>
            <p>
              <strong>Node Law:</strong> <Latex>{`$I_1 + I_2 = I_3$`}</Latex>{" "}
              (assuming <Latex>{`$I_1$`}</Latex> and <Latex>{`$I_2$`}</Latex>{" "}
              enter the top node, and <Latex>{`$I_3$`}</Latex> goes down through{" "}
              <Latex>{`$R_3$`}</Latex>).
            </p>
            <p>
              <strong>Mesh 1 (Left):</strong>{" "}
              <Latex>{`$E_1 - R_1 I_1 - R_3 I_3 = 0 \\implies 20 - 2I_1 - 10I_3 = 0$`}</Latex>
            </p>
            <p>
              <strong>Mesh 2 (Right):</strong>{" "}
              <Latex>{`$E_2 - R_2 I_2 - R_3 I_3 = 0 \\implies 70 - 5I_2 - 10I_3 = 0$`}</Latex>
            </p>
            <p>
              Substituting <Latex>{`$I_3 = I_1 + I_2$`}</Latex>:
            </p>
            <p>
              <Latex>{`$20 = 12I_1 + 10I_2$`}</Latex>
            </p>
            <p>
              <Latex>{`$70 = 10I_1 + 15I_2$`}</Latex>
            </p>
            <p>Solving this system yields:</p>
            <p>
              <Latex>{`$I_1 = -5\\text{A}$`}</Latex>
            </p>
            <p>
              <Latex>{`$I_2 = 8\\text{A}$`}</Latex>
            </p>
            <p>
              <Latex>{`$I_3 = 3\\text{A}$`}</Latex>
            </p>
          </div>
        ),
      },
      {
        id: "serie1-ex2",
        title: "Exercise 2: Network Analysis & Bridge",
        chapter: "chapter-1",
        topic: "Kirchhoff",
        difficulty: "Hard",
        diagramImageSrc: cropImages.ws1.page1_crop2,
        solutionImageSrc: cropImages.ws1sol.page2_crop1,
        problem: (
          <div className="space-y-4">
            <p>1. Indicate the number of nodes, branches, and loops.</p>
            <p>
              2. The BD branch is removed. Given{" "}
              <Latex>{`$R_1 = R_2 = R_3 = R_4 = 1\\Omega, R_i = 4\\Omega$`}</Latex>
              , and <Latex>{`$E = 10\\text{V}$`}</Latex>. Calculate the currents
              passing through each resistor.
            </p>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-indigo-400 mb-2">
                Interactive Bridge Simulator
              </h4>
            </div>
            <div className="w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
              <FreeformCircuitStudio initialPreset="Serie 1: Exercise 2" />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p>
              <strong>1. Topology:</strong>
            </p>
            <p>Nodes: 4 (A, B, C, D). Branches: 6. Loops: 3 basic meshes.</p>
            <p>
              <strong>2. After BD removed:</strong>
            </p>
            <p>
              The bridge becomes two parallel branches: (<Latex>{`$R_1$`}</Latex> and <Latex>{`$R_2$`}</Latex>) and (<Latex>{`$R_3$`}</Latex> and <Latex>{`$R_4$`}</Latex>).
            </p>
            <p>
              <Latex>{`$R_{left} = 1 + 1 = 2\\Omega$`}</Latex>
            </p>
            <p>
              <Latex>{`$R_{right} = 1 + 1 = 2\\Omega$`}</Latex>
            </p>
            <p>
              The equivalent resistance of the parallel branches is:{" "}
              <Latex>{`$R_{p} = \\frac{2 \\times 2}{2 + 2} = 1\\Omega$`}</Latex>.
            </p>
            <p>
              The total resistance of the circuit including <Latex>{`$R_i$`}</Latex> is:{" "}
              <Latex>{`$R_{eq} = R_i + R_p = 4 + 1 = 5\\Omega$`}</Latex>.
            </p>
            <p>
              Total current from source:{" "}
              <Latex>{`$I = \\frac{E}{R_{eq}} = \\frac{10}{5} = 2\\text{A}$`}</Latex>
              .
            </p>
            <p>
              Current splits equally because the branches are identical (2Ω each):{" "}
              <Latex>{`$I_{R1} = I_{R2} = 1\\text{A}$`}</Latex> and <Latex>{`$I_{R3} = I_{R4} = 1\\text{A}$`}</Latex>.
            </p>
          </div>
        ),
      },
      {
        id: "serie1-ex3",
        title: "Exercise 3: Voltage Divider Theorem",
        chapter: "chapter-1",
        topic: "Voltage Divider",
        difficulty: "Easy",
        diagramImageSrc: cropImages.ws1.page2_crop1,
        solutionImageSrc: cropImages.ws1sol.page2_crop1,
        problem: (
          <div className="space-y-4">
            <p>Using the Voltage Divider Theorem:</p>
            <ul className="list-disc list-inside">
              <li>
                Determine <Latex>{`$U_{BM}$`}</Latex> as a function of{" "}
                <Latex>{`$U_{AM}$`}</Latex>.
              </li>
              <li>
                Determine <Latex>{`$U_{AM}$`}</Latex>, then{" "}
                <Latex>{`$U_{BM}$`}</Latex>, as a function of{" "}
                <Latex>{`$E$`}</Latex>.
              </li>
            </ul>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p>
              By the Voltage Divider rule for two resistors{" "}
              <Latex>{`$R_1$`}</Latex> and <Latex>{`$R_2$`}</Latex> in series
              under voltage <Latex>{`$E$`}</Latex>:
            </p>
            <p>
              <Latex>{`$$U_{AM} = E \\frac{R_1}{R_1 + R_2}$$`}</Latex>
            </p>
            <p>
              <Latex>{`$$U_{BM} = E \\frac{R_2}{R_1 + R_2}$$`}</Latex>
            </p>
            <p>Therefore, the relationship between them is:</p>
            <p>
              <Latex>{`$$\\frac{U_{BM}}{U_{AM}} = \\frac{R_2}{R_1} \\implies U_{BM} = U_{AM} \\frac{R_2}{R_1}$$`}</Latex>
            </p>
          </div>
        ),
        },
      {
        id: "serie1-ex4",
        title: "Exercise 4: Kirchhoff & Superposition",
        chapter: "chapter-1",
        topic: "Superposition",
        difficulty: "Medium",
        diagramImageSrc: cropImages.ws1.page2_crop2,
        problem: (
          <div className="space-y-4">
            <p>Calculate the current intensity in the AB branch by applying:</p>
            <ul className="list-disc list-inside">
              <li>Kirchhoff&apos;s Laws</li>
              <li>The Superposition Theorem</li>
            </ul>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-indigo-400 mb-2">
                Interactive Superposition Simulator
              </h4>
              <p className="text-slate-300">
                Use the <span className="font-bold text-indigo-400">Superposition Analysis</span> button in the simulation below to automatically calculate the partial currents from each source independently!
              </p>
            </div>
            <div className="w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
              <FreeformCircuitStudio initialPreset="Serie 1: Exercise 4" />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p>
              <strong>1. Superposition Theorem:</strong>
            </p>
            <p>
              <strong>Subcircuit 1 (<Latex>{`$E_1$`}</Latex> active, <Latex>{`$E_2$`}</Latex> shorted):</strong>{" "}
              <Latex>{`$R_2$`}</Latex> and <Latex>{`$R_3$`}</Latex> are in parallel: <Latex>{`$R_{23} = \\frac{4 \\times 6}{4 + 6} = 2.4\\text{k}\\Omega$`}</Latex>.
              Total current <Latex>{`$I_1' = \\frac{E_1}{R_1 + R_{23}} = \\frac{4}{16 + 2.4} = 0.2174\\text{mA}$`}</Latex>.
              Current divider gives <Latex>{`$I_3' = I_1' \\times \\frac{R_2}{R_2 + R_3} = 0.087\\text{mA}$`}</Latex> (downwards).
            </p>
            <p>
              <strong>Subcircuit 2 (<Latex>{`$E_2$`}</Latex> active, <Latex>{`$E_1$`}</Latex> shorted):</strong>{" "}
              <Latex>{`$R_1$`}</Latex> and <Latex>{`$R_3$`}</Latex> are in parallel: <Latex>{`$R_{13} = \\frac{16 \\times 6}{16 + 6} = 4.364\\text{k}\\Omega$`}</Latex>.
              Total current <Latex>{`$I_2'' = \\frac{E_2}{R_2 + R_{13}} = \\frac{24}{4 + 4.364} = 2.87\\text{mA}$`}</Latex>.
              Current divider gives <Latex>{`$I_3'' = I_2'' \\times \\frac{R_1}{R_1 + R_3} = 2.087\\text{mA}$`}</Latex> (downwards).
            </p>
            <p>
              <strong>Total Current:</strong> <Latex>{`$I_3 = I_3' + I_3'' = 2.174\\text{mA}$`}</Latex>.
            </p>
            <p>
              <strong>2. Kirchhoff&apos;s Laws:</strong>
            </p>
            <p>
              Mesh 1: <Latex>{`$16 I_1 + 6 I_3 = 4$`}</Latex><br/>
              Mesh 2: <Latex>{`$4 I_2 + 6 I_3 = 24$`}</Latex><br/>
              Node: <Latex>{`$I_1 + I_2 = I_3$`}</Latex>
            </p>
            <p>Solving the system yields <Latex>{`$I_3 = \\frac{100}{46} = 2.174\\text{mA}$`}</Latex>.</p>
          </div>
        ),
      },
      {
        id: "serie1-ex5",
        title: "Exercise 5: Superposition & Potentials",
        chapter: "chapter-1",
        topic: "Superposition",
        difficulty: "Hard",
        diagramImageSrc: cropImages.ws1.page3_crop1,
        solutionImageSrc: cropImages.ws1sol.page3_crop1,
        problem: (
          <div className="space-y-4">
            <p>
              Using the superposition method, find the currents{" "}
              <Latex>{`$I_1, I_2, I_3, I_4$`}</Latex>.
            </p>
            <p>
              Derive the potentials <Latex>{`$V_A, V_B, V_C, V_D, V_H$`}</Latex>
              , taking point D as the origin of potentials.
            </p>
            <p>
              Given:{" "}
              <Latex>{`$R_1 = 100\\Omega, R_2 = 50\\Omega, R_3 = 100\\Omega, R_4 = 50\\Omega, R_5 = 50\\Omega$`}</Latex>
              .
            </p>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p>
              <strong>Step 1: Superposition</strong>
            </p>
            <p>Calculate partial currents with each voltage source isolated.</p>
            <p>
              <strong>Step 2: Potentials</strong>
            </p>
            <p>
              Set <Latex>{`$V_D = 0V$`}</Latex>. Use the computed branch
              currents to calculate the voltage drops across each resistor:{" "}
              <Latex>{`$V_X - V_Y = R I$`}</Latex>.
            </p>
          </div>
        ),
        },
      {
        id: "serie1-ex6",
        title: "Exercise 6: Thévenin&apos;s Theorem",
        chapter: "chapter-1",
        topic: "Thevenin",
        difficulty: "Medium",
        diagramImageSrc: courseImages.chapter1.theveninStep1,
        solutionImageSrc: cropImages.ws1sol.page6_crop1,
        problem: (
          <div className="space-y-4">
            <p>
              Calculate the current <Latex>{`$I$`}</Latex> by applying
              Thévenin&apos;s theorem.
            </p>
            <p>
              Given:{" "}
              <Latex>{`$E_1 = 10\\text{V}; E_2 = 5\\text{V}; R_1 = R_3 = R_4 = 100\\Omega; R_2 = 50\\Omega$`}</Latex>
              .
            </p>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
              <TheveninStepVisualizer />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p>
              <strong>1. Calculate Thévenin Voltage (<Latex>{`$V_{th}$`}</Latex>):</strong>
            </p>
            <p>
              Remove the load <Latex>{`$R_c$`}</Latex>. The voltage <Latex>{`$V_{th}$`}</Latex> is the open-circuit voltage at node A (<Latex>{`$V_A$`}</Latex>).
              Using Nodal Analysis at node C (junction of <Latex>{`$R_1, R_2, R_3$`}</Latex>):
            </p>
            <p>
              <Latex>{`$\\frac{V_C - 10}{100} + \\frac{V_C - 5}{50} + \\frac{V_C - V_{th}}{100} = 0$`}</Latex>
            </p>
            <p>
              Nodal Analysis at node A: <Latex>{`$\\frac{V_A - V_C}{100} + \\frac{V_A}{100} = 0 \\implies V_C = 2V_{th}$`}</Latex>.
            </p>
            <p>
              Substituting <Latex>{`$V_C$`}</Latex> yields: <Latex>{`$7V_{th} - 20 = 0 \\implies V_{th} = \\frac{20}{7} \\approx 2.857\\text{V}$`}</Latex>.
            </p>
            <p>
              <strong>2. Calculate Thévenin Resistance (<Latex>{`$R_{th}$`}</Latex>):</strong>
            </p>
            <p>
              Short-circuit the voltage sources.
              <Latex>{`$R_1$`}</Latex> and <Latex>{`$R_2$`}</Latex> are in parallel: <Latex>{`$R_{12} = 33.33\\Omega$`}</Latex>.
              This is in series with <Latex>{`$R_3$`}</Latex>: <Latex>{`$133.33\\Omega$`}</Latex>.
              This combination is in parallel with <Latex>{`$R_4$`}</Latex>:
              <Latex>{`$R_{th} = \\frac{100 \\times 133.33}{100 + 133.33} = \\frac{400}{7} \\approx 57.14\\Omega$`}</Latex>.
            </p>
            <p>
              <strong>3. Calculate Current:</strong>
            </p>
            <p>
              <Latex>{`$I = \\frac{V_{th}}{R_{th} + R_c} = \\frac{20/7}{400/7 + R_c} = \\frac{20}{400 + 7R_c}$`}</Latex>.
            </p>
          </div>
        ),
        },
      {
        id: "serie1-ex7",
        title: "Exercise 7: Norton&apos;s and Thévenin&apos;s Theorems",
        chapter: "chapter-1",
        topic: "Norton",
        difficulty: "Medium",
        diagramImageSrc: courseImages.chapter1.nortonStep1,
        solutionImageSrc: cropImages.ws1sol.page6_crop2,
        problem: (
          <div className="space-y-4">
            <p>
              1. Using Norton&apos;s theorem, calculate the current that passes
              through the load <Latex>{`$R$`}</Latex> and deduce the voltage{" "}
              <Latex>{`$U_{AB}$`}</Latex>.
            </p>
            <p>
              2. Using Thévenin&apos;s theorem, calculate the voltage{" "}
              <Latex>{`$U_{AB}$`}</Latex> and deduce the current{" "}
              <Latex>{`$I$`}</Latex>.
            </p>
            <p>
              Given:{" "}
              <Latex>{`$E_1 = 10\\text{V}; E_2 = 8\\text{V}; R_1 = R_2 = R_3 = 200\\Omega; R = 100\\Omega$`}</Latex>
              .
            </p>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
              <NortonStepVisualizer />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p>
              <strong>1. Norton&apos;s Theorem:</strong>
            </p>
            <p>
              Short terminals A and B to find Norton current <Latex>{`$I_N$`}</Latex>.
              <Latex>{`$I_1 = \\frac{10}{200} = 0.05\\text{A}$`}</Latex> and <Latex>{`$I_2 = \\frac{8}{200} = 0.04\\text{A}$`}</Latex>.
              <Latex>{`$I_N = 0.05 + 0.04 = 0.09\\text{A}$`}</Latex>.
            </p>
            <p>
              Turn off sources to find Norton resistance. <Latex>{`$R_1, R_2, R_3$`}</Latex> are in parallel:
              <Latex>{`$R_N = \\frac{200}{3} = 66.67\\Omega$`}</Latex>.
            </p>
            <p>
              Using current divider for the load <Latex>{`$R$`}</Latex>:
              <Latex>{`$I = 0.09 \\times \\frac{66.67}{66.67 + 100} = 0.036\\text{A}$`}</Latex>.
              <Latex>{`$U_{AB} = 100 \\times 0.036 = 3.6\\text{V}$`}</Latex>.
            </p>
            <p>
              <strong>2. Thévenin&apos;s Theorem:</strong>
            </p>
            <p>
              <Latex>{`$R_{th} = R_N = 66.67\\Omega$`}</Latex>.
              By source transformation: <Latex>{`$V_{th} = I_N \\times R_N = 0.09 \\times 66.67 = 6\\text{V}$`}</Latex>.
            </p>
            <p>
              Current through load: <Latex>{`$I = \\frac{6}{66.67 + 100} = 0.036\\text{A}$`}</Latex>. Both methods yield identical results!
            </p>
          </div>
        ),
        },
    ],
  },
  {
    id: "serie2",
    title: "Serie 2: Semi-conductor Diodes",
    originalPdf: "/final serie 2 electronic.pdf",
    description: "Saad Dahlab University of Blida - Exercise Series 2",
    color: "emerald",
    type: "worksheet",
    source: "Saad Dahlab University of Blida - Exercise Series 2",
    exercises: [
      {
        id: "serie2-ex1a",
        title: "Exercise 1(a): Diode State Analysis",
        diagramImageSrc: cropImages.ws2.page1_crop1,
        solutionImageSrc: cropImages.ws2sol.page1_crop1,
        problem: (
          <div className="space-y-4">
            <p>Determine the conducting or cutoff state (ON or OFF) of the diode for Circuit 1(a).</p>
            <p>If the diode is conducting, find the current <Latex>{`$I$`}</Latex> flowing through it.</p>
            <p>Given: <Latex>{`$E = 10\\text{V}$`}</Latex>, <Latex>{`$R_1 = 200\\Omega, R_2 = 300\\Omega, R_3 = 300\\Omega$`}</Latex>. Assume the diode is ideal with a threshold voltage of <Latex>{`$0.7\\text{V}$`}</Latex>.</p>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-emerald-400 mb-2">Interactive Circuit Simulation</h4>
              <p className="text-slate-300">
                You can explore the circuit visually! 
                <em> Note: The interactive simulator uses an ideal 0V threshold diode model for simplicity, while the formal solution accounts for the 0.7V Silicon threshold.</em>
              </p>
            </div>
            <div className="w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0 bg-slate-950">
              <FreeformCircuitStudio initialPreset="Serie 2: Exercise 1a" />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>Step 1: Assume the diode is OFF.</strong></p>
            <p>If the diode is open, no current flows through <Latex>{`$R_3$`}</Latex>. The voltage <Latex>{`$V_p$`}</Latex> across the parallel branch is a voltage divider between <Latex>{`$E$`}</Latex>, <Latex>{`$R_1$`}</Latex>, and <Latex>{`$R_2$`}</Latex>:</p>
            <p><Latex>{`$$V_p = E \\frac{R_2}{R_1 + R_2} = 10 \\times \\frac{300}{500} = 6\\text{V}$$`}</Latex></p>
            <p>Since <Latex>{`$6\\text{V} > 0.7\\text{V}$`}</Latex>, our assumption is false. The diode is <strong>ON</strong>.</p>
            <p><strong>Step 2: Calculate current with diode ON.</strong></p>
            <p>Replace the diode with a <Latex>{`$0.7\\text{V}$`}</Latex> voltage drop. Apply Nodal Analysis at <Latex>{`$V_p$`}</Latex>:</p>
            <p><Latex>{`$$\\frac{10 - V_p}{200} = \\frac{V_p}{300} + \\frac{V_p - 0.7}{300}$$`}</Latex></p>
            <p>Multiplying by 600 yields <Latex>{`$30 - 3V_p = 2V_p + 2V_p - 1.4 \\implies 7V_p = 31.4 \\implies V_p \\approx 4.486\\text{V}$`}</Latex>.</p>
            <p>The current through the diode is: <Latex>{`$I_D = \\frac{V_p - 0.7}{R_3} = \\frac{3.786}{300} = 12.62\\text{mA}$`}</Latex>.</p>
          </div>
        )
      },
      {
        id: "serie2-ex1b",
        title: "Exercise 1(b): Opposing Sources",
        diagramImageSrc: cropImages.ws2.page1_crop2,
        solutionImageSrc: cropImages.ws2sol.page2_crop1,
        problem: (
          <div className="space-y-4">
            <p>Determine the conducting or cutoff state (ON or OFF) of the diode for Circuit 1(b).</p>
            <p>If the diode is conducting, find the current <Latex>{`$I$`}</Latex> flowing through it.</p>
            <p>Given: <Latex>{`$E_1 = 10\\text{V}, E_2 = 5\\text{V}, R_4 = 60\\Omega, R = 400\\Omega$`}</Latex>. Assume a threshold voltage of <Latex>{`$0.7\\text{V}$`}</Latex>.</p>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-emerald-400 mb-2">Interactive Circuit Simulation</h4>
            </div>
            <div className="w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0 bg-slate-950">
              <FreeformCircuitStudio initialPreset="Serie 2: Exercise 1b" />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>Step 1: Check Diode State.</strong></p>
            <p>The two voltage sources oppose each other. <Latex>{`$E_1$`}</Latex> (10V) pushes clockwise, while <Latex>{`$E_2$`}</Latex> (5V) pushes counter-clockwise. Since <Latex>{`$10\\text{V} > 5\\text{V}$`}</Latex>, the net voltage forces current clockwise, forward-biasing the diode. The diode is <strong>ON</strong>.</p>
            <p><strong>Step 2: Calculate Current.</strong></p>
            <p>Apply Kirchhoff&apos;s Voltage Law around the single loop:</p>
            <p><Latex>{`$$E_1 - R_4 I - V_D - R I - E_2 = 0$$`}</Latex></p>
            <p><Latex>{`$$10 - 60I - 0.7 - 400I - 5 = 0 \\implies 460I = 4.3$$`}</Latex></p>
            <p><Latex>{`$$I = \\frac{4.3}{460} \\approx 9.35\\text{mA}$$`}</Latex></p>
          </div>
        )
      },
      {
        id: "serie2-ex2",
        title: "Exercise 2: Parallel Diode Clamping",
        diagramImageSrc: cropImages.ws2.page1_crop3,
        solutionImageSrc: cropImages.ws2sol.page2_crop1,
        problem: (
          <div className="space-y-4">
            <p>1. Determine whether the diode is in the conducting (ON) or cutoff (OFF) state.</p>
            <p>2. If the diode is conducting, determine the current <Latex>{`$I$`}</Latex> flowing through it. Assume <Latex>{`$V_D = 0.7\\text{V}$`}</Latex>.</p>
            <p>Given: <Latex>{`$E = 10\\text{V}, R_1 = 150\\Omega, R_2 = 60\\Omega$`}</Latex>, with the diode in parallel with <Latex>{`$R_2$`}</Latex>.</p>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-emerald-400 mb-2">Interactive Circuit Simulation</h4>
            </div>
            <div className="w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0 bg-slate-950">
              <FreeformCircuitStudio initialPreset="Serie 2: Exercise 2" />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>1. Determine Diode State:</strong></p>
            <p>Assume the diode is OFF. The voltage across its terminals would be: <Latex>{`$V_{open} = 10 \\times \\frac{60}{150 + 60} = 2.85\\text{V}$`}</Latex>.</p>
            <p>Since <Latex>{`$2.85\\text{V} > 0.7\\text{V}$`}</Latex>, the diode must be <strong>ON</strong>.</p>
            <p><strong>2. Calculate Currents:</strong></p>
            <p>The diode clamps the voltage across <Latex>{`$R_2$`}</Latex> to <Latex>{`$0.7\\text{V}$`}</Latex>. The total current from the source is:</p>
            <p><Latex>{`$$I_{total} = \\frac{E - V_D}{R_1} = \\frac{10 - 0.7}{150} = 62\\text{mA}$$`}</Latex></p>
            <p>The current flowing through <Latex>{`$R_2$`}</Latex> is: <Latex>{`$I_{R2} = \\frac{V_D}{R_2} = \\frac{0.7}{60} = 11.67\\text{mA}$`}</Latex>.</p>
            <p>By KCL, the current through the diode is: <Latex>{`$I_D = I_{total} - I_{R2} = 62 - 11.67 = 50.33\\text{mA}$`}</Latex>.</p>
          </div>
        )
      },
      {
        id: "serie2-ex6",
        title: "Exercise 6: AC Source with Diode",
        diagramImageSrc: cropImages.ws2.page2_crop1,
        solutionImageSrc: cropImages.ws2sol.page4_crop1,
        problem: (
          <div className="space-y-4">
            <p>Consider an AC source <Latex>{`$e(t) = 5 \\sin(\\frac{2\\pi}{T} t)$`}</Latex> with <Latex>{`$T=20\\text{ms}$`}</Latex>. A diode is placed in parallel with <Latex>{`$R_2$`}</Latex>, pointing upwards (anode to ground).</p>
            <p>Determine the voltage across <Latex>{`$R_2$`}</Latex> (<Latex>{`$U_{R2}$`}</Latex>).</p>
            <p>Given: <Latex>{`$V_D = 0.6\\text{V}$`}</Latex> and <Latex>{`$R_1 = R_2 = 1\\text{k}\\Omega$`}</Latex>.</p>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-emerald-400 mb-2">Rectifier Simulation</h4>
              <p className="text-slate-300">Interact with the simulation to see how a diode behaves under an AC source, clipping portions of the sinusoidal wave.</p>
            </div>
            <div className="w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0 bg-slate-950 p-4">
              <RectifierVisualizer />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>Analysis over one period T:</strong></p>
            <p><strong>Positive Half-Cycle (t ∈ [0, 10 ms]):</strong> <Latex>{`$e(t) > 0$`}</Latex>. The potential at the top node is positive. The diode is reverse-biased (Blocked). The circuit acts as a simple voltage divider.</p>
            <p><Latex>{`$$U_{R2}(t) = \\frac{1}{2} e(t) = 2.5 \\sin(\\omega t)$$`}</Latex></p>
            <p><strong>Negative Half-Cycle (t ∈ [10 ms, 20 ms]):</strong> <Latex>{`$e(t) < 0$`}</Latex>. The potential at the top node is negative, making the anode (ground) more positive than the cathode. The diode is forward-biased (ON). It clamps the voltage across <Latex>{`$R_2$`}</Latex> to its negative threshold.</p>
            <p><Latex>{`$$U_{R2}(t) = -V_D = -0.6\\text{V}$$`}</Latex></p>
            <p>This creates a clipped half-wave sinusoidal output.</p>
          </div>
        )
      },
      {
        id: "serie2-ex7",
        title: "Exercise 7: Zener Diode Datasheet",
        problem: (
          <div className="space-y-4">
            <p>The datasheet of a Zener diode provides the following: <Latex>{`$V_z = 12\\text{V}, I_z = 50\\text{mA}, I_{zmin} = 0.5\\text{mA}, I_{zmax} = 100\\text{mA}$`}</Latex> and <Latex>{`$R_z = 20\\Omega$`}</Latex>.</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Calculate the voltages <Latex>{`$V_{zmin}$`}</Latex> and <Latex>{`$V_{zmax}$`}</Latex>.</li>
              <li>Determine the equation for the characteristic (the straight line) of the Zener diode.</li>
              <li>Calculate the voltages <Latex>{`$V_{z1}$`}</Latex> and <Latex>{`$V_{z2}$`}</Latex> for the respective currents: <Latex>{`$I_{z1} = 20\\text{mA}$`}</Latex> and <Latex>{`$I_{z2} = 80\\text{mA}$`}</Latex>.</li>
            </ol>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>1. Calculate the voltages <Latex>{`$V_{zmin}$`}</Latex> and <Latex>{`$V_{zmax}$`}</Latex>:</strong></p>
            <p>The real Zener diode is modeled by a threshold voltage <Latex>{`$V_{Z0}$`}</Latex> in series with its dynamic resistance <Latex>{`$R_Z$`}</Latex>. First, find <Latex>{`$V_{Z0}$`}</Latex> using the nominal values:</p>
            <p><Latex>{`$$V_Z = V_{Z0} + R_Z I_Z \\implies 12 = V_{Z0} + (20 \\times 0.050) \\implies V_{Z0} = 11\\text{V}$$`}</Latex></p>
            <p><Latex>{`$$V_{zmin} = 11 + (20 \\times 0.0005) = 11.01\\text{V}$$`}</Latex></p>
            <p><Latex>{`$$V_{zmax} = 11 + (20 \\times 0.100) = 13.00\\text{V}$$`}</Latex></p>
            <p><strong>2. Equation for the characteristic line:</strong></p>
            <p>In the avalanche/breakdown region, the equation is: <Latex>{`$V_Z = 11 + 20 I_Z$`}</Latex>.</p>
            <p><strong>3. Calculate <Latex>{`$V_{z1}$`}</Latex> and <Latex>{`$V_{z2}$`}</Latex>:</strong></p>
            <p>For <Latex>{`$20\\text{mA}$`}</Latex>: <Latex>{`$V_{z1} = 11 + (20 \\times 0.020) = 11.4\\text{V}$`}</Latex>.</p>
            <p>For <Latex>{`$80\\text{mA}$`}</Latex>: <Latex>{`$V_{z2} = 11 + (20 \\times 0.080) = 12.6\\text{V}$`}</Latex>.</p>
          </div>
        )
      },
      {
        id: "serie2-ex8",
        title: "Exercise 8: Zener Applications",
        problem: (
          <div className="space-y-4">
            <p>Given: <Latex>{`$R = 1\\text{k}\\Omega, V_z = 6.2\\text{V}, V_D = 0.6\\text{V}$`}</Latex>.</p>
            <p>1. Determine the voltage (<Latex>{`$U_{AB}$`}</Latex>) for (a) <Latex>{`$E = 12\\text{V}$`}</Latex> and (b) <Latex>{`$E = 5\\text{V}$`}</Latex>.</p>
            <p>2. Determine the voltage (<Latex>{`$U_{AB}$`}</Latex>) for (a) <Latex>{`$E = 5\\text{V}$`}</Latex> and (b) <Latex>{`$E = -12\\text{V}$`}</Latex>.</p>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-emerald-400 mb-2">Interactive Zener Characteristic</h4>
              <p className="text-slate-300">A Zener diode is designed to safely operate in reverse breakdown. Notice how once the reverse voltage hits -6.2V, it clamps the voltage!</p>
            </div>
            <div className="h-[500px] w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0 bg-slate-950 p-4">
              <DiodeCurveVisualizer />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>1. Zener Regulator mode (Positive E):</strong></p>
            <p>The Zener is placed in reverse bias (cathode facing the positive potential).</p>
            <p><strong>(a) <Latex>{`$E = 12\\text{V}$`}</Latex>:</strong> Since <Latex>{`$12\\text{V} > 6.2\\text{V}$`}</Latex>, the Zener diode undergoes breakdown. It regulates the voltage. Result: <Latex>{`$U_{AB} = V_Z = 6.2\\text{V}$`}</Latex>.</p>
            <p><strong>(b) <Latex>{`$E = 5\\text{V}$`}</Latex>:</strong> Since <Latex>{`$5\\text{V} < 6.2\\text{V}$`}</Latex>, the Zener does not reach breakdown and acts as an open circuit (OFF). No current flows. Result: <Latex>{`$U_{AB} = E = 5.0\\text{V}$`}</Latex>.</p>
            <p><strong>2. Varying polarities of E:</strong></p>
            <p><strong>(a) <Latex>{`$E = 5\\text{V}$`}</Latex>:</strong> Same as above, blocked. Result: <Latex>{`$U_{AB} = 5.0\\text{V}$`}</Latex>.</p>
            <p><strong>(b) <Latex>{`$E = -12\\text{V}$`}</Latex>:</strong> The voltage source polarity is reversed. This forward-biases the Zener diode (current pushes from anode to cathode). In forward bias, a Zener behaves exactly like a standard silicon diode. Result: <Latex>{`$U_{AB} = -V_D = -0.6\\text{V}$`}</Latex>.</p>
          </div>
        )
      }
    ]
  },
  {
    id: "serie3",
    title: "Serie 3: Bipolar Transistor",
    originalPdf: "/worksheet3.pdf",
    description: "Saad Dahlab University of Blida - Exercise Series 3",
    color: "amber",
    type: "worksheet",
    source: "Saad Dahlab University of Blida - Exercise Series 3",
    exercises: [
      {
        id: "serie3-ex1",
        title: "Exercise 1: Biasing Configurations Comparison",
        diagramImageSrc: cropImages.ws3.page1_crop1,
        problem: (
          <div className="space-y-4">
            <p>Consider three transistor biasing circuits: (a) Fixed Bias, (b) Collector Feedback, and (c) Emitter-Stabilized Bias.</p>
            <p>1. For each configuration, calculate the current <Latex>{`$I_C$`}</Latex> for <Latex>{`$\\beta = 100$`}</Latex> and then for <Latex>{`$\\beta = 300$`}</Latex>.</p>
            <p>2. Which configuration is the least sensitive to variations in <Latex>{`$\\beta$`}</Latex>?</p>
            <p>Given data: <Latex>{`$V_{CC} = 15\\text{V}, V_{BE} = 0.7\\text{V}, R_C = 1\\text{k}\\Omega, R_B = 220\\text{k}\\Omega, R_E = 110\\Omega$`}</Latex>.</p>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-amber-400 mb-2">Biasing Circuit Sandbox</h4>
              <p className="text-slate-300">Interact with the simulation below to explore different biasing configurations and see how they dynamically respond to changes in Beta (<Latex>{`$\\beta$`}</Latex>).</p>
            </div>
            <div className="w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0 bg-slate-950 p-4">
              <BiasingCircuitSandbox />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>Configuration (a) - Fixed Bias:</strong></p>
            <p>The base current is imposed by <Latex>{`$V_{CC}$`}</Latex> and <Latex>{`$R_B$`}</Latex>: <Latex>{`$V_{CC} = I_B \\cdot R_B + V_{BE}$`}</Latex>.</p>
            <p><Latex>{`$$I_B = \\frac{15 - 0.7}{220\\text{k}\\Omega} = 65.0\\mu\\text{A}$$`}</Latex></p>
            <p>For <Latex>{`$\\beta = 100$`}</Latex>: <Latex>{`$I_C = 6.50\\text{mA}$`}</Latex>. For <Latex>{`$\\beta = 300$`}</Latex>: <Latex>{`$I_C = 19.50\\text{mA}$`}</Latex>.</p>
            <p><em>Conclusion:</em> <Latex>{`$I_C$`}</Latex> triples when <Latex>{`$\\beta$`}</Latex> triples. Very unstable.</p>
            <p><strong>Configuration (b) - Collector Feedback:</strong></p>
            <p><Latex>{`$I_B = \\frac{V_{CC} - V_{BE}}{\\beta \\cdot R_C + R_B}$`}</Latex>.</p>
            <p>For <Latex>{`$\\beta = 100$`}</Latex>: <Latex>{`$I_C = 4.47\\text{mA}$`}</Latex>. For <Latex>{`$\\beta = 300$`}</Latex>: <Latex>{`$I_C = 8.25\\text{mA}$`}</Latex>. Ratio: 1.84.</p>
            <p><strong>Configuration (c) - Emitter-Stabilized:</strong></p>
            <p><Latex>{`$I_B = \\frac{V_{CC} - V_{BE}}{R_B + (1+\\beta)R_E}$`}</Latex>.</p>
            <p>For <Latex>{`$\\beta = 100$`}</Latex>: <Latex>{`$I_C = 6.19\\text{mA}$`}</Latex>. For <Latex>{`$\\beta = 300$`}</Latex>: <Latex>{`$I_C = 16.95\\text{mA}$`}</Latex>. Ratio: 2.74.</p>
            <p><em>Overall Conclusion:</em> The Collector Feedback configuration (b) is the least sensitive among these three.</p>
          </div>
        )
      },
      {
        id: "serie3-ex2",
        title: "Exercise 2: Voltage-Divider Bias",
        diagramImageSrc: cropImages.ws3.page2_crop1,
        problem: (
          <div className="space-y-4">
            <p>A biasing circuit of an NPN transistor uses two base resistors.</p>
            <p>1. Transform the biasing circuit seen from the base into its Thevenin equivalent, and calculate <Latex>{`$V_{TH}$`}</Latex> and <Latex>{`$R_{TH}$`}</Latex>.</p>
            <p>2. Calculate the collector current <Latex>{`$I_C$`}</Latex> for <Latex>{`$\\beta = 100$`}</Latex> and <Latex>{`$\\beta = 300$`}</Latex>. Draw a conclusion.</p>
            <p>Given: <Latex>{`$V_{CC} = 15\\text{V}, V_{BE} = 0.7\\text{V}, R_1 = 6.8\\text{k}\\Omega, R_2 = 2.2\\text{k}\\Omega, R_C = 3\\text{k}\\Omega$`}</Latex>, and <Latex>{`$R_E = 2\\text{k}\\Omega$`}</Latex>.</p>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>1. Transformation into Thevenin Equivalent:</strong></p>
            <p><Latex>{`$$V_{TH} = V_{CC} \\frac{R_2}{R_1 + R_2} = 15 \\times \\frac{2.2}{6.8 + 2.2} = 3.67\\text{V}$$`}</Latex></p>
            <p><Latex>{`$$R_{TH} = R_1 || R_2 = \\frac{6.8 \\times 2.2}{6.8 + 2.2} = 1.66\\text{k}\\Omega$$`}</Latex></p>
            <p><strong>2. Calculate Collector Current <Latex>{`$I_C$`}</Latex>:</strong></p>
            <p><Latex>{`$I_B = \\frac{V_{TH} - V_{BE}}{R_{TH} + (1 + \\beta) R_E}$`}</Latex></p>
            <p>For <Latex>{`$\\beta = 100$`}</Latex>: <Latex>{`$I_B = 14.58\\mu\\text{A} \\implies I_C = 1.458\\text{mA}$`}</Latex>.</p>
            <p>For <Latex>{`$\\beta = 300$`}</Latex>: <Latex>{`$I_B = 4.92\\mu\\text{A} \\implies I_C = 1.476\\text{mA}$`}</Latex>.</p>
            <p><em>Conclusion:</em> The collector current remains almost constant (variation of only 1.2%) despite a 300% increase in <Latex>{`$\\beta$`}</Latex>. This demonstrates the high stability of voltage-divider biasing!</p>
          </div>
        )
      },
      {
        id: "serie3-ex3",
        title: "Exercise 3: KCL and Thevenin on Base",
        diagramImageSrc: cropImages.ws3.page2_crop2,
        problem: (
          <div className="space-y-4">
            <p>1. Using Kirchhoff&apos;s node law, find the expression relating: <Latex>{`$V_{BE}, I_B, U_0, R_a$`}</Latex>, and <Latex>{`$R_b$`}</Latex>.</p>
            <p>2. Find the same expression using Thevenin&apos;s theorem applied to the base.</p>
            <p>3. Determine the operating point (Q point) at the middle of the DC load line.</p>
            <p>Given: <Latex>{`$U_0 = 10\\text{V}, V_{BE} = 0.6\\text{V}, I_B = 35\\mu\\text{A}, R_C = 1\\text{k}\\Omega, R_a = 200\\text{k}\\Omega, R_b = 50\\text{k}\\Omega$`}</Latex>.</p>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-amber-400 mb-2">Transistor Explorer</h4>
              <p className="text-slate-300">Interact with the core parameters of a transistor to see how base current controls the larger collector current.</p>
            </div>
            <div className="w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0 bg-slate-950 p-4">
              <TransistorExplorer />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>1. KCL at Node B:</strong></p>
            <p>Currents entering = Currents leaving: <Latex>{`$\\frac{U_0 - V_{BE}}{R_a} = \\frac{V_{BE}}{R_b} + I_B$`}</Latex></p>
            <p>Isolating <Latex>{`$V_{BE}$`}</Latex>: <Latex>{`$V_{BE} = U_0 \\frac{R_b}{R_a + R_b} - I_B (R_a || R_b)$`}</Latex>.</p>
            <p><strong>2. Thevenin&apos;s Theorem:</strong></p>
            <p><Latex>{`$V_{TH} = U_0 \\frac{R_b}{R_a + R_b} = 2.0\\text{V}$`}</Latex>. <Latex>{`$R_{TH} = R_a || R_b = 40\\text{k}\\Omega$`}</Latex>.</p>
            <p>Input line equation: <Latex>{`$V_{TH} = I_B R_{TH} + V_{BE} \\implies V_{BE} = V_{TH} - I_B R_{TH}$`}</Latex>. This is identical to the KCL expression!</p>
            <p><strong>3. Operating Point Q (Middle of Load Line):</strong></p>
            <p>Load line equation: <Latex>{`$V_{CE} = U_0 - I_C R_C$`}</Latex>.</p>
            <p>Middle of load line: <Latex>{`$V_{CE0} = \\frac{U_0}{2} = 5\\text{V}$`}</Latex>, and <Latex>{`$I_{C0} = \\frac{U_0}{2 R_C} = 5\\text{mA}$`}</Latex>.</p>
            <p>Checking <Latex>{`$\\beta$`}</Latex>: <Latex>{`$\\beta = \\frac{I_{C0}}{I_B} = \\frac{5\\text{mA}}{35\\mu\\text{A}} \\approx 143$`}</Latex>.</p>
          </div>
        )
      },
      {
        id: "serie3-ex4",
        title: "Exercise 4: Bias Circuit Design",
        diagramImageSrc: cropImages.ws3.page3_crop1,
        problem: (
          <div className="space-y-4">
            <p>A silicon NPN transistor is biased using a voltage-divider circuit. The desired Q point is: <Latex>{`$V_{CE0} = 5\\text{V}, I_{C0} = 1\\text{mA}, V_{BE0} = 0.7\\text{V}$`}</Latex>.</p>
            <p>1. Determine the Thevenin equivalent circuit between the base and ground.</p>
            <p>2. Deduce the equation of the static input line.</p>
            <p>3. If <Latex>{`$R_{B1}$`}</Latex> must be 10 times greater than <Latex>{`$R_{B2}$`}</Latex>, calculate their values.</p>
            <p>4. Derive the equation of the static load line and calculate <Latex>{`$R_C$`}</Latex>.</p>
            <p>Given: <Latex>{`$\\beta = 100$`}</Latex> and <Latex>{`$V_{CC} = 10\\text{V}$`}</Latex>.</p>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>1. Thevenin Equivalent:</strong></p>
            <p><Latex>{`$V_{TH} = V_{CC} \\frac{R_{B2}}{R_{B1} + R_{B2}} = \\frac{10}{11} = 0.909\\text{V}$`}</Latex></p>
            <p><Latex>{`$R_{TH} = R_{B1} || R_{B2} = \\frac{10}{11} R_{B2}$`}</Latex></p>
            <p><strong>2. Static Input Line:</strong> <Latex>{`$V_{TH} = I_B R_{TH} + V_{BE}$`}</Latex>.</p>
            <p><strong>3. Calculate <Latex>{`$R_{B1}$`}</Latex> and <Latex>{`$R_{B2}$`}</Latex>:</strong></p>
            <p>Base current: <Latex>{`$I_{B0} = \\frac{I_{C0}}{\\beta} = 10\\mu\\text{A}$`}</Latex>.</p>
            <p>Substitute into input line: <Latex>{`$0.909 = 10\\mu\\text{A} \\times \\left(\\frac{10}{11} R_{B2}\\right) + 0.7$`}</Latex></p>
            <p><Latex>{`$0.2091 = 9.09\\times10^{-6} R_{B2} \\implies R_{B2} = 23\\text{k}\\Omega$`}</Latex></p>
            <p><Latex>{`$R_{B1} = 10 \\times R_{B2} = 230\\text{k}\\Omega$`}</Latex></p>
            <p><strong>4. Calculate <Latex>{`$R_C$`}</Latex>:</strong></p>
            <p>Load line: <Latex>{`$V_{CC} = I_C R_C + V_{CE}$`}</Latex>.</p>
            <p><Latex>{`$R_C = \\frac{V_{CC} - V_{CE0}}{I_{C0}} = \\frac{10 - 5}{1\\text{mA}} = 5\\text{k}\\Omega$`}</Latex>.</p>
          </div>
        )
      },
      {
        id: "serie3-ex5",
        title: "Exercise 5: Point Q and Load Lines",
        problem: (
          <div className="space-y-4">
            <p>Consider a circuit with two power supplies: <Latex>{`$V_{BB}$`}</Latex> for the base and <Latex>{`$V_{CC}$`}</Latex> for the collector.</p>
            <p>1. Calculate the operating point values (<Latex>{`$I_B, I_C, V_{CE}$`}</Latex>).</p>
            <p>2. Derive the equations of the load lines: <Latex>{`$I_C = f(V_{CE})$`}</Latex> and <Latex>{`$I_B = f(V_{BE})$`}</Latex>.</p>
            <p>Given: <Latex>{`$\\beta = 180, V_{BB} = 5\\text{V}, V_{CC} = 10\\text{V}, V_{BE} = 0.6\\text{V}, R_B = 10\\text{k}\\Omega, R_C = R_E = 100\\Omega$`}</Latex>.</p>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-amber-400 mb-2">Transistor Load Line Visualizer</h4>
              <p className="text-slate-300">See how the Operating Point (Q Point) is established at the intersection of the DC Load Line and the transistor&apos;s output characteristic curve.</p>
            </div>
            <div className="w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0 bg-slate-950 p-4">
              <TransistorLoadLineVisualizer />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>1. Operating Point Q:</strong></p>
            <p>Input loop (KVL): <Latex>{`$V_{BB} = I_B R_B + V_{BE} + I_E R_E$`}</Latex>. Since <Latex>{`$I_E = (1 + \\beta)I_B$`}</Latex>:</p>
            <p><Latex>{`$V_{BB} - V_{BE} = I_B [R_B + (1+\\beta)R_E]$`}</Latex></p>
            <p><Latex>{`$5 - 0.6 = I_B [10000 + 181 \\times 100] \\implies I_B = \\frac{4.4}{28100} = 156.6\\mu\\text{A}$`}</Latex></p>
            <p><Latex>{`$I_C = \\beta I_B = 180 \\times 156.6\\mu\\text{A} = 28.19\\text{mA}$`}</Latex></p>
            <p>Output loop (KVL): <Latex>{`$V_{CC} = I_C R_C + V_{CE} + I_E R_E$`}</Latex>.</p>
            <p><Latex>{`$V_{CE} = 10 - (28.19\\text{mA} \\times 100) - (28.35\\text{mA} \\times 100) = 4.35\\text{V}$`}</Latex></p>
            <p><strong>2. Load Lines:</strong></p>
            <p>Output load line: <Latex>{`$I_C = \\frac{V_{CC} - V_{CE}}{R_C + R_E} = \\frac{10 - V_{CE}}{200}$`}</Latex>. From (0V, 50mA) to (10V, 0mA).</p>
            <p>Input load line: <Latex>{`$I_B = \\frac{V_{BB} - V_{BE}}{R_B + (1+\\beta)R_E} = \\frac{5 - V_{BE}}{28100}$`}</Latex>. From (0V, 177.9µA) to (5V, 0µA).</p>
          </div>
        )
      }
    ]
  }
];



