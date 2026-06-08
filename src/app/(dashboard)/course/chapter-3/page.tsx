import React from "react";
import { ClientChapter } from "./client";
import { PageHeader } from "@/components/ui/PageHeader";

export default async function Chapter3Page() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="Chapter 3: Bipolar Transistors" 
        description="Understanding NPN and PNP Transistors, Biasing, and Characteristics."
        color="green"
      />
      <ClientChapter />
    </div>
  );
}
