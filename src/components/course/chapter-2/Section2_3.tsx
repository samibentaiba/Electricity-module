"use client";

import Latex from "react-latex-next";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { LearningChunk } from "@/components/ui/LearningChunk";
import { courseImages } from "@/lib/images";

const RectifierVisualizer = dynamic(() => import("@/components/simulations/course/RectifierVisualizer").then(m => m.RectifierVisualizer), { 
  ssr: false, loading: () => <Skeleton className="h-[400px] w-full rounded-2xl" /> 
});

const ZenerRegulatorVisualizer = dynamic(() => import("@/components/simulations/course/ZenerRegulatorVisualizer").then(m => m.ZenerRegulatorVisualizer), { 
  ssr: false, loading: () => <Skeleton className="h-[400px] w-full rounded-2xl" /> 
});

export function Section2_3() {
  return (
    <div className="space-y-12 mt-12">
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">V. Rectification, Filtering and Regulation</h2>
        
        <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
          
          {/* 1. Rectification */}
          <h3 className="text-2xl font-bold text-primary mt-8">1. Rectification</h3>
          <p>
            <strong>Definition:</strong> Rectification consists of converting a bidirectional voltage into a unidirectional voltage called rectified voltage.
          </p>

          <div className="space-y-6 mt-6">
            <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
              <h4 className="text-xl font-bold text-primary mb-2">Half-wave Rectification</h4>
              <p><strong>Operating Principle:</strong> (Assumption: The diode is considered ideal.)</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  During the positive half-cycle of the voltage <Latex>{`$u$`}</Latex> (<Latex>{`$u > 0$`}</Latex>), the diode D is forward biased, therefore it is conducting (<Latex>{`$i > 0$`}</Latex> and <Latex>{`$u_d = 0$`}</Latex>), so: <Latex>{`$$ u_R = u - u_d = u $$`}</Latex>
                  with: <Latex>{`$u = U_M \\sin(\\omega t)$`}</Latex> and <Latex>{`$\\omega = 2\\pi f$`}</Latex>.
                </li>
                <li>
                  During the negative half-cycle of the voltage <Latex>{`$u$`}</Latex> (<Latex>{`$u < 0$`}</Latex>), the diode D is reverse biased, therefore it is blocked (<Latex>{`$i = 0$`}</Latex> and <Latex>{`$u_d < 0$`}</Latex>), so: <Latex>{`$$ u_R = 0 $$`}</Latex>
                </li>
              </ul>
            </div>

            <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
              <h4 className="text-xl font-bold text-primary mb-2">Full-Wave Rectification (Two Diodes & Center-Tapped Transformer)</h4>
              <p><strong>Operating Principle:</strong> (Assumption: The diodes are considered ideal.)</p>
              <p>During the positive half-cycle of <Latex>{`$u$`}</Latex>:</p>
              <ul className="list-disc pl-5 mb-4">
                <li><Latex>{`$u_1$`}</Latex> is positive, <Latex>{`$D_1$`}</Latex> conducts, therefore <Latex>{`$u_R = u_1 = \\frac{u}{2}$`}</Latex>.</li>
                <li><Latex>{`$u_2$`}</Latex> is negative, <Latex>{`$D_2$`}</Latex> is blocked.</li>
              </ul>
              
              <p>During the negative half-cycle of <Latex>{`$u$`}</Latex>:</p>
              <ul className="list-disc pl-5">
                <li><Latex>{`$u_2$`}</Latex> is positive, <Latex>{`$D_2$`}</Latex> conducts, therefore <Latex>{`$u_R = u_2 = -\\frac{u}{2}$`}</Latex>.</li>
                <li><Latex>{`$u_1$`}</Latex> is negative, <Latex>{`$D_1$`}</Latex> is blocked.</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <LearningChunk
              simulation={<RectifierVisualizer />}
              imageSrc={courseImages.chapter2.halfWave}
              explanation={
                <>
                  <h3>Rectifier Circuits</h3>
                  <p>In <strong>Diagram Mode</strong>, you see the classic half-wave rectifier schematic.</p>
                  <p>The AC input source is connected in series with a diode and a load resistor. Because the diode only allows current to flow in one direction (during the positive half-cycle), the negative half-cycles are completely blocked.</p>
                  <p>In a Full-Wave rectifier (not pictured here, but available in the simulation), a center-tapped transformer and two diodes (or a bridge of four diodes) are used to flip the negative half-cycles up, creating a more continuous DC output.</p>
                </>
              }
            />
          </div>

          {/* 2. Filtering */}
          <h3 className="text-2xl font-bold text-primary mt-8">2. Filtering</h3>
          <p>
            <strong>Definition:</strong> Filtering of a rectified voltage consists of reducing the ripple as much as possible in order to obtain a voltage that is as constant as possible. This function can be achieved using a capacitor.
          </p>
          <p>
            <strong>Operating Principle:</strong> From the first half-cycle, the capacitor C charges. Then, as soon as the voltage across its terminals becomes greater than the rectified voltage, it discharges through the resistor R.
          </p>

          {/* 3. Regulation */}
          <h3 className="text-2xl font-bold text-primary mt-8">3. Regulation</h3>
          <p>
            <strong>Definition:</strong> Regulation of a ripple voltage consists of obtaining an almost constant voltage. This function can be achieved using a Zener diode.
          </p>
          
          <div className="bg-muted/30 p-6 rounded-xl border border-border/50 mt-6">
            <h4 className="text-xl font-bold text-primary mb-2">Regulation Using a Zener Diode</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><Latex>{`$u$`}</Latex>: ripple voltage</li>
              <li><Latex>{`$R_p$`}</Latex>: bias resistor of the Zener diode</li>
            </ul>
            <p className="mt-4"><strong>Operating Principle:</strong></p>
            <p>Assume that the load resistor R is disconnected and that the Zener diode resistance <Latex>{`$R_z$`}</Latex> is neglected (<Latex>{`$R_z = 0$`}</Latex>).</p>
            <ul className="list-disc pl-5 mb-4">
              <li>If <Latex>{`$u > U_Z$`}</Latex>, then: <Latex>{`$u_s = U_Z$`}</Latex></li>
              <li>If <Latex>{`$u < U_Z$`}</Latex>, then: <Latex>{`$u_s = u$`}</Latex></li>
            </ul>
            <p>Therefore, <Latex>{`$u$`}</Latex> must be greater than <Latex>{`$U_Z$`}</Latex> so that the output voltage remains constant (regulated).</p>
            <div className="mt-6">
              <LearningChunk
                simulation={<ZenerRegulatorVisualizer />}
                imageSrc={courseImages.chapter2.zenerRegulator}
                explanation={
                  <>
                    <h3>Zener Voltage Regulator</h3>
                    <p>This schematic shows a classic Zener diode voltage regulator circuit.</p>
                    <p>The Zener diode is connected in <strong>reverse bias</strong> parallel to the load. A series resistor (<Latex>{"$R_p$"}</Latex>) is used to limit the current.</p>
                    <p>As long as the input voltage <Latex>{"$u$"}</Latex> is greater than the Zener breakdown voltage (<Latex>{"$U_Z$"}</Latex>), the diode operates in its breakdown region, maintaining a constant voltage <Latex>{"$U_Z$"}</Latex> across the load, regardless of fluctuations in the input voltage.</p>
                  </>
                }
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
