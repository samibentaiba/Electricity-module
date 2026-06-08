import { BookOpen, Calculator, Shapes, Library, Cpu } from "lucide-react";

export const navigationConfig = [
  {
    title: "Course Modules",
    icon: BookOpen,
    items: [
      { href: "/course/chapter-1", label: "Chapter 1: DC Circuits" },
      { href: "/course/chapter-2", label: "Chapter 2: AC Circuits" },
      { href: "/course/chapter-3", label: "Chapter 3: Electromagnetism" },
    ]
  },
  {
    title: "Visualizations",
    icon: Shapes,
    items: [
      { href: "/simulations/ohms-law", label: "Ohm's Law Visualizer" },
      { href: "/simulations/kirchhoff", label: "Kirchhoff's Laws" },
      { href: "/simulations/ac-waveforms", label: "AC Waveforms" },
    ]
  },
  {
    title: "Practice & Exams",
    icon: Library,
    items: [
      { href: "/course/exercises", label: "Worksheets & Practice" },
      { href: "/course/exam2025", label: "Exam 2024-2025" },
      { href: "/resources", label: "Extra Practice Library" },
    ]
  },
  {
    title: "Computer Science",
    icon: Cpu,
    items: [
      { href: "/architecture", label: "Computer Architecture" },
    ]
  },
  {
    title: "Smart Calculators",
    icon: Calculator,
    collapsible: true,
    highlight: true,
    items: [
      { href: "/calculators/resistor-color-code", label: "Resistor Color Code" },
      { href: "/calculators/equivalent-resistance", label: "Equivalent Resistance" },
      { href: "/calculators/voltage-divider", label: "Voltage Divider" },
    ]
  }
];
