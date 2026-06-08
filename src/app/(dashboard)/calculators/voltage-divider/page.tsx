import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { VoltageDivider } from "@/components/calculators/VoltageDivider";

export default function VoltageDividerPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="Voltage Divider Calculator" 
        description="Calculate the output voltage of a two-resistor voltage divider."
        color="purple"
      />
      <div className="mt-8">
        <VoltageDivider />
      </div>
    </div>
  );
}
