import { useEffect, useRef, useState } from 'react';
import { playPop } from '../../lib/popSound';

const COLS = 8;
const ROWS = 12;
const TOTAL = COLS * ROWS;

export function BubbleWrap() {
  const [popped, setPopped] = useState<boolean[]>(() => Array(TOTAL).fill(false));
  const drawingRef = useRef(false);

  useEffect(() => {
    function up() {
      drawingRef.current = false;
    }
    window.addEventListener('pointerup', up);
    return () => window.removeEventListener('pointerup', up);
  }, []);

  function pop(i: number) {
    setPopped((prev) => {
      if (prev[i]) return prev;
      const next = prev.slice();
      next[i] = true;
      return next;
    });
    playPop();
  }

  function refill() {
    setPopped(Array(TOTAL).fill(false));
  }

  const remaining = popped.filter((p) => !p).length;

  return (
    <div className="mini-game">
      <div className="row mini-game__stats">
        <span className="badge">남은 뽁뽁이 {remaining}</span>
        <button className="btn btn-sm" onClick={refill}>
          다시 채우기
        </button>
      </div>
      <div
        className="bubble-grid"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
        onPointerDown={() => {
          drawingRef.current = true;
        }}
      >
        {popped.map((p, i) => (
          <button
            key={i}
            className={`bubble${p ? ' bubble--popped' : ''}`}
            aria-label="뽁뽁이"
            onPointerDown={() => pop(i)}
            onPointerEnter={() => {
              if (drawingRef.current) pop(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}
