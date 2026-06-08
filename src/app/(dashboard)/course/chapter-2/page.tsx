import React from "react";
import { ClientChapter } from "./client";
import { PageHeader } from "@/components/ui/PageHeader";

export default async function Chapter2Page() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="Chapter 2: Semiconductors & Diodes" 
        description="Understanding Insulators, Conductors, Semiconductors, and PN Junctions."
        color="purple"
      />
      <ClientChapter />
    </div>
  );
}
