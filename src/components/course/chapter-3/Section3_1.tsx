"use client";

import Latex from "react-latex-next";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const TransistorValveVisualizer = dynamic(() => import("@/components/simulations/course/TransistorValveVisualizer").then(m => m.TransistorValveVisualizer), { 
  ssr: false, loading: () => <Skeleton className="h-[400px] w-full rounded-2xl" /> 
});

const TransistorExplorer = dynamic(() => import("@/components/simulations/course/TransistorExplorer").then(m => m.TransistorExplorer), { 
  ssr: false, loading: () => <Skeleton className="w-full rounded-2xl" /> 
});

const TransistorLoadLineVisualizer = dynamic(() => import("@/components/simulations/course/TransistorLoadLineVisualizer").then(m => m.TransistorLoadLineVisualizer), { 
  ssr: false, loading: () => <Skeleton className="w-full rounded-2xl" /> 
});

const BiasingCircuitSandbox = dynamic(() => import("@/components/simulations/course/BiasingCircuitSandbox").then(m => m.BiasingCircuitSandbox), { 
  ssr: false, loading: () => <Skeleton className="w-full rounded-2xl" /> 
});

export function Section3_1() {
  return (
    <div className="space-y-12">
      {/* 3.1 Definition */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">3.1 Definition of a Bipolar Transistor</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
          <p>
            The transistor was first developed in 1948. It is composed of two junctions connected in series, very close to each other, with opposite polarity.
          </p>
          <p>
            A bipolar transistor is constructed by placing three doped semiconductor layers: <strong>N, P, then N</strong> for an NPN transistor, or <strong>P, N, then P</strong> for a PNP transistor.
          </p>
          <div className="mt-4 p-4 mb-6 bg-pink-500/10 border-l-4 border-pink-500 rounded-r-lg text-pink-200 text-sm">
            <strong>💡 In Simple Terms:</strong> Think of a transistor like a water faucet. The water waiting in the pipe is the **Collector**. The spout where water comes out is the **Emitter**. The knob that turns the water on and off is the **Base**. By turning the knob just a little bit (small Base current), you can control a huge rush of water (large Collector current)!
          </div>

          <TransistorValveVisualizer />

          <div className="bg-muted/20 p-4 mt-6 rounded-xl text-center border border-border/50">
            <p className="m-0 text-slate-300">A small base current, <Latex>{`$I_B$`}</Latex>, controls a much larger collector current, <Latex>{`$I_C$`}</Latex>.</p>
          </div>
        </div>
      </section>

      {/* 3.2 Structure */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">3.2 Structure of a Bipolar Transistor</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
          <p>A bipolar transistor has three regions:</p>
          <ul>
            <li><strong>Emitter</strong></li>
            <li><strong>Base</strong></li>
            <li><strong>Collector</strong></li>
          </ul>

          <div className="bg-muted/30 p-6 rounded-xl border border-border/50 space-y-4">
            <p>The <strong>collector</strong> is the largest region. It is usually connected to the transistor case.</p>
            <p>The <strong>base</strong> is the middle layer. It is very thin and separates the emitter from the collector.</p>
          </div>

          <div className="mt-8">
            <TransistorExplorer />
          </div>

          <p>Between these regions, there are two junctions:</p>
          <ul>
            <li>Base–Emitter junction</li>
            <li>Collector–Base junction</li>
          </ul>

          <p>
            Because of these two junctions, the device is often called a junction transistor. The two junctions (like two diodes) share the base region.
          </p>
        </div>
      </section>

      {/* 3.2 Symbol */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">3.3 Symbol & Quantities</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
          <p>For each transistor, we define six electrical quantities:</p>
          <ul>
            <li>Three currents</li>
            <li>Three voltages</li>
          </ul>



          <p className="text-muted-foreground italic">
            The PNP transistor works in the same way, but the currents and voltages are negative. The real current flows in the opposite direction to the arrows.
          </p>
        </div>
      </section>

      {/* 3.3 Relationships */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">3.4 Fundamental Current–Voltage Relationships</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
          <p><Latex>{`$\\beta$`}</Latex> is the current gain, and it is very large.</p>
          <div className="text-center py-4 bg-muted/20 border border-border/50 rounded-xl my-4 overflow-x-auto">
            <Latex>{`$$ I_C = \\beta \\times I_B $$`}</Latex>
          </div>
          <p>As <Latex>{`$\\alpha$`}</Latex> is approximately equal to unity,</p>
          <div className="text-center py-4 bg-muted/20 border border-border/50 rounded-xl my-4 overflow-x-auto">
             <Latex>{`$$ \\alpha = \\frac{\\beta}{\\beta + 1} $$`}</Latex>
          </div>
        </div>
      </section>
      
      {/* 3.4 Static Characteristic Curves */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">3.5 Static Characteristic Curves of the Transistor</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
          <p>Four quantities characterize the external behavior of the transistor:</p>
          <ul>
            <li>the input circuit: <Latex>{`$I_B$`}</Latex> as a function of <Latex>{`$V_{BE}$`}</Latex></li>
            <li>the output circuit: <Latex>{`$I_C$`}</Latex> as a function of <Latex>{`$V_{CE}$`}</Latex></li>
          </ul>

          <h3 className="text-xl font-bold text-primary mt-6">Fundamental Properties</h3>
          <ul className="space-y-4">
            <li>
              The curve <Latex>{`$I_B = f(V_{BE})$`}</Latex> corresponds to the operation of the base–emitter junction. It therefore represents the characteristic of a diode.
            </li>
            <li>
              The collector current <Latex>{`$I_C$`}</Latex> and the base current <Latex>{`$I_B$`}</Latex> are related by the fundamental relation: <Latex>{`$I_C = \\beta \\times I_B$`}</Latex>.
              The gain <Latex>{`$\\beta$`}</Latex> is an intrinsic characteristic of the transistor; it is the current gain. It is generally of the order of a few tens to a few hundreds.
            </li>
            <li>
            </li>
          </ul>

          <div className="mt-8">
            <TransistorLoadLineVisualizer />
          </div>

        </div>
      </section>

      {/* 3.5 Biasing */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">3.6 Transistor Biasing</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
          <p>
            <strong>Definition:</strong> Biasing consists in defining the static operating point (quiescent point) of the transistor, characterized by the values <Latex>{`$V_{BE0}, I_{B0}, I_{C0}$`}</Latex>, and <Latex>{`$V_{CE0}$`}</Latex>.
          </p>

          <h3 className="text-xl font-bold text-primary mt-8">1) Biasing using two voltage sources</h3>
          


          <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
            <p><strong>Static Input Line (Driving Line):</strong> Defined by the equation:</p>
            <div className="text-center my-4"><Latex>{`$$ V_{BE} = V_{BB} - R_B \\times I_B $$`}</Latex></div>
            <p>The intersection of this line with the input characteristic gives the point <Latex>{`$(I_{B0}, V_{BE0})$`}</Latex>.</p>

            <p className="mt-4"><strong>Static Load Line:</strong> Defined by the equation:</p>
            <div className="text-center my-4"><Latex>{`$$ V_{CE} = V_{CC} - R_C \\times I_C $$`}</Latex></div>
            <p>The intersection of this line with the output characteristic gives the point <Latex>{`$(V_{CE0}, I_{C0})$`}</Latex>.</p>
          </div>

          <h3 className="text-xl font-bold text-primary mt-8">2) Fixed Bias using Base Resistor</h3>
          


          <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
             <p><strong>Static Input Line:</strong> <Latex>{`$$ V_{BE} = V_{CC} - R_B \\times I_B $$`}</Latex></p>
             <p><strong>Static Load Line:</strong> <Latex>{`$$ I_C = \\frac{V_{CC} - V_{CE}}{R_C} $$`}</Latex></p>
          </div>

          <h3 className="text-xl font-bold text-primary mt-8">3) Biasing with a Resistor between Base and Collector</h3>
          


          <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
            <p>In this biasing case:</p>
            <ul className="list-disc pl-5">
              <li><Latex>{`$V_{BE} = V_{CE} - R_B \\times I_B$`}</Latex></li>
              <li><Latex>{`$V_{CE} = V_{CC} - R_C \\times I_C$`}</Latex></li>
            </ul>
            <p className="mt-4">With <Latex>{`$I_C = \\beta I_B$`}</Latex>, we obtain the Static Input Line:</p>
            <div className="text-center my-4"><Latex>{`$$ V_{BE} = V_{CC} - (R_B + \\beta R_C)I_B $$`}</Latex></div>
          </div>

          <h3 className="text-xl font-bold text-primary mt-8">4) Biasing using a Base Voltage Divider</h3>
          


          <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
             <p>In this biasing case, we can write:</p>
             <div className="text-center my-4"><Latex>{`$$ I_P + I_B = \\frac{V_{CC} - V_{BE}}{R_1} $$`}</Latex></div>
             <p>with <Latex>{`$I_P = \\frac{V_{CC}}{R_2}$`}</Latex>.</p>
             <p className="mt-4"><strong>Static Load Line:</strong></p>
             <div className="text-center my-4"><Latex>{`$$ I_C = \\frac{V_{CC} - V_{CE}}{R_C} $$`}</Latex></div>
          </div>

          <div className="mt-12">
            <BiasingCircuitSandbox />
          </div>

        </div>
      </section>
    </div>
  );
}
