import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ResistorColorCode } from "@/components/calculators/ResistorColorCode";

export default function ResistorColorCodePage() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="Resistor Color Code" 
        description="Calculate resistance values based on color bands."
        color="amber"
      />
      <div className="mt-8">
        <ResistorColorCode />
      </div>
    </div>
  );
}
