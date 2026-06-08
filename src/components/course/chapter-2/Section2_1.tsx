"use client";

import Latex from "react-latex-next";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const PNJunctionVisualizer = dynamic(() => import("@/components/simulations/course/PNJunctionVisualizer").then(m => m.PNJunctionVisualizer), { 
  ssr: false, loading: () => <Skeleton className="h-[400px] w-full rounded-2xl" /> 
});

const DopingVisualizer = dynamic(() => import("@/components/simulations/course/DopingVisualizer").then(m => m.DopingVisualizer), { 
  ssr: false, loading: () => <Skeleton className="h-[400px] w-full rounded-2xl" /> 
});

export function Section2_1() {
  return (
    <div className="space-y-12">
      <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
        <p>Based on electrical conductivity, all the materials in nature are classified as insulators, semiconductors, and conductors.</p>
      </div>

      {/* 1- Insulator */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">1. Insulator</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
          <p>
            An insulator is a material that prevents the flow of electricity. Unlike conductors, insulators have extremely high resistance to electrical current because their electrons are tightly bound to their atoms.
          </p>
          <h3 className="text-xl font-bold text-primary mt-6">Characteristics</h3>
          <ul>
            <li><strong>Low Conductivity:</strong> They offer negligible electrical flow when voltage is applied.</li>
            <li><strong>High Resistivity:</strong> Typical values range between <Latex>{`$10^{10}$`}</Latex> and <Latex>{`$10^{12} \\Omega\\text{cm}$`}</Latex>.</li>
            <li><strong>Examples:</strong> Glass, paper, mica, and quartz.</li>
          </ul>
        </div>
      </section>

      {/* 2- Conductor */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">2. Conductor</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
          <p>
            A conductor is a material that allows electricity to flow through it very easily. Because conductors have extremely high conductivity, they are used to build wires and electronic components.
          </p>
          <h3 className="text-xl font-bold text-primary mt-6">Characteristics</h3>
          <ul>
            <li><strong>High Conductivity:</strong> They support a &quot;generous&quot; (large) flow of electrical charge when a voltage is applied.</li>
            <li><strong>Low Resistivity:</strong> Their resistance to current is very small, typically between <Latex>{`$10^{-4}$`}</Latex> and <Latex>{`$10^{-6} \\Omega\\text{cm}$`}</Latex>.</li>
            <li><strong>Examples:</strong> Copper, Aluminum, Silver, and Gold.</li>
          </ul>
        </div>
      </section>

      {/* 3- Semiconductor */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">3. Semiconductor</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
          <p>
            A semiconductor is a material that sits between a conductor and an insulator. Its ability to conduct electricity can be &quot;turned on&quot; or &quot;controlled,&quot; which is why semiconductors are the foundation of all modern electronics (like chips and processors).
          </p>
          <h3 className="text-xl font-bold text-primary mt-6">Characteristics</h3>
          <ul>
            <li><strong>Intermediate Conductivity:</strong> Its ability to conduct is better than an insulator but not as high as a conductor.</li>
            <li><strong>Resistivity:</strong> Typically ranges between 10 and <Latex>{`$10^{4} \\Omega\\text{cm}$`}</Latex>.</li>
            <li><strong>Primary Examples:</strong> Two of the most commonly used are Silicon (Si=14 atomic no.) and Germanium (Ge=32 atomic no.). Both have 4 valence electrons.</li>
          </ul>

          <h3 className="text-2xl font-bold text-primary mt-8">II-1. Atomic Structure and Covalent Bonding in Intrinsic Semiconductors</h3>
          <p>
            The formation of a semiconductor material starts with the atomic structure of elements like Silicon or Germanium, which possess four valence electrons in their outer shell. These atoms link together through covalent bonding, sharing electrons with four neighbors to create a stable crystal lattice. In this pure state, the material is known as an <strong>intrinsic semiconductor</strong>.
          </p>
          <p>
            An intrinsic semiconductor has a very low conductivity at room temperature because almost all electrons are locked in bonds, meaning there are very few carriers that can easily move.
          </p>

          <h3 className="text-2xl font-bold text-primary mt-8">II-2. Doped or Extrinsic Semiconductors</h3>
          <p>
            To make the material useful for electronics, this intrinsic base is modified through doping to create <strong>extrinsic semiconductors</strong>. By adding Group V impurities, we create an <strong>N-type material</strong> with extra electrons, while Group III impurities create a <strong>P-type material</strong> with &quot;holes&quot;. The final functional structure is formed at the PN junction, where these materials meet and create a depletion region after contact, allowing for the control of electrical current.
          </p>

          <div className="mt-8">
            <DopingVisualizer />
          </div>
          
          <h3 className="text-2xl font-bold text-primary mt-8">III. PN Junction</h3>
          <p>
            When a P-type semiconductor is brought into contact with an N-type semiconductor, the excess electrons from the N-type rush to fill the holes of the P-type in the contact area. A carrier-free zone is formed across both the P-region (where the holes have been filled) and the N-region (where the electrons have left).
          </p>



          <div className="mt-4 p-4 bg-orange-500/10 border-l-4 border-orange-500 rounded-r-lg text-orange-200 text-sm">
            <strong>💡 In Simple Terms:</strong> Imagine the N-type side as a crowded room full of people (electrons), and the P-type side as a room full of empty chairs (holes). When you open the door between them (the junction), the people near the door immediately rush over to sit in the empty chairs. This creates a &quot;dead zone&quot; at the door where nobody can move anymore—this is called the Depletion Region!
          </div>

          <div className="mt-8">
            <PNJunctionVisualizer />
          </div>
        </div>
      </section>
    </div>
  );
}
