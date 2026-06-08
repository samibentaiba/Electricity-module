"use client";

import { ExerciseCard } from "@/components/ui/ExerciseCard";
import { architectureExercises } from "@/data/course-exercises";

export function ArchitectureExercises() {
  return (
    <div className="space-y-8">
      {architectureExercises.map((section) => (
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
  );
}
