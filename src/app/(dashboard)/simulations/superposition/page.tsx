import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SuperpositionVisualizer } from "@/components/simulations/course/SuperpositionVisualizer";

export default function SuperpositionSimulationPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="Superposition Theorem" 
        description="Verify the Superposition Theorem by toggling independent voltage sources on and off."
        color="amber"
      />
      <div className="mt-8">
        <SuperpositionVisualizer />
      </div>
    </div>
  );
}
