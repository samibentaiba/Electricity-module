import { BookOpen, Calculator, Shapes, Library } from "lucide-react";

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
    collapsible: true,
    highlight: true,
    items: [
      { href: "/simulations/ohms-law", label: "Ohm's Law Visualizer" },
      { href: "/simulations/kirchhoff", label: "Kirchhoff's Laws" },
      { href: "/simulations/ac-waveforms", label: "AC Waveforms" },
      { href: "/simulations/superposition", label: "Superposition Theorem" },
      { href: "/simulations/rectifier", label: "Rectifier (AC to DC)" },
      { href: "/simulations/zener", label: "Zener Regulator" },
      { href: "/simulations/pn-junction", label: "PN Junction & Doping" },
      { href: "/simulations/transistors", label: "BJT Transistors" },
      { href: "/simulations/circuit-studio", label: "Series Loop Simulator" },
      { href: "/simulations/freeform-studio", label: "Freeform 2D Sandbox" },
    ]
  },
  {
    title: "Practice & Exams",
    icon: Library,
    items: [
      { href: "/course/exercises", label: "Worksheets & Practice" },
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
      { href: "/calculators/current-divider", label: "Current Divider" },
      { href: "/calculators/time-constant", label: "RC Time Constant" },
    ]
  }
];
