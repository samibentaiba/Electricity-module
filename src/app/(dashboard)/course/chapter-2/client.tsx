"use client";

import { useChapter } from "./hook";
import { Section2_1 } from "@/components/course/chapter-2/Section2_1";
import { Section2_2 } from "@/components/course/chapter-2/Section2_2";
import { Section2_3 } from "@/components/course/chapter-2/Section2_3";

export function ClientChapter() {
  useChapter();
  return (
    <div className="space-y-12">
      <Section2_1 />
      <Section2_2 />
      <Section2_3 />
    </div>
  );
}
