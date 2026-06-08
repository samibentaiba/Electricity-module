import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { KirchhoffVisualizer } from "@/components/simulations/course/KirchhoffVisualizer";

export default function KirchhoffSimulationPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="Kirchhoff's Laws" 
        description="Solve 2-loop circuits visually with real-time updates."
        color="green"
      />
      <div className="mt-8">
        <KirchhoffVisualizer />
      </div>
    </div>
  );
}
