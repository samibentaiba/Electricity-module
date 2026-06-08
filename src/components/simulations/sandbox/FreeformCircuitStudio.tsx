"use client";

import React, { useState, useRef, useEffect } from "react";
import { MousePointer2, Circle, Minus, Activity, Zap, Trash2, Play, AlertCircle } from "lucide-react";

type Mode = 'select' | 'add_node' | 'add_wire' | 'add_resistor' | 'add_vdc' | 'delete';
type ElementType = 'Wire' | 'Resistor' | 'V_DC';

interface Node {
  id: string;
  x: number;
  y: number;
}

interface CircuitElement {
  id: string;
  type: ElementType;
  value: number; // Ohms or Volts
  n1: string;
  n2: string;
}

export function FreeformCircuitStudio() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'n0', x: 200, y: 400 },
    { id: 'n1', x: 200, y: 200 },
    { id: 'n2', x: 400, y: 200 },
    { id: 'n3', x: 400, y: 400 }
  ]);
  const [elements, setElements] = useState<CircuitElement[]>([
    { id: 'e1', type: 'V_DC', value: 12, n1: 'n1', n2: 'n0' },
    { id: 'e2', type: 'Wire', value: 0, n1: 'n1', n2: 'n2' },
    { id: 'e3', type: 'Resistor', value: 10, n1: 'n2', n2: 'n3' },
    { id: 'e4', type: 'Wire', value: 0, n1: 'n3', n2: 'n0' }
  ]);

  const [mode, setMode] = useState<Mode>('select');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  
  // Interaction state
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [drawingFrom, setDrawingFrom] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Simulation results
  const [simResults, setSimResults] = useState<{
    nodeVoltages: Record<string, number>;
    elementCurrents: Record<string, number>;
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
    if (drawingFrom && mode !== 'add_wire' && mode !== 'add_resistor' && mode !== 'add_vdc') {
      setDrawingFrom(null); // Abort draw if mode changed
    }
  };

  const handleNodePointerDown = (e: React.PointerEvent, nodeId: string) => {
    e.stopPropagation();
    if (mode === 'select') {
      setDraggingNode(nodeId);
    } else if (mode === 'add_wire' || mode === 'add_resistor' || mode === 'add_vdc') {
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
        'add_vdc': 'V_DC'
      };
      const defValue: Record<ElementType, number> = {
        'Wire': 0,
        'Resistor': 10,
        'V_DC': 5
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

  // MNA SOLVER ENGINE
  const simulateCircuit = () => {
    if (nodes.length === 0) {
      setSimError("Circuit is empty.");
      return;
    }
    
    const nodeMap = new Map<string, number>();
    // Make sure 'n0' is ground if it exists, else use the first node
    const groundNode = nodes.find(n => n.id === 'n0') || nodes[0];
    
    // Put ground node at index 0
    nodeMap.set(groundNode.id, 0);
    let idx = 1;
    nodes.forEach(n => {
      if (n.id !== groundNode.id) {
        nodeMap.set(n.id, idx++);
      }
    });

    const N = nodes.length;
    const vSources = elements.filter(e => e.type === 'V_DC' || e.type === 'Wire');
    const M = vSources.length;
    
    const size = N + M;
    const A = Array(size).fill(0).map(() => Array(size).fill(0));
    const Z = Array(size).fill(0);

    // Add tiny conductance to ground for numerical stability (prevents floating node singular matrix)
    for (let i = 0; i < N; i++) {
      A[i][i] += 1e-9;
    }

    // Fill Matrix A
    elements.forEach(el => {
      const i = nodeMap.get(el.n1)!;
      const j = nodeMap.get(el.n2)!;
      
      if (el.type === 'Resistor') {
        const g = 1 / Math.max(el.value, 1e-6);
        A[i][i] += g;
        A[j][j] += g;
        A[i][j] -= g;
        A[j][i] -= g;
      }
    });

    vSources.forEach((el, k) => {
      const i = nodeMap.get(el.n1)!; // +
      const j = nodeMap.get(el.n2)!; // -
      const row = N + k;
      
      A[i][row] += 1;
      A[j][row] -= 1;
      A[row][i] += 1;
      A[row][j] -= 1;
      Z[row] = el.type === 'V_DC' ? el.value : 0;
    });

    // Ground constraint (V0 = 0)
    for(let j=0; j<size; j++) A[0][j] = 0;
    A[0][0] = 1;
    Z[0] = 0;

    // Solve Ax = Z using Gaussian Elimination
    const mat = A.map((row, i) => [...row, Z[i]]);
    for (let i = 0; i < size; i++) {
      let maxRow = i;
      for (let k = i + 1; k < size; k++) {
        if (Math.abs(mat[k][i]) > Math.abs(mat[maxRow][i])) maxRow = k;
      }
      
      const tmp = mat[maxRow];
      mat[maxRow] = mat[i];
      mat[i] = tmp;
      
      if (Math.abs(mat[i][i]) < 1e-10) {
        setSimError("Circuit topology is invalid (e.g. shorted battery or floating loop).");
        setSimResults(null);
        return;
      }
      
      for (let k = i + 1; k < size; k++) {
        const c = -mat[k][i] / mat[i][i];
        for (let j = i; j <= size; j++) {
          mat[k][j] += c * mat[i][j];
        }
      }
    }

    const x = new Array(size).fill(0);
    for (let i = size - 1; i >= 0; i--) {
      x[i] = mat[i][size] / mat[i][i];
      for (let k = i - 1; k >= 0; k--) {
        mat[k][size] -= mat[k][i] * x[i];
      }
    }

    const nodeVoltages: Record<string, number> = {};
    nodes.forEach(n => {
      nodeVoltages[n.id] = x[nodeMap.get(n.id)!];
    });

    const elementCurrents: Record<string, number> = {};
    elements.forEach(el => {
      if (el.type === 'Resistor') {
        const v1 = nodeVoltages[el.n1];
        const v2 = nodeVoltages[el.n2];
        elementCurrents[el.id] = (v1 - v2) / Math.max(el.value, 1e-6);
      }
    });

    vSources.forEach((el, k) => {
      elementCurrents[el.id] = x[N + k];
    });

    setSimResults({ nodeVoltages, elementCurrents });
    setSimError(null);
  };

  const selectedEl = elements.find(e => e.id === selectedElementId);

  return (
    <div className="flex h-[800px] w-full max-w-7xl mx-auto rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 relative">
      
      {/* Vertical Palette Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col gap-4 z-10 shrink-0">
        <h2 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">Tools & Elements</h2>
        
        <div className="flex flex-col gap-2">
          <ToolbarButton icon={<MousePointer2 size={16}/>} label="Select & Move" active={mode==='select'} onClick={()=>setMode('select')} color="text-slate-300" />
          <div className="h-px w-full bg-slate-800 my-2" />
          <ToolbarButton icon={<Circle size={16}/>} label="Add Node" active={mode==='add_node'} onClick={()=>setMode('add_node')} color="text-slate-400" />
          <ToolbarButton icon={<Minus size={16}/>} label="Draw Wire" active={mode==='add_wire'} onClick={()=>setMode('add_wire')} color="text-slate-400" />
          <ToolbarButton icon={<Activity size={16}/>} label="Resistor" active={mode==='add_resistor'} onClick={()=>setMode('add_resistor')} color="text-indigo-400" />
          <ToolbarButton icon={<Zap size={16}/>} label="DC Battery" active={mode==='add_vdc'} onClick={()=>setMode('add_vdc')} color="text-amber-400" />
          <div className="h-px w-full bg-slate-800 my-2" />
          <ToolbarButton icon={<Trash2 size={16}/>} label="Delete Element" active={mode==='delete'} onClick={()=>setMode('delete')} color="text-rose-400" />
        </div>

        <div className="mt-auto flex flex-col gap-4">
          <button 
            onClick={simulateCircuit}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Play size={16} fill="currentColor" /> Simulate
          </button>
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
          {elements.map(el => {
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
            const current = simResults ? simResults.elementCurrents[el.id] : 0;
            const showArrow = simResults && Math.abs(current) > 1e-4;

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
                      
                      {/* Inline Input Field */}
                      <foreignObject x={-40} y={-35} width={80} height={24} style={{ pointerEvents: 'none', transform: `rotate(${-angle}deg)`, transformOrigin: 'center' }}>
                        <div className="w-full h-full flex justify-center items-center" style={{ pointerEvents: 'auto' }}>
                          <input 
                            type="number" 
                            className="w-14 bg-slate-900 border border-slate-700 text-center text-xs font-bold text-indigo-300 rounded shadow-lg outline-none focus:border-indigo-400"
                            value={el.value}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setElements(elements.map(e_inner => e_inner.id === el.id ? { ...e_inner, value: val } : e_inner));
                              setSimResults(null);
                            }}
                            onPointerDown={e => e.stopPropagation()}
                            onClick={e => e.stopPropagation()}
                          />
                          <span className="text-indigo-400 text-xs font-bold ml-1">Ω</span>
                        </div>
                      </foreignObject>
                    </>
                  )}

                  {el.type === 'V_DC' && (
                    <>
                      <line x1={-len/2} y1={0} x2={-10} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <line x1={-10} y1={-20} x2={-10} y2={20} stroke="#f59e0b" strokeWidth={4} />
                      <line x1={10} y1={-10} x2={10} y2={10} stroke="#f59e0b" strokeWidth={6} />
                      <line x1={10} y1={0} x2={len/2} y2={0} stroke={isSelected ? "#818cf8" : "#94a3b8"} strokeWidth={4} />
                      <text x={-20} y={-25} textAnchor="middle" fill="#fbbf24" fontSize={16} fontWeight="bold" transform={`rotate(${-angle})`}>+</text>
                      
                      {/* Inline Input Field */}
                      <foreignObject x={-40} y={15} width={80} height={24} style={{ pointerEvents: 'none', transform: `rotate(${-angle}deg)`, transformOrigin: 'center' }}>
                        <div className="w-full h-full flex justify-center items-center" style={{ pointerEvents: 'auto' }}>
                          <input 
                            type="number" 
                            className="w-14 bg-slate-900 border border-slate-700 text-center text-xs font-bold text-amber-400 rounded shadow-lg outline-none focus:border-amber-400"
                            value={el.value}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setElements(elements.map(e_inner => e_inner.id === el.id ? { ...e_inner, value: val } : e_inner));
                              setSimResults(null);
                            }}
                            onPointerDown={e => e.stopPropagation()}
                            onClick={e => e.stopPropagation()}
                          />
                          <span className="text-amber-400 text-xs font-bold ml-1">V</span>
                        </div>
                      </foreignObject>
                    </>
                  )}

                  {/* Current Arrow (only if simulating) */}
                  {showArrow && (
                    <g transform={`translate(0, 15)`}>
                      <path 
                        d={current > 0 ? "M-10,-5 L10,0 L-10,5 Z" : "M10,-5 L-10,0 L10,5 Z"} 
                        fill="#34d399" 
                      />
                      <text x={0} y={20} textAnchor="middle" fill="#34d399" fontSize={12} fontWeight="bold" transform={`rotate(${-angle})`}>
                        {Math.abs(current).toFixed(3)}A
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
                    {voltage.toFixed(2)}V
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Flip Button for Selected Element */}
        {selectedEl && mode === 'select' && selectedEl.type !== 'Wire' && (
          <div className="absolute right-4 top-4 bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-3 rounded-xl shadow-2xl flex flex-col gap-2">
            <div className="text-xs text-slate-400 font-bold px-2 mb-1">
              Selected: {selectedEl.type}
            </div>
            <button 
              onClick={() => {
                setElements(elements.map(el => el.id === selectedEl.id ? { ...el, n1: el.n2, n2: el.n1 } : el));
                setSimResults(null);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold rounded transition-colors"
            >
              Flip Polarity / Direction
            </button>
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
