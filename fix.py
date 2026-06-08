import re

with open('src/data/course-exercises.tsx', 'r') as f:
    content = f.read()

# 1. Update the Exercise interface
content = content.replace(
"""export interface Exercise {
  id: string;
  title: string;
  problem: React.ReactNode;
  solution: React.ReactNode;
}""",
"""export interface Exercise {
  id: string;
  title: string;
  problem: React.ReactNode;
  formalSolution?: React.ReactNode;
  aiExplanation?: React.ReactNode;
  solution?: React.ReactNode;
}""")

# 2. Add imports
if 'CircuitStudio' not in content:
    content = content.replace('import Latex from "react-latex-next";',
                              'import Latex from "react-latex-next";\nimport { CircuitStudio } from "@/components/simulations/sandbox/CircuitStudio";\nimport { FreeformCircuitStudio } from "@/components/simulations/sandbox/FreeformCircuitStudio";')

# 3. Update the basic-series exercise
old_solution = """        solution: (
          <div className="space-y-4">
            <p><strong>1. Equivalent Resistance:</strong> For series resistors, <Latex>{`$R_{eq} = R_1 + R_2$`}</Latex>.</p>
            <p><Latex>{`$$ R_{eq} = 4\\Omega + 8\\Omega = 12\\Omega $$`}</Latex></p>
            <p><strong>2. Total Current:</strong> Using Ohm&apos;s Law, <Latex>{`$I = \\frac{V}{R_{eq}}$`}</Latex>.</p>
            <p><Latex>{`$$ I = \\frac{12\\text{V}}{12\\Omega} = 1\\text{A} $$`}</Latex></p>
            <p><strong>3. Voltage Drop across <Latex>{`$R_1$`}</Latex>:</strong> <Latex>{`$V_1 = I \\times R_1$`}</Latex>.</p>
            <p><Latex>{`$$ V_1 = 1\\text{A} \\times 4\\Omega = 4\\text{V} $$`}</Latex></p>
          </div>
        )"""

new_solution = """        aiExplanation: (
          <div className="space-y-6">
            <div className="mb-4">
              <h4 className="font-bold text-indigo-400 mb-2">Interactive Simulation: Test your answer!</h4>
              <p className="text-slate-300">
                You calculated a total current of <Latex>{`$1\\text{A}$`}</Latex> and a <Latex>{`$4\\text{V}$`}</Latex> drop across the first resistor. 
                Use the Loop Simulator below to build this exact circuit! Add a 12V battery and the two resistors, then watch the current flow.
              </p>
            </div>
            <div className="w-full relative z-0">
               <CircuitStudio />
            </div>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p><strong>1. Equivalent Resistance:</strong> For series resistors, <Latex>{`$R_{eq} = R_1 + R_2$`}</Latex>.</p>
            <p><Latex>{`$$ R_{eq} = 4\\Omega + 8\\Omega = 12\\Omega $$`}</Latex></p>
            <p><strong>2. Total Current:</strong> Using Ohm&apos;s Law, <Latex>{`$I = \\frac{V}{R_{eq}}$`}</Latex>.</p>
            <p><Latex>{`$$ I = \\frac{12\\text{V}}{12\\Omega} = 1\\text{A} $$`}</Latex></p>
            <p><strong>3. Voltage Drop across <Latex>{`$R_1$`}</Latex>:</strong> <Latex>{`$V_1 = I \\times R_1$`}</Latex>.</p>
            <p><Latex>{`$$ V_1 = 1\\text{A} \\times 4\\Omega = 4\\text{V} $$`}</Latex></p>
          </div>
        )"""

content = content.replace(old_solution, new_solution)

with open('src/data/course-exercises.tsx', 'w') as f:
    f.write(content)
