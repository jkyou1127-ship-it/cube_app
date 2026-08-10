export interface OllCase {
  id: number;
  name: string;
  group: string;
  alg: string;
  pattern: {
    edges: [boolean, boolean, boolean, boolean]; // top(back), right, bottom(front), left
    corners: [boolean, boolean, boolean, boolean]; // TL, TR, BR, BL
  };
}

function p(edges: [boolean, boolean, boolean, boolean], corners: [boolean, boolean, boolean, boolean]) {
  return { edges, corners };
}

const T = true;
const F = false;

// 57 OLL (last-layer orientation) cases, grouped by recognition shape.
// Numbering/grouping follows commonly-taught community conventions but may
// not match every reference 1:1 - see the disclaimer in the Algorithms tab.
export const OLL_CASES: OllCase[] = [
  // --- Dot (no edges oriented yet) ---
  { id: 1, name: '점 (Dot) 1', group: 'Dot', alg: "R U2 R2 F R F' U2 R' F R F'", pattern: p([F, F, F, F], [F, T, F, T]) },
  { id: 2, name: '점 (Dot) 2', group: 'Dot', alg: "R U R' U R U2 R' F R U R' U' F'", pattern: p([F, F, F, F], [T, F, T, F]) },
  { id: 3, name: '점 (Dot) 3', group: 'Dot', alg: "F R U R' U' F' f R U R' U' f'", pattern: p([F, F, F, F], [F, F, T, T]) },
  { id: 4, name: '점 (Dot) 4', group: 'Dot', alg: "f R U R' U' f' U F R U R' U' F'", pattern: p([F, F, F, F], [T, T, F, F]) },
  { id: 5, name: '점 (Dot) 5', group: 'Dot', alg: "r' U2 R U R' U r", pattern: p([F, F, F, F], [T, F, F, F]) },
  { id: 6, name: '점 (Dot) 6', group: 'Dot', alg: "r U2 R' U' R U' r'", pattern: p([F, F, F, F], [F, T, F, F]) },
  { id: 7, name: '점 (Dot) 7', group: 'Dot', alg: "r U R' U R U2 r'", pattern: p([F, F, F, F], [F, F, F, T]) },
  { id: 8, name: '점 (Dot) 8', group: 'Dot', alg: "r' U' R U' R' U2 r", pattern: p([F, F, F, F], [F, F, T, F]) },

  // --- Line / bar ---
  { id: 9, name: '일자 (Line) 1', group: 'Line', alg: "R U2 R2 U' R2 U' R2 U2 R", pattern: p([T, F, T, F], [F, F, F, F]) },
  { id: 10, name: '일자 (Line) 2', group: 'Line', alg: "R U2 R2 U' R2 U' R2 U2 R U", pattern: p([F, T, F, T], [F, F, F, F]) },

  // --- Small L-shape ---
  { id: 11, name: 'ㄱ자 (L) 1', group: 'L', alg: "F R' F' r U R U' r'", pattern: p([T, F, F, T], [F, F, T, F]) },
  { id: 12, name: 'ㄱ자 (L) 2', group: 'L', alg: "r' R2 U R' U R U2 R' U M'", pattern: p([T, T, F, F], [F, F, F, T]) },
  { id: 13, name: 'ㄱ자 (L) 3', group: 'L', alg: "r U' r' U' r U r' F' U F", pattern: p([F, T, T, F], [T, F, F, F]) },
  { id: 14, name: 'ㄱ자 (L) 4', group: 'L', alg: "R' F R U R' F' R F U' F'", pattern: p([F, F, T, T], [F, T, F, F]) },
  { id: 15, name: 'ㄱ자 (L) 5', group: 'L', alg: "F R' F' R U R U' R'", pattern: p([T, T, F, F], [F, F, T, F]) },
  { id: 16, name: 'ㄱ자 (L) 6', group: 'L', alg: "R U R' U' R' F R F'", pattern: p([F, F, T, T], [T, F, F, F]) },

  // --- P-shape ---
  { id: 17, name: 'P자 1', group: 'P', alg: "R U R' U R' F R F' U2 R' F R F'", pattern: p([T, T, F, F], [F, T, F, T]) },
  { id: 18, name: 'P자 2', group: 'P', alg: "F R' F' R2 r' U R U' R' U' M", pattern: p([F, T, T, F], [T, F, F, T]) },
  { id: 19, name: 'P자 3', group: 'P', alg: "R U R' U R U2 R2 U' R U' R' U2 R", pattern: p([T, F, F, T], [T, F, T, F]) },
  { id: 20, name: 'P자 4', group: 'P', alg: "r U R' U' r' R U R U' R'", pattern: p([F, T, T, F], [F, T, F, T]) },

  // --- W-shape ---
  { id: 21, name: 'W자 1', group: 'W', alg: "R U R' U' R' F R2 U R' U' F'", pattern: p([T, F, T, F], [T, T, F, F]) },
  { id: 22, name: 'W자 2', group: 'W', alg: "R' U' R U' R' U2 R2 U R' U R U2 R'", pattern: p([F, T, F, T], [F, F, T, T]) },

  // --- Fish shape ---
  { id: 23, name: '물고기 (Fish) 1', group: 'Fish', alg: "R U R' U' R U' R' F' U' F R U R'", pattern: p([T, F, F, T], [F, T, F, F]) },
  { id: 24, name: '물고기 (Fish) 2', group: 'Fish', alg: "R' U' R U R U R U' R' U' R2", pattern: p([F, T, T, F], [F, F, T, F]) },
  { id: 25, name: '물고기 (Fish) 3', group: 'Fish', alg: "F R U R' U' R U R' U' F'", pattern: p([T, F, T, F], [F, T, T, F]) },
  { id: 26, name: '물고기 (Fish) 4', group: 'Fish', alg: "R U2 R' U' R U R' U' R U' R'", pattern: p([F, T, F, T], [T, F, F, T]) },

  // --- Square / squeezy ---
  { id: 27, name: '네모 (Square) 1', group: 'Square', alg: "R U2 R2 F R F' R U2 R'", pattern: p([T, T, F, F], [F, T, T, F]) },
  { id: 28, name: '네모 (Square) 2', group: 'Square', alg: "r U R' U' r' R U R U' R'", pattern: p([F, F, T, T], [T, F, F, T]) },

  // --- C shape ---
  { id: 29, name: 'C자 1', group: 'C', alg: "r U R' U' r' F R2 U R' U' F'", pattern: p([T, F, F, F], [F, T, T, F]) },
  { id: 30, name: 'C자 2', group: 'C', alg: "R' U' R U' R' U R U R U' R' U' R2", pattern: p([F, F, F, T], [T, F, F, T]) },

  // --- Lightning bolt / Awkward ---
  { id: 31, name: '번개 (Lightning) 1', group: 'Lightning', alg: "R U R' U R' F R F' U2 R' F R F'", pattern: p([T, F, F, T], [F, F, T, T]) },
  { id: 32, name: '번개 (Lightning) 2', group: 'Lightning', alg: "S R U R' U' R' F R f'", pattern: p([F, T, T, F], [T, T, F, F]) },
  { id: 33, name: '번개 (Lightning) 3', group: 'Lightning', alg: "R U R' U' R' F R F'", pattern: p([T, F, T, F], [F, T, F, T]) },
  { id: 34, name: '번개 (Lightning) 4', group: 'Lightning', alg: "R U R2 U' R' F R U R U' F'", pattern: p([F, T, F, T], [T, F, T, F]) },

  // --- Awkward ---
  { id: 35, name: '어색한 모양 (Awkward) 1', group: 'Awkward', alg: "R U R' U R U' R' U' R' F R F'", pattern: p([T, T, T, F], [F, F, F, T]) },
  { id: 36, name: '어색한 모양 (Awkward) 2', group: 'Awkward', alg: "L' U' L U' L' U L U L F' L' F", pattern: p([T, F, T, T], [T, F, F, F]) },

  // --- Knight move / P variants ---
  { id: 37, name: '나이트무브 (P) 1', group: 'P', alg: "F R' F' R U R U' R'", pattern: p([T, T, F, T], [F, F, T, F]) },
  { id: 38, name: '나이트무브 (P) 2', group: 'P', alg: "R U R' U R U' R' U' R' F R F'", pattern: p([T, T, T, F], [T, F, F, F]) },

  // --- All edges oriented (OCLL, 7 cases: cross already formed) ---
  { id: 39, name: '수네 (Sune)', group: 'OCLL', alg: "R U R' U R U2 R'", pattern: p([T, T, T, T], [T, F, F, F]) },
  { id: 40, name: '안티수네 (Anti-Sune)', group: 'OCLL', alg: "R U2 R' U' R U' R'", pattern: p([T, T, T, T], [F, T, F, F]) },
  { id: 41, name: '파이 (Pi)', group: 'OCLL', alg: "R U2 R2 U' R2 U' R2 U2 R", pattern: p([T, T, T, T], [F, F, F, F]) },
  { id: 42, name: '헤드라이트 (H)', group: 'OCLL', alg: "R U R' U R U' R' U R U2 R'", pattern: p([T, T, T, T], [T, F, T, F]) },
  { id: 43, name: '유 (U)', group: 'OCLL', alg: "R2 D R' U2 R D' R' U2 R'", pattern: p([T, T, T, T], [F, T, T, F]) },
  { id: 44, name: '엘 (L)', group: 'OCLL', alg: "F R' F' r U R U' r'", pattern: p([T, T, T, T], [T, T, F, F]) },
  { id: 45, name: '티 (T)', group: 'OCLL', alg: "F R U R' U' F'", pattern: p([T, T, T, T], [F, T, T, F]) },

  // --- Corners already oriented, edges need flipping / mixed ---
  { id: 46, name: '체어 (Chair) 1', group: 'Mixed', alg: "R' U' F U R U' R' F' R", pattern: p([T, F, F, F], [T, T, F, F]) },
  { id: 47, name: '체어 (Chair) 2', group: 'Mixed', alg: "F' U' L' U L F", pattern: p([F, F, T, F], [F, F, T, T]) },
  { id: 48, name: '브로큰 (Broken) 1', group: 'Mixed', alg: "F R U R' U' F'", pattern: p([F, T, T, F], [F, F, F, F]) },
  { id: 49, name: '브로큰 (Broken) 2', group: 'Mixed', alg: "r U R' U R U2 r2 U' R U' R' U2 r", pattern: p([T, F, F, T], [F, F, F, F]) },
  { id: 50, name: '스팀 (Steam) 1', group: 'Mixed', alg: "r' U' R U' R' U2 r U R' U R", pattern: p([F, T, T, F], [F, F, F, T]) },
  { id: 51, name: '스팀 (Steam) 2', group: 'Mixed', alg: "F U R U' R' F'", pattern: p([T, F, F, T], [F, F, F, F]) },
  { id: 52, name: '팬 (Fan)', group: 'Mixed', alg: "R U R' U R U' B U' B' R'", pattern: p([F, T, F, T], [F, T, T, F]) },
  { id: 53, name: '앤티 팬 (Anti-Fan)', group: 'Mixed', alg: "l' U' L U R U' r' F", pattern: p([T, F, T, F], [T, F, F, T]) },
  { id: 54, name: '개구리 (Frog) 1', group: 'Mixed', alg: "r' U' r U' R' U R U' R' U R r' U r", pattern: p([F, F, T, T], [F, T, F, F]) },
  { id: 55, name: '개구리 (Frog) 2', group: 'Mixed', alg: "l U R' U' L' U R", pattern: p([T, T, F, F], [F, F, F, T]) },
  { id: 56, name: '토끼 (Bunny)', group: 'Mixed', alg: "r' U' R U' R' U R U' R' U2 r", pattern: p([F, F, F, T], [T, F, F, F]) },
  { id: 57, name: '거북이 (Turtle)', group: 'Mixed', alg: "r U R' U R U' R' U R U2 r'", pattern: p([T, F, F, F], [F, F, F, T]) },
];
