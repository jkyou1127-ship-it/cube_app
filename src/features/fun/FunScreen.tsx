import { useState } from 'react';
import { ReactionGame } from './ReactionGame';
import { TypingGame } from './TypingGame';
import { PixelCanvas } from './PixelCanvas';
import { BubbleWrap } from './BubbleWrap';
import { HackerTerminal } from './HackerTerminal';
import { GameOfLife } from './GameOfLife';
import { DvdScreensaver } from './DvdScreensaver';
import { KeyboardSound } from './KeyboardSound';
import { FogWipe } from './FogWipe';

type Mode = 'reaction' | 'typing' | 'doodle' | 'bubble' | 'hacker' | 'life' | 'dvd' | 'keysound' | 'fog';

const MODES: { key: Mode; label: string }[] = [
  { key: 'reaction', label: '⚡ 반응속도' },
  { key: 'typing', label: '⌨️ 타자연습' },
  { key: 'doodle', label: '🎨 낙서장' },
  { key: 'bubble', label: '🫧 뽁뽁이' },
  { key: 'hacker', label: '💻 해킹 터미널' },
  { key: 'life', label: '🌀 멍때리기' },
  { key: 'dvd', label: '📀 DVD' },
  { key: 'keysound', label: '🎹 타건감' },
  { key: 'fog', label: '💨 김서림' },
];

export function FunScreen() {
  const [mode, setMode] = useState<Mode>('reaction');

  return (
    <div className="screen">
      <div className="chip-tabs">
        {MODES.map((m) => (
          <button key={m.key} className={`chip-tab${mode === m.key ? ' active' : ''}`} onClick={() => setMode(m.key)}>
            {m.label}
          </button>
        ))}
      </div>

      {mode === 'reaction' && <ReactionGame />}
      {mode === 'typing' && <TypingGame />}
      {mode === 'doodle' && <PixelCanvas />}
      {mode === 'bubble' && <BubbleWrap />}
      {mode === 'hacker' && <HackerTerminal />}
      {mode === 'life' && <GameOfLife />}
      {mode === 'dvd' && <DvdScreensaver />}
      {mode === 'keysound' && <KeyboardSound />}
      {mode === 'fog' && <FogWipe />}
    </div>
  );
}
