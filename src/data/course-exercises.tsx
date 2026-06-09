import React from "react";
import Latex from "react-latex-next";
import { FreeformCircuitStudio } from "@/components/simulations/sandbox/FreeformCircuitStudio";

export interface Exercise {
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
}

export const physicsExercises: ExerciseSection[] = [
  {
    id: "dc-circuits",
    title: "DC Circuits (Ohm's Law & Power)",
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
    description: "Saad Dahlab University of Blida - Exercise Series 1",
    color: "amber",
    type: "worksheet", // This forces it to appear in the Worksheets layout
    source: "Saad Dahlab University of Blida - Exercise Series 1",
    exercises: [
      {
        id: "serie1-ex1",
        title: "Exercise 1: Branch Currents",
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
              The bridge becomes two parallel branches: (R1 + R2) and (R3 + R4).
            </p>
            <p>
              <Latex>{`$R_{top} = 1 + 1 = 2\\Omega$`}</Latex>
            </p>
            <p>
              <Latex>{`$R_{bot} = 1 + 1 = 2\\Omega$`}</Latex>
            </p>
            <p>
              The total resistance{" "}
              <Latex>{`$R_{eq} = 2 || 2 = 1\\Omega$`}</Latex>.
            </p>
            <p>
              Total current from source:{" "}
              <Latex>{`$I = \\frac{E}{R_{eq}} = \\frac{10}{1} = 10\\text{A}$`}</Latex>
              .
            </p>
            <p>
              Current splits equally:{" "}
              <Latex>{`$I_{top} = 5\\text{A}, I_{bot} = 5\\text{A}$`}</Latex>.
            </p>
          </div>
        ),
      },
      {
        id: "serie1-ex3",
        title: "Exercise 3: Voltage Divider Theorem",
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
        problem: (
          <div className="space-y-4">
            <p>Calculate the current intensity in the AB branch by applying:</p>
            <ul className="list-disc list-inside">
              <li>Kirchhoff's Laws</li>
              <li>The Superposition Theorem</li>
            </ul>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p>
              Using Kirchhoff's Laws, you establish the Node and Mesh equations
              to solve the system matrix.
            </p>
            <p>
              Using Superposition, you turn off all independent sources except
              one, compute the partial current in AB, and sum the partial
              currents.
            </p>
          </div>
        ),
      },
      {
        id: "serie1-ex5",
        title: "Exercise 5: Superposition & Potentials",
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
        title: "Exercise 6: Thévenin's Theorem",
        problem: (
          <div className="space-y-4">
            <p>
              Calculate the current <Latex>{`$I$`}</Latex> by applying
              Thévenin's theorem.
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
              <FreeformCircuitStudio initialPreset="Serie 1: Exercise 6" />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p>
              Remove the load resistor to find <Latex>{`$E_{th}$`}</Latex> and{" "}
              <Latex>{`$R_{th}$`}</Latex> between the terminals.
            </p>
            <p>
              <Latex>{`$R_{th}$`}</Latex> is found by short-circuiting{" "}
              <Latex>{`$E_1$`}</Latex> and <Latex>{`$E_2$`}</Latex>, then
              calculating the equivalent resistance.
            </p>
            <p>
              <Latex>{`$E_{th}$`}</Latex> is the open-circuit voltage across the
              terminals, typically found using Millman's theorem or
              Superposition on the remaining circuit.
            </p>
            <p>
              Finally, reconnect the load to calculate{" "}
              <Latex>{`$I = \\frac{E_{th}}{R_{th} + R_{load}}$`}</Latex>.
            </p>
          </div>
        ),
        diagramImageSrc: "/images/course/chapter-1/thevenin-step1.jpg",
      },
      {
        id: "serie1-ex7",
        title: "Exercise 7: Norton's and Thévenin's Theorems",
        problem: (
          <div className="space-y-4">
            <p>
              1. Using Norton's theorem, calculate the current that passes
              through the load <Latex>{`$R$`}</Latex> and deduce the voltage{" "}
              <Latex>{`$U_{AB}$`}</Latex>.
            </p>
            <p>
              2. Using Thévenin's theorem, calculate the voltage{" "}
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
              <FreeformCircuitStudio initialPreset="Serie 1: Exercise 7" />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p>
              <strong>1. Norton:</strong> Short-circuit the load to find{" "}
              <Latex>{`$I_N$`}</Latex>. Turn off sources to find{" "}
              <Latex>{`$R_N$`}</Latex>. Then{" "}
              <Latex>{`$I_{load} = I_N \\frac{R_N}{R_N + R}$`}</Latex> and{" "}
              <Latex>{`$U_{AB} = I_{load} \\times R$`}</Latex>.
            </p>
            <p>
              <strong>2. Thévenin:</strong> Open-circuit the load to find{" "}
              <Latex>{`$E_{th}$`}</Latex>. <Latex>{`$R_{th} = R_N$`}</Latex>.
              Then <Latex>{`$U_{AB} = E_{th} \\frac{R}{R_{th} + R}$`}</Latex>{" "}
              and <Latex>{`$I = \\frac{U_{AB}}{R}$`}</Latex>.
            </p>
            <p>
              Both methods will mathematically yield the exact same voltage and
              current for the load!
            </p>
          </div>
        ),
        diagramImageSrc: "/images/course/chapter-1/norton-step1.jpg",
      },
    ],
  },
];


