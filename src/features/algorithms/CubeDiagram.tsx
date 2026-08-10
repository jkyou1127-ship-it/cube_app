interface OllPattern {
  edges: [boolean, boolean, boolean, boolean]; // top(back), right, bottom(front), left
  corners: [boolean, boolean, boolean, boolean]; // TL, TR, BR, BL
}

const TABS = [
  { x: 22, y: 2, w: 96, h: 13, color: 'var(--sticker-back)' }, // top = Back
  { x: 125, y: 22, w: 13, h: 96, color: 'var(--sticker-right)' }, // right = Right
  { x: 22, y: 125, w: 96, h: 13, color: 'var(--sticker-front)' }, // bottom = Front
  { x: 2, y: 22, w: 13, h: 96, color: 'var(--sticker-left)' }, // left = Left
];

function SideTabs() {
  return (
    <>
      {TABS.map((t, i) => (
        <rect key={i} x={t.x} y={t.y} width={t.w} height={t.h} rx={2} fill={t.color} opacity={0.7} />
      ))}
    </>
  );
}

function Cell({ x, y, size, fill, marked }: { x: number; y: number; size: number; fill: string; marked?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={4} fill={fill} stroke="var(--border)" strokeWidth={1.5} />
      {marked && (
        <circle cx={x + size / 2} cy={y + size / 2} r={size * 0.16} fill="none" stroke="#14161a" strokeWidth={2.5} opacity={0.55} />
      )}
    </g>
  );
}

/** Top-down pictogram of the U layer for an OLL case: yellow = already oriented, gray = needs orienting. */
export function OllDiagram({ pattern }: { pattern: OllPattern }) {
  const GAP = 3;
  const SIZE = 30;
  const ORIGIN = 22;
  const pos = (r: number, c: number) => ({ x: ORIGIN + c * (SIZE + GAP), y: ORIGIN + r * (SIZE + GAP) });
  const Y = 'var(--sticker-yellow)';
  const G = 'var(--sticker-gray)';

  const [eTop, eRight, eBottom, eLeft] = pattern.edges;
  const [cTL, cTR, cBR, cBL] = pattern.corners;

  return (
    <svg viewBox="0 0 140 140" width="100%" height="100%" role="img" aria-label="OLL 패턴">
      <SideTabs />
      <Cell {...pos(0, 0)} size={SIZE} fill={cTL ? Y : G} />
      <Cell {...pos(0, 1)} size={SIZE} fill={eTop ? Y : G} />
      <Cell {...pos(0, 2)} size={SIZE} fill={cTR ? Y : G} />
      <Cell {...pos(1, 0)} size={SIZE} fill={eLeft ? Y : G} />
      <Cell {...pos(1, 1)} size={SIZE} fill={Y} />
      <Cell {...pos(1, 2)} size={SIZE} fill={eRight ? Y : G} />
      <Cell {...pos(2, 0)} size={SIZE} fill={cBL ? Y : G} />
      <Cell {...pos(2, 1)} size={SIZE} fill={eBottom ? Y : G} />
      <Cell {...pos(2, 2)} size={SIZE} fill={cBR ? Y : G} />
    </svg>
  );
}

/** Top-down pictogram of the U layer for a PLL case: all stickers are yellow (oriented); marked cells show which pieces are out of place. */
export function PllDiagram({
  edges,
  corners,
}: {
  edges: Array<'T' | 'R' | 'B' | 'L'>;
  corners: Array<'TL' | 'TR' | 'BR' | 'BL'>;
}) {
  const GAP = 3;
  const SIZE = 30;
  const ORIGIN = 22;
  const pos = (r: number, c: number) => ({ x: ORIGIN + c * (SIZE + GAP), y: ORIGIN + r * (SIZE + GAP) });
  const Y = 'var(--sticker-yellow)';

  const has = (arr: string[], v: string) => arr.includes(v);

  return (
    <svg viewBox="0 0 140 140" width="100%" height="100%" role="img" aria-label="PLL 패턴">
      <SideTabs />
      <Cell {...pos(0, 0)} size={SIZE} fill={Y} marked={has(corners, 'TL')} />
      <Cell {...pos(0, 1)} size={SIZE} fill={Y} marked={has(edges, 'T')} />
      <Cell {...pos(0, 2)} size={SIZE} fill={Y} marked={has(corners, 'TR')} />
      <Cell {...pos(1, 0)} size={SIZE} fill={Y} marked={has(edges, 'L')} />
      <Cell {...pos(1, 1)} size={SIZE} fill={Y} />
      <Cell {...pos(1, 2)} size={SIZE} fill={Y} marked={has(edges, 'R')} />
      <Cell {...pos(2, 0)} size={SIZE} fill={Y} marked={has(corners, 'BL')} />
      <Cell {...pos(2, 1)} size={SIZE} fill={Y} marked={has(edges, 'B')} />
      <Cell {...pos(2, 2)} size={SIZE} fill={Y} marked={has(corners, 'BR')} />
    </svg>
  );
}
