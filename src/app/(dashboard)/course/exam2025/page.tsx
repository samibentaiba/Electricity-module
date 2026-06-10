"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ExerciseCard } from "@/components/ui/ExerciseCard";
import { exam2025Exercises } from "@/data/exam-2025";
import {
  FileDown,
  FileCheck,
  GraduationCap,
  Trophy,
  BookOpen,
  Clock,
  Award,
} from "lucide-react";

export default function Exam2025Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const section = exam2025Exercises[0];

  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <PageHeader
        title="Final Exam 2025"
        description="Electronic Fundamentals · Saad Dahlab University of Blida · 1st Year LMD (C.S)"
        icon={GraduationCap}
        color="blue"
      />

      {/* Hero / Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { icon: BookOpen, label: "Exercises", value: "3", color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
          { icon: Trophy, label: "Total Points", value: "20 pts", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
          { icon: Clock, label: "Duration", value: "1h 30m", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          { icon: Award, label: "Date", value: "May 2026", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className={`rounded-2xl border p-5 flex items-center gap-4 ${bg}`}>
            <div className={`${color} shrink-0`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</p>
              <p className="text-slate-100 font-bold text-lg leading-tight">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* PDF Downloads */}
      <div className="mb-12 space-y-4">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
          <div className="h-8 w-2 rounded-full bg-blue-500" />
          <h2 className="text-2xl font-bold text-slate-100">Original Documents</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="/Electronic Fundamentals Exam.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 rounded-2xl border border-slate-700 bg-slate-900/60 p-5 hover:border-blue-500/60 hover:bg-blue-500/5 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-blue-900/20"
          >
            <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-500/25 transition-colors">
              <FileDown className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-100 truncate">Blank Exam Paper</p>
              <p className="text-sm text-slate-400">Electronic Fundamentals Exam.pdf</p>
            </div>
          </a>
          <a
            href="/Electronic Fundamentals Exam Solved.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 rounded-2xl border border-slate-700 bg-slate-900/60 p-5 hover:border-emerald-500/60 hover:bg-emerald-500/5 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-emerald-900/20"
          >
            <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/25 transition-colors">
              <FileCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-100 truncate">Solved Exam Paper</p>
              <p className="text-sm text-slate-400">Electronic Fundamentals Exam Solved.pdf</p>
            </div>
          </a>
        </div>
      </div>

      {/* Interactive Exercises */}
      <div className="space-y-16">
        {isMounted && (
          <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <div className="h-8 w-2 rounded-full bg-indigo-500" />
              <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
                <GraduationCap className="w-7 h-7 text-indigo-400" />
                Interactive Exam Walkthrough
              </h2>
            </div>

            {/* Section info card */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-indigo-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-lg shadow-indigo-900/10">
              <div>
                <h3 className="text-2xl font-bold text-indigo-400 mb-2">{section.title}</h3>
                {section.description && (
                  <p className="text-slate-300">{section.description}</p>
                )}
                {section.source && (
                  <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
                    Source: {section.source}
                  </p>
                )}
              </div>
              <a
                href="/Electronic Fundamentals Exam Solved.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white rounded-xl transition-all duration-300 border border-slate-700 hover:border-indigo-500 whitespace-nowrap group"
              >
                <FileCheck className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                <span className="font-medium">Official Solutions</span>
              </a>
            </div>

            {/* Exercise Breakdown Legend */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Exercise 1 — DC Circuits & Norton's Theorem", pts: "6pts", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
                { label: "Exercise 2 — Diode Rectifier", pts: "5pts", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
                { label: "Exercise 3 — NPN Transistor Biasing", pts: "9pts", color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
              ].map(({ label, pts, color }) => (
                <div key={label} className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${color}`}>
                  <Award className="w-3.5 h-3.5" />
                  {label}
                  <span className="font-bold ml-1">{pts}</span>
                </div>
              ))}
            </div>

            {/* Exercise Cards */}
            <div className="space-y-8 mt-4">
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
          </div>
        )}

        {!isMounted && (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-10 h-10 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-slate-400">Loading interactive exercises…</p>
          </div>
        )}
      </div>
    </div>
  );
}