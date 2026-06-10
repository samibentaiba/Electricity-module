"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ExerciseCard } from "@/components/ui/ExerciseCard";
import { physicsExercises } from "@/data/course-exercises";
import { FileDown, BookOpen, FileCheck } from "lucide-react";

export default function ExercisesPage() {
  const [isMounted, setIsMounted] = useState(false);

  // 1. Clean the data: exclude exercises with broken random-resources images
  const processedSections = physicsExercises
    .map(section => ({
      ...section,
      exercises: section.exercises.filter(
        ex => !ex.diagramImageSrc || !ex.diagramImageSrc.includes("random-resources")
      )
    }))
    .filter(section => section.exercises.length > 0);

  // 2. Separate worksheets and practice sections
  const worksheetSections = processedSections.filter(s => s.type === "worksheet");
  const practiceSections = processedSections.filter(s => s.type !== "worksheet");

  // 3. Tab state for Worksheets
  const [activeWorksheetId, setActiveWorksheetId] = useState<string>(() => worksheetSections[0]?.id || "");

  // Mark component as mounted after hydration to avoid hydration mismatch
  useEffect(() => {
    const timer = window.setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Helper to match the section title/id to the newly renamed files
  const getWorksheetFile = (sectionId: string, title: string) => {
    const identifier = (sectionId + " " + title).toLowerCase();
    if (identifier.includes("1")) return "/worksheet1.docx";
    if (identifier.includes("2")) return "/worksheet2.pdf";
    if (identifier.includes("3")) return "/worksheet3.pdf";
    return null;
  };

  const activeWorksheet = worksheetSections.find(s => s.id === activeWorksheetId);

  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <PageHeader
        title="Worksheets & Practice"
        description="Interactive exercises, formal solutions, and reference diagrams for DC and AC Circuits."
        color="default"
      />

      {/* DOWNLOADABLE WORKSHEETS SECTION */}
      <div className="mb-12 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Worksheets & Solutions</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((num) => (
            <div key={num} className="border rounded-lg p-5 flex flex-col gap-4 bg-card shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg border-b pb-2">Worksheet {num}</h3>
              <div className="flex flex-col gap-2 mt-auto">
                <a
                  href={`/worksheet${num}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  <FileDown className="w-4 h-4" /> View Worksheet
                </a>
                <a
                  href={`/Worksheet ${num} Solution.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-green-600 hover:underline dark:text-green-400"
                >
                  <FileCheck className="w-4 h-4" /> View Solution
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-16 mt-12">
        {/* Delay rendering complex lists until client-side mount to prevent hydration mismatch */}
        {isMounted && (
          <>
            {/* WORKSHEETS SECTION WITH TABS */}
            {worksheetSections.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                  <div className="h-8 w-2 rounded-full bg-purple-500"></div>
                  <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
                    <BookOpen className="w-7 h-7 text-purple-500" />
                    Worksheets
                  </h2>
                </div>

                {/* TABS NAVIGATION */}
                <div className="flex flex-wrap gap-3 mb-8 pt-2">
                  {worksheetSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveWorksheetId(section.id)}
                      className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border flex items-center gap-2 ${
                        activeWorksheetId === section.id
                          ? "bg-purple-600/10 text-purple-400 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                          : "bg-slate-900/50 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>

                {/* ACTIVE WORKSHEET CONTENT */}
                {activeWorksheet && (
                  <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-purple-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-lg shadow-purple-900/10">
                      <div>
                        <h3 className="text-2xl font-bold text-purple-400 mb-2">
                          {activeWorksheet.title}
                        </h3>
                        {activeWorksheet.description && (
                          <p className="text-slate-300">{activeWorksheet.description}</p>
                        )}
                        {activeWorksheet.source && (
                          <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500/50"></span>
                            Source: {activeWorksheet.source}
                          </p>
                        )}
                      </div>
                      
                      {/* ORIGINAL FILE DOWNLOAD BUTTON */}
                      {getWorksheetFile(activeWorksheet.id, activeWorksheet.title) && (
                        <a
                          href={getWorksheetFile(activeWorksheet.id, activeWorksheet.title)!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white rounded-xl transition-all duration-300 border border-slate-700 hover:border-purple-500 whitespace-nowrap group"
                        >
                          <FileDown className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                          <span className="font-medium">Original Document</span>
                        </a>
                      )}
                    </div>

                    <div className="space-y-8 mt-8">
                      {activeWorksheet.exercises.map((exercise) => (
                        <ExerciseCard
                          key={exercise.id}
                          title={exercise.title}
                          problem={exercise.problem}
                          formalSolution={exercise.formalSolution}
                          aiExplanation={exercise.aiExplanation}
                          solution={exercise.solution}
                          diagramImageSrc={exercise.diagramImageSrc}
                          
                          solutionImageSrc={exercise.solutionImageSrc}
                          source={exercise.source}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
