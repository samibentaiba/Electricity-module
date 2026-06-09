import fs from 'fs';
let content = fs.readFileSync('src/components/simulations/sandbox/FreeformCircuitStudio.tsx', 'utf8');

// Find the start of the broken Exam 2025: Q1
const targetStart = content.indexOf('  {\n    name: "Exam 2025: Q1",');
const exportFuncIndex = content.indexOf('export function FreeformCircuitStudio');

// Everything before Exam 2025: Q1 is fine.
const part1 = content.slice(0, targetStart);

// Let's rewrite the entire rest of CIRCUIT_PRESETS
const replacement = `  {
    name: "Exam 2025: Q1",
    nodes: [
      { id: "n0", x: 400, y: 400 },
      { id: "n1", x: 200, y: 400 },
      { id: "n2", x: 200, y: 200 },
      { id: "n3", x: 400, y: 200 },
      { id: "n4", x: 600, y: 200 },
      { id: "n5", x: 600, y: 400 }
    ],
    elements: [
      { id: "e1", type: "V_DC", value: 4, n1: "n2", n2: "n1" },
      { id: "e2", type: "Wire", value: 0, n1: "n1", n2: "n0" },
      { id: "e3", type: "Resistor", value: 16, n1: "n2", n2: "n3" },
      { id: "e4", type: "Resistor", value: 6, n1: "n3", n2: "n0" },
      { id: "e5", type: "Resistor", value: 4, n1: "n3", n2: "n4" },
      { id: "e6", type: "Resistor", value: 24, n1: "n4", n2: "n5" },
      { id: "e7", type: "Wire", value: 0, n1: "n5", n2: "n0" }
    ]
  },
  {
    name: "Serie 1: Exercise 1",
    nodes: [
      { id: "n0", x: 400, y: 400 },
      { id: "n1", x: 200, y: 400 },
      { id: "n2", x: 600, y: 400 },
      { id: "n3", x: 400, y: 200 },
      { id: "n4", x: 200, y: 200 },
      { id: "n5", x: 600, y: 200 }
    ],
    elements: [
      { id: "e1", type: "V_DC", value: 20, n1: "n1", n2: "n4" },
      { id: "e2", type: "Resistor", value: 2, n1: "n4", n2: "n3" },
      { id: "e3", type: "Resistor", value: 10, n1: "n3", n2: "n0" },
      { id: "e4", type: "V_DC", value: 70, n1: "n2", n2: "n5" },
      { id: "e5", type: "Resistor", value: 5, n1: "n5", n2: "n3" },
      { id: "e6", type: "Wire", value: 0, n1: "n1", n2: "n0" },
      { id: "e7", type: "Wire", value: 0, n1: "n2", n2: "n0" }
    ]
  },
  {
    name: "Serie 1: Exercise 2",
    nodes: [
      { id: "n0", x: 400, y: 400 },
      { id: "n1", x: 200, y: 300 },
      { id: "n2", x: 400, y: 200 },
      { id: "n3", x: 600, y: 300 },
      { id: "n4", x: 400, y: 500 },
      { id: "n5", x: 200, y: 500 }
    ],
    elements: [
      { id: "e1", type: "V_DC", value: 10, n1: "n5", n2: "n1" },
      { id: "e2", type: "Wire", value: 0, n1: "n5", n2: "n4" },
      { id: "e3", type: "Wire", value: 0, n1: "n3", n2: "n4" },
      { id: "e4", type: "Resistor", value: 1, n1: "n1", n2: "n2" },
      { id: "e5", type: "Resistor", value: 1, n1: "n2", n2: "n3" },
      { id: "e6", type: "Resistor", value: 1, n1: "n1", n2: "n0" },
      { id: "e7", type: "Resistor", value: 1, n1: "n0", n2: "n3" },
      { id: "e8", type: "Resistor", value: 4, n1: "n2", n2: "n0" },
      { id: "e9", type: "Wire", value: 0, n1: "n0", n2: "n4" }
    ]
  },
  {
    name: "Serie 1: Exercise 6",
    nodes: [
      { id: "n0", x: 400, y: 400 },
      { id: "n1", x: 200, y: 400 },
      { id: "n2", x: 600, y: 400 },
      { id: "n3", x: 400, y: 200 },
      { id: "n4", x: 200, y: 200 },
      { id: "n5", x: 600, y: 200 }
    ],
    elements: [
      { id: "e1", type: "V_DC", value: 10, n1: "n1", n2: "n4" },
      { id: "e2", type: "Resistor", value: 100, n1: "n4", n2: "n3" },
      { id: "e3", type: "Resistor", value: 50, n1: "n3", n2: "n0" },
      { id: "e4", type: "V_DC", value: 5, n1: "n2", n2: "n5" },
      { id: "e5", type: "Resistor", value: 100, n1: "n5", n2: "n3" },
      { id: "e6", type: "Resistor", value: 100, n1: "n1", n2: "n0" },
      { id: "e7", type: "Wire", value: 0, n1: "n2", n2: "n0" }
    ]
  },
  {
    name: "Serie 1: Exercise 7",
    nodes: [
      { id: "n0", x: 400, y: 400 },
      { id: "n1", x: 200, y: 400 },
      { id: "n2", x: 600, y: 400 },
      { id: "n3", x: 400, y: 200 },
      { id: "n4", x: 200, y: 200 },
      { id: "n5", x: 600, y: 200 }
    ],
    elements: [
      { id: "e1", type: "V_DC", value: 10, n1: "n1", n2: "n4" },
      { id: "e2", type: "Resistor", value: 200, n1: "n4", n2: "n3" },
      { id: "e3", type: "Resistor", value: 100, n1: "n3", n2: "n0" },
      { id: "e4", type: "V_DC", value: 8, n1: "n2", n2: "n5" },
      { id: "e5", type: "Resistor", value: 200, n1: "n5", n2: "n3" },
      { id: "e6", type: "Wire", value: 0, n1: "n1", n2: "n0" },
      { id: "e7", type: "Wire", value: 0, n1: "n2", n2: "n0" }
    ]
  }
];

`;

const part2 = content.slice(exportFuncIndex);
fs.writeFileSync('src/components/simulations/sandbox/FreeformCircuitStudio.tsx', part1 + replacement + part2);
