import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FreeformCircuitStudio } from "@/components/simulations/sandbox/FreeformCircuitStudio";

export default function FreeformCircuitStudioPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="Freeform Circuit Sandbox" 
        description="A professional 2D canvas to drag, drop, and wire together arbitrary circuits. Powered by a custom Modified Nodal Analysis (MNA) engine."
        color="purple"
      />
      <div className="mt-8">
        <FreeformCircuitStudio />
      </div>
    </div>
  );
}
