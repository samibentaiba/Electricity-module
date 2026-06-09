import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import fs from "fs";
import path from "path";
import { worksheets } from "@/data/worksheets";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function ResourcesPage() {
  const imagesDir = path.join(process.cwd(), "public/random-resources/images");
  
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

    
  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <PageHeader 
        title="Extra Practice Library" 
        description="Browse an external collection of assignments, corrections, and handwritten notes from Kasdi Merbah Ouargla University."
        color="purple"
      />
      
      <div className="space-y-16 mt-8">
        
        {/* Worksheets Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-4">Worksheets & Exercises</h2>

          <div className="grid gap-6">
            {worksheets.map((worksheet) => (
              <div key={worksheet.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-purple-500/50 transition-colors">
                <div>
                  <h3 className="font-bold text-lg text-slate-200">{worksheet.title}</h3>
                  <p className="text-sm text-slate-400 mt-2">{worksheet.description}</p>
                </div>
                <div className="mt-4">
                  <Link href={`/worksheets/${worksheet.id}`}>
                    <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold py-2 px-4 rounded text-center transition-colors">
                      Open Worksheet
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Images Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-l-4 border-amber-500 pl-4">Handwritten Notes & Exam Photos</h2>
          <p className="text-slate-400">A collection of {images.length} handwritten notes, derivations, and circuit diagrams.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images.map(img => (
              <a key={img} href={`/random-resources/images/${img}`} target="_blank" rel="noopener noreferrer" className="block relative aspect-square rounded-xl overflow-hidden border border-slate-800 hover:border-amber-500 transition-colors group">
                <Image
                  src={`/random-resources/images/${img}`}
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
