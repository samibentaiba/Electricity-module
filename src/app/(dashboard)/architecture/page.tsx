import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { MotherboardExplainer } from "@/components/architecture/MotherboardExplainer";
import { ArchitectureExercises } from "@/components/architecture/ArchitectureExercises";

export default function ArchitecturePage() {
  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <PageHeader 
        title="Computer Architecture" 
        description="Learn the internal components of a computer and test your knowledge."
        color="blue"
      />
      
      <div className="space-y-16 mt-8">
        
        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-l-4 border-blue-500 pl-4">Interactive Motherboard</h2>
          <p className="text-muted-foreground">Hover over the different components of the motherboard to learn about their function, how they connect, and what role they play in the system architecture.</p>
          
          <MotherboardExplainer />
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-l-4 border-amber-500 pl-4">Architecture Exercises</h2>
          <p className="text-muted-foreground">Test your understanding of the CPU, motherboard, and software layers.</p>
          
          <ArchitectureExercises />
        </section>

      </div>
    </div>
  );
}
