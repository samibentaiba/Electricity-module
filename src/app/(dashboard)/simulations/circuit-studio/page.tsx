import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { CircuitStudio } from "@/components/simulations/sandbox/CircuitStudio";

export default function CircuitStudioPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="Circuit Studio" 
        description="A sandbox working station to build, analyze, and test full series circuits using everything you've learned."
        color="amber"
      />
      <div className="mt-8">
        <CircuitStudio />
      </div>
    </div>
  );
}
