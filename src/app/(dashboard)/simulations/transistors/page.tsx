import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { TransistorExplorer } from "@/components/simulations/course/TransistorExplorer";

export default function TransistorSimulationPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="Transistor Explorer" 
        description="Interact with a BJT transistor to see how base current controls collector current."
        color="blue"
      />
      <div className="mt-8">
        <TransistorExplorer />
      </div>
    </div>
  );
}
