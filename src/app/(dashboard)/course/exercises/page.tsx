import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ExerciseCard } from "@/components/ui/ExerciseCard";
import { physicsExercises } from "@/data/course-exercises";

export default function ExercisesPage() {
  // 1. Clean the data: exclude any exercise that tries to use a random-resources image
  const processedSections = physicsExercises
    .map(section => ({
      ...section,
      exercises: section.exercises.filter(
        ex => !ex.diagramImageSrc || !ex.diagramImageSrc.includes("random-resources")
      )
    }))
    .filter(section => section.exercises.length > 0);

  // 2. Separate exactly how you requested
  const worksheetSections = processedSections.filter(s => s.type === "worksheet");
  const practiceSections = processedSections.filter(s => s.type !== "worksheet");

  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <PageHeader
        title="Worksheets & Practice"
        description="Interactive exercises, formal solutions, and reference diagrams for DC and AC Circuits."
        color="default"
      />

      <div className="space-y-16 mt-12">
        {/* WORKSHEETS SECTION */}
        {worksheetSections.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <div className="h-8 w-2 rounded-full bg-purple-500"></div>
              <h2 className="text-3xl font-bold text-slate-100">Worksheets</h2>
            </div>

            {worksheetSections.map((section) => (
              <section key={section.id} className="space-y-6">
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-purple-500/20">
                  <h3 className="text-2xl font-bold text-purple-400 mb-2">
                    {section.title}
                  </h3>
                  {section.description && (
                    <p className="text-slate-400 mb-2">{section.description}</p>
                  )}
                  {section.source && (
                    <p className="text-sm text-slate-500 italic">
                      Source: {section.source}
                    </p>
                  )}
                </div>

                <div className="space-y-8">
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
                </div>
              </section>
            ))}
          </div>
        )}

        {/* PRACTICE EXERCISES SECTION */}
        {practiceSections.length > 0 && (
          <div className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <div className="h-8 w-2 rounded-full bg-amber-500"></div>
              <h2 className="text-3xl font-bold text-slate-100">Practice Exercises</h2>
            </div>

            {practiceSections.map((section) => (
              <section key={section.id} className="space-y-6">
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20">
                  <h3 className="text-2xl font-bold text-amber-400 mb-2">
                    {section.title}
                  </h3>
                  {section.description && (
                    <p className="text-slate-400 mb-2">{section.description}</p>
                  )}
                  {section.source && (
                    <p className="text-sm text-slate-500 italic">
                      Source: {section.source}
                    </p>
                  )}
                </div>

                <div className="space-y-8">
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
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}