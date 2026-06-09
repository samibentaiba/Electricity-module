"use client";

import Latex from "react-latex-next";
import { VoltageDivider } from "@/components/calculators/VoltageDivider";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { LearningChunk } from "@/components/ui/LearningChunk";

const SuperpositionVisualizer = dynamic(
  () =>
    import("@/components/simulations/course/SuperpositionVisualizer").then(
      (m) => m.SuperpositionVisualizer,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full rounded-2xl" />,
  },
);

const TheveninStepVisualizer = dynamic(
  () =>
    import("@/components/simulations/course/TheveninStepVisualizer").then(
      (m) => m.TheveninStepVisualizer,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full rounded-2xl" />,
  },
);

const NortonStepVisualizer = dynamic(
  () =>
    import("@/components/simulations/course/NortonStepVisualizer").then(
      (m) => m.NortonStepVisualizer,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full rounded-2xl" />,
  },
);

export function Section1_3() {
  return (
    <div className="space-y-12 mt-12">
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">
          5. Fundamental Theorems
        </h2>

        <div className="prose prose-slate dark:prose-invert max-w-none text-lg space-y-12">
          {/* 5.1 Voltage Divider */}
          <div>
            <h3 className="text-2xl font-bold text-primary">
              5.1 The Voltage Divider Theorem
            </h3>
            <p>
              Let <Latex>{`$n$`}</Latex> resistances be connected in series and
              powered by a voltage <Latex>{`$E$`}</Latex>.
            </p>
            <p>
              The voltage across the i-th resistance <Latex>{`$R_i$`}</Latex> is
              given by:
            </p>
            <div className="bg-muted/20 p-4 rounded-xl text-center border border-border/50 overflow-x-auto">
              <Latex>{`$$ V_i = E \\times \\frac{R_i}{\\sum_{k=1}^{n} R_k} $$`}</Latex>
            </div>

            <div className="mt-8">
              <LearningChunk
                simulation={<VoltageDivider />}
                imageSrc="/images/course/chapter-1/voltage-divider.jpg"
                explanation={
                  <>
                    <h3>Voltage Divider Circuit</h3>
                    <p>
                      This diagram represents the classic Voltage Divider
                      circuit. Resistors are connected in series across a
                      voltage source.
                    </p>
                    <p>
                      The voltage drops progressively across each resistor in
                      proportion to its resistance. The voltage measured across
                      the second resistor (<Latex>{"$R_2$"}</Latex>) is the
                      output voltage (<Latex>{"$V_{out}$"}</Latex>).
                    </p>
                    <p>The fundamental formula is:</p>
                    <Latex>{`$$ V_{out} = V_{in} \\times \\frac{R_2}{R_1 + R_2} $$`}</Latex>
                    <p>
                      This circuit is commonly used to step down voltages to a
                      specific reference level.
                    </p>
                  </>
                }
              />
            </div>
          </div>

          {/* 5.2 Current Divider */}
          <div>
            <h3 className="text-2xl font-bold text-primary">
              5.2 The Current Divider Theorem
            </h3>
            <p>
              Let <Latex>{`$n$`}</Latex> resistances be connected in parallel
              and powered by a current <Latex>{`$I$`}</Latex>.
            </p>
            <p>
              The current <Latex>{`$I_i$`}</Latex> passing through the i-th
              resistance <Latex>{`$R_i$`}</Latex> is given by:
            </p>
            <div className="bg-muted/20 p-4 rounded-xl text-center border border-border/50 overflow-x-auto">
              <Latex>{`$$ I_i = I \\times \\frac{\\frac{1}{R_i}}{\\sum_{k=1}^{n} \\frac{1}{R_k}} $$`}</Latex>
            </div>
          </div>

          {/* 5.3 Superposition Theorem */}
          <div>
            <h3 className="text-2xl font-bold text-primary">
              5.3 Superposition Theorem
            </h3>
            <p>
              <strong>Definition:</strong> This theorem is fundamental. It
              allows us to study circuits with multiple generators (voltage or
              current sources) by considering the influence of each generator
              independently from the others, which greatly simplifies most
              problems.
            </p>
            <p>
              <strong>Theorem:</strong> In a circuit with multiple generators,
              the solution to the problem (the unknown voltages and currents) is
              the sum of the solutions found by considering one generator at a
              time. To do this, replace each ideal voltage source with a short
              circuit and each current source with an open circuit, except for
              the source whose influence we want to determine.
            </p>

            <div className="mt-4 p-4 bg-emerald-500/10 border-l-4 border-emerald-500 rounded-r-lg text-emerald-200 text-sm">
              <strong>💡 In Simple Terms:</strong> Imagine two people pushing a
              heavy box at the same time. To figure out how fast the box moves,
              you can calculate how fast Person A pushes it alone, then
              calculate how fast Person B pushes it alone, and just add those
              two speeds together! Superposition lets you analyze a scary
              multi-battery circuit by looking at just one battery at a time.
            </div>

            <div className="mt-8">
              <LearningChunk
                simulation={<SuperpositionVisualizer />}
                imageSrc="/images/course/chapter-1/superposition.jpg"
                explanation={
                  <>
                    <h3>The Superposition Principle</h3>
                    <p>
                      When analyzing a linear circuit with multiple independent
                      sources (like <Latex>{"$V_1$"}</Latex> and{" "}
                      <Latex>{"$V_2$"}</Latex>), the superposition theorem
                      allows you to calculate the response (voltage or current)
                      in any branch by considering each source independently.
                    </p>
                    <ol>
                      <li>
                        <strong>Step 1:</strong> Turn off all independent
                        sources except one. (Voltage sources become short
                        circuits, current sources become open circuits).
                      </li>
                      <li>
                        <strong>Step 2:</strong> Calculate the currents and
                        voltages for this simplified circuit.
                      </li>
                      <li>
                        <strong>Step 3:</strong> Repeat for each independent
                        source.
                      </li>
                      <li>
                        <strong>Step 4:</strong> Electroncally sum the results
                        to find the total response.
                      </li>
                    </ol>
                    <p>
                      This diagram illustrates the separation of a complex
                      two-source circuit into two simpler single-source
                      circuits.
                    </p>
                  </>
                }
              />
            </div>
          </div>

          {/* 5.4 Thevenin's Theorem */}
          <div>
            <h3 className="text-2xl font-bold text-primary">
              5.4 Thevenin&apos;s Theorem
            </h3>
            <p>
              A linear electrical circuit placed between two points A and B can
              be replaced with a Thévenin equivalent generator with an
              electromotive force (EMF) <Latex>{`$E_{TH}$`}</Latex> and an
              internal resistance <Latex>{`$R_{TH}$`}</Latex> with respect to
              these points.
            </p>
            <ul>
              <li>
                <Latex>{`$E_{TH}$`}</Latex> is equal to the open-circuit voltage
                between points A and B (the voltage <Latex>{`$V_{AB}$`}</Latex>{" "}
                when the load is disconnected).
              </li>
              <li>
                <Latex>{`$R_{TH}$`}</Latex> is the equivalent resistance seen
                between points A and B when the load is disconnected and the
                sources are deactivated.
              </li>
            </ul>

            <div className="mt-8">
              <TheveninStepVisualizer />
            </div>

            <div className="mt-4 p-4 bg-purple-500/10 border-l-4 border-purple-500 rounded-r-lg text-purple-200 text-sm">
              <strong>💡 In Simple Terms:</strong> You know those giant,
              terrifying circuits with 15 resistors and 5 batteries tangled
              together? Thevenin proved that *no matter how crazy a circuit is*,
              if it only has two output wires, it behaves exactly the same as
              just **one single battery** and **one single resistor**. It&apos;s
              the ultimate simplification cheat code.
            </div>
          </div>

          {/* 5.5 Norton Theorem */}
          <div>
            <h3 className="text-2xl font-bold text-primary">
              5.5 Norton Theorem
            </h3>
            <p>
              The Norton Theorem states that a linear electrical circuit placed
              between two points A and B can be replaced by an equivalent Norton
              generator with a current source <Latex>{`$I_N$`}</Latex> and an
              internal resistance <Latex>{`$R_N$`}</Latex> with respect to these
              points.
            </p>
            <ul>
              <li>
                <Latex>{`$I_N$`}</Latex> is equal to the short-circuit current
                between points A and B (the current when the load is
                short-circuited).
              </li>
              <li>
                <Latex>{`$R_N$`}</Latex> is determined in the same way as the
                Thévenin resistance <Latex>{`$R_{TH}$`}</Latex>.
              </li>
            </ul>

            <div className="mt-8">
              <NortonStepVisualizer />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
