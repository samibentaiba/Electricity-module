import React from 'react';
// Import your existing simulations
import { KirchhoffVisualizer } from '@/components/simulations/course/KirchhoffVisualizer';
import { SuperpositionVisualizer } from '@/components/simulations/course/SuperpositionVisualizer';
import { TheveninStepVisualizer } from '@/components/simulations/course/TheveninStepVisualizer';

export const worksheets = [
  {
    id: "td1",
    title: "Série de TD N°1: Lois Fondamentales",
    description: "Loi d'Ohm, Kirchhoff, diviseur de tension et de courant.",
    originalPdf: "/random-resources/pdfs/Série de TD N 1 Electronique Fondamentale L1.pdf",
    exercises: [
      {
        id: "td1-ex1",
        number: 1,
        title: "Application des Lois de Kirchhoff",
        // You will need to crop this image from your PDF and save it here:
        originalDiagramUrl: "/images/course/chapter-1/sources.jpg", // Placeholder using existing image
        simulationComponent: <KirchhoffVisualizer />, // Links to your interactive sim
        solutionFormula: "I_1 + I_2 - I_3 = 0 \\\\ V - R_1 I_1 - R_3 I_3 = 0",
        aiExplanation: "In this first exercise, we apply the node rule (currents entering = currents leaving) and the loop rule (sum of voltages in a closed loop = 0). The interactive simulation on the right lets you change the resistor values to see how the currents adapt in real-time while strictly following Kirchhoff's laws."
      },
      {
        id: "td1-ex2",
        number: 2,
        title: "Théorème de Superposition",
        originalDiagramUrl: "/images/course/chapter-1/superposition.jpg", // Placeholder
        simulationComponent: <SuperpositionVisualizer />,
        solutionFormula: "V_{th} = V'_{th} + V''_{th} \\\\ R_{eq} = R_1 || R_2",
        aiExplanation: "Superposition allows us to solve complex circuits with multiple power sources. We turn off all sources except one, calculate the result, and then do the same for the others. Finally, we add all the results together. Use the simulation to toggle the sources on and off to see this in action!"
      }
      // Add Exercise 3, 4, 5... here
    ]
  },
  {
    id: "td2",
    title: "Série de TD N°2: Théorèmes de Thévenin et Norton",
    description: "Simplification de circuits complexes.",
    originalPdf: "/random-resources/pdfs/Série de TD N°2.pdf",
    exercises: [
      {
        id: "td2-ex1",
        number: 1,
        title: "Modèle de Thévenin Equivalent",
        originalDiagramUrl: "/images/course/chapter-1/thevenin-step1.jpg",
        simulationComponent: <TheveninStepVisualizer />,
        solutionFormula: "E_{th} = \\\\frac{R_2}{R_1 + R_2} \\\\cdot E \\\\ R_{th} = \\\\frac{R_1 \\\\cdot R_2}{R_1 + R_2}",
        aiExplanation: "The goal here is to replace the entire circuit to the left of points A and B with a single voltage source and a single resistor in series. Notice in the simulation how the load resistor 'sees' exactly the same current and voltage whether it's connected to the complex circuit or the simple Thevenin equivalent."
      }
    ]
  },
  {
    id: "td3",
    title: "Série de TD N°3: Transistors",
    description: "Polarisation et droites de charge.",
    originalPdf: "/official-resources/td/serie 3 electronic final version.pdf",
    exercises: [] // Add your exercises here as you process them
  },
  {
    id: "serie1",
    title: "Série 1 Electronique",
    description: "Exercices fondamentaux.",
    originalPdf: "/official-resources/td/serie 1 electronic.docx",
    exercises: [] // Add your exercises here
  },
  {
    id: "serie2",
    title: "Série 2 Electronique",
    description: "Exercices avancés.",
    originalPdf: "/official-resources/td/final serie 2 electronic.pdf",
    exercises: [] // Add your exercises here
  }
];

export function getWorksheetById(id: string) {
  return worksheets.find(w => w.id === id);
}