import React from "react";
import Latex from "react-latex-next";

export interface Exercise {
  id: string;
  title: string;
  problem: React.ReactNode;
  solution: React.ReactNode;
}

export interface ExerciseSection {
  id: string;
  title: string;
  description?: string;
  color: "purple" | "amber" | "indigo" | "emerald" | "default";
  exercises: Exercise[];
}

export const physicsExercises: ExerciseSection[] = [
  {
    id: "fundamentals",
    title: "Extra Practice: Fundamentals (Ouargla Univ.)",
    description: "The following fundamental questions were extracted from the external resource library (Serie 01).",
    color: "purple",
    exercises: [
      {
        id: "mcq-fundamentals",
        title: "Multiple Choice: Electronic Fundamentals",
        problem: (
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="font-semibold">1. What is electric current?</p>
              <ul className="list-disc list-inside text-slate-300 ml-4">
                <li>a) An electromagnetic force</li>
                <li>b) An electric field</li>
                <li>c) A movement of electrons in a conducting medium</li>
                <li>d) Electrons that orbit the nuclei of atoms</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">2. What phenomena are observed when a current passes through a resistance?</p>
              <ul className="list-disc list-inside text-slate-300 ml-4">
                <li>a) A loss of current between the input and output</li>
                <li>b) A light</li>
                <li>c) Heating of the resistance</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">3. When two resistors are put in parallel?</p>
              <ul className="list-disc list-inside text-slate-300 ml-4">
                <li>a) They are subjected to the same tension (voltage)</li>
                <li>b) The current is divided into two equal parts</li>
                <li>c) The heat produced is less</li>
              </ul>
            </div>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <p><strong>1. Answer: C</strong>. Electric current is defined as the macroscopic movement (or flow) of electrons in a conducting medium.</p>
            <p><strong>2. Answer: C</strong>. When current passes through a resistor, electrical energy is converted into thermal energy, causing the heating of the resistance. This is known as the <em>Joule Effect</em>.</p>
            <p><strong>3. Answer: A</strong>. By definition, components connected in parallel are connected across the exact same two nodes, meaning they must be subjected to the same tension (voltage drop).</p>
          </div>
        )
      }
    ]
  },
  {
    id: "dc-circuits",
    title: "DC Circuits (Ohm&apos;s Law & Power)",
    color: "amber",
    exercises: [
      {
        id: "basic-series",
        title: "Exercise 1: Basic Series Circuit",
        problem: (
          <div className="space-y-2">
            <p>A circuit consists of a <Latex>{`$12\\text{V}$`}</Latex> battery and two resistors in series: <Latex>{`$R_1 = 4\\Omega$`}</Latex> and <Latex>{`$R_2 = 8\\Omega$`}</Latex>.</p>
            <ol className="list-decimal list-inside">
              <li>Find the equivalent resistance.</li>
              <li>Calculate the total current flowing in the circuit.</li>
              <li>Determine the voltage drop across <Latex>{`$R_1$`}</Latex>.</li>
            </ol>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <p><strong>1. Equivalent Resistance:</strong> For series resistors, <Latex>{`$R_{eq} = R_1 + R_2$`}</Latex>.</p>
            <p><Latex>{`$$ R_{eq} = 4\\Omega + 8\\Omega = 12\\Omega $$`}</Latex></p>
            <p><strong>2. Total Current:</strong> Using Ohm&apos;s Law, <Latex>{`$I = \\frac{V}{R_{eq}}$`}</Latex>.</p>
            <p><Latex>{`$$ I = \\frac{12\\text{V}}{12\\Omega} = 1\\text{A} $$`}</Latex></p>
            <p><strong>3. Voltage Drop across <Latex>{`$R_1$`}</Latex>:</strong> <Latex>{`$V_1 = I \\times R_1$`}</Latex>.</p>
            <p><Latex>{`$$ V_1 = 1\\text{A} \\times 4\\Omega = 4\\text{V} $$`}</Latex></p>
          </div>
        )
      }
    ]
  },
  {
    id: "ac-circuits",
    title: "AC Circuits",
    color: "purple",
    exercises: [
      {
        id: "rms-voltage",
        title: "Exercise 2: RMS Voltage Calculation",
        problem: (
          <p>An AC power supply generates a voltage waveform given by <Latex>{`$V(t) = 170 \\sin(377t)$`}</Latex>. What is the RMS voltage?</p>
        ),
        solution: (
          <div className="space-y-4">
            <p>The standard equation is <Latex>{`$V(t) = V_{peak} \\sin(\\omega t)$`}</Latex>. Here, <Latex>{`$V_{peak} = 170\\text{V}$`}</Latex>.</p>
            <p>The RMS voltage is calculated as:</p>
            <p><Latex>{`$$ V_{rms} = \\frac{V_{peak}}{\\sqrt{2}} $$`}</Latex></p>
            <p><Latex>{`$$ V_{rms} = \\frac{170}{1.414} \\approx 120.2\\text{V} $$`}</Latex></p>
            <p>This is the standard voltage of a wall outlet in North America!</p>
          </div>
        )
      }
    ]
  }
];

export const architectureExercises: ExerciseSection[] = [
  {
    id: "architecture-basics",
    title: "Computer Architecture Basics",
    color: "indigo",
    exercises: [
      {
        id: "computer-brain",
        title: "Exercise 1: The Computer Brain",
        problem: (
          <div className="space-y-4">
            <p>The role of the processor in a computer is: (choose the correct answers based on Series 03)</p>
            <ul className="list-disc list-inside text-slate-300 ml-4 space-y-1">
              <li>A. To transfer the information</li>
              <li>B. To carry out the instructions</li>
              <li>C. To order all units</li>
              <li>D. To store the instructions long-term</li>
              <li>E. To control the progress of all operations</li>
            </ul>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <p><strong>Correct Answers: B, C, and E</strong></p>
            <p>The processor (CPU) acts as the brain of the computer. Its primary functions are to <strong>carry out instructions</strong> via the ALU, and to <strong>order all units</strong> and <strong>control the progress of operations</strong> via the Control Unit.</p>
            <p className="text-muted-foreground text-sm">Note: It does not transfer bulk information (that&apos;s the bus/chipset) nor does it store instructions long-term (that&apos;s the hard drive/RAM).</p>
          </div>
        )
      },
      {
        id: "system-vs-app",
        title: "Exercise 2: System vs Application Software",
        problem: (
          <div className="space-y-4">
            <p>Fill in the blanks based on Series 05 definitions:</p>
            <p>1. ______________ are programs that control or maintain the operations of the computer and its devices.</p>
            <p>2. The function of system software is to serve as the ______________ between the user, the application software, and the computer&apos;s hardware.</p>
            <p>3. ______________ are programs designed to help users be more productive with personal tasks.</p>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <p><strong>1. System Software</strong>: Operating systems like Windows, Linux, or macOS are system software.</p>
            <p><strong>2. Interface</strong>: It bridges the gap between hardware and the user/applications.</p>
            <p><strong>3. Application Software</strong>: Programs like Microsoft Word, Chrome, or this web browser!</p>
          </div>
        )
      }
    ]
  }
];
