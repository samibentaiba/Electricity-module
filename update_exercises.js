import fs from 'fs';
const content = fs.readFileSync('src/data/course-exercises.tsx', 'utf8');

const newContent = content.replace(
  /export const physicsExercises: ExerciseSection\[\] = \[[\s\S]*?\];\n\nexport const architectureExercises/,
  `export const physicsExercises: ExerciseSection[] = [
  {
    id: "serie1",
    title: "Serie 1: Fundamental Electronic",
    description: "Saad Dahlab University of Blida - Exercise Series 1",
    color: "amber",
    exercises: [
      {
        id: "serie1-ex1",
        title: "Exercise 1: Branch Currents",
        problem: (
          <div className="space-y-4">
            <p>Determine the current intensities in the three branches.</p>
            <p>Given: <Latex>{\`$R_1 = 2\\\\Omega; R_2 = 5\\\\Omega; R_3 = 10\\\\Omega; E_1 = 20\\\\text{V}; E_2 = 70\\\\text{V}$\`}</Latex>.</p>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-indigo-400 mb-2">Interactive Simulation</h4>
              <p className="text-slate-300">
                Explore the circuit! Hover over the resistors to see the current flowing through each branch.
              </p>
            </div>
            <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
               <FreeformCircuitStudio initialPreset="Serie 1: Exercise 1" />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
             <p>Using Kirchhoff's Laws:</p>
             <p><strong>Node Law:</strong> <Latex>{\`$I_1 + I_2 = I_3$\`}</Latex> (assuming <Latex>{\`$I_1$\`}</Latex> and <Latex>{\`$I_2$\`}</Latex> enter the top node, and <Latex>{\`$I_3$\`}</Latex> goes down through <Latex>{\`$R_3$\`}</Latex>).</p>
             <p><strong>Mesh 1 (Left):</strong> <Latex>{\`$E_1 - R_1 I_1 - R_3 I_3 = 0 \\\\implies 20 - 2I_1 - 10I_3 = 0$\`}</Latex></p>
             <p><strong>Mesh 2 (Right):</strong> <Latex>{\`$E_2 - R_2 I_2 - R_3 I_3 = 0 \\\\implies 70 - 5I_2 - 10I_3 = 0$\`}</Latex></p>
             <p>Substituting <Latex>{\`$I_3 = I_1 + I_2$\`}</Latex>:</p>
             <p><Latex>{\`$20 = 12I_1 + 10I_2$\`}</Latex></p>
             <p><Latex>{\`$70 = 10I_1 + 15I_2$\`}</Latex></p>
             <p>Solving this system yields:</p>
             <p><Latex>{\`$I_1 = -5\\\\text{A}$\`}</Latex></p>
             <p><Latex>{\`$I_2 = 8\\\\text{A}$\`}</Latex></p>
             <p><Latex>{\`$I_3 = 3\\\\text{A}$\`}</Latex></p>
          </div>
        )
      },
      {
        id: "serie1-ex2",
        title: "Exercise 2: Network Analysis & Bridge",
        problem: (
          <div className="space-y-4">
            <p>1. Indicate the number of nodes, branches, and loops.</p>
            <p>2. The BD branch is removed. Given <Latex>{\`$R_1 = R_2 = R_3 = R_4 = 1\\\\Omega, R_i = 4\\\\Omega$\`}</Latex>, and <Latex>{\`$E = 10\\\\text{V}$\`}</Latex>. Calculate the currents passing through each resistor.</p>
          </div>
        ),
        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-indigo-400 mb-2">Interactive Bridge Simulator</h4>
            </div>
            <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-slate-800 relative z-0">
               <FreeformCircuitStudio initialPreset="Serie 1: Exercise 2" />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>1. Topology:</strong></p>
            <p>Nodes: 4 (A, B, C, D). Branches: 6. Loops: 3 basic meshes.</p>
            <p><strong>2. After BD removed:</strong></p>
            <p>The bridge becomes two parallel branches: (R1 + R2) and (R3 + R4).</p>
            <p><Latex>{\`$R_{top} = 1 + 1 = 2\\\\Omega$\`}</Latex></p>
            <p><Latex>{\`$R_{bot} = 1 + 1 = 2\\\\Omega$\`}</Latex></p>
            <p>The total resistance <Latex>{\`$R_{eq} = 2 || 2 = 1\\\\Omega$\`}</Latex>.</p>
            <p>Total current from source: <Latex>{\`$I = \\\\frac{E}{R_{eq}} = \\\\frac{10}{1} = 10\\\\text{A}$\`}</Latex>.</p>
            <p>Current splits equally: <Latex>{\`$I_{top} = 5\\\\text{A}, I_{bot} = 5\\\\text{A}$\`}</Latex>.</p>
          </div>
        )
      },
      {
        id: "serie1-ex6",
        title: "Exercise 6: Thévenin's Theorem",
        problem: (
          <div className="space-y-4">
            <p>Calculate the current <Latex>{\`$I$\`}</Latex> by applying Thévenin's theorem.</p>
            <p>Given: <Latex>{\`$E_1 = 10\\\\text{V}; E_2 = 5\\\\text{V}; R_1 = R_3 = R_4 = 100\\\\Omega; R_2 = 50\\\\Omega$\`}</Latex>.</p>
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
             <p>Remove the load resistor to find <Latex>{\`$E_{th}$\`}</Latex> and <Latex>{\`$R_{th}$\`}</Latex> between the terminals.</p>
             <p><Latex>{\`$R_{th}$\`}</Latex> is found by short-circuiting <Latex>{\`$E_1$\`}</Latex> and <Latex>{\`$E_2$\`}</Latex>, then calculating the equivalent resistance.</p>
             <p><Latex>{\`$E_{th}$\`}</Latex> is the open-circuit voltage across the terminals, typically found using Millman's theorem or Superposition on the remaining circuit.</p>
             <p>Finally, reconnect the load to calculate <Latex>{\`$I = \\\\frac{E_{th}}{R_{th} + R_{load}}$\`}</Latex>.</p>
          </div>
        )
      },
      {
        id: "serie1-ex7",
        title: "Exercise 7: Norton's and Thévenin's Theorems",
        problem: (
          <div className="space-y-4">
            <p>1. Using Norton's theorem, calculate the current that passes through the load <Latex>{\`$R$\`}</Latex> and deduce the voltage <Latex>{\`$U_{AB}$\`}</Latex>.</p>
            <p>2. Using Thévenin's theorem, calculate the voltage <Latex>{\`$U_{AB}$\`}</Latex> and deduce the current <Latex>{\`$I$\`}</Latex>.</p>
            <p>Given: <Latex>{\`$E_1 = 10\\\\text{V}; E_2 = 8\\\\text{V}; R_1 = R_2 = R_3 = 200\\\\Omega; R = 100\\\\Omega$\`}</Latex>.</p>
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
             <p><strong>1. Norton:</strong> Short-circuit the load to find <Latex>{\`$I_N$\`}</Latex>. Turn off sources to find <Latex>{\`$R_N$\`}</Latex>. Then <Latex>{\`$I_{load} = I_N \\\\frac{R_N}{R_N + R}$\`}</Latex> and <Latex>{\`$U_{AB} = I_{load} \\\\times R$\`}</Latex>.</p>
             <p><strong>2. Thévenin:</strong> Open-circuit the load to find <Latex>{\`$E_{th}$\`}</Latex>. <Latex>{\`$R_{th} = R_N$\`}</Latex>. Then <Latex>{\`$U_{AB} = E_{th} \\\\frac{R}{R_{th} + R}$\`}</Latex> and <Latex>{\`$I = \\\\frac{U_{AB}}{R}$\`}</Latex>.</p>
             <p>Both methods will mathematically yield the exact same voltage and current for the load!</p>
          </div>
        )
      }
    ]
  }
];

export const architectureExercises`
);

let finalContent = newContent;
if (!finalContent.includes('FreeformCircuitStudio')) {
   finalContent = "import { FreeformCircuitStudio } from \"@/components/simulations/sandbox/FreeformCircuitStudio\";\n" + finalContent;
}

fs.writeFileSync('src/data/course-exercises.tsx', finalContent);
console.log('updated course-exercises.tsx');
