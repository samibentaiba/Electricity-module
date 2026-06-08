import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ExerciseCard } from "@/components/ui/ExerciseCard";
import { physicsExercises } from "@/data/course-exercises";

export default function ExercisesPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader 
        title="Worksheets & Practice" 
        description="Interactive exercises with step-by-step solutions for DC and AC Circuits."
        color="default"
      />
      
      <div className="space-y-12 mt-8">
        {physicsExercises.map((section) => (
          <section key={section.id} className="space-y-6">
            <h2 className={`text-3xl font-bold border-l-4 pl-4 border-${section.color}-500`}>
              {section.title}
            </h2>
            {section.description && (
              <p className="text-muted-foreground">{section.description}</p>
            )}
            
            {section.exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                title={exercise.title}
                problem={exercise.problem}
                solution={exercise.solution}
              />
            ))}
          </section>
        ))}

      </div>
    </div>
  );
}
