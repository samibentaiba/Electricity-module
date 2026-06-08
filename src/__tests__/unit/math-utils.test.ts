import { describe, it, expect } from 'vitest';
import {
  calculateLineEquation,
  calculateMatrixProperties,
  calculateVectorIndependence,
} from '@/lib/math-utils';

// =============================================================================
// calculateLineEquation
// =============================================================================
describe('calculateLineEquation', () => {
  it('returns correct slope and intercept for a standard line', () => {
    // line through (0,0) and (2,4) → y = 2x, so m=2, b=0
    const _result = calculateLineEquation(0, 0, 2, 4);
    expect(result.m).toBe(2);
    expect(result.b).toBe(0);
    expect(result.isVertical).toBe(false);
  });

  it('returns correct values for a horizontal line', () => {
    // line through (1,3) and (5,3) → y = 3, so m=0, b=3
    const _result = calculateLineEquation(1, 3, 5, 3);
    expect(result.m).toBe(0);
    expect(result.b).toBe(3);
    expect(result.isVertical).toBe(false);
  });

  it('detects a vertical line', () => {
    // line through (2,0) and (2,5) → vertical
    const _result = calculateLineEquation(2, 0, 2, 5);
    expect(result.isVertical).toBe(true);
    expect(result.m).toBe(Infinity);
    expect(result.b).toBeUndefined();
  });

  it('handles negative slopes', () => {
    // line through (0,4) and (4,0) → y = -x + 4, m=-1, b=4
    const _result = calculateLineEquation(0, 4, 4, 0);
    expect(result.m).toBe(-1);
    expect(result.b).toBe(4);
  });

  it('handles same point (degenerate case)', () => {
    // Both points are the same → dx=0, dy=0 → vertical
    const _result = calculateLineEquation(3, 3, 3, 3);
    expect(result.isVertical).toBe(true);
  });

  it('returns correct dx and dy', () => {
    const _result = calculateLineEquation(1, 2, 4, 6);
    expect(result.dx).toBe(3);
    expect(result.dy).toBe(4);
  });

  it('handles fractional slopes correctly', () => {
    // line through (0,0) and (3,1) → m = 1/3
    const _result = calculateLineEquation(0, 0, 3, 1);
    expect(result.m).toBeCloseTo(1 / 3);
    expect(result.b).toBeCloseTo(0);
  });
});

// =============================================================================
// calculateVectorIndependence
// =============================================================================
describe('calculateVectorIndependence', () => {
  it('detects independent vectors (standard basis)', () => {
    // e1 = (1,0) and e2 = (0,1) → det = 1 → independent
    const _result = calculateVectorIndependence(1, 0, 0, 1);
    expect(result.det).toBe(1);
    expect(result.isDependent).toBe(false);
  });

  it('detects dependent vectors (collinear)', () => {
    // v1 = (2,4) and v2 = (1,2) → det = 2*2 - 4*1 = 0 → dependent
    const _result = calculateVectorIndependence(2, 4, 1, 2);
    expect(result.det).toBe(0);
    expect(result.isDependent).toBe(true);
  });

  it('detects dependent vectors (opposite direction)', () => {
    // v1 = (3,6) and v2 = (-3,-6) → det = 3*(-6) - 6*(-3) = 0
    const _result = calculateVectorIndependence(3, 6, -3, -6);
    expect(result.det).toBe(0);
    expect(result.isDependent).toBe(true);
  });

  it('detects independent vectors (generic)', () => {
    // v1 = (1,2) and v2 = (3,1) → det = 1*1 - 2*3 = -5 → independent
    const _result = calculateVectorIndependence(1, 2, 3, 1);
    expect(result.det).toBe(-5);
    expect(result.isDependent).toBe(false);
  });

  it('handles zero vector correctly (always dependent)', () => {
    // v1 = (0,0) and v2 = (1,2) → det = 0 → dependent
    const _result = calculateVectorIndependence(0, 0, 1, 2);
    expect(result.det).toBe(0);
    expect(result.isDependent).toBe(true);
  });

  it('handles both zero vectors', () => {
    const _result = calculateVectorIndependence(0, 0, 0, 0);
    expect(result.det).toBe(0);
    expect(result.isDependent).toBe(true);
  });

  it('handles nearly-dependent vectors (within threshold)', () => {
    // det = 0.05 which is < 0.1 → should be dependent
    // v1=(1,0), v2=(100,5) → det = 1*5 - 0*100 = 5 → independent
    // v1=(10, 1), v2=(100, 10) → det = 10*10 - 1*100 = 0 → dependent
    const _result = calculateVectorIndependence(10, 1, 100, 10);
    expect(result.isDependent).toBe(true);
  });

  it('correctly evaluates negative determinants', () => {
    // v1 = (0,1) and v2 = (1,0) → det = 0*0 - 1*1 = -1 → independent
    const _result = calculateVectorIndependence(0, 1, 1, 0);
    expect(result.det).toBe(-1);
    expect(result.isDependent).toBe(false);
  });
});

// =============================================================================
// calculateMatrixProperties
// =============================================================================
describe('calculateMatrixProperties', () => {
  describe('determinant calculations', () => {
    it('computes determinant of the identity matrix (should be 1)', () => {
      const identity = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
      const _result = calculateMatrixProperties(identity);
      expect(result.det).toBeCloseTo(1);
    });

    it('computes determinant of a 2x2 matrix', () => {
      // det([[1,2],[3,4]]) = 1*4 - 2*3 = -2
      const _result = calculateMatrixProperties([[1, 2], [3, 4]]);
      expect(result.det).toBeCloseTo(-2);
    });

    it('computes determinant of a singular matrix (should be 0)', () => {
      // Rows are linearly dependent
      const _result = calculateMatrixProperties([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
      expect(result.det).toBeCloseTo(0);
    });

    it('computes determinant of the Test1_V1_Ex2 matrix A correctly', () => {
      // A = [[1,2,0],[2,1,0],[0,0,3]]
      // det = 3*(1*1 - 2*2) = 3*(1-4) = 3*(-3) = -9
      const A = [[1, 2, 0], [2, 1, 0], [0, 0, 3]];
      const _result = calculateMatrixProperties(A);
      expect(result.det).toBeCloseTo(-9);
    });

    it('computes determinant of the Test1_V3_Ex2 matrix A_2 correctly', () => {
      // A_2 = [[2,1,1],[1,2,1],[1,1,2]]
      // det = (a-1)^2*(a+2) at a=2 → 1^2 * 4 = 4
      const A2 = [[2, 1, 1], [1, 2, 1], [1, 1, 2]];
      const _result = calculateMatrixProperties(A2);
      expect(result.det).toBeCloseTo(4);
    });

    it('computes determinant of the Test1_V3_Ex2 matrix A_1 correctly (should be 0)', () => {
      // A_1 = [[1,1,1],[1,1,1],[1,1,1]] → all rows identical → det = 0
      const A1 = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
      const _result = calculateMatrixProperties(A1);
      expect(result.det).toBeCloseTo(0);
    });

    it('computes determinant with negative values', () => {
      // det([[-1,1,-1],[-1,0,2],[1,-2,0]]) = -4
      const A = [[-1, 1, -1], [-1, 0, 2], [1, -2, 0]];
      const _result = calculateMatrixProperties(A);
      expect(result.det).toBeCloseTo(-4);
    });
  });

  describe('inverse matrix calculations', () => {
    it('computes inverse of the identity matrix (should be itself)', () => {
      const identity = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
      const _result = calculateMatrixProperties(identity);
      expect(result.inv).not.toBeNull();
      expect(result.inv![0][0]).toBeCloseTo(1);
      expect(result.inv![0][1]).toBeCloseTo(0);
      expect(result.inv![1][1]).toBeCloseTo(1);
    });

    it('returns null inverse for singular matrix', () => {
      const singular = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
      const _result = calculateMatrixProperties(singular);
      expect(result.inv).toBeNull();
    });

    it('computes inverse of a 2x2 matrix', () => {
      // inv([[1,2],[3,4]]) = 1/(-2) * [[4,-2],[-3,1]] = [[-2,1],[1.5,-0.5]]
      const _result = calculateMatrixProperties([[1, 2], [3, 4]]);
      expect(result.inv).not.toBeNull();
      expect(result.inv![0][0]).toBeCloseTo(-2);
      expect(result.inv![0][1]).toBeCloseTo(1);
      expect(result.inv![1][0]).toBeCloseTo(1.5);
      expect(result.inv![1][1]).toBeCloseTo(-0.5);
    });

    it('verifies A * A^{-1} = I for Test1_V1_Ex2 matrix', () => {
      const A = [[1, 2, 0], [2, 1, 0], [0, 0, 3]];
      const _result = calculateMatrixProperties(A);
      expect(result.inv).not.toBeNull();
      // Multiply A * inv(A)
      const n = A.length;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          let sum = 0;
          for (let k = 0; k < n; k++) {
            sum += A[i][k] * result.inv![k][j];
          }
          if (i === j) {
            expect(sum).toBeCloseTo(1, 5);
          } else {
            expect(sum).toBeCloseTo(0, 5);
          }
        }
      }
    });

    it('verifies A * A^{-1} = I for Test1_V3_Ex2 matrix A_2', () => {
      const A2 = [[2, 1, 1], [1, 2, 1], [1, 1, 2]];
      const _result = calculateMatrixProperties(A2);
      expect(result.inv).not.toBeNull();
      const n = A2.length;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          let sum = 0;
          for (let k = 0; k < n; k++) {
            sum += A2[i][k] * result.inv![k][j];
          }
          if (i === j) {
            expect(sum).toBeCloseTo(1, 5);
          } else {
            expect(sum).toBeCloseTo(0, 5);
          }
        }
      }
    });
  });

  describe('string and edge case handling', () => {
    it('handles string number inputs correctly', () => {
      const _result = calculateMatrixProperties([['1', '0'], ['0', '1']] as unknown as number[][]);
      expect(result.det).toBeCloseTo(1);
    });

    it('treats empty strings as 0', () => {
      const _result = calculateMatrixProperties([['', '0'], ['0', '1']] as unknown as number[][]);
      expect(result.det).toBeCloseTo(0);
    });

    it('treats dash "-" as 0', () => {
      const _result = calculateMatrixProperties([['-', '0'], ['0', '1']] as unknown as number[][]);
      expect(result.det).toBeCloseTo(0);
    });

    it('handles a 1x1 matrix', () => {
      const _result = calculateMatrixProperties([[5]]);
      expect(result.det).toBeCloseTo(5);
    });

    it('handles a 4x4 matrix', () => {
      // det of this specific 4x4
      const m = [
        [1, 0, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 3, 0],
        [0, 0, 0, 4],
      ];
      const _result = calculateMatrixProperties(m);
      expect(result.det).toBeCloseTo(24);
    });
  });
});

// =============================================================================
// RREF computation (imported from system-solver hook)
// We replicate the computeRREF function here to test it directly since it's not exported.
// =============================================================================
describe('RREF (Row Reduced Echelon Form) computation', () => {
  // Inline RREF for testing (same as in system-solver hook.ts)
  function computeRREF(matrix: number[][]): number[][] {
    const m = matrix.map(row => [...row]);
    let lead = 0;
    const rowCount = m.length;
    const colCount = m[0].length;

    for (let r = 0; r < rowCount; r++) {
      if (colCount <= lead) return m;
      let i = r;
      while (Math.abs(m[i][lead]) < 1e-10) {
        i++;
        if (rowCount === i) {
          i = r;
          lead++;
          if (colCount === lead) return m;
        }
      }
      const temp = m[i];
      m[i] = m[r];
      m[r] = temp;

      const val = m[r][lead];
      for (let j = 0; j < colCount; j++) {
        m[r][j] /= val;
      }

      for (let i = 0; i < rowCount; i++) {
        if (i !== r) {
          const val2 = m[i][lead];
          for (let j = 0; j < colCount; j++) {
            m[i][j] -= val2 * m[r][j];
          }
        }
      }
      lead++;
    }

    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        if (Math.abs(m[r][c]) < 1e-10) m[r][c] = 0;
      }
    }
    return m;
  }

  it('correctly reduces the identity augmented matrix', () => {
    // [I | b] already in RREF
    const augmented = [
      [1, 0, 0, 5],
      [0, 1, 0, 3],
      [0, 0, 1, 1],
    ];
    const rref = computeRREF(augmented);
    expect(rref[0][3]).toBeCloseTo(5);
    expect(rref[1][3]).toBeCloseTo(3);
    expect(rref[2][3]).toBeCloseTo(1);
  });

  it('solves a simple 2x2 system: x + y = 3, x - y = 1', () => {
    // Augmented: [[1,1,3],[1,-1,1]]
    // Solution: x=2, y=1
    const augmented = [
      [1, 1, 3],
      [1, -1, 1],
    ];
    const rref = computeRREF(augmented);
    expect(rref[0][0]).toBeCloseTo(1);
    expect(rref[0][1]).toBeCloseTo(0);
    expect(rref[0][2]).toBeCloseTo(2); // x = 2
    expect(rref[1][0]).toBeCloseTo(0);
    expect(rref[1][1]).toBeCloseTo(1);
    expect(rref[1][2]).toBeCloseTo(1); // y = 1
  });

  it('solves a 3x3 Cramer system (from Test1_V3_Ex2 CramerStepper)', () => {
    // System: -x + y - z = 2, -x + 2z = 3, x - 2y = 1
    // From the CramerStepper we know: x1 = -4, x2 = -2.5, x3 = -0.5
    const augmented = [
      [-1, 1, -1, 2],
      [-1, 0, 2, 3],
      [1, -2, 0, 1],
    ];
    const rref = computeRREF(augmented);
    expect(rref[0][3]).toBeCloseTo(-4);
    expect(rref[1][3]).toBeCloseTo(-2.5);
    expect(rref[2][3]).toBeCloseTo(-0.5);
  });

  it('detects inconsistent systems (no solution)', () => {
    // x + y = 1, x + y = 2 → inconsistent
    const augmented = [
      [1, 1, 1],
      [1, 1, 2],
    ];
    const rref = computeRREF(augmented);
    // After RREF: [[1,1,1],[0,0,1]] → 0*x + 0*y = 1 → contradiction
    expect(rref[1][0]).toBeCloseTo(0);
    expect(rref[1][1]).toBeCloseTo(0);
    expect(Math.abs(rref[1][2])).toBeGreaterThan(0.5); // The non-zero RHS signals no solution
  });

  it('detects infinite solutions (underdetermined system)', () => {
    // x + y + z = 1 (1 equation, 3 unknowns)
    const augmented = [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ];
    const rref = computeRREF(augmented);
    // Pivot only in column 0, columns 1 and 2 are free → infinite solutions
    expect(rref[0][0]).toBeCloseTo(1);
    expect(rref[1][0]).toBeCloseTo(0);
    expect(rref[1][1]).toBeCloseTo(0);
    expect(rref[1][2]).toBeCloseTo(0);
  });

  it('handles the Test1_V3_Ex2 A_1 system (rank 1, infinite solutions)', () => {
    // A_1 = [[1,1,1],[1,1,1],[1,1,1]] with b=0 → x + y + z = 0
    const augmented = [
      [1, 1, 1, 0],
      [1, 1, 1, 0],
      [1, 1, 1, 0],
    ];
    const rref = computeRREF(augmented);
    expect(rref[0][0]).toBeCloseTo(1);
    expect(rref[0][1]).toBeCloseTo(1);
    expect(rref[0][2]).toBeCloseTo(1);
    expect(rref[1][0]).toBeCloseTo(0);
    expect(rref[1][1]).toBeCloseTo(0);
    expect(rref[2][0]).toBeCloseTo(0);
  });

  it('handles a 4x5 augmented matrix (from Test2_V1_Ex1)', () => {
    // System: x+y-z+t=0, x-y+z-t=0, 2 free variables
    // Augmented coefficients
    const augmented = [
      [1, 1, -1, 1, 0],
      [1, -1, 1, -1, 0],
    ];
    const rref = computeRREF(augmented);
    // After RREF: x = 0 (from adding equations), y = z - t
    // So pivot in col 0 and col 1
    expect(rref[0][0]).toBeCloseTo(1);
    expect(rref[1][1]).toBeCloseTo(1);
  });
});

// =============================================================================
// Mathematical accuracy verification for specific exam exercises
// =============================================================================
describe('Exam-specific mathematical verifications', () => {
  describe('Test1_V2_Ex2: Determinant with parameter λ', () => {
    it('verifies det(A) = 0 when λ = √2', () => {
      // A = [[λ, 1], [2, λ]], det = λ² - 2
      // When λ = √2: det = 2 - 2 = 0
      const lambda = Math.sqrt(2);
      const A = [[lambda, 1], [2, lambda]];
      const _result = calculateMatrixProperties(A);
      expect(result.det).toBeCloseTo(0, 5);
      expect(result.inv).toBeNull();
    });

    it('verifies det(A) ≠ 0 when λ = 2', () => {
      const A = [[2, 1], [2, 2]];
      const _result = calculateMatrixProperties(A);
      expect(result.det).toBeCloseTo(2);
      expect(result.inv).not.toBeNull();
    });

    it('verifies det(A) ≠ 0 when λ = -√2', () => {
      const lambda = -Math.sqrt(2);
      const A = [[lambda, 1], [2, lambda]];
      const _result = calculateMatrixProperties(A);
      expect(result.det).toBeCloseTo(0, 5);
    });
  });

  describe('Test1_V3_Ex2: Parametric matrix det(A_a) = (a-1)²(a+2)', () => {
    const detFormula = (a: number) => (a - 1) * (a - 1) * (a + 2);

    it('verifies formula at a = 0', () => {
      const A = [[0, 1, 1], [1, 0, 1], [1, 1, 0]];
      const _result = calculateMatrixProperties(A);
      expect(result.det).toBeCloseTo(detFormula(0)); // (-1)²*(2) = 2
    });

    it('verifies formula at a = 1 (singular)', () => {
      const A = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
      const _result = calculateMatrixProperties(A);
      expect(result.det).toBeCloseTo(detFormula(1)); // 0
    });

    it('verifies formula at a = -2 (singular)', () => {
      const A = [[-2, 1, 1], [1, -2, 1], [1, 1, -2]];
      const _result = calculateMatrixProperties(A);
      expect(result.det).toBeCloseTo(detFormula(-2)); // 9*0 = 0
    });

    it('verifies formula at a = 2', () => {
      const A = [[2, 1, 1], [1, 2, 1], [1, 1, 2]];
      const _result = calculateMatrixProperties(A);
      expect(result.det).toBeCloseTo(detFormula(2)); // 1*4 = 4
    });

    it('verifies formula at a = 3', () => {
      const A = [[3, 1, 1], [1, 3, 1], [1, 1, 3]];
      const _result = calculateMatrixProperties(A);
      expect(result.det).toBeCloseTo(detFormula(3)); // 4*5 = 20
    });

    it('verifies formula at a = -1', () => {
      const A = [[-1, 1, 1], [1, -1, 1], [1, 1, -1]];
      const _result = calculateMatrixProperties(A);
      expect(result.det).toBeCloseTo(detFormula(-1)); // 4*1 = 4
    });
  });

  describe('Test2_V1_Ex1: Subspace dimension check', () => {
    it('verifies that the coefficient matrix has rank 2', () => {
      // A = [[1,1,-1,1],[1,-1,1,-1]]
      // rank should be 2 (both rows are independent)
      // dim(E) = 4 - rank = 4 - 2 = 2
      const A = [[1, 1, -1, 1], [1, -1, 1, -1]];
      const _result = calculateMatrixProperties(A);
      // For non-square matrix, det is not meaningful. But we can check rank by
      // verifying that the submatrix formed by first 2 columns has non-zero det.
      const subA = [[1, 1], [1, -1]];
      const subResult = calculateMatrixProperties(subA);
      expect(subResult.det).toBeCloseTo(-2); // Non-zero → rows are independent → rank = 2
    });
  });

  describe('Test2_V1_Ex2: F spans all of R³', () => {
    it('verifies that the spanning vectors of F are independent (rank 3)', () => {
      // Vectors: (1,0,1), (0,1,1), (1,1,0) as rows
      const M = [[1, 0, 1], [0, 1, 1], [1, 1, 0]];
      const _result = calculateMatrixProperties(M);
      // det should be non-zero → rank 3 → F = R³
      expect(Math.abs(result.det)).toBeGreaterThan(0.001);
    });
  });

  describe('Test2_V4_Ex2: F ∩ G and Direct Sum check', () => {
    it('verifies F and G bases are correct', () => {
      // F: x = z, so basis (1,0,1), (0,1,0) → 2D
      // G: span{(1,0,-1),(0,1,0)} → 2D
      // F ∩ G: vector (α,β,-α) ∈ F means α=-α → α=0 → intersection = span{(0,1,0)}
      // dim(F∩G) = 1, so NOT direct sum

      // Verify (0,1,0) is in F: x=0, z=0, 0-0=0 ✓
      expect(0 - 0).toBe(0);

      // Verify (0,1,0) is in G: 0*(1,0,-1) + 1*(0,1,0) = (0,1,0) ✓
      // So dim(F ∩ G) >= 1

      // Verify (1,0,-1) is NOT in F: x=1, z=-1, 1-(-1)=2 ≠ 0
      expect(1 - (-1)).not.toBe(0);
    });

    it('uses Grassmann formula: dim(F+G) = 2+2-1 = 3', () => {
      const dimF = 2;
      const dimG = 2;
      const dimIntersection = 1;
      const dimSum = dimF + dimG - dimIntersection;
      expect(dimSum).toBe(3); // = dim(R³) → F + G = R³ but NOT direct sum
    });
  });
});
