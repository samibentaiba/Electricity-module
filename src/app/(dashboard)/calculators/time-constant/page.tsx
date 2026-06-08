import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { TimeConstant } from "@/components/calculators/TimeConstant";

export default function TimeConstantPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="RC Time Constant Calculator" 
        description="Calculate the time constant of an RC circuit and view its charging curve."
        color="blue"
      />
      <div className="mt-8">
        <TimeConstant />
      </div>
    </div>
  );
}
