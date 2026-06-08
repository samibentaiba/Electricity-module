import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EquivalentResistance } from "@/components/calculators/EquivalentResistance";

export default function EquivalentResistancePage() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="Equivalent Resistance" 
        description="Calculate total resistance for series and parallel circuits."
        color="primary"
      />
      <div className="mt-8">
        <EquivalentResistance />
      </div>
    </div>
  );
}
