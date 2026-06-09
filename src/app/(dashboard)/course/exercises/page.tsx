import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ExerciseCard } from "@/components/ui/ExerciseCard";
import { physicsExercises } from "@/data/course-exercises";

export default function ExercisesPage() {
  // Separate worksheets and practice sections
  const worksheetSections = physicsExercises
    .filter(section => section.type === "worksheet")
    .map(section => ({
      ...section,
      exercises: section.exercises
        // Exclude any exercise whose diagramImageSrc points to random-resources
        .filter(exercise => !exercise.diagramImageSrc?.startsWith("/random-resources"))
        // Sort exercises sequentially by id (extract number)
        .sort((a, b) => {
          const numA = parseInt(a.id.replace(/\D/g, "")) || 0;
          const numB = parseInt(b.id.replace(/\D/g, "")) || 0;
          return numA - numB;
        })
    }))
    // Sort sections by id (worksheets usually have id like fundamentals)
    .sort((a, b) => {
      const idA = a.id;
      const idB = b.id;
      // Simple alphabetical sort; could be customized
      return idA.localeCompare(idB);
    });

  const practiceSections = physicsExercises
    .filter(section => section.type === "practice")
    .map(section => ({
      ...section,
      exercises: section.exercises
        .filter(exercise => !exercise.diagramImageSrc?.startsWith("/random-resources"))
        .sort((a, b) => {
          const numA = parseInt(a.id.replace(/\D/g, "")) || 0;
          const numB = parseInt(b.id.replace(/\D/g, "")) || 0;
          return numA - numB;
        })
    }))
    .sort((a, b) => a.id.localeCompare(b.id));

  return (
    <div className="animate-in fade-in duration-700">
      <PageHeader
        title="Worksheets & Practice"
        description="Interactive exercises with step-by-step solutions for DC and AC Circuits."
        color="default"
      />

      <div className="space-y-12 mt-8">
        {/* Worksheets Section */}
        {worksheetSections.length > 0 && (
          <>
            <h2 className="text-3xl font-bold border-l-4 pl-4 border-purple-500">
              Worksheets
            </h2>
            {worksheetSections.map((section) => (
              <section key={section.id} className="space-y-6">
                <h3 className={`text-2xl font-bold border-l-2 pl-3 border-${section.color}-500`}>
                  {section.title}
                </h3>
                {section.description && (
                  <p className="text-muted-foreground">{section.description}</p>
                )}
                {section.source && (
                  <p className="text-sm text-slate-400 italic mt-1">
                    Source: {section.source}
                  </p>
                )}
                {section.exercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    title={exercise.title}
                    problem={exercise.problem}
                    formalSolution={exercise.formalSolution}
                    aiExplanation={exercise.aiExplanation}
                    solution={exercise.solution}
                    diagramImageSrc={exercise.diagramImageSrc}
                    source={exercise.source}
                  />
                ))}
              </section>
            ))}
          </>
        )}

        {/* Practice Section */}
        {practiceSections.length > 0 && (
          <>
            <h2 className="text-3xl font-bold border-l-4 pl-4 border-amber-500 mt-10">
              Practice Exercises
            </h2>
            {practiceSections.map((section) => (
              <section key={section.id} className="space-y-6">
                <h3 className={`text-2xl font-bold border-l-2 pl-3 border-${section.color}-500`}>
                  {section.title}
                </h3>
                {section.description && (
                  <p className="text-muted-foreground">{section.description}</p>
                )}
                {section.source && (
                  <p className="text-sm text-slate-400 italic mt-1">
                    Source: {section.source}
                  </p>
                )}
                {section.exercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    title={exercise.title}
                    problem={exercise.problem}
                    formalSolution={exercise.formalSolution}
                    aiExplanation={exercise.aiExplanation}
                    solution={exercise.solution}
                    diagramImageSrc={exercise.diagramImageSrc}
                    source={exercise.source}
                  />
                ))}
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
}