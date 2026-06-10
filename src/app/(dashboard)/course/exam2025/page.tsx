import React from 'react';
import { PageHeader } from "@/components/ui/PageHeader";
import { FileText, CheckCircle, GraduationCap } from "lucide-react";

export default function Exam2025Page() {
  return (
    <div className="container max-w-5xl py-6 space-y-8">
      <PageHeader
        title="Final Exam 2025"
        description="Electronic Fundamentals final examination and official solutions."
        icon={GraduationCap}
        color="blue"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {/* Exam Card */}
        <div className="p-6 border rounded-xl bg-card shadow-sm flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold">Blank Examination</h2>
          <p className="text-muted-foreground text-sm">Download or view the original blank exam paper to test your knowledge.</p>
          <a
            href="/Electronic%20Fundamentals%20Exam.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          >
            Open Exam PDF
          </a>
        </div>

        {/* Solution Card */}
        <div className="p-6 border rounded-xl bg-card shadow-sm flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl font-semibold">Exam Solutions</h2>
          <p className="text-muted-foreground text-sm">Review the step-by-step solved examination to check your answers.</p>
          <a
            href="/Electronic%20Fundamentals%20Exam%20Solved.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 w-full"
          >
            Open Solutions PDF
          </a>
        </div>
      </div>
    </div>
  );
}