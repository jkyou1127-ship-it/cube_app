/**
 * Scramble generators for WCA-recognized puzzle events.
 *
 * These are random-move generators using standard WCA notation, not true
 * random-state scramblers (real WCA competitions use TNoodle, which is out
 * of scope here - see the note in scramble.ts / the disclaimer shown for
 * the less common puzzles). For NxN cubes this produces well-mixed,
 * reasonably-sized scrambles. For Megaminx / Square-1 / Clock the exact
 * official notation is more intricate; these generators produce a
 * structurally-similar, best-effort approximation for practice purposes.
 */

const AXIS6: Record<string, number> = { U: 0, D: 0, L: 1, R: 1, F: 2, B: 2 };
const FACES6 = ['U', 'D', 'L', 'R', 'F', 'B'];
const MODIFIERS3 = ['', "'", '2'];

export function generateNxNScramble(n: number, length: number, faceSet: string[] = FACES6): string {
  const maxDepth = Math.max(1, Math.floor(n / 2));
  const moves: string[] = [];
  let prevFace: string | null = null;
  let prevAxis = -1;

  for (let i = 0; i < length; i++) {
    let face: string;
    do {
      face = faceSet[Math.floor(Math.random() * faceSet.length)];
    } while (face === prevFace || (AXIS6[face] !== undefined && AXIS6[face] === prevAxis));

    const depth = 1 + Math.floor(Math.random() * maxDepth);
    const modifier = MODIFIERS3[Math.floor(Math.random() * MODIFIERS3.length)];
    let notation: string;
    if (depth === 1) notation = face + modifier;
    else if (depth === 2) notation = face + 'w' + modifier;
    else notation = depth + face + 'w' + modifier;

    moves.push(notation);
    prevFace = face;
    prevAxis = AXIS6[face];
  }

  return moves.join(' ');
}

export function generatePyraminxScramble(): string {
  const faces = ['U', 'L', 'R', 'B'];
  const modifiers = ['', "'"];
  const moves: string[] = [];
  let prevFace: string | null = null;

  for (let i = 0; i < 11; i++) {
    let face: string;
    do {
      face = faces[Math.floor(Math.random() * faces.length)];
    } while (face === prevFace);
    moves.push(face + modifiers[Math.floor(Math.random() * 2)]);
    prevFace = face;
  }

  const tipMoves: string[] = [];
  for (const t of ['u', 'l', 'r', 'b']) {
    if (Math.random() < 0.7) {
      tipMoves.push(t + modifiers[Math.floor(Math.random() * 2)]);
    }
  }

  return [...moves, ...tipMoves].join(' ');
}

export function generateSkewbScramble(): string {
  const faces = ['R', 'U', 'L', 'B'];
  const modifiers = ['', "'"];
  const moves: string[] = [];
  let prevFace: string | null = null;

  for (let i = 0; i < 10; i++) {
    let face: string;
    do {
      face = faces[Math.floor(Math.random() * faces.length)];
    } while (face === prevFace);
    moves.push(face + modifiers[Math.floor(Math.random() * 2)]);
    prevFace = face;
  }

  return moves.join(' ');
}

export function generateMegaminxScramble(): string {
  const lines: string[] = [];
  for (let i = 0; i < 7; i++) {
    const tokens: string[] = [];
    for (let j = 0; j < 10; j++) {
      const face = Math.random() < 0.5 ? 'R' : 'D';
      const dir = Math.random() < 0.5 ? '++' : '--';
      tokens.push(face + dir);
    }
    const u = Math.random() < 0.5 ? 'U' : "U'";
    lines.push(`${tokens.join(' ')} ${u}`);
  }
  return lines.join('\n');
}

export function generateSquareOneScramble(): string {
  const rand = () => Math.floor(Math.random() * 12) - 5;
  const parts: string[] = [];
  for (let i = 0; i < 12; i++) {
    parts.push(`(${rand()},${rand()})`);
  }
  return parts.join(' / ');
}

export function generateClockScramble(): string {
  const pins = ['UR', 'DR', 'DL', 'UL', 'U', 'R', 'D', 'L', 'ALL'];
  const side = () => pins.map((p) => `${p}${Math.floor(Math.random() * 12)}${Math.random() < 0.5 ? '+' : '-'}`).join(' ');
  return `${side()}\ny2\n${side()}`;
}
