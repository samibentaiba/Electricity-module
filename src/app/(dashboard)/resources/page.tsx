import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import fs from "fs";
import path from "path";

import Image from "next/image";

export default async function ResourcesPage() {
  const imagesDir = path.join(process.cwd(), "public/random-resources/images");
  const pdfsDir = path.join(process.cwd(), "public/random-resources/pdfs");

  let images: string[] = [];
  try {
    images = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    // Sort images numerically if possible (e.g., photo_1, photo_2...)
    images.sort((a, b) => {
      const numA = parseInt(a.replace(/[^0-9]/g, '')) || 0;
      const numB = parseInt(b.replace(/[^0-9]/g, '')) || 0;
      return numA - numB;
    });
  } catch (e) {
    console.error("Images not found", e);
  }

  let pdfs: string[] = [];
  try {
    pdfs = fs.readdirSync(pdfsDir).filter(f => f.endsWith('.pdf') || f.endsWith('.docx'));
  } catch (e) {
    console.error("PDFs not found", e);
  }

  // Pair up series and corrected series
  const seriesFiles = pdfs.filter(f => f.toLowerCase().includes("serie0") && !f.toLowerCase().includes("correct"));
  
  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <PageHeader 
        title="Extra Practice Library" 
        description="Browse an external collection of assignments, corrections, and handwritten notes from Kasdi Merbah Ouargla University."
        color="purple"
      />
      
      <div className="space-y-16 mt-8">
        
        {/* PDFs Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-4">Assignment Series & Corrections (PDFs)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seriesFiles.map(serie => {
              // Try to find the matching correction file
              const serieNum = serie.match(/serie0[0-9]/i)?.[0];
              const correction = pdfs.find(f => f.toLowerCase().includes("correct") && f.toLowerCase().includes(serieNum?.toLowerCase() || "none"));
              
              return (
                <div key={serie} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-purple-500/50 transition-colors">
                  <div>
                    <h3 className="font-bold text-lg text-slate-200 capitalize">{serie.replace(".pdf", "")}</h3>
                    <p className="text-sm text-slate-400 mt-2">Practice problems covering electronic fundamentals.</p>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <a href={`/random-resources/pdfs/\${serie}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold py-2 px-4 rounded text-center transition-colors">
                      View Assignment
                    </a>
                    {correction && (
                      <a href={`/random-resources/pdfs/\${correction}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-2 px-4 rounded text-center transition-colors">
                        Correction
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
             <h3 className="font-bold text-lg text-slate-300 mb-4">Other Documents</h3>
             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pdfs.filter(f => !f.toLowerCase().includes("serie0")).map(doc => (
                  <li key={doc}>
                    <a href={`/random-resources/pdfs/\${doc}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors">
                      <span className="text-xl">📄</span> {doc}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`/random-resources/tp/TP1_initiation_proteus.pdf`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors">
                    <span className="text-xl">🛠️</span> TP1_initiation_proteus.pdf
                  </a>
                </li>
             </ul>
          </div>
        </section>

        {/* Images Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-l-4 border-amber-500 pl-4">Handwritten Notes & Exam Photos</h2>
          <p className="text-slate-400">A collection of {images.length} handwritten notes, derivations, and circuit diagrams.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images.map(img => (
              <a key={img} href={`/random-resources/images/\${img}`} target="_blank" rel="noopener noreferrer" className="block relative aspect-square rounded-xl overflow-hidden border border-slate-800 hover:border-amber-500 transition-colors group">
                <Image 
                  src={`/random-resources/images/\${img}`} 
                  alt={img} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="text-white text-xs font-bold text-center px-2">{img}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
