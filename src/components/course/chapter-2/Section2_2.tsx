"use client";

import Latex from "react-latex-next";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { LearningChunk } from "@/components/ui/LearningChunk";

const DiodeCurveVisualizer = dynamic(() => import("@/components/simulations/course/DiodeCurveVisualizer").then(m => m.DiodeCurveVisualizer), { 
  ssr: false, loading: () => <Skeleton className="h-[400px] w-full rounded-2xl" /> 
});

const PNJunctionVisualizer = dynamic(() => import("@/components/simulations/course/PNJunctionVisualizer").then(m => m.PNJunctionVisualizer), { 
  ssr: false, loading: () => <Skeleton className="h-[400px] w-full rounded-2xl" /> 
});

export function Section2_2() {
  return (
    <div className="space-y-12 mt-12">
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">III-1. Diodes</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
          <p>
            A diode is made from a small piece of semiconductor material, usually silicon, in which half is doped as a P region and half is doped as an N region with a PN junction and depletion region in between.
          </p>

          <div className="mt-4 p-4 bg-teal-500/10 border-l-4 border-teal-500 rounded-r-lg text-teal-200 text-sm">
            <strong>💡 In Simple Terms:</strong> A diode is essentially a **one-way valve** for electricity. Just like a valve in a water pipe lets water flow forward but snaps shut if water tries to flow backwards, a diode lets electric current flow in one direction but blocks it completely in the other.
          </div>
          
          <h3 className="text-2xl font-bold text-primary mt-8">III-1-1 Biasing</h3>
          <p>
            &quot;Biasing&quot; is providing minimum external voltage and current to activate the device to study its characteristics. There are two operating regions and two &quot;biasing&quot; conditions for the standard Junction Diode. We generally study three states to understand the device fully:
          </p>

          <div className="space-y-6 mt-6">
            <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
              <h4 className="text-xl font-bold text-primary mb-2">1. Zero Bias (V = 0)</h4>
              <p>When a diode is Zero Biased no external energy source is applied and a natural Potential Barrier is developed across a depletion layer.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Electrons and holes near the junction mix and cancel each other out (recombination).</li>
                <li><strong>The Result:</strong> A depletion region forms in the center, creating an internal electric field (barrier) that stops further movement.</li>
                <li><strong>Current:</strong> There is no current flowing through the device.</li>
              </ul>
            </div>

            <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
              <h4 className="text-xl font-bold text-primary mb-2">2. Reverse Bias (Blocked: V &lt; 0)</h4>
              <p>The Positive terminal is connected to the N-type and the Negative to the P-type.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>The external voltage pulls the charge carriers away from the center, which widens the depletion region.</li>
                <li><strong>The Result:</strong> The barrier becomes too large for the majority carriers to cross.</li>
                <li><strong>Current:</strong> The main current is zero. Only a tiny &quot;leakage&quot; current exists, called the reverse saturation current (Is).</li>
              </ul>
              <div className="mt-4">
                <LearningChunk
                  simulation={<PNJunctionVisualizer initialBias={-5} />}
                  imageSrc="/images/course/chapter-2/reverse-bias.jpg"
                  explanation={
                    <>
                      <h3>Reverse Bias</h3>
                      <p>Notice how the positive terminal of the battery is connected to the N-Type side, and the negative terminal to the P-Type side.</p>
                      <p>This pulls the charge carriers <em>away</em> from the junction, expanding the depletion region and blocking current flow.</p>
                    </>
                  }
                />
              </div>
            </div>

            <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
              <h4 className="text-xl font-bold text-primary mb-2">3. Forward Bias (Conducting: V &gt; 0)</h4>
              <p>The Positive terminal is connected to the P-type and the Negative to the N-type.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>The voltage pushes the charges toward the center, which shrinks (reduces) the depletion region.</li>
                <li><strong>The Result:</strong> The barrier disappears, allowing electrons to flood across the junction.</li>
                <li><strong>Current:</strong> There is a very high current flow that rises exponentially as voltage increases.</li>
              </ul>
              <div className="mt-4">
                <LearningChunk
                  simulation={<PNJunctionVisualizer initialBias={1} />}
                  imageSrc="/images/course/chapter-2/forward-bias.jpg"
                  explanation={
                    <>
                      <h3>Forward Bias</h3>
                      <p>Notice how the positive terminal of the battery is connected to the P-Type side, and the negative terminal to the N-Type side.</p>
                      <p>This pushes the charge carriers <em>towards</em> the junction, crushing the depletion region and allowing a massive flood of current to flow.</p>
                    </>
                  }
                />
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-primary mt-8">III-1-2 Diode I-V Characteristics</h3>
          <p>
            <strong>Current-Voltage Relationship:</strong> The most important diode characteristic is its current-voltage (i-v) relationship. This defines what the current running through a component is, given what voltage is measured across it. Resistors, for example, have a simple, linear i-v relationship... Ohm&apos;s Law. The i-v curve of a diode, though, is entirely non-linear.
          </p>

        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">IV. Zener Diode</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
          <p>
            A Zener diode is a junction diode specially designed to be used under reverse bias in the breakdown region.
          </p>

          <h3 className="text-xl font-bold text-primary mt-6">Characteristics</h3>
          <p>The Zener diode is a non-linear component with the following characteristics:</p>
          <ul>
            <li><strong>Vz:</strong> Zener voltage of the diode.</li>
            <li><strong>Iz(min):</strong> Minimum current below which the voltage is no longer regulated.</li>
            <li><strong>Iz(max):</strong> Maximum current that the Zener diode can withstand.</li>
          </ul>

          <p>
            <strong>Main application:</strong> For a voltage <span className="font-mono bg-slate-800 px-1 rounded text-sm">VDZ &gt; Vz</span>, the Zener diode conducts and the voltage across its terminals remains practically constant and equal to Vz.
          </p>

          <div className="mt-8">
            <LearningChunk
              simulation={<DiodeCurveVisualizer />}
              imageSrc="/images/course/chapter-2/zener-curve.jpg"
              explanation={
                <>
                  <h3>Zener Diode I-V Curve</h3>
                  <p>In standard forward bias (right side of the graph), a Zener diode acts exactly like a normal diode, conducting when the voltage exceeds ~0.7V.</p>
                  <p>However, when reverse-biased (left side of the graph), a normal diode would eventually break and be destroyed. A Zener diode is designed to safely <strong>break down</strong> at a specific Zener voltage (<Latex>{"$V_Z$"}</Latex>).</p>
                  <p>Once in the breakdown region, it can pass a wide range of currents while keeping the voltage across it practically constant at <Latex>{"$V_Z$"}</Latex>, making it perfect for voltage regulation!</p>
                </>
              }
            />
          </div>

          <h3 className="text-xl font-bold text-primary mt-6">Zener Diode Modeling</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
              <h4 className="font-bold text-primary mb-2">In Forward Bias</h4>
              <p className="text-sm text-slate-300">The Zener diode behaves like a conventional junction diode.</p>
            </div>
            
            <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
              <h4 className="font-bold text-primary mb-2">In Reverse Bias</h4>
              <p className="text-sm text-slate-300">Can be modeled either as an Ideal model or a Model with Zener voltage and resistance.</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
