import React from "react";
import { ClientChapter } from "./client";
import { PageHeader } from "@/components/ui/PageHeader";

export default async function Chapter1Page() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="Chapter 1: DC Circuits" 
        description="Fundamental concepts of voltage, current, resistance, and power."
      />
      <ClientChapter />
    </div>
  );
}
