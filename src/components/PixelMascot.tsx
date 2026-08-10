import { useEffect, useRef, useState } from 'react';

// 12x13 pixel-art sprite. '.' = transparent.
const SPRITE = [
  '....BBBB....',
  '..BBBBBBBB..',
  '.BBBBBBBBBB.',
  'BBBBBBBBBBBB',
  'BBWKBBBBKWBB',
  'BBPBBBBBBPBB',
  'BBBKBBBBKBBB',
  'BBBBKKKKBBBB',
  'BBBBBBBBBBBB',
  '.BBBBBBBBBB.',
  '..DDDDDDDD..',
  '...DD..DD...',
  '...KK..KK...',
];

const COLORS: Record<string, string> = {
  B: '#6c8cff',
  D: '#3f5fe0',
  K: '#22243a',
  W: '#ffffff',
  P: '#ff9ec4',
};

const LINES = [
  '화이팅!',
  '오늘도 큐브데이 🧊',
  '심심하면 놀이 탭도 가봐요',
  '잘하고 있어요!',
  '한 판 더?',
  '손가락 스트레칭 잊지 마요',
  '눈 깜빡할 새 지나가요',
];

export function PixelMascot() {
  const [bubble, setBubble] = useState<string | null>(null);
  const timeoutRef = useRef<number>(0);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  function handleTap(e: React.SyntheticEvent) {
    e.stopPropagation();
    const line = LINES[Math.floor(Math.random() * LINES.length)];
    setBubble(line);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setBubble(null), 2400);
  }

  const cell = 6;
  const w = SPRITE[0].length * cell;
  const h = SPRITE.length * cell;

  return (
    <div
      className="mascot"
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      onClick={handleTap}
      role="button"
      aria-label="마스코트"
    >
      {bubble && <div className="mascot__bubble">{bubble}</div>}
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="mascot__sprite">
        {SPRITE.map((row, r) =>
          row.split('').map((code, c) => {
            if (code === '.') return null;
            return <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill={COLORS[code]} />;
          })
        )}
      </svg>
    </div>
  );
}
