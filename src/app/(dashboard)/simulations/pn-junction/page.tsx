import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { PNJunctionVisualizer } from "@/components/simulations/course/PNJunctionVisualizer";
import { DopingVisualizer } from "@/components/simulations/course/DopingVisualizer";

export default function PNJunctionSimulationPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="Semiconductors & PN Junction" 
        description="Explore atomic doping and interact with a PN Junction to see how bias voltage affects the depletion region."
        color="purple"
      />
      <div className="mt-8 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-slate-200 mb-6 px-2 border-l-4 border-indigo-500">Atomic Doping</h2>
          <DopingVisualizer />
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-slate-200 mb-6 px-2 border-l-4 border-indigo-500">PN Junction Biasing</h2>
          <PNJunctionVisualizer />
        </section>
      </div>
    </div>
  );
}
