"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const KirchhoffVisualizer = dynamic(() => import("@/components/simulations/course/KirchhoffVisualizer").then(m => m.KirchhoffVisualizer), { 
  ssr: false, loading: () => <Skeleton className="h-[600px] w-full rounded-2xl" /> 
});

export function Section1_2() {
  return (
    <div className="space-y-12 mt-12">
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">4. Kirchhoff&apos;s Laws</h2>
        
        <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
          <div className="space-y-6">
            <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
              <h3 className="text-xl font-bold text-primary mt-0">Node Law (KCL)</h3>
              <p>
                The algebraic sum of all currents at a node is zero. In other words, the sum of currents entering a node is equal to the sum of currents leaving that node.
              </p>
              <div className="mt-4 p-4 bg-blue-500/10 border-l-4 border-blue-500 rounded-r-lg text-blue-200 text-sm">
                <strong>💡 In Simple Terms:</strong> Think of a node like a plumbing junction. If 5 gallons of water flow into a T-junction per minute, exactly 5 gallons must flow out. Electricity works the exact same way—charge can&apos;t just magically disappear or pile up at a junction!
              </div>
            </div>

            <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
              <h3 className="text-xl font-bold text-primary mt-0">Loop (Mesh) Law (KVL)</h3>
              <p>
                The algebraic sum of the voltages around any mesh, counted in a given direction, is zero at all times.
              </p>
              <div className="mt-4 p-4 bg-blue-500/10 border-l-4 border-blue-500 rounded-r-lg text-blue-200 text-sm">
                <strong>💡 In Simple Terms:</strong> Imagine going for a hike. If you hike up a mountain (gain voltage from a battery) and then hike back down to your starting point (drop voltage across resistors), your total change in elevation is zero. A loop in a circuit is exactly like returning to your starting point!
              </div>
            </div>
          </div>

          <div className="bg-muted/30 p-6 rounded-xl border border-border/50 mt-8">
            <p className="font-semibold text-primary mb-4 text-xl">Interactive Kirchhoff Visualizer</p>
            <p className="mb-6 text-sm text-muted-foreground">Adjust the voltages and resistances to see Kirchhoff&apos;s laws in action across a two-loop circuit.</p>
            
            <KirchhoffVisualizer />
          </div>
        </div>
      </section>
    </div>
  );
}
