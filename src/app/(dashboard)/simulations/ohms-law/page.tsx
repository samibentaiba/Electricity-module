import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { OhmsLawVisualizer } from "@/components/simulations/course/OhmsLawVisualizer";

export default function OhmsLawSimulationPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="Ohm's Law Visualizer" 
        description="A full-screen interactive simulation to explore the relationship between Voltage, Current, and Resistance."
        color="amber"
      />
      <div className="mt-8">
        <OhmsLawVisualizer />
      </div>
    </div>
  );
}
