import React from 'react';
// Import your existing simulations
import { KirchhoffVisualizer } from '@/components/simulations/course/KirchhoffVisualizer';
import { SuperpositionVisualizer } from '@/components/simulations/course/SuperpositionVisualizer';
import { TheveninStepVisualizer } from '@/components/simulations/course/TheveninStepVisualizer';

export interface Exercise {
  id: string;
  number: number;
  title: string;
  originalDiagramUrl: string;
  simulationComponent?: React.ReactNode;
  solutionFormula: string;
  aiExplanation: string;
}

export interface Worksheet {
  id: string;
  title: string;
  description: string;
  originalPdf: string;
  exercises: Exercise[];
}

export const worksheets: Worksheet[] = [
  {
    id: "td3",
    title: "Série de TD N°3: Transistors",
    description: "Polarisation et droites de charge.",
    originalPdf: "/serie 3 electronic final version.pdf",
    exercises: [] // Add your exercises here as you process them
  },
  {
    id: "serie1",
    title: "Série 1 Electronique",
    description: "Exercices fondamentaux.",
    originalPdf: "/serie 1 electronic.docx",
    exercises: [] // Add your exercises here
  },
  {
    id: "serie2",
    title: "Série 2 Electronique",
    description: "Exercices avancés.",
    originalPdf: "/final serie 2 electronic.pdf",
    exercises: [] // Add your exercises here
  }
];

export function getWorksheetById(id: string) {
  return worksheets.find(w => w.id === id);
}
