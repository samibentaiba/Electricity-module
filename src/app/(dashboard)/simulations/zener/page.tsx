import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ZenerRegulatorVisualizer } from "@/components/simulations/course/ZenerRegulatorVisualizer";

export default function ZenerSimulationPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="Zener Voltage Regulator" 
        description="Interact with a Zener diode voltage regulator circuit and watch it clamp ripple voltage in real time."
        color="green"
      />
      <div className="mt-8">
        <ZenerRegulatorVisualizer />
      </div>
    </div>
  );
}
