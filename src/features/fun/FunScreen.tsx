import { useEffect, useState } from 'react';
import { ReactionGame } from './ReactionGame';
import { TypingGame } from './TypingGame';
import { PixelCanvas } from './PixelCanvas';
import { BubbleWrap } from './BubbleWrap';
import { HackerTerminal } from './HackerTerminal';
import { GameOfLife } from './GameOfLife';
import { DvdScreensaver } from './DvdScreensaver';
import { KeyboardSound } from './KeyboardSound';
import { FogWipe } from './FogWipe';
import { AdminConsole } from './AdminConsole';

type Mode = 'reaction' | 'typing' | 'doodle' | 'bubble' | 'hacker' | 'life' | 'dvd' | 'keysound' | 'fog' | 'admin';

const BASE_MODES: { key: Mode; label: string }[] = [
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

interface Props {
  mascotCharacter?: string;
}

export function FunScreen({ mascotCharacter }: Props) {
  // the admin-only tab only shows up while the admin-crown mascot is equipped -
  // same rule as its matching secret theme
  const adminTabUnlocked = mascotCharacter === 'admin-crown';
  const modes = adminTabUnlocked ? [...BASE_MODES, { key: 'admin' as const, label: '🛡️ 관리자' }] : BASE_MODES;
  const [mode, setMode] = useState<Mode>('reaction');

  useEffect(() => {
    if (mode === 'admin' && !adminTabUnlocked) setMode('reaction');
  }, [mode, adminTabUnlocked]);

  return (
    <div className="screen">
      <div className="chip-tabs">
        {modes.map((m) => (
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
      {mode === 'admin' && adminTabUnlocked && <AdminConsole />}
    </div>
  );
}
