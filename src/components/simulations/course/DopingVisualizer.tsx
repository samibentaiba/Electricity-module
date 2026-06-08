"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type DopingType = "intrinsic" | "n-type" | "p-type";

export function DopingVisualizer() {
  const [doping, setDoping] = useState<DopingType>("intrinsic");

  // Grid of atoms
  const atoms = [
    { id: 0, row: 0, col: 0 }, { id: 1, row: 0, col: 1 }, { id: 2, row: 0, col: 2 },
    { id: 3, row: 1, col: 0 }, { id: 4, row: 1, col: 1 }, { id: 5, row: 1, col: 2 },
    { id: 6, row: 2, col: 0 }, { id: 7, row: 2, col: 1 }, { id: 8, row: 2, col: 2 },
  ];

  const getCenterAtom = () => {
    if (doping === "n-type") return { symbol: "P", name: "Phosphorus", color: "bg-blue-500", text: "text-blue-100", border: "border-blue-400" };
    if (doping === "p-type") return { symbol: "B", name: "Boron", color: "bg-rose-500", text: "text-rose-100", border: "border-rose-400" };
    return { symbol: "Si", name: "Silicon", color: "bg-slate-700", text: "text-slate-300", border: "border-slate-500" };
  };

  const centerAtom = getCenterAtom();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
      {/* Controls */}
      <div className="p-6 bg-slate-800/50 md:w-1/3 flex flex-col justify-center space-y-6 border-b md:border-b-0 md:border-r border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Semiconductor Doping</h3>
          <p className="text-slate-400 text-sm">
            Pure (intrinsic) Silicon has 4 valence electrons. Inject impurities to change its electrical properties.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setDoping("intrinsic")}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all border ${
              doping === "intrinsic" ? "bg-slate-700 border-slate-500 text-white font-bold shadow-lg" : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300"
            }`}
          >
            <div className="font-bold">Intrinsic (Pure Si)</div>
            <div className="text-xs font-normal opacity-70">Perfect crystal lattice. All electrons are tightly bound.</div>
          </button>

          <button
            onClick={() => setDoping("n-type")}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all border ${
              doping === "n-type" ? "bg-blue-900/50 border-blue-500 text-blue-300 font-bold shadow-lg" : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300"
            }`}
          >
            <div className="font-bold">N-Type (Phosphorus Doping)</div>
            <div className="text-xs font-normal opacity-70">Adds an atom with 5 valence electrons. Creates a free electron.</div>
          </button>

          <button
            onClick={() => setDoping("p-type")}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all border ${
              doping === "p-type" ? "bg-rose-900/50 border-rose-500 text-rose-300 font-bold shadow-lg" : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300"
            }`}
          >
            <div className="font-bold">P-Type (Boron Doping)</div>
            <div className="text-xs font-normal opacity-70">Adds an atom with 3 valence electrons. Creates a &quot;hole&quot; (missing electron).</div>
          </button>
        </div>
      </div>

      {/* Visualization */}
      <div className="p-8 md:w-2/3 flex items-center justify-center min-h-[400px] bg-slate-950 relative overflow-hidden">
        
        <div className="relative w-80 h-80">
          {/* Bonds */}
          {/* Horizontal bonds */}
          {[0, 1, 3, 4, 6, 7].map((id) => (
            <div key={`h-bond-${id}`} className="absolute h-2 w-[80px] bg-slate-700/50 rounded-full" style={{ 
              top: `${Math.floor(id / 3) * 120 + 40}px`, 
              left: `${(id % 3) * 120 + 60}px` 
            }} />
          ))}
          {/* Vertical bonds */}
          {[0, 1, 2, 3, 4, 5].map((id) => (
            <div key={`v-bond-${id}`} className="absolute w-2 h-[80px] bg-slate-700/50 rounded-full" style={{ 
              left: `${(id % 3) * 120 + 40}px`, 
              top: `${Math.floor(id / 3) * 120 + 60}px` 
            }} />
          ))}

          {/* Atoms */}
          {atoms.map((atom) => {
            const isCenter = atom.id === 4;
            const style = isCenter ? centerAtom : { symbol: "Si", color: "bg-slate-700", text: "text-slate-300", border: "border-slate-500" };

            return (
              <motion.div 
                key={atom.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: atom.id * 0.05 }}
                className={`absolute w-20 h-20 rounded-full ${style.color} ${style.border} border-4 flex items-center justify-center shadow-lg z-10`}
                style={{ top: `${atom.row * 120}px`, left: `${atom.col * 120}px` }}
              >
                <span className={`text-2xl font-bold ${style.text}`}>{style.symbol}</span>
                
                {/* Fixed Electrons (4 per Si atom, shared in covalent bonds) */}
                {!isCenter && (
                  <>
                    <div className="absolute -top-3 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
                    <div className="absolute -bottom-3 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
                    <div className="absolute -left-3 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
                    <div className="absolute -right-3 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
                  </>
                )}

                {/* Center Atom Electrons */}
                {isCenter && (
                  <>
                    <div className="absolute -top-3 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
                    <div className="absolute -bottom-3 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
                    <div className="absolute -left-3 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
                    
                    {/* The 4th electron / hole position */}
                    {doping === "p-type" ? (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-3 w-4 h-4 rounded-full border-2 border-dashed border-rose-400 bg-slate-900 flex items-center justify-center"
                      >
                         <span className="text-[10px] text-rose-400 font-bold leading-none">+</span>
                      </motion.div>
                    ) : (
                      <div className="absolute -right-3 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
                    )}

                    {/* The 5th Free Electron (N-type) */}
                    {doping === "n-type" && (
                      <motion.div 
                        animate={{ 
                          x: [0, 40, 20, -30, 10, 0], 
                          y: [0, -30, 40, 20, -40, 0] 
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 4, 
                          ease: "linear" 
                        }}
                        className="absolute -top-8 -right-8 w-4 h-4 bg-yellow-300 rounded-full shadow-[0_0_15px_rgba(253,224,71,1)] flex items-center justify-center z-20"
                      >
                        <span className="text-[10px] text-yellow-900 font-bold leading-none">-</span>
                      </motion.div>
                    )}
                  </>
                )}
              </motion.div>
            );
          })}
          
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2 backdrop-blur-sm z-30">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_5px_rgba(103,232,249,0.8)]" />
            <span>Bound Electron</span>
          </div>
          {doping === "n-type" && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-300 rounded-full shadow-[0_0_5px_rgba(253,224,71,1)]" />
              <span className="text-yellow-300 font-bold">Free Electron (-)</span>
            </div>
          )}
          {doping === "p-type" && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border border-dashed border-rose-400 bg-slate-900" />
              <span className="text-rose-400 font-bold">Hole (+)</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
