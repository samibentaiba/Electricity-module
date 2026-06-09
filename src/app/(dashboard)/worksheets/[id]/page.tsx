import React from 'react';
import { notFound } from 'next/navigation';
import { getWorksheetById } from '@/data/worksheets';
import WorksheetExerciseNode from '@/components/ui/WorksheetExerciseNode';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Tell Next.js we are going to use dynamic params
interface PageProps {
  params: {
    id: string;
  };
}

export default async function WorksheetPage({ params }: PageProps) {
  // 1. Fetch the data for this specific TD based on the URL (e.g., 'td1')
  const worksheet = getWorksheetById(params.id);

  // If the URL is wrong (e.g., /worksheets/td99), show a 404 page
  if (!worksheet) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Navigation & Header */}
      <div className="flex items-center gap-4 mb-4">
        <Link href="/resources">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <PageHeader
          title={worksheet.title}
          description={worksheet.description}
        />
        <a href={worksheet.originalPdf} target="_blank" rel="noopener noreferrer">
          <Button className="gap-2 shrink-0 bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Download Original PDF
          </Button>
        </a>
      </div>

      <div className="w-full h-px bg-slate-200 my-8"></div>

      {/* 2. Map through the exercises and render our new Node component for each one */}
      <div className="space-y-12">
        {worksheet.exercises.map((exercise) => (
          <WorksheetExerciseNode
            key={exercise.id}
            number={exercise.number}
            title={exercise.title}
            originalDiagramUrl={exercise.originalDiagramUrl}
            simulationComponent={exercise.simulationComponent}
            solutionFormula={exercise.solutionFormula}
            aiExplanation={exercise.aiExplanation}
          />
        ))}
      </div>
    </div>
  );
}