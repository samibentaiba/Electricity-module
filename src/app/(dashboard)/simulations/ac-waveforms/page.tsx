import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ACWaveformsVisualizer } from "@/components/simulations/course/ACWaveformsVisualizer";

export default function ACWaveformsSimulationPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="AC Waveforms" 
        description="Interactive visualization of Alternating Current sine waves and RMS values."
        color="purple"
      />
      <div className="mt-8">
        <ACWaveformsVisualizer />
      </div>
    </div>
  );
}
