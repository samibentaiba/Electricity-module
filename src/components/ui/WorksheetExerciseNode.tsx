import React, { useState } from 'react';
import Image from 'next/image';
import MathBlock from './MathBlock';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Calculator, FileImage, Play } from 'lucide-react';

interface WorksheetExerciseProps {
  number: number;
  title: string;
  originalDiagramUrl: string;
  simulationComponent: React.ReactNode;
  solutionFormula: string;
  aiExplanation: string;
}

export default function WorksheetExerciseNode({
  number,
  title,
  originalDiagramUrl,
  simulationComponent,
  solutionFormula,
  aiExplanation
}: WorksheetExerciseProps) {
  // Mobile responsive tabs
  const [activeTab, setActiveTab] = useState<'diagram' | 'simulation'>('diagram');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      {/* HEADER */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800">Exercise {number}: {title}</h3>
      </div>

      {/* TOP ROW: Visuals (Original vs Interactive) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-slate-200">

        {/* Left: Original Diagram */}
        <div className="p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
          <div className="flex items-center gap-2 mb-4 text-slate-600 font-semibold">
            <FileImage className="w-5 h-5 text-blue-500" />
            <h4>Original Diagram (From Source)</h4>
          </div>
          <div className="relative w-full aspect-video bg-slate-50 rounded-lg overflow-hidden border border-slate-100 flex items-center justify-center">
            {/* Replace with actual next/image when you have the URLs */}
            <img
              src={originalDiagramUrl}
              alt={`Exercise ${number} original`}
              className="object-contain w-full h-full p-2"
            />
          </div>
        </div>

        {/* Right: Simulation */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4 text-slate-600 font-semibold">
            <Play className="w-5 h-5 text-emerald-500" />
            <h4>Interactive Simulation</h4>
          </div>
          <div className="w-full aspect-video bg-slate-50 rounded-lg overflow-hidden border border-slate-100 relative">
             {/* This is where your interactive tools (CircuitStudio, etc) will render */}
            <div className="absolute inset-0 overflow-auto">
                {simulationComponent}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: Logic (Math vs AI) */}
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Left: Solution & Formulas */}
        <div className="p-6 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-2 mb-4 text-slate-600 font-semibold">
            <Calculator className="w-5 h-5 text-indigo-500" />
            <h4>Formal Solution & Exam Formulas</h4>
          </div>
          <div className="prose prose-slate max-w-none text-sm">
             {/* Uses your existing MathBlock component for LaTeX */}
             <MathBlock math={solutionFormula} />
          </div>
        </div>

        {/* Right: AI Explanation */}
        <div className="p-6 bg-blue-50/30">
          <div className="flex items-center gap-2 mb-4 text-slate-600 font-semibold">
            <BrainCircuit className="w-5 h-5 text-purple-500" />
            <h4>AI Explanation</h4>
          </div>
          <div className="text-sm text-slate-700 leading-relaxed space-y-3">
             {/* Render the AI explanation text */}
             <p>{aiExplanation}</p>
          </div>
        </div>

      </div>
    </div>
  );
}