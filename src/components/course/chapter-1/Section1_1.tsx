"use client";

import Latex from "react-latex-next";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const OhmsLawVisualizer = dynamic(() => import("@/components/simulations/course/OhmsLawVisualizer").then(m => m.OhmsLawVisualizer), { 
  ssr: false, loading: () => <Skeleton className="h-[500px] w-full rounded-2xl" /> 
});

const IdealSourcesVisualizer = dynamic(() => import("@/components/simulations/course/IdealSourcesVisualizer").then(m => m.IdealSourcesVisualizer), { 
  ssr: false, loading: () => <Skeleton className="h-[400px] w-full rounded-2xl" /> 
});

export function Section1_1() {
  return (
    <div className="space-y-12">
      {/* 1. Definitions */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">1. Definitions</h2>
        
        <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
          <p>
            <strong>Electronics</strong> is the branch of science and technology that deals with the study and application of devices, circuits, and systems that use electrical energy to control, process, and transmit information. Electronics typically involves the flow of electric current through semiconductor materials, which allows for the manipulation of signals in various forms, such as digital, analog, or electromagnetic signals.
          </p>
          <p>
            An <strong>electrical circuit or network</strong> is a collection of conductors connected together, generally containing generators, receivers, and resistances.
          </p>
          <p>
            A <strong>dipole</strong> is an electrical element capable or not of supplying energy, communicating with the exterior only through two terminals. The resistance or voltage source between points B and M in the figure constitutes two examples of dipoles.
          </p>
          <p>
            A <strong>node</strong> is a point in the network where more than two conductors are connected.
          </p>
          <p>
            A <strong>branch</strong> is a portion of the network located between two nodes.
          </p>
        </div>
      </section>

      {/* 2. Classification of Dipole */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">2. Classification of Dipole</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
          <p>We generally categorize dipoles into two main groups:</p>
          
          <h3 className="text-2xl font-bold text-primary mt-6">2.1. Passive Dipoles</h3>
          <p>These components cannot provide energy to the circuit for an indefinite period. They either dissipate energy or store it in a field.</p>
          <ul>
            <li><strong>Resistors:</strong> Dissipate energy as heat (Joule effect). <Latex>{`$$ V = R \\times I $$`}</Latex></li>
            <li><strong>Capacitors:</strong> Store energy in an electric field. (C: Capacitance measured in Farads, F)</li>
            <li><strong>Inductors (Bobines):</strong> Store energy in a magnetic field.</li>
          </ul>

          <h3 className="text-2xl font-bold text-primary mt-6">2.2. Active Dipoles</h3>
          <p>These components can supply electrical energy to the circuit.</p>
          <ul>
            <li><strong>Voltage Sources:</strong> Maintain a specific voltage (e.g., a battery).</li>
            <li><strong>Current Sources:</strong> Maintain a specific flow of current.</li>
          </ul>

          <div className="mt-8">
            <IdealSourcesVisualizer />
          </div>
        </div>
      </section>

      {/* 3. Classification of Circuit Components */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">3. Classification of Circuit Components: Linear and Non-linear</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
          <ul>
            <li><strong>Linear Behavior:</strong> The relationship between V and I is a straight line <Latex>{`$(V = K \\times I)$`}</Latex>.</li>
            <li><strong>Non-linear Behavior:</strong> The relationship is more complex (e.g., Diode, which only allows current to flow in one direction).</li>
          </ul>

          <div className="overflow-x-auto mt-6">
            <table className="min-w-full divide-y divide-border border border-border rounded-xl overflow-hidden">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Examples</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role in Circuit</th>
                </tr>
              </thead>
              <tbody className="bg-slate-950 divide-y divide-border">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Passive</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">Resistor, Capacitor, Inductor</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">Consumes or stores energy</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Active</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">Battery, Solar cell, Dynamo</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">Supplies energy</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Non-linear</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">Diode, Zener diode</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">Controls/rectifies current flow</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-muted/30 p-6 rounded-xl border border-border/50 mt-8">
            <p className="font-semibold text-primary mb-4 text-xl">Interactive Linear Behavior Visualizer (Ohm&apos;s Law)</p>
            <p className="mb-6 text-sm text-muted-foreground">Adjust the voltage and resistance below to see how they affect the current flowing through the circuit. Notice that increasing the voltage increases the current, while increasing the resistance decreases the current.</p>
            
            <OhmsLawVisualizer />
          </div>
        </div>
      </section>
    </div>
  );
}
