import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { RectifierVisualizer } from "@/components/simulations/course/RectifierVisualizer";

export default function RectifierSimulationPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="AC to DC Rectifier" 
        description="Visualize how diodes convert alternating current into direct current in both Half-Wave and Full-Wave configurations."
        color="primary"
      />
      <div className="mt-8">
        <RectifierVisualizer />
      </div>
    </div>
  );
}
