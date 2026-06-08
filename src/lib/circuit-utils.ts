/**
 * Circuit Utilities
 * Pure functions for solving common electrical circuit problems.
 */

export function calculateEquivalentResistance(r1: number, r2: number, mode: "series" | "parallel"): number {
  if (mode === "series") {
    return r1 + r2;
  }
  return 1 / (1 / r1 + 1 / r2);
}

export function calculateVoltageDivider(vin: number, r1: number, r2: number): number {
  return vin * (r2 / (r1 + r2));
}

export interface KirchhoffResult {
  I1: number;
  I2: number;
  I3: number;
  det: number;
}

/**
 * Solves a standard 2-loop Kirchhoff circuit with 3 resistors and 2 voltage sources.
 * Top Node KCL: I1 + I2 = I3
 * Left Loop KVL: V1 - I1*R1 - I3*R3 = 0
 * Right Loop KVL: V2 - I2*R2 - I3*R3 = 0
 */
export function solveKirchhoff2Loop(V1: number, V2: number, R1: number, R2: number, R3: number): KirchhoffResult {
  const det = (R1 + R3) * (R2 + R3) - (R3 * R3);
  let I1 = 0, I2 = 0, I3 = 0;

  if (det !== 0) {
    I1 = (V1 * (R2 + R3) - V2 * R3) / det;
    I2 = ((R1 + R3) * V2 - V1 * R3) / det;
    I3 = I1 + I2;
  }

  return { I1, I2, I3, det };
}
