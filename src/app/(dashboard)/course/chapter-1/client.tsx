"use client";

import { useChapter } from "./hook";
import { Section1_1 } from "@/components/course/chapter-1/Section1_1";
import { Section1_2 } from "@/components/course/chapter-1/Section1_2";
import { Section1_3 } from "@/components/course/chapter-1/Section1_3";

export function ClientChapter() {
  useChapter();
  return (
    <div className="space-y-12">
      <Section1_1 />
      <Section1_2 />
      <Section1_3 />
    </div>
  );
}
