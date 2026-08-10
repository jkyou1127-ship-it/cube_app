/**
 * Random-move 3x3 scramble generator using standard WCA move notation
 * (U D L R F B with ' and 2 modifiers).
 *
 * Note: official WCA competitions use a "random-state" scrambler backed by
 * a full cube solver (TNoodle) to guarantee a uniform distribution over
 * all reachable cube states. Reproducing that here would require a full
 * two-phase solver, which is out of scope. This generator instead uses
 * the classic random-move approach with the standard anti-redundancy
 * rules (no repeated face, no repeated axis back-to-back), which produces
 * well-mixed, valid scrambles in WCA notation - the same approach most
 * casual cubing apps use.
 */

const FACES = ['U', 'D', 'L', 'R', 'F', 'B'] as const;
type Face = (typeof FACES)[number];

const AXIS: Record<Face, number> = { U: 0, D: 0, L: 1, R: 1, F: 2, B: 2 };
const MODIFIERS = ['', "'", '2'];

export const DEFAULT_SCRAMBLE_LENGTH = 20;

export function generateScramble(length: number = DEFAULT_SCRAMBLE_LENGTH): string {
  const moves: string[] = [];
  let prevFace: Face | null = null;
  let prevAxis = -1;

  for (let i = 0; i < length; i++) {
    let face: Face;
    do {
      face = FACES[Math.floor(Math.random() * FACES.length)];
    } while (face === prevFace || AXIS[face] === prevAxis);

    const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    moves.push(face + modifier);
    prevFace = face;
    prevAxis = AXIS[face];
  }

  return moves.join(' ');
}
