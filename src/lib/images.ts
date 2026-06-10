/**
 * Centralized image registry — single source of truth for all image paths.
 *
 * To update an image, change its path here. All consumers will automatically
 * pick up the new path without any other changes needed.
 *
 * Paths are relative to the `public/` directory (as served by Next.js).
 */

// ---------------------------------------------------------------------------
// Worksheet & Exam cropped diagram images
// ---------------------------------------------------------------------------

export const cropImages = {
  /** Serie 1 — worksheet problem diagrams */
  ws1: {
    page1_crop1: "/images/crops/ws1/page-1_crop_1.png",
    page1_crop2: "/images/crops/ws1/page-1_crop_2.png",
    page2_crop1: "/images/crops/ws1/page-2_crop_1.png",
    page2_crop2: "/images/crops/ws1/page-2_crop_2.png",
    page3_crop1: "/images/crops/ws1/page-3_crop_1.png",
  },

  /** Serie 1 — solution diagrams */
  ws1sol: {
    page1_crop1: "/images/crops/ws1sol/page-1_crop_1.png",
    page2_crop1: "/images/crops/ws1sol/page-2_crop_1.png",
    page3_crop1: "/images/crops/ws1sol/page-3_crop_1.png",
    page6_crop1: "/images/crops/ws1sol/page-6_crop_1.png",
    page6_crop2: "/images/crops/ws1sol/page-6_crop_2.png",
  },

  /** Serie 2 — worksheet problem diagrams */
  ws2: {
    page1_crop1: "/images/crops/ws2/page-1_crop_1.png",
    page1_crop2: "/images/crops/ws2/page-1_crop_2.png",
    page1_crop3: "/images/crops/ws2/page-1_crop_3.png",
    page2_crop1: "/images/crops/ws2/page-2_crop_1.png",
  },

  /** Serie 2 — solution diagrams */
  ws2sol: {
    page1_crop1: "/images/crops/ws2sol/page-1_crop_1.png",
    page2_crop1: "/images/crops/ws2sol/page-2_crop_1.png",
    page4_crop1: "/images/crops/ws2sol/page-4_crop_1.png",
  },

  /** Serie 3 — worksheet problem diagrams */
  ws3: {
    page1_crop1: "/images/crops/ws3/page-1_crop_1.png",
    page2_crop1: "/images/crops/ws3/page-2_crop_1.png",
    page2_crop2: "/images/crops/ws3/page-2_crop_2.png",
    page3_crop1: "/images/crops/ws3/page-3_crop_1.png",
  },

  /** Exam 2025 — problem diagrams */
  exam: {
    page1_crop1: "/images/crops/exam/page-1_crop_1.png",
    page3_crop1: "/images/crops/exam/page-3_crop_1.png",
    page5_crop1: "/images/crops/exam/page-5_crop_1.png",
  },

  /** Exam 2025 — solution diagrams */
  examsol: {
    page1_crop1: "/images/crops/examsol/page-1_crop_1.png",
  },
} as const;

// ---------------------------------------------------------------------------
// Course illustration images (used directly inside course section components)
// ---------------------------------------------------------------------------

export const courseImages = {
  /** Chapter 1 — DC Circuits */
  chapter1: {
    voltageDivider: "/images/course/chapter-1/voltage-divider.jpg",
    superposition: "/images/course/chapter-1/superposition.jpg",
    theveninStep1: "/images/course/chapter-1/thevenin-step1.jpg",
    theveninStep3: "/images/course/chapter-1/thevenin-step3.jpg",
    theveninStep5: "/images/course/chapter-1/thevenin-step5.jpg",
    nortonStep1: "/images/course/chapter-1/norton-step1.jpg",
    nortonStep3: "/images/course/chapter-1/norton-step3.jpg",
    nortonStep5: "/images/course/chapter-1/norton-step5.jpg",
    sources: "/images/course/chapter-1/sources.jpg",
  },

  /** Chapter 2 — Semiconductor Diodes */
  chapter2: {
    nType: "/images/course/chapter-2/n-type.jpg",
    pnJunction: "/images/course/chapter-2/pn-junction.jpg",
    reverseBias: "/images/course/chapter-2/reverse-bias.jpg",
    forwardBias: "/images/course/chapter-2/forward-bias.jpg",
    zenerCurve: "/images/course/chapter-2/zener-curve.jpg",
    halfWave: "/images/course/chapter-2/half-wave.jpg",
    fullWave: "/images/course/chapter-2/full-wave.jpg",
    zenerRegulator: "/images/course/chapter-2/zener-regulator.jpg",
  },
} as const;
