"use client";

import React, { useState, useRef, useEffect } from "react";
import { MousePointer2, Circle, Minus, Activity, Zap, Trash2, Play, AlertCircle, Lightbulb, Gauge, Type, MoveRight, Layers, Navigation, Waves, ChevronDown } from "lucide-react";

type Mode = 'select' | 'add_node' | 'add_wire' | 'add_resistor' | 'add_vdc' | 'add_vac' | 'delete' | 'add_lightbulb' | 'add_ammeter' | 'add_voltmeter' | 'add_diode' | 'add_capacitor' | 'add_inductor';
type ElementType = 'Wire' | 'Resistor' | 'V_DC' | 'V_AC' | 'Lightbulb' | 'Ammeter' | 'Voltmeter' | 'Diode' | 'Capacitor' | 'Inductor';

interface Node {
  id: string;
  x: number;
  y: number;
}

interface CircuitElement {
  id: string;
  type: ElementType;
  value: number; // Ohms, Volts, Amplitude(V), uF, mH
  phase?: number; // Degrees
  frequency?: number; // Hz
  n1: string;
  n2: string;
}

interface SimulationResult {
  nodeVoltages: Record<string, Complex>;
  elementCurrents: Record<string, Complex>;
}

// --- COMPLEX MATH ENGINE ---
interface Complex {
  r: number;
  i: number;
}
const cSet = (r: number, i: number = 0): Complex => ({ r, i });
const cAdd = (a: Complex, b: Complex): Complex => ({ r: a.r + b.r, i: a.i + b.i });
const cSub = (a: Complex, b: Complex): Complex => ({ r: a.r - b.r, i: a.i - b.i });
const cMul = (a: Complex, b: Complex): Complex => ({ r: a.r * b.r - a.i * b.i, i: a.r * b.i + a.i * b.r });
const cDiv = (a: Complex, b: Complex): Complex => {
  const den = b.r * b.r + b.i * b.i;
  if (den === 0) return { r: Infinity, i: Infinity };
  return { r: (a.r * b.r + a.i * b.i) / den, i: (a.i * b.r - a.r * b.i) / den };
};
const cAbs = (a: Complex): number => Math.hypot(a.r, a.i);
const cPhase = (a: Complex): number => Math.atan2(a.i, a.r) * 180 / Math.PI;
const cInv = (a: Complex): Complex => cDiv({ r: 1, i: 0 }, a);
// ---------------------------

const getElementDesignator = (el: CircuitElement, allElements: CircuitElement[]) => {
  const sameType = allElements.filter(e => e.type === el.type);
  sameType.sort((a, b) => a.id.localeCompare(b.id));
  const index = sameType.findIndex(e => e.id === el.id) + 1;
  
  let prefix = 'E';
  if (el.type === 'Resistor') prefix = 'R';
  else if (el.type === 'V_DC' || el.type === 'V_AC') prefix = 'V';
  else if (el.type === 'Capacitor') prefix = 'C';
  else if (el.type === 'Inductor') prefix = 'L';
  else if (el.type === 'Diode') prefix = 'D';
  else if (el.type === 'Ammeter') prefix = 'A';
  else if (el.type === 'Voltmeter') prefix = 'Vm';
  else if (el.type === 'Lightbulb') prefix = 'B';
  else if (el.type === 'Wire') prefix = 'W';

  return `${prefix}${index}`;
};


const CIRCUIT_PRESETS: { name: string; nodes: Node[]; elements: CircuitElement[] }[] = [
  {
    name: "Basic Series Loop",
    nodes: [
      { id: "n0", x: 300, y: 400 },
      { id: "n1", x: 300, y: 200 },
      { id: "n2", x: 500, y: 200 },
      { id: "n3", x: 500, y: 400 }
    ],
    elements: [
      { id: "e1", type: "V_DC", value: 12, n1: "n1", n2: "n0" },
      { id: "e2", type: "Wire", value: 0, n1: "n1", n2: "n2" },
      { id: "e3", type: "Resistor", value: 10, n1: "n2", n2: "n3" },
      { id: "e4", type: "Wire", value: 0, n1: "n3", n2: "n0" }
    ]
  },
  {
    name: "Parallel Circuit",
    nodes: [
      { id: "n0", x: 300, y: 400 },
      { id: "n1", x: 300, y: 200 },
      { id: "n2", x: 450, y: 200 },
      { id: "n3", x: 450, y: 400 },
      { id: "n4", x: 600, y: 200 },
      { id: "n5", x: 600, y: 400 }
    ],
    elements: [
      { id: "e1", type: "V_DC", value: 12, n1: "n1", n2: "n0" },
      { id: "e2", type: "Wire", value: 0, n1: "n1", n2: "n2" },
      { id: "e3", type: "Resistor", value: 10, n1: "n2", n2: "n3" },
      { id: "e4", type: "Wire", value: 0, n1: "n3", n2: "n0" },
      { id: "e5", type: "Wire", value: 0, n1: "n2", n2: "n4" },
      { id: "e6", type: "Resistor", value: 20, n1: "n4", n2: "n5" },
      { id: "e7", type: "Wire", value: 0, n1: "n5", n2: "n3" }
    ]
  },
  {
    name: "Superposition Exam",
    nodes: [
      { id: "n0", x: 300, y: 400 },
      { id: "n1", x: 300, y: 200 },
      { id: "n2", x: 450, y: 200 },
      { id: "n3", x: 450, y: 400 },
      { id: "n4", x: 600, y: 200 },
      { id: "n5", x: 600, y: 400 }
    ],
    elements: [
      { id: "e1", type: "V_DC", value: 12, n1: "n1", n2: "n0" },
      { id: "e2", type: "Resistor", value: 5, n1: "n1", n2: "n2" },
      { id: "e3", type: "Resistor", value: 10, n1: "n2", n2: "n3" },
      { id: "e4", type: "Wire", value: 0, n1: "n3", n2: "n0" },
      { id: "e5", type: "Resistor", value: 5, n1: "n4", n2: "n2" },
      { id: "e6", type: "V_DC", value: 8, n1: "n4", n2: "n5" },
      { id: "e7", type: "Wire", value: 0, n1: "n5", n2: "n3" }
    ]
  },
  {
    name: "AC Phase Shift (RC)",
    nodes: [
      { id: "n0", x: 300, y: 400 },
      { id: "n1", x: 300, y: 200 },
      { id: "n2", x: 500, y: 200 },
      { id: "n3", x: 500, y: 400 }
    ],
    elements: [
      { id: "e1", type: "V_AC", value: 10, frequency: 60, phase: 0, n1: "n1", n2: "n0" },
      { id: "e2", type: "Resistor", value: 100, n1: "n1", n2: "n2" },
      { id: "e3", type: "Capacitor", value: 10, n1: "n2", n2: "n3" },
      { id: "e4", type: "Wire", value: 0, n1: "n3", n2: "n0" }
    ]
  },
  {
    name: "Half-Wave Rectifier",
    nodes: [
      { id: "n0", x: 300, y: 400 },
      { id: "n1", x: 300, y: 200 },
      { id: "n2", x: 500, y: 200 },
      { id: "n3", x: 500, y: 400 }
    ],
    elements: [
      { id: "e1", type: "V_AC", value: 10, frequency: 60, phase: 0, n1: "n1", n2: "n0" },
      { id: "e2", type: "Diode", value: 0, n1: "n1", n2: "n2" },
      { id: "e3", type: "Resistor", value: 10, n1: "n2", n2: "n3" },
      { id: "e4", type: "Wire", value: 0, n1: "n3", n2: "n0" }
    ]
  },
  {
    name: "Serie 1: Exercise 4",
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
      { id: "e6", type: "V_DC", value: 24, n1: "n4", n2: "n5" },
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
      { id: "e1", type: "V_DC", value: 20, n1: "n4", n2: "n1" },
      { id: "e2", type: "Resistor", value: 2, n1: "n4", n2: "n3" },
      { id: "e3", type: "Resistor", value: 10, n1: "n3", n2: "n0" },
      { id: "e4", type: "V_DC", value: 70, n1: "n5", n2: "n2" },
      { id: "e5", type: "Resistor", value: 5, n1: "n5", n2: "n3" },
      { id: "e6", type: "Wire", value: 0, n1: "n1", n2: "n0" },
      { id: "e7", type: "Wire", value: 0, n1: "n2", n2: "n0" }
    ]
  },
  {
    name: "Serie 1: Exercise 2",
    nodes: [
      { id: "n0", x: 400, y: 450 },
      { id: "n1", x: 250, y: 300 },
      { id: "n2", x: 400, y: 150 },
      { id: "n3", x: 550, y: 300 },
      { id: "n4", x: 200, y: 450 },
      { id: "n5", x: 200, y: 150 },
      { id: "n6", x: 200, y: 250 }
    ],
    elements: [
      { id: "e1", type: "Resistor", value: 1, n1: "n2", n2: "n1" },
      { id: "e2", type: "Resistor", value: 1, n1: "n2", n2: "n3" },
      { id: "e3", type: "Resistor", value: 1, n1: "n1", n2: "n0" },
      { id: "e4", type: "Resistor", value: 1, n1: "n3", n2: "n0" },
      { id: "e5", type: "V_DC", value: 10, n1: "n6", n2: "n4" },
      { id: "e6", type: "Resistor", value: 4, n1: "n6", n2: "n5" },
      { id: "e7", type: "Wire", value: 0, n1: "n5", n2: "n2" },
      { id: "e8", type: "Wire", value: 0, n1: "n4", n2: "n0" }
    ]
  },
  {
    name: "Serie 1: Exercise 6",
    nodes: [
      { id: "n0", x: 400, y: 450 },
      { id: "n1", x: 200, y: 450 },
      { id: "n2", x: 600, y: 450 },
      { id: "n3", x: 400, y: 150 },
      { id: "n4", x: 200, y: 150 },
      { id: "n5", x: 600, y: 150 },
      { id: "n6", x: 400, y: 300 }
    ],
    elements: [
      { id: "e1", type: "V_DC", value: 10, n1: "n4", n2: "n1" },
      { id: "e2", type: "Resistor", value: 100, n1: "n4", n2: "n3" },
      { id: "e3", type: "V_DC", value: 5, n1: "n5", n2: "n2" },
      { id: "e4", type: "Resistor", value: 50, n1: "n5", n2: "n3" },
      { id: "e5", type: "Resistor", value: 100, n1: "n3", n2: "n6" },
      { id: "e6", type: "Resistor", value: 100, n1: "n6", n2: "n0" },
      { id: "e7", type: "Wire", value: 0, n1: "n1", n2: "n0" },
      { id: "e8", type: "Wire", value: 0, n1: "n2", n2: "n0" }
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
      { id: "n5", x: 600, y: 200 },
      { id: "n6", x: 300, y: 400 },
      { id: "n7", x: 300, y: 200 }
    ],
    elements: [
      { id: "e1", type: "V_DC", value: 10, n1: "n4", n2: "n1" },
      { id: "e2", type: "Resistor", value: 200, n1: "n4", n2: "n3" },
      { id: "e3", type: "Resistor", value: 100, n1: "n3", n2: "n0" },
      { id: "e4", type: "V_DC", value: 8, n1: "n5", n2: "n2" },
      { id: "e5", type: "Resistor", value: 200, n1: "n5", n2: "n3" },
      { id: "e6", type: "Resistor", value: 200, n1: "n7", n2: "n6" },
      { id: "e7", type: "Wire", value: 0, n1: "n7", n2: "n3" },
      { id: "e8", type: "Wire", value: 0, n1: "n6", n2: "n0" },
      { id: "e9", type: "Wire", value: 0, n1: "n1", n2: "n0" },
      { id: "e10", type: "Wire", value: 0, n1: "n2", n2: "n0" }
    ]
  }
];

export function FreeformCircuitStudio({ initialPreset }: { initialPreset?: string }) {
  const initialData = initialPreset 
    ? CIRCUIT_PRESETS.find(p => p.name === initialPreset) 
    : null;

  const [nodes, setNodes] = useState<Node[]>(initialData?.nodes || [
    { id: 'n0', x: 200, y: 400 },
    { id: 'n1', x: 200, y: 200 },
    { id: 'n2', x: 400, y: 200 },
    { id: 'n3', x: 400, y: 400 }
  ]);
  const [elements, setElements] = useState<CircuitElement[]>(initialData?.elements || [
    { id: 'e1', type: 'V_DC', value: 12, n1: 'n1', n2: 'n0' },
    { id: 'e2', type: 'Wire', value: 0, n1: 'n1', n2: 'n2' },
    { id: 'e3', type: 'Resistor', value: 10, n1: 'n2', n2: 'n3' },
    { id: 'e4', type: 'Wire', value: 0, n1: 'n3', n2: 'n0' }
  ]);

  const [mode, setMode] = useState<Mode>('select');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isPresetOpen, setIsPresetOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(initialPreset || null);
  const [activeSuperpositionStep, setActiveSuperpositionStep] = useState<string | null>(null);
  
  // Interaction state
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [drawingFrom, setDrawingFrom] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Simulation results
  const [simResults, setSimResults] = useState<{
    nodeVoltages: Record<string, Complex>;
    elementCurrents: Record<string, Complex>;
  } | null>(null);
  const [simError, setSimError] = useState<string | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);

  const getSVGCoordinates = (e: React.PointerEvent | PointerEvent) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const CTM = svgRef.current.getScreenCTM();
    if (!CTM) return { x: 0, y: 0 };
    return {
      x: (e.clientX - CTM.e) / CTM.a,
      y: (e.clientY - CTM.f) / CTM.d
    };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const { x, y } = getSVGCoordinates(e);
    
    if (mode === 'add_node') {
      const newId = 'n' + crypto.randomUUID().substr(0, 8);
      setNodes([...nodes, { id: newId, x, y }]);
      setSelectedElementId(null);
    } else {
      setSelectedElementId(null);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const { x, y } = getSVGCoordinates(e);
    setMousePos({ x, y });

    if (draggingNode) {
      setNodes(nodes.map(n => n.id === draggingNode ? { ...n, x, y } : n));
      setSimResults(null); // invalidate simulation if moved
    }
  };

  const handlePointerUp = () => {
    setDraggingNode(null);
    if (drawingFrom && !mode.startsWith('add_')) {
      setDrawingFrom(null); // Abort draw if mode changed
    }
  };

  const handleNodePointerDown = (e: React.PointerEvent, nodeId: string) => {
    e.stopPropagation();
    if (mode === 'select') {
      setDraggingNode(nodeId);
    } else if (mode.startsWith('add_') && mode !== 'add_node') {
      setDrawingFrom(nodeId);
      const { x, y } = getSVGCoordinates(e);
      setMousePos({ x, y });
    } else if (mode === 'delete') {
      setNodes(nodes.filter(n => n.id !== nodeId));
      setElements(elements.filter(el => el.n1 !== nodeId && el.n2 !== nodeId));
      setSimResults(null);
    }
  };

  const handleNodePointerUp = (e: React.PointerEvent, nodeId: string) => {
    e.stopPropagation();
    if (drawingFrom && drawingFrom !== nodeId) {
      const typeMap: Record<string, ElementType> = {
        'add_wire': 'Wire',
        'add_resistor': 'Resistor',
        'add_vdc': 'V_DC',
        'add_lightbulb': 'Lightbulb',
        'add_ammeter': 'Ammeter',
        'add_voltmeter': 'Voltmeter',
        'add_diode': 'Diode',
        'add_capacitor': 'Capacitor',
        'add_inductor': 'Inductor',
        'add_vac': 'V_AC'
      };
      const defValue: Record<ElementType, number> = {
        'Wire': 0,
        'Resistor': 10,
        'V_DC': 12,
        'Lightbulb': 10,
        'Ammeter': 0,
        'Voltmeter': 1e9,
        'Diode': 0,
        'Capacitor': 100,
        'Inductor': 10,
        'V_AC': 12
      };
      const t = typeMap[mode];
      
      const newId = 'e' + crypto.randomUUID().substr(0, 8);
      setElements([...elements, { id: newId, type: t, value: defValue[t], n1: drawingFrom, n2: nodeId }]);
      setSimResults(null);
    }
    setDrawingFrom(null);
    setDraggingNode(null);
  };

  const handleElementClick = (e: React.MouseEvent, elId: string) => {
    e.stopPropagation();
    if (mode === 'delete') {
      setElements(elements.filter(el => el.id !== elId));
      setSimResults(null);
    } else if (mode === 'select') {
      setSelectedElementId(elId);
    }
  };

  const [superpositionResults, setSuperpositionResults] = useState<{
    vSources: CircuitElement[];
    partials: Record<string, Record<string, Complex>>; // ComponentID -> SourceID -> Current
    steps: Record<string, { res: SimulationResult; modifiedElements: CircuitElement[] }>;
  } | null>(null);

  // Abstract MNA Solver
  const solveMNA = (circuitNodes: Node[], circuitElements: CircuitElement[], diodeStates: Record<string, boolean> = {}) => {
    if (circuitNodes.length === 0) throw new Error("Circuit is empty.");
    
    // Determine global frequency
    const acSources = circuitElements.filter(e => e.type === 'V_AC');
    const f = acSources.length > 0 ? (acSources[0].frequency || 60) : 0;
    const w = 2 * Math.PI * f;
    const isDC = f === 0;

    const nodeMap = new Map<string, number>();
    const groundNode = circuitNodes.find(n => n.id === 'n0') || circuitNodes[0];
    
    nodeMap.set(groundNode.id, 0);
    let idx = 1;
    circuitNodes.forEach(n => {
      if (n.id !== groundNode.id) {
        nodeMap.set(n.id, idx++);
      }
    });

    const N = circuitNodes.length;
    const vSources = circuitElements.filter(e => e.type === 'V_DC' || e.type === 'V_AC');
    const M = vSources.length;
    
    const size = N + M;
    const A: Complex[][] = Array(size).fill(0).map(() => Array(size).fill(0).map(() => cSet(0)));
    const Z: Complex[] = Array(size).fill(0).map(() => cSet(0));

    // Add tiny conductance to ground for numerical stability
    for (let i = 0; i < N; i++) {
      A[i][i] = cAdd(A[i][i], cSet(1e-9));
    }

    // Fill Matrix A
    circuitElements.forEach(el => {
      const i = nodeMap.get(el.n1)!;
      const j = nodeMap.get(el.n2)!;
      
      if (el.type !== 'V_DC' && el.type !== 'V_AC') {
        let Y: Complex = cSet(0);

        if (el.type === 'Resistor' || el.type === 'Lightbulb' || el.type === 'Voltmeter') {
          Y = cSet(1 / Math.max(el.value, 1e-6));
        } else if (el.type === 'Capacitor') {
          Y = isDC ? cSet(1e-9) : cSet(0, w * el.value * 1e-6); // uF
        } else if (el.type === 'Inductor') {
          Y = isDC ? cSet(1e6) : cSet(0, -1 / Math.max(w * el.value * 1e-3, 1e-6)); // mH
        } else if (el.type === 'Wire' || el.type === 'Ammeter') {
          Y = cSet(1e6); // 1 micro-ohm
        } else if (el.type === 'Diode') {
          Y = diodeStates[el.id] ? cSet(1e6) : cSet(1e-9);
        }
        
        A[i][i] = cAdd(A[i][i], Y);
        A[j][j] = cAdd(A[j][j], Y);
        A[i][j] = cSub(A[i][j], Y);
        A[j][i] = cSub(A[j][i], Y);
      }
    });

    vSources.forEach((el, k) => {
      const i = nodeMap.get(el.n1)!;
      const j = nodeMap.get(el.n2)!;
      const row = N + k;
      
      A[i][row] = cAdd(A[i][row], cSet(1));
      A[j][row] = cSub(A[j][row], cSet(1));
      A[row][i] = cAdd(A[row][i], cSet(1));
      A[row][j] = cSub(A[row][j], cSet(1));
      
      if (el.type === 'V_AC') {
        const phi = (el.phase || 0) * Math.PI / 180;
        Z[row] = cSet(el.value * Math.cos(phi), el.value * Math.sin(phi));
      } else {
        Z[row] = cSet(el.value);
      }
    });

    for(let j=0; j<size; j++) A[0][j] = cSet(0);
    A[0][0] = cSet(1);
    Z[0] = cSet(0);

    const mat = A.map((row, i) => [...row, Z[i]]);
    for (let i = 0; i < size; i++) {
      let maxRow = i;
      for (let k = i + 1; k < size; k++) {
        if (cAbs(mat[k][i]) > cAbs(mat[maxRow][i])) maxRow = k;
      }
      
      const tmp = mat[maxRow];
      mat[maxRow] = mat[i];
      mat[i] = tmp;
      
      if (cAbs(mat[i][i]) < 1e-10) {
        throw new Error("Circuit topology is invalid (e.g. shorted battery or floating loop).");
      }
      
      for (let k = i + 1; k < size; k++) {
        const c = cMul(cSet(-1), cDiv(mat[k][i], mat[i][i]));
        for (let j = i; j <= size; j++) {
          mat[k][j] = cAdd(mat[k][j], cMul(c, mat[i][j]));
        }
      }
    }

    const x: Complex[] = new Array(size).fill(cSet(0));
    for (let i = size - 1; i >= 0; i--) {
      x[i] = cDiv(mat[i][size], mat[i][i]);
      for (let k = i - 1; k >= 0; k--) {
        mat[k][size] = cSub(mat[k][size], cMul(mat[k][i], x[i]));
      }
    }

    const nodeVoltages: Record<string, Complex> = {};
    circuitNodes.forEach(n => {
      nodeVoltages[n.id] = x[nodeMap.get(n.id)!];
    });

    const elementCurrents: Record<string, Complex> = {};
    circuitElements.forEach(el => {
      if (el.type !== 'V_DC' && el.type !== 'V_AC') {
        let Y: Complex = cSet(0);
        if (el.type === 'Resistor' || el.type === 'Lightbulb' || el.type === 'Voltmeter') {
          Y = cSet(1 / Math.max(el.value, 1e-6));
        } else if (el.type === 'Capacitor') {
          Y = isDC ? cSet(1e-9) : cSet(0, w * el.value * 1e-6);
        } else if (el.type === 'Inductor') {
          Y = isDC ? cSet(1e6) : cSet(0, -1 / Math.max(w * el.value * 1e-3, 1e-6));
        } else if (el.type === 'Wire' || el.type === 'Ammeter') {
          Y = cSet(1e6);
        } else if (el.type === 'Diode') {
          Y = diodeStates[el.id] ? cSet(1e6) : cSet(1e-9);
        }
        
        const v1 = nodeVoltages[el.n1];
        const v2 = nodeVoltages[el.n2];
        elementCurrents[el.id] = cMul(cSub(v1, v2), Y);
      }
    });

    vSources.forEach((el, k) => {
      elementCurrents[el.id] = x[N + k];
    });

    return { nodeVoltages, elementCurrents };
  };
  const simulateCircuit = () => {
    try {
      // Pass 1: Assume all diodes are forward biased (wires)
      const currentDiodeStates: Record<string, boolean> = {};
      elements.filter(e => e.type === 'Diode').forEach(d => currentDiodeStates[d.id] = true);
      
      let results = solveMNA(nodes, elements, currentDiodeStates);
      
      // Check if any diode has negative current
      let changed = false;
      elements.filter(e => e.type === 'Diode').forEach(d => {
        if (results.elementCurrents[d.id].r < -1e-6) {
          currentDiodeStates[d.id] = false; // Reverse bias
          changed = true;
        }
      });
      
      // Pass 2: Re-simulate with reverse biased diodes as open circuits
      if (changed) {
        results = solveMNA(nodes, elements, currentDiodeStates);
      }

      setSimResults(results);
      setSimError(null);
      setSuperpositionResults(null);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setSimError(message);
      setSimResults(null);
      setSuperpositionResults(null);
    }
  };

  const runSuperposition = () => {
    try {
      const vSources = elements.filter(e => e.type === 'V_DC' || e.type === 'V_AC');
      if (vSources.length < 2) return;

      const partials: Record<string, Record<string, Complex>> = {};
      const steps: Record<string, { res: SimulationResult; modifiedElements: CircuitElement[] }> = {};
      elements.forEach(el => partials[el.id] = {});

      // For each voltage source, keep it active and zero out the others
      vSources.forEach(activeSrc => {
        const modifiedElements = elements.map(el => {
          if ((el.type === 'V_DC' || el.type === 'V_AC') && el.id !== activeSrc.id) {
            return { ...el, value: 0 }; // Short circuit other batteries
          }
          return el;
        });

        const res = solveMNA(nodes, modifiedElements);
        steps[activeSrc.id] = { res, modifiedElements };
        
        elements.forEach(el => {
          partials[el.id][activeSrc.id] = res.elementCurrents[el.id];
        });
      });

      // Also set normal sim results
      const totalRes = solveMNA(nodes, elements);
      setSimResults(totalRes);
      setSuperpositionResults({ vSources, partials, steps });
      setActiveSuperpositionStep(null);
      setSimError(null);

    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setSimError("Superposition failed: " + message);
    }
  };

  const selectedEl = elements.find(e => e.id === selectedElementId);

  return (
    <div className="flex h-[800px] w-full max-w-7xl mx-auto rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 relative">
      
      {/* Vertical Palette Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col gap-4 z-10 shrink-0 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-900/50 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
        
        <div className="flex flex-col gap-2 relative">
          <h2 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1 shrink-0">Presets</h2>
          <div className="relative">
            <button 
              className="w-full flex items-center justify-between bg-slate-950 border border-slate-700 hover:border-indigo-500 text-sm text-slate-300 rounded-lg p-2.5 transition-colors"
              onClick={() => setIsPresetOpen(!isPresetOpen)}
            >
              <span className="truncate">{activePreset || "-- Load Preset --"}</span>
              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 shrink-0 ${isPresetOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isPresetOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsPresetOpen(false)} />
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="max-h-64 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-900/50 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                    {CIRCUIT_PRESETS.map(p => (
                      <button
                        key={p.name}
                        className={`w-full text-left px-3 py-2.5 text-sm transition-colors border-b border-slate-800/50 last:border-0 ${
                          activePreset === p.name ? "bg-indigo-500/20 text-indigo-400 font-bold" : "text-slate-300 hover:bg-indigo-500/20 hover:text-indigo-400"
                        }`}
                        onClick={() => {
                          setNodes([...p.nodes]);
                          setElements(p.elements.map(el => ({...el})));
                          setSimResults(null);
                          setSuperpositionResults(null);
                          setSelectedElementId(null);
                          setActivePreset(p.name);
                          setIsPresetOpen(false);
                        }}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="h-px w-full bg-slate-800" />

        <h2 className="text-slate-400 font-bold text-xs uppercase tracking-widest shrink-0">Tools & Elements</h2>
        
        <div className="flex flex-col gap-2">
          <ToolbarButton icon={<MousePointer2 size={16}/>} label="Select & Move" active={mode==='select'} onClick={()=>setMode('select')} color="text-slate-300" />
          <div className="h-px w-full bg-slate-800 my-2" />
          <ToolbarButton icon={<Circle size={16}/>} label="Add Node" active={mode==='add_node'} onClick={()=>setMode('add_node')} color="text-slate-400" />
          <ToolbarButton icon={<Minus size={16}/>} label="Draw Wire" active={mode==='add_wire'} onClick={()=>setMode('add_wire')} color="text-slate-400" />
          <ToolbarButton icon={<Activity size={16}/>} label="Resistor" active={mode==='add_resistor'} onClick={()=>setMode('add_resistor')} color="text-indigo-400" />
          <ToolbarButton icon={<Zap size={16}/>} label="DC Battery" active={mode==='add_vdc'} onClick={()=>setMode('add_vdc')} color="text-amber-400" />
          <ToolbarButton icon={<Waves size={16}/>} label="AC Source" active={mode==='add_vac'} onClick={()=>setMode('add_vac')} color="text-amber-300" />
          <ToolbarButton icon={<Lightbulb size={16}/>} label="Lightbulb" active={mode==='add_lightbulb'} onClick={()=>setMode('add_lightbulb')} color="text-yellow-400" />
          <ToolbarButton icon={<Gauge size={16}/>} label="Ammeter" active={mode==='add_ammeter'} onClick={()=>setMode('add_ammeter')} color="text-emerald-400" />
          <ToolbarButton icon={<Type size={16}/>} label="Voltmeter" active={mode==='add_voltmeter'} onClick={()=>setMode('add_voltmeter')} color="text-blue-400" />
          <div className="h-px w-full bg-slate-800 my-2" />
          <ToolbarButton icon={<MoveRight size={16}/>} label="Diode" active={mode==='add_diode'} onClick={()=>setMode('add_diode')} color="text-rose-400" />
          <ToolbarButton icon={<Layers size={16}/>} label="Capacitor" active={mode==='add_capacitor'} onClick={()=>setMode('add_capacitor')} color="text-cyan-400" />
          <ToolbarButton icon={<Navigation size={16}/>} label="Inductor" active={mode==='add_inductor'} onClick={()=>setMode('add_inductor')} color="text-fuchsia-400" />
          <div className="h-px w-full bg-slate-800 my-2" />
          <ToolbarButton icon={<Trash2 size={16}/>} label="Delete Element" active={mode==='delete'} onClick={()=>setMode('delete')} color="text-slate-500" />
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <button 
            onClick={simulateCircuit}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Play size={16} fill="currentColor" /> Simulate
          </button>
          
          {elements.filter(e => e.type === 'V_DC' || e.type === 'V_AC').length > 1 && (
            <button 
              onClick={runSuperposition}
              className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-500/20 text-sm"
            >
              <Activity size={14} /> Superposition Analysis
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 relative overflow-hidden">
        {/* Canvas */}
        <svg 
          ref={svgRef}
          className="flex-1 w-full h-full cursor-crosshair"
          style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Edges */}
          {(activeSuperpositionStep && superpositionResults ? superpositionResults.steps[activeSuperpositionStep].modifiedElements : elements).map(el => {
            const n1 = nodes.find(n => n.id === el.n1);
            const n2 = nodes.find(n => n.id === el.n2);
            if (!n1 || !n2) return null;
            
            const dx = n2.x - n1.x;
            const dy = n2.y - n1.y;
            const len = Math.hypot(dx, dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            const cx = (n1.x + n2.x) / 2;
            const cy = (n1.y + n2.y) / 2;

            const isSelected = selectedElementId === el.id;
            
            const activeSimResults = activeSuperpositionStep && superpositionResults ? superpositionResults.steps[activeSuperpositionStep].res : simResults;
            const current = activeSimResults ? activeSimResults.elementCurrents[el.id] : null;
            const showArrow = activeSimResults && current && cAbs(current) > 1e-4;

            return (
              <g 
                key={el.id} 
                className="cursor-pointer group"
                onClick={(e) => handleElementClick(e, el.id)}
              >
                {/* Hitbox */}
                <line x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke="transparent" strokeWidth={30} />
                
                <g transform={`translate(${cx}, ${cy}) rotate(${angle})`}>
                  
                  
                  {/* Highlight */}
                  {isSelected && <rect x={-len/2} y={-15} width={len} height={30} fill="rgba(99, 102, 241, 0.1)" stroke="#6366f1" strokeDasharray="4 4" rx={4}/>}

                  {el.type === 'Wire' && (
                    <line x1={-len/2} y1={0} x2={len/2} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                  )}

                  {el.type === 'Resistor' && (
                    <>
                      <line x1={-len/2} y1={0} x2={-20} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <path d="M-20,0 L-15,-10 L-5,10 L5,-10 L15,10 L20,0" fill="none" stroke={isSelected ? "#818cf8" : "#818cf8"} strokeWidth={4} strokeLinejoin="round" />
                      <line x1={20} y1={0} x2={len/2} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <text transform={`translate(0, -15) rotate(${-angle})`} textAnchor="middle" fill="#818cf8" fontSize={14} fontWeight="bold">{getElementDesignator(el, elements)} = {el.value}Ω</text>
                    </>
                  )}

                  {el.type === 'V_DC' && (
                    <>
                      <line x1={-len/2} y1={0} x2={-10} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <line x1={-10} y1={-20} x2={-10} y2={20} stroke="#f59e0b" strokeWidth={4} />
                      <line x1={10} y1={-10} x2={10} y2={10} stroke="#f59e0b" strokeWidth={6} />
                      <line x1={10} y1={0} x2={len/2} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <text transform={`translate(-20, -25) rotate(${-angle})`} textAnchor="middle" fill="#fbbf24" fontSize={16} fontWeight="bold">+</text>
                      <text transform={`translate(0, 30) rotate(${-angle})`} textAnchor="middle" fill="#fbbf24" fontSize={14} fontWeight="bold">{getElementDesignator(el, elements)} = {el.value}V</text>
                    </>
                  )}

                  
                  {el.type === 'V_AC' && (
                    <>
                      <line x1={-len/2} y1={0} x2={-15} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <circle cx={0} cy={0} r={15} fill="#0f172a" stroke="#f59e0b" strokeWidth={4} />
                      <path d="M-10,0 Q-5,-10 0,0 Q5,10 10,0" fill="none" stroke="#f59e0b" strokeWidth={2} />
                      <line x1={15} y1={0} x2={len/2} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <text transform={`translate(0, -25) rotate(${-angle})`} textAnchor="middle" fill="#fbbf24" fontSize={14} fontWeight="bold">{getElementDesignator(el, elements)} = {el.value}V</text>
                      <text transform={`translate(0, 30) rotate(${-angle})`} textAnchor="middle" fill="#fbbf24" fontSize={10}>{el.frequency || 60}Hz {el.phase || 0}°</text>
                    </>
                  )}

                  {el.type === 'Lightbulb' && (
                    <>
                      {showArrow && (
                        <circle cx={0} cy={0} r={25} fill="#facc15" opacity={Math.min(0.8, cAbs(current!) * 2)} filter="blur(8px)" />
                      )}
                      <line x1={-len/2} y1={0} x2={-15} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <circle cx={0} cy={0} r={15} fill="rgba(255,255,255,0.1)" stroke={isSelected ? "#818cf8" : "#facc15"} strokeWidth={4} />
                      <path d="M-15,0 L-5,-5 L0,5 L5,-5 L15,0" fill="none" stroke={isSelected ? "#818cf8" : "#facc15"} strokeWidth={2} />
                      <line x1={15} y1={0} x2={len/2} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <text transform={`translate(0, -25) rotate(${-angle})`} textAnchor="middle" fill="#facc15" fontSize={14} fontWeight="bold">{getElementDesignator(el, elements)}</text>
                    </>
                  )}

                  {el.type === 'Ammeter' && (
                    <>
                      <line x1={-len/2} y1={0} x2={-20} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <circle cx={0} cy={0} r={20} fill="#0f172a" stroke={isSelected ? "#818cf8" : "#10b981"} strokeWidth={4} />
                      <text transform={`translate(0, 5) rotate(${-angle})`} textAnchor="middle" fill="#10b981" fontSize={16} fontWeight="bold">A</text>
                      <text transform={`translate(0, -25) rotate(${-angle})`} textAnchor="middle" fill="#10b981" fontSize={14} fontWeight="bold">{getElementDesignator(el, elements)}</text>
                      <line x1={20} y1={0} x2={len/2} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      
                      {simResults && (
                        <g transform={`rotate(${-angle}) translate(0, 35)`}>
                          <rect x={-35} y={-12} width={70} height={24} fill="#064e3b" rx={4} stroke="#10b981" />
                          <text x={0} y={5} textAnchor="middle" fill="#34d399" fontSize={12} fontWeight="bold">{cAbs(current!).toFixed(3)} A</text>
                        </g>
                      )}
                    </>
                  )}

                  {el.type === 'Voltmeter' && (
                    <>
                      <line x1={-len/2} y1={0} x2={-20} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <circle cx={0} cy={0} r={20} fill="#0f172a" stroke={isSelected ? "#818cf8" : "#3b82f6"} strokeWidth={4} />
                      <text transform={`translate(0, 5) rotate(${-angle})`} textAnchor="middle" fill="#3b82f6" fontSize={16} fontWeight="bold">V</text>
                      <text transform={`translate(0, -25) rotate(${-angle})`} textAnchor="middle" fill="#3b82f6" fontSize={14} fontWeight="bold">{getElementDesignator(el, elements)}</text>
                      <line x1={20} y1={0} x2={len/2} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      
                      {simResults && (() => {
                         const v1 = simResults.nodeVoltages[el.n1];
                         const v2 = simResults.nodeVoltages[el.n2];
                         const vDrop = cAbs(cSub(v1, v2));
                         return (
                          <g transform={`rotate(${-angle}) translate(0, 35)`}>
                            <rect x={-35} y={-12} width={70} height={24} fill="#1e3a8a" rx={4} stroke="#3b82f6" />
                            <text x={0} y={5} textAnchor="middle" fill="#60a5fa" fontSize={12} fontWeight="bold">{vDrop.toFixed(2)} V</text>
                          </g>
                         );
                      })()}
                    </>
                  )}

                  {el.type === 'Diode' && (
                    <>
                      <line x1={-len/2} y1={0} x2={-15} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <path d="M-15,-15 L10,0 L-15,15 Z" fill={isSelected ? "rgba(99, 102, 241, 0.2)" : "rgba(244, 63, 94, 0.2)"} stroke={isSelected ? "#818cf8" : "#f43f5e"} strokeWidth={4} strokeLinejoin="round" />
                      <line x1={10} y1={-15} x2={10} y2={15} stroke={isSelected ? "#818cf8" : "#f43f5e"} strokeWidth={4} />
                      <line x1={10} y1={0} x2={len/2} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <text transform={`translate(0, -25) rotate(${-angle})`} textAnchor="middle" fill="#f43f5e" fontSize={14} fontWeight="bold">{getElementDesignator(el, elements)}</text>
                    </>
                  )}

                  {el.type === 'Capacitor' && (
                    <>
                      <line x1={-len/2} y1={0} x2={-5} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <line x1={-5} y1={-20} x2={-5} y2={20} stroke={isSelected ? "#818cf8" : "#22d3ee"} strokeWidth={4} />
                      <line x1={5} y1={-20} x2={5} y2={20} stroke={isSelected ? "#818cf8" : "#22d3ee"} strokeWidth={4} />
                      <line x1={5} y1={0} x2={len/2} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <text transform={`translate(0, 35) rotate(${-angle})`} textAnchor="middle" fill="#22d3ee" fontSize={14} fontWeight="bold">{getElementDesignator(el, elements)} = {el.value}µF</text>
                    </>
                  )}

                  {el.type === 'Inductor' && (
                    <>
                      <line x1={-len/2} y1={0} x2={-20} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <path d="M-20,0 Q-15,-15 -10,0 Q-5,-15 0,0 Q5,-15 10,0 Q15,-15 20,0" fill="none" stroke={isSelected ? "#818cf8" : "#d946ef"} strokeWidth={4} strokeLinecap="round" />
                      <line x1={20} y1={0} x2={len/2} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <text transform={`translate(0, 25) rotate(${-angle})`} textAnchor="middle" fill="#d946ef" fontSize={14} fontWeight="bold">{getElementDesignator(el, elements)} = {el.value}mH</text>
                    </>
                  )}

                  {/* Current Arrow (only if simulating) */}

                  {showArrow && (
                    <g transform={`translate(0, 15)`}>
                      <path 
                        d={current.r > 0 ? "M-10,-5 L10,0 L-10,5 Z" : "M10,-5 L-10,0 L10,5 Z"} 
                        fill="#34d399" 
                      />
                      <text transform={`translate(0, 20) rotate(${-angle})`} textAnchor="middle" fill="#34d399" fontSize={12} fontWeight="bold">
                        {cAbs(current!).toFixed(3)}A
                      </text>
                    </g>
                  )}
                </g>
              </g>
            );
          })}

          {/* Drawing Preview Line */}
          {drawingFrom && (() => {
            const n1 = nodes.find(n => n.id === drawingFrom);
            if (!n1) return null;
            return <line x1={n1.x} y1={n1.y} x2={mousePos.x} y2={mousePos.y} stroke="#475569" strokeWidth={4} strokeDasharray="5 5" />
          })()}

          {/* Nodes */}
          {nodes.map(n => {
            const isGround = n.id === 'n0'; // First node created is ground usually
            const voltage = simResults ? simResults.nodeVoltages[n.id] : null;

            return (
              <g 
                key={n.id} 
                transform={`translate(${n.x}, ${n.y})`}
                onPointerDown={(e) => handleNodePointerDown(e, n.id)}
                onPointerUp={(e) => handleNodePointerUp(e, n.id)}
                className={mode === 'select' || mode.startsWith('add_') ? 'cursor-pointer' : ''}
              >
                <circle 
                  r={10} 
                  fill={isGround ? "#10b981" : "#3b82f6"} 
                  stroke="#0f172a" 
                  strokeWidth={4} 
                  className="hover:scale-125 transition-transform"
                />
                
                {/* Node Voltages overlay */}
                {voltage !== null && (
                  <rect x={15} y={-10} width={60} height={20} fill="#0f172a" rx={4} stroke="#334155" />
                )}
                {voltage !== null && (
                  <text x={45} y={4} textAnchor="middle" fill={isGround ? "#10b981" : "#60a5fa"} fontSize={12} fontWeight="bold pointer-events-none">
                    {cAbs(voltage).toFixed(2)}V
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Context Menu for Selected Element */}
        {selectedEl && mode === 'select' && (() => {
          const n1 = nodes.find(n => n.id === selectedEl.n1);
          const n2 = nodes.find(n => n.id === selectedEl.n2);
          if (!n1 || !n2) return null;
          
          const cx = (n1.x + n2.x) / 2;
          const cy = (n1.y + n2.y) / 2;

          return (
            <div 
              className="absolute bg-slate-900/95 backdrop-blur-xl border border-slate-700 p-4 rounded-xl shadow-2xl flex flex-col gap-3 z-50 transition-all"
              style={{
                left: cx + 20,
                top: cy - 40,
              }}
            >
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 flex justify-between items-center">
                <span>Configure {getElementDesignator(selectedEl, elements)}</span>
                <button onClick={() => setSelectedElementId(null)} className="text-slate-500 hover:text-slate-300 text-lg leading-none ml-4">&times;</button>
              </div>
              
                            {selectedEl.type !== 'Wire' && selectedEl.type !== 'Ammeter' && selectedEl.type !== 'Voltmeter' && selectedEl.type !== 'Diode' && (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center justify-between">
                    <span className="text-slate-400 text-xs">Value:</span>
                    <div className="flex items-center gap-1">
                      <input 
                        type="number"
                        className="w-20 bg-slate-950 border border-slate-700 rounded-md px-2 py-1 text-sm text-white font-bold focus:border-indigo-500 outline-none"
                        value={selectedEl.value}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setElements(elements.map(el => el.id === selectedEl.id ? { ...el, value: val } : el));
                          setSimResults(null);
                          setSuperpositionResults(null);
                        }}
                      />
                      <span className="text-slate-400 font-bold w-6">
                        {selectedEl.type === 'V_DC' || selectedEl.type === 'V_AC' ? 'V' : selectedEl.type === 'Capacitor' ? 'µF' : selectedEl.type === 'Inductor' ? 'mH' : 'Ω'}
                      </span>
                    </div>
                  </div>
                  
                  {selectedEl.type === 'V_AC' && (
                    <>
                      <div className="flex gap-2 items-center justify-between">
                        <span className="text-slate-400 text-xs">Freq:</span>
                        <div className="flex items-center gap-1">
                          <input 
                            type="number"
                            className="w-20 bg-slate-950 border border-slate-700 rounded-md px-2 py-1 text-sm text-white font-bold focus:border-indigo-500 outline-none"
                            value={selectedEl.frequency || 60}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setElements(elements.map(el => el.id === selectedEl.id ? { ...el, frequency: val } : el));
                              setSimResults(null);
                              setSuperpositionResults(null);
                            }}
                          />
                          <span className="text-slate-400 font-bold w-6">Hz</span>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center justify-between">
                        <span className="text-slate-400 text-xs">Phase:</span>
                        <div className="flex items-center gap-1">
                          <input 
                            type="number"
                            className="w-20 bg-slate-950 border border-slate-700 rounded-md px-2 py-1 text-sm text-white font-bold focus:border-indigo-500 outline-none"
                            value={selectedEl.phase || 0}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setElements(elements.map(el => el.id === selectedEl.id ? { ...el, phase: val } : el));
                              setSimResults(null);
                              setSuperpositionResults(null);
                            }}
                          />
                          <span className="text-slate-400 font-bold w-6">°</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              
              {selectedEl.type !== 'Resistor' && selectedEl.type !== 'Lightbulb' && selectedEl.type !== 'Wire' && selectedEl.type !== 'Capacitor' && selectedEl.type !== 'Inductor' && (
                <button 
                  onClick={() => {
                    setElements(elements.map(el => el.id === selectedEl.id ? { ...el, n1: el.n2, n2: el.n1 } : el));
                    setSimResults(null);
                    setSuperpositionResults(null);
                  }}
                  className="w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-bold rounded transition-colors"
                >
                  Flip Polarity / Direction
                </button>
              )}
            </div>
          );
        })()}

        {/* Superposition Overlay */}
        {superpositionResults && (
          <div className="absolute bottom-6 right-6 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl w-[800px] z-50 p-6 pointer-events-auto">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><Activity className="text-indigo-400" /> Superposition Breakdown</h2>
                <button 
                  onClick={() => {
                    setSuperpositionResults(null);
                    setActiveSuperpositionStep(null);
                  }} 
                  className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors text-xl leading-none"
                >
                  &times;
                </button>
             </div>
             
             <p className="text-slate-400 text-xs mb-4">
               Click any column header to instantly view the circuit mathematically simulating that specific source while shorting all others.
             </p>

             <div className="overflow-x-auto rounded-xl border border-slate-800">
               <table className="w-full text-left text-sm text-slate-300">
                 <thead className="bg-slate-950 text-slate-400 font-bold">
                   <tr>
                     <th className="p-3 border-b border-slate-800">Component</th>
                     {superpositionResults.vSources.map((src, i) => (
                       <th 
                         key={src.id} 
                         onClick={() => setActiveSuperpositionStep(src.id)}
                         className={`p-3 border-b border-slate-800 whitespace-nowrap cursor-pointer transition-colors ${activeSuperpositionStep === src.id ? 'bg-amber-500/20 text-amber-400' : 'hover:bg-slate-800 text-amber-500/70'}`}
                       >
                         <div className="flex flex-col">
                           <span>{getElementDesignator(src, elements)} ({src.value}V)</span>
                           <span className="text-[10px] uppercase tracking-wider font-normal">Click to View Step</span>
                         </div>
                       </th>
                     ))}
                     <th 
                       onClick={() => setActiveSuperpositionStep(null)}
                       className={`p-3 border-b border-slate-800 whitespace-nowrap cursor-pointer transition-colors ${activeSuperpositionStep === null ? 'bg-emerald-500/20 text-emerald-400' : 'hover:bg-slate-800 text-emerald-500/70'}`}
                     >
                       <div className="flex flex-col">
                         <span>Total Current Sum</span>
                         <span className="text-[10px] uppercase tracking-wider font-normal">Click to View All</span>
                       </div>
                     </th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-800/50 bg-slate-900/50">
                   {elements.filter(el => el.type !== 'Wire' && el.type !== 'V_DC' && el.type !== 'V_AC').map(el => {
                     const total = simResults?.elementCurrents[el.id] || cSet(0);
                     return (
                       <tr key={el.id} className="hover:bg-slate-800/30 transition-colors">
                         <td className="p-3 font-mono text-indigo-300 whitespace-nowrap">{getElementDesignator(el, elements)} ({el.value})</td>
                         {superpositionResults.vSources.map(src => {
                           const pCur = superpositionResults.partials[el.id][src.id] || cSet(0);
                           return (
                             <td key={src.id} className={`p-3 font-mono whitespace-nowrap ${activeSuperpositionStep === src.id ? 'text-amber-300' : ''}`}>
                               {cAbs(pCur).toFixed(3)}A &ang; {cPhase(pCur).toFixed(1)}&deg;
                             </td>
                           );
                         })}
                         <td className={`p-3 font-mono font-bold whitespace-nowrap ${activeSuperpositionStep === null ? 'text-emerald-400' : 'text-emerald-500/50'}`}>
                           = {cAbs(total).toFixed(3)}A &ang; {cPhase(total).toFixed(1)}&deg;
                         </td>
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
             </div>
          </div>
        )}

        {/* Simulation Error Alert */}
        {simError && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-rose-500/20 border border-rose-500/50 text-rose-400 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 font-bold">
            <AlertCircle size={20} />
            {simError}
          </div>
        )}
      </div>
    </div>
  );
}

function ToolbarButton({ icon, label, active, onClick, color }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, color: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-bold transition-all ${
        active 
          ? `bg-slate-800 ${color} shadow-inner border border-slate-700` 
          : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300 border border-transparent'
      }`}
    >
      {icon} {label}
    </button>
  );
}
