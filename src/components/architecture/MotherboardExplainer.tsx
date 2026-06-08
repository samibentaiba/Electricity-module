"use client";

import { useState } from "react";


type ComponentType = "cpu" | "ram" | "northbridge" | "southbridge" | "gpu" | "io";

export function MotherboardExplainer() {
  const [activeComponent, setActiveComponent] = useState<ComponentType | null>(null);

  const infoData = {
    cpu: {
      title: "Processor (CPU)",
      description: "The brain of the computer. It executes instructions and controls all other units.",
      details: [
        "ALU (Arithmetic Logic Unit): Performs math and logical operations.",
        "Control Unit: Directs the operation of the processor.",
        "Registers: Ultra-fast storage for immediate data."
      ],
      color: "border-blue-500",
      bg: "bg-blue-500/10",
      text: "text-blue-400"
    },
    northbridge: {
      title: "Northbridge (Chipset)",
      description: "Manages high-speed communications between the CPU, RAM, and GPU.",
      details: [
        "Directly connected to the CPU via the Front Side Bus (FSB).",
        "Essential for high-performance memory access.",
        "In modern systems, this is often integrated directly into the CPU."
      ],
      color: "border-amber-500",
      bg: "bg-amber-500/10",
      text: "text-amber-400"
    },
    southbridge: {
      title: "Southbridge (Chipset)",
      description: "Handles slower I/O operations and peripheral devices.",
      details: [
        "Connects to the Northbridge, not directly to the CPU.",
        "Manages USB, SATA (Hard Drives), Audio, and BIOS.",
        "Slower bandwidth compared to the Northbridge."
      ],
      color: "border-orange-500",
      bg: "bg-orange-500/10",
      text: "text-orange-400"
    },
    ram: {
      title: "RAM (Random Access Memory)",
      description: "Volatile memory used to store data currently being processed by the CPU.",
      details: [
        "Extremely fast but loses data when power is off.",
        "Connected to the Northbridge (or directly to CPU in modern architectures).",
        "Measured in Gigabytes (GB)."
      ],
      color: "border-emerald-500",
      bg: "bg-emerald-500/10",
      text: "text-emerald-400"
    },
    gpu: {
      title: "PCIe Slot (GPU)",
      description: "High-speed expansion slot typically used for Dedicated Graphics Cards.",
      details: [
        "Communicates directly with the Northbridge for maximum speed.",
        "Essential for rendering 3D graphics and complex computations."
      ],
      color: "border-purple-500",
      bg: "bg-purple-500/10",
      text: "text-purple-400"
    },
    io: {
      title: "I/O Ports",
      description: "External connectors for peripherals like keyboard, mouse, USB drives.",
      details: [
        "Managed by the Southbridge.",
        "Includes USB, Ethernet, Audio jacks, etc."
      ],
      color: "border-pink-500",
      bg: "bg-pink-500/10",
      text: "text-pink-400"
    }
  };

  const activeInfo = activeComponent ? infoData[activeComponent] : null;

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      {/* Interactive Motherboard Schematic */}
      <div className="w-full lg:w-2/3 bg-slate-950 rounded-2xl border border-slate-800 p-8 shadow-inner relative flex items-center justify-center min-h-[500px]">
        <h3 className="absolute top-4 left-4 font-bold text-slate-400 text-sm tracking-wider uppercase z-10">Interactive Motherboard</h3>
        
        {/* PCB Board */}
        <div className="relative w-full max-w-lg aspect-4/3 bg-[#0d2a18] border-4 border-[#1f4d2f] rounded-xl shadow-2xl flex items-center justify-center">
          
          {/* Traces (decorative) */}
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGw0MCA0ME00MCAwbC00MCA0MCIgc3Ryb2tlPSIjMDBmZjAwIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] bg-repeat" />

          {/* CPU Socket */}
          <button 
            onMouseEnter={() => setActiveComponent("cpu")}
            onClick={() => setActiveComponent("cpu")}
            className={`absolute top-[15%] left-[20%] w-[25%] h-[25%] bg-slate-800 border-4 \${activeComponent === 'cpu' ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-slate-600 hover:border-blue-400'} rounded flex items-center justify-center transition-all z-10`}
          >
            <span className="font-bold text-slate-300 text-sm md:text-lg">CPU</span>
          </button>

          {/* Northbridge */}
          <button 
            onMouseEnter={() => setActiveComponent("northbridge")}
            onClick={() => setActiveComponent("northbridge")}
            className={`absolute top-[45%] left-[30%] w-[15%] h-[15%] bg-slate-800 border-2 \${activeComponent === 'northbridge' ? 'border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'border-slate-600 hover:border-amber-400'} rounded flex items-center justify-center transition-all z-10`}
          >
            <span className="font-bold text-slate-300 text-xs text-center leading-tight">North<br/>Bridge</span>
          </button>

          {/* Southbridge */}
          <button 
            onMouseEnter={() => setActiveComponent("southbridge")}
            onClick={() => setActiveComponent("southbridge")}
            className={`absolute bottom-[15%] right-[25%] w-[15%] h-[15%] bg-slate-800 border-2 \${activeComponent === 'southbridge' ? 'border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'border-slate-600 hover:border-orange-400'} rounded flex items-center justify-center transition-all z-10`}
          >
            <span className="font-bold text-slate-300 text-xs text-center leading-tight">South<br/>Bridge</span>
          </button>

          {/* RAM Slots */}
          <button 
            onMouseEnter={() => setActiveComponent("ram")}
            onClick={() => setActiveComponent("ram")}
            className={`absolute top-[10%] right-[15%] w-[15%] h-[40%] bg-slate-900 border-2 \${activeComponent === 'ram' ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'border-slate-700 hover:border-emerald-400'} rounded flex flex-col justify-evenly p-1 transition-all z-10`}
          >
             <div className="w-full h-2 bg-emerald-600/50 rounded-sm" />
             <div className="w-full h-2 bg-emerald-600/50 rounded-sm" />
             <div className="w-full h-2 bg-emerald-600/50 rounded-sm" />
             <div className="w-full h-2 bg-emerald-600/50 rounded-sm" />
             <span className="text-emerald-400 text-xs font-bold -rotate-90 block mt-2">RAM</span>
          </button>

          {/* PCIe Slot */}
          <button 
            onMouseEnter={() => setActiveComponent("gpu")}
            onClick={() => setActiveComponent("gpu")}
            className={`absolute bottom-[40%] left-[10%] w-[40%] h-[10%] bg-slate-900 border-2 \${activeComponent === 'gpu' ? 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'border-slate-700 hover:border-purple-400'} rounded flex items-center justify-center transition-all z-10`}
          >
             <span className="text-purple-400 text-xs font-bold tracking-widest">PCIe x16</span>
          </button>

          {/* I/O Panel */}
          <button 
            onMouseEnter={() => setActiveComponent("io")}
            onClick={() => setActiveComponent("io")}
            className={`absolute left-0 top-[10%] w-[8%] h-[30%] bg-slate-400 border-r-2 \${activeComponent === 'io' ? 'border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'border-slate-500 hover:border-pink-400'} rounded-r flex flex-col items-center justify-evenly py-2 transition-all z-10`}
          >
             <div className="w-3 h-3 rounded-full bg-pink-500/50" />
             <div className="w-4 h-2 bg-slate-600" />
             <div className="w-4 h-2 bg-slate-600" />
             <div className="w-3 h-3 rounded bg-blue-500/50" />
          </button>

          {/* Connecting Buses (Lines) */}
          {/* CPU to Northbridge */}
          <div className={`absolute top-[35%] left-[30%] w-1 h-[10%] \${activeComponent === 'northbridge' || activeComponent === 'cpu' ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' : 'bg-slate-600/50'}`} />
          
          {/* Northbridge to RAM */}
          <div className={`absolute top-[30%] left-[45%] w-[40%] h-1 \${activeComponent === 'northbridge' || activeComponent === 'ram' ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-slate-600/50'}`} />
          
          {/* Northbridge to PCIe */}
          <div className={`absolute top-[52%] left-[25%] w-1 h-[8%] \${activeComponent === 'northbridge' || activeComponent === 'gpu' ? 'bg-purple-400 shadow-[0_0_8px_#c084fc]' : 'bg-slate-600/50'}`} />

          {/* Northbridge to Southbridge */}
          <div className={`absolute top-[60%] left-[37%] w-[38%] h-[20%] border-l border-b \${activeComponent === 'northbridge' || activeComponent === 'southbridge' ? 'border-orange-400 shadow-[0_0_8px_#fb923c]' : 'border-slate-600/50'}`} style={{ borderBottomLeftRadius: '8px' }} />

        </div>
      </div>

      {/* Information Panel */}
      <div className="w-full lg:w-1/3 bg-slate-900/30 rounded-xl border border-slate-800 p-6 flex flex-col justify-center min-h-[400px]">
         {activeInfo ? (
           <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className={`text-2xl font-bold mb-4 border-l-4 \${activeInfo.color} pl-4 \${activeInfo.text}`}>
                {activeInfo.title}
              </h2>
              <p className="text-lg text-slate-300 mb-6">
                {activeInfo.description}
              </p>
              <ul className="space-y-3">
                {activeInfo.details.map((detail, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-400">
                    <span className={`w-2 h-2 mt-2 rounded-full shrink-0 \${activeInfo.color.replace('border-', 'bg-')}`} />
                    {detail}
                  </li>
                ))}
              </ul>
           </div>
         ) : (
           <div className="text-center text-slate-500 animate-pulse">
              <p className="text-xl font-bold mb-2">Hover or Tap a Component</p>
              <p>Explore the architecture of the motherboard to learn about each part&apos;s function.</p>
           </div>
         )}
      </div>
    </div>
  );
}
