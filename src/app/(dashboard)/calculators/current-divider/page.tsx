import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { CurrentDivider } from "@/components/calculators/CurrentDivider";

export default function CurrentDividerPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="Current Divider Calculator" 
        description="Quickly calculate how current splits across parallel branches."
        color="purple"
      />
      <div className="mt-8">
        <CurrentDivider />
      </div>
    </div>
  );
}
