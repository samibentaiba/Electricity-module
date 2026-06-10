import React from "react";
import Latex from "react-latex-next";
import { FreeformCircuitStudio } from "@/components/simulations/sandbox/FreeformCircuitStudio";
import { DiodeCurveVisualizer } from "@/components/simulations/course/DiodeCurveVisualizer";
import { RectifierVisualizer } from "@/components/simulations/course/RectifierVisualizer";
import { TheveninStepVisualizer } from "@/components/simulations/course/TheveninStepVisualizer";
import { NortonStepVisualizer } from "@/components/simulations/course/NortonStepVisualizer";

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
        diagramImageSrc: "/images/course/chapter-2/half-wave.jpg",
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
            <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
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
            <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
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
        diagramImageSrc: "/images/course/chapter-1/voltage-divider.jpg",
      },
      {
        id: "serie1-ex4",
        title: "Exercise 4: Kirchhoff & Superposition",
        chapter: "chapter-1",
        topic: "Superposition",
        difficulty: "Medium",
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
            <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
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
        diagramImageSrc: "/images/course/chapter-1/superposition.jpg",
      },
      {
        id: "serie1-ex6",
        title: "Exercise 6: Thévenin&apos;s Theorem",
        chapter: "chapter-1",
        topic: "Thevenin",
        difficulty: "Medium",
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
            <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
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
        diagramImageSrc: "/images/course/chapter-1/thevenin-step1.jpg",
      },
      {
        id: "serie1-ex7",
        title: "Exercise 7: Norton&apos;s and Thévenin&apos;s Theorems",
        chapter: "chapter-1",
        topic: "Norton",
        difficulty: "Medium",
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
            <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
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
        diagramImageSrc: "/images/course/chapter-1/norton-step1.jpg",
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
        id: "serie2-ex1",
        title: "Exercise 1: Diode Polarization & State Analysis",
        problem: (
          <div className="space-y-4">
            <p>For the given circuit, determine the state of the diode (conducting or blocked), the current <Latex>{`$I$`}</Latex>, and the voltage <Latex>{`$V_D$`}</Latex> across the diode.</p>
            <p>Given: <Latex>{`$E = 12\\text{V}$`}</Latex>, <Latex>{`$R = 1\\text{k}\\Omega$`}</Latex>. Assume a Silicon diode with a threshold voltage <Latex>{`$V_0 = 0.7\\text{V}$`}</Latex>.</p>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-emerald-400 mb-2">Interactive Diode Curve</h4>
              <p className="text-slate-300">Observe how the diode only conducts when the forward voltage exceeds the 0.7V threshold characteristic of Silicon. Below this threshold, it acts as an open circuit.</p>
            </div>
            <div className="h-[500px] w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0 bg-slate-950 p-4">
              {/* Utilizes your existing Diode visualizer */}
              <DiodeCurveVisualizer />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>1. Diode State:</strong> The anode is connected to the positive terminal of the voltage source. Since <Latex>{`$E = 12\\text{V} > 0.7\\text{V}$`}</Latex>, the diode is forward-biased and conducting.</p>
            <p><strong>2. Voltage <Latex>{`$V_D$`}</Latex>:</strong> Because it is conducting, the voltage across it is locked to its threshold: <Latex>{`$V_D = V_0 = 0.7\\text{V}$`}</Latex>.</p>
            <p><strong>3. Current <Latex>{`$I$`}</Latex>:</strong> Applying Kirchhoffs Voltage Law to the mesh: <Latex>{`$E - V_D - R \\cdot I = 0$`}</Latex>.</p>
            <p><Latex>{`$$I = \\frac{E - V_D}{R} = \\frac{12 - 0.7}{1000} = 11.3\\text{mA}$$`}</Latex></p>
          </div>
        )
      },
      {
        id: "serie2-ex2",
        title: "Exercise 2: Half-Wave Rectification",
        problem: (
          <div className="space-y-4">
            <p>A sinusoidal voltage <Latex>{`$v_e(t) = 15 \\sin(\\omega t)$`}</Latex> is applied to a half-wave rectifier circuit comprising an ideal diode and a load resistance <Latex>{`$R_L = 100\\Omega$`}</Latex>.</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Plot the output voltage <Latex>{`$v_s(t)$`}</Latex>.</li>
              <li>Calculate the average output voltage <Latex>{`$V_{moy}$`}</Latex>.</li>
              <li>Calculate the maximum current <Latex>{`$I_{max}$`}</Latex> flowing through the load.</li>
            </ol>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-emerald-400 mb-2">Rectifier Simulation</h4>
              <p className="text-slate-300">Interact with the simulation to see how the diode clips the negative half-cycle of the AC waveform, converting alternating current into pulsating direct current.</p>
            </div>
            <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
              {/* Utilizes your existing Rectifier visualizer */}
              <RectifierVisualizer />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>1. Average Voltage:</strong> For a half-wave rectifier, the average (DC) voltage is given by the formula <Latex>{`$V_{moy} = \\frac{V_{max}}{\\pi}$`}</Latex>.</p>
            <p><Latex>{`$$V_{moy} = \\frac{15}{\\pi} \\approx 4.77\\text{V}$$`}</Latex></p>
            <p><strong>2. Maximum Current:</strong> Apply Ohms law using the peak voltage and load resistance: <Latex>{`$I_{max} = \\frac{V_{max}}{R_L}$`}</Latex>.</p>
            <p><Latex>{`$$I_{max} = \\frac{15}{100} = 0.15\\text{A} = 150\\text{mA}$$`}</Latex></p>
          </div>
        )
      }
    ]
  }
];


