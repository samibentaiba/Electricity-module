"use client";

import { useState } from "react";
import { Plus, Trash2, ArrowUpDown, Zap, AlertTriangle } from "lucide-react";

export type ComponentType = 'V_DC' | 'Resistor' | 'Diode' | 'Zener';

export interface CircuitElement {
  id: string;
  type: ComponentType;
  value: number; 
  reversed: boolean; 
}

export function CircuitStudio() {
  const [elements, setElements] = useState<CircuitElement[]>([
    { id: '1', type: 'V_DC', value: 12, reversed: false },
    { id: '2', type: 'Resistor', value: 10, reversed: false },
    { id: '3', type: 'Diode', value: 0.7, reversed: false },
  ]);

  const addElement = (type: ComponentType) => {
    const newId = Math.random().toString(36).substring(7);
    const defaults = {
      'V_DC': 5,
      'Resistor': 10,
      'Diode': 0.7,
      'Zener': 5.1
    };
    setElements([...elements, { id: newId, type, value: defaults[type], reversed: false }]);
  };

  const removeElement = (id: string) => {
    setElements(elements.filter(e => e.id !== id));
  };

  const updateElement = (id: string, updates: Partial<CircuitElement>) => {
    setElements(elements.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  // ANALYSIS ENGINE
  const analyzeLoop = () => {
    let vBatt = 0;
    let rTotal = 0;
    
    elements.forEach(el => {
      if (el.type === 'V_DC') vBatt += el.reversed ? -el.value : el.value;
      if (el.type === 'Resistor') rTotal += el.value;
    });

    let I = 0;
    let status = "Active";

    if (rTotal === 0 && vBatt !== 0) {
      return { I: Infinity, status: "Short Circuit!", drops: {} };
    }

    const getDiodes = (dir: 'cw' | 'ccw') => {
      let fwdReq = 0;
      let brkReq = 0;
      let blocks = false;
      
      elements.forEach(el => {
        if (el.type === 'Diode' || el.type === 'Zener') {
          const isFwd = (dir === 'cw' && !el.reversed) || (dir === 'ccw' && el.reversed);
          if (isFwd) {
            fwdReq += 0.7;
          } else {
            if (el.type === 'Zener') brkReq += el.value;
            else blocks = true;
          }
        }
      });
      return { fwdReq, brkReq, blocks };
    };

    if (vBatt > 0) {
      const { fwdReq, brkReq, blocks } = getDiodes('cw');
      if (blocks) status = "Blocked by Diode";
      else if (vBatt < (fwdReq + brkReq)) status = "Insufficient Voltage to turn on Diodes/Zeners";
      else I = rTotal === 0 ? Infinity : (vBatt - fwdReq - brkReq) / rTotal;
    } else if (vBatt < 0) {
      const { fwdReq, brkReq, blocks } = getDiodes('ccw');
      if (blocks) status = "Blocked by Diode";
      else if (Math.abs(vBatt) < (fwdReq + brkReq)) status = "Insufficient Voltage to turn on Diodes/Zeners";
      else I = rTotal === 0 ? -Infinity : -((Math.abs(vBatt) - fwdReq - brkReq) / rTotal);
    } else {
      status = "0V Source";
    }

    const drops: Record<string, string> = {};
    elements.forEach(el => {
      if (el.type === 'Resistor') {
        drops[el.id] = (Math.abs(I) * el.value).toFixed(2) + "V";
      } else if (el.type === 'V_DC') {
        drops[el.id] = "Source";
      } else if (el.type === 'Diode' || el.type === 'Zener') {
        if (I > 0) drops[el.id] = !el.reversed ? "0.70V (ON)" : (el.type === 'Zener' ? `${el.value.toFixed(2)}V (Brk)` : "Blocked");
        else if (I < 0) drops[el.id] = el.reversed ? "0.70V (ON)" : (el.type === 'Zener' ? `${el.value.toFixed(2)}V (Brk)` : "Blocked");
        else drops[el.id] = "0.00V (OFF)";
      }
    });

    return { I, status, drops };
  };

  const { I, status, drops } = analyzeLoop();

  return (
    <div className="flex flex-col xl:flex-row gap-8 w-full max-w-7xl mx-auto">
      
      {/* Left: Circuit Visualizer */}
      <div className="xl:w-1/2 bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-inner flex flex-col relative min-h-[500px]">
        <h3 className="font-bold text-slate-500 text-xs tracking-widest uppercase mb-8">Series Loop Diagram</h3>
        
        {/* The Loop Canvas */}
        <div className="flex-1 flex items-center justify-center relative py-12">
           {/* The massive loop wire */}
           <div className="absolute inset-y-12 left-1/2 -translate-x-1/2 w-48 border-4 border-slate-700 rounded-3xl" />
           
           {/* Components on the right wire */}
           <div className="flex flex-col gap-8 z-10 w-full items-center relative ml-48">
              {elements.length === 0 && (
                <div className="text-slate-500 italic bg-slate-950 px-4 py-2 relative -left-24">Empty Loop (0A)</div>
              )}
              {elements.map((el, i) => (
                <div key={el.id} className="relative flex items-center justify-center group bg-slate-950 py-2">
                  
                  {/* Visual component icon */}
                  {el.type === 'V_DC' && (
                    <div className="flex flex-col items-center">
                      <div className={`text-amber-500 font-bold text-lg leading-none ${el.reversed ? 'order-last' : ''}`}>+</div>
                      <div className="w-12 h-1.5 bg-amber-500 rounded-full my-1" />
                      <div className="w-6 h-1.5 bg-amber-500 rounded-full" />
                      <div className={`text-blue-500 font-bold text-lg leading-none ${el.reversed ? 'order-first' : ''}`}>-</div>
                    </div>
                  )}

                  {el.type === 'Resistor' && (
                    <div className="w-6 h-16 bg-indigo-500/20 border-2 border-indigo-400 rounded-sm flex items-center justify-center">
                       <div className="rotate-90 text-xs font-bold text-indigo-300">R</div>
                    </div>
                  )}

                  {el.type === 'Diode' && (
                    <div className={`flex flex-col items-center ${el.reversed ? 'rotate-180' : ''}`}>
                      <div className="w-0 h-0 border-l-[12px] border-l-transparent border-t-[20px] border-t-rose-500 border-r-[12px] border-r-transparent" />
                      <div className="w-8 h-1.5 bg-rose-500" />
                    </div>
                  )}

                  {el.type === 'Zener' && (
                    <div className={`flex flex-col items-center ${el.reversed ? 'rotate-180' : ''}`}>
                      <div className="w-0 h-0 border-l-[12px] border-l-transparent border-t-[20px] border-t-emerald-500 border-r-[12px] border-r-transparent" />
                      <div className="relative">
                        <div className="w-8 h-1.5 bg-emerald-500" />
                        <div className="absolute -left-1 -top-2 w-1.5 h-3.5 bg-emerald-500 -rotate-45" />
                        <div className="absolute -right-1 -bottom-2 w-1.5 h-3.5 bg-emerald-500 -rotate-45" />
                      </div>
                    </div>
                  )}

                  {/* Labels pointing to the component */}
                  <div className="absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 shadow-xl pointer-events-none">
                    <div className="text-sm font-bold text-slate-200">
                      {el.type === 'V_DC' && `${el.value}V Source`}
                      {el.type === 'Resistor' && `${el.value}Ω Resistor`}
                      {el.type === 'Diode' && `Si Diode (0.7V)`}
                      {el.type === 'Zener' && `Zener (${el.value}V)`}
                    </div>
                    <div className="text-xs text-slate-400">
                      V_drop: <span className="text-rose-400 font-mono">{drops[el.id]}</span>
                    </div>
                  </div>
                  
                </div>
              ))}
           </div>

           {/* Current direction indicator */}
           {Math.abs(I) > 0 && I !== Infinity && (
             <div className={`absolute top-12 left-1/2 -translate-x-1/2 bg-slate-950 p-2 text-amber-400 ${I < 0 ? 'rotate-180 bottom-12 top-auto' : ''}`}>
               <div className="w-0 h-0 border-l-[10px] border-l-transparent border-t-[16px] border-t-amber-400 border-r-[10px] border-r-transparent" />
             </div>
           )}
        </div>
      </div>

      {/* Right: Controls & Engine */}
      <div className="xl:w-1/2 flex flex-col gap-6">
        
        {/* Analysis HUD */}
        <div className={`p-6 rounded-2xl border flex flex-col items-center justify-center gap-2 shadow-lg transition-colors ${
          status === "Active" ? 'bg-indigo-500/10 border-indigo-500/30' : 
          I === Infinity ? 'bg-rose-500/10 border-rose-500/30' :
          'bg-slate-800/50 border-slate-700'
        }`}>
           <h2 className="text-slate-400 uppercase tracking-widest text-sm font-bold">Loop Current (I)</h2>
           <div className={`text-6xl font-black drop-shadow-md ${status === "Active" ? 'text-indigo-400' : 'text-slate-300'}`}>
             {I === Infinity || I === -Infinity ? 'MAX' : Math.abs(I).toFixed(3)} A
           </div>
           {I !== 0 && I !== Infinity && <div className="text-indigo-300 text-sm">{I > 0 ? '(Clockwise)' : '(Counter-Clockwise)'}</div>}
           {status !== "Active" && (
             <div className="mt-2 px-3 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/50 rounded-lg flex items-center gap-2 text-sm font-bold">
               <AlertTriangle size={16} /> {status}
             </div>
           )}
        </div>

        {/* Component List */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-200">Components in Series Loop</h3>
            <div className="flex gap-2">
              <button onClick={() => addElement('V_DC')} className="p-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 rounded-lg transition-colors text-xs font-bold flex items-center gap-1"><Plus size={14} /> Battery</button>
              <button onClick={() => addElement('Resistor')} className="p-2 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 rounded-lg transition-colors text-xs font-bold flex items-center gap-1"><Plus size={14} /> Resistor</button>
              <button onClick={() => addElement('Diode')} className="p-2 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 rounded-lg transition-colors text-xs font-bold flex items-center gap-1"><Plus size={14} /> Diode</button>
              <button onClick={() => addElement('Zener')} className="p-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 rounded-lg transition-colors text-xs font-bold flex items-center gap-1"><Plus size={14} /> Zener</button>
            </div>
          </div>

          <div className="space-y-3">
            {elements.map((el, i) => (
              <div key={el.id} className="flex items-center gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 font-mono text-xs">{i + 1}</div>
                
                <div className="flex-1 font-bold text-slate-300">
                  {el.type === 'V_DC' && 'DC Source'}
                  {el.type === 'Resistor' && 'Resistor'}
                  {el.type === 'Diode' && 'Silicon Diode'}
                  {el.type === 'Zener' && 'Zener Diode'}
                </div>

                {el.type !== 'Diode' && (
                  <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700 focus-within:border-indigo-500 transition-colors">
                    <input 
                      type="number" 
                      className="bg-transparent w-16 text-right outline-none text-white font-mono"
                      value={el.value}
                      onChange={(e) => updateElement(el.id, { value: parseFloat(e.target.value) || 0 })}
                    />
                    <span className="text-slate-500 text-sm font-bold">
                      {el.type === 'Resistor' ? 'Ω' : 'V'}
                    </span>
                  </div>
                )}

                <button 
                  onClick={() => updateElement(el.id, { reversed: !el.reversed })}
                  className={`p-2 rounded-lg border transition-colors flex items-center justify-center ${el.reversed ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
                  title="Flip Direction"
                >
                  <ArrowUpDown size={16} />
                </button>

                <button 
                  onClick={() => removeElement(el.id)}
                  className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            
            {elements.length === 0 && (
              <div className="text-center p-8 text-slate-500 border border-dashed border-slate-800 rounded-xl">
                Add components to start building your circuit.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
