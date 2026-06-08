import * as math from "mathjs";

/**
 * Calculates the slope and y-intercept of a line passing through two points.
 * Handles vertical line edge cases safely to prevent false results.
 */
export function calculateLineEquation(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const isVertical = Math.abs(dx) < 0.0001;
  const m = isVertical ? Infinity : dy / dx;
  const b = isVertical ? undefined : y1 - m * x1;
  
  return { dx, dy, isVertical, m, b };
}

/**
 * Processes a 2D array input (which may contain intermediate string values like '-')
 * and safely calculates its determinant and inverse matrix using mathjs.
 */
export function calculateMatrixProperties(matrix: (number | string)[][]) {
  const safeMatrix = matrix.map(row => 
    row.map(cell => 
      typeof cell === 'string' && cell !== '' && cell !== '-' 
        ? Number(cell) 
        : (typeof cell === 'number' ? cell : 0)
    )
  );

  let det = 0;
  let inv: number[][] | null = null;
  try {
    det = Number(math.format(math.det(safeMatrix), { precision: 14 }));
    if (Math.abs(det) > 0.000001) {
      const rawInv = math.inv(safeMatrix) as number[][];
      inv = rawInv.map((row: number[]) => row.map((val: number) => Number(math.format(val, { precision: 10 }))));
    }
  } catch {
    // Matrix is singular or not invertible
  }

  return { safeMatrix, det, inv };
}

/**
 * Evaluates whether two 2D vectors are linearly independent by calculating the determinant.
 */
export function calculateVectorIndependence(x1: number, y1: number, x2: number, y2: number) {
  const det = x1 * y2 - x2 * y1;
  // If determinant is very close to 0, vectors are linearly dependent (collinear)
  const isDependent = Math.abs(det) < 0.1;
  return { det, isDependent };
}
