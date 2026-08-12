import { useEffect, useState } from 'react';
import { ModeSelect, type ModeOption } from '../../components/ModeSelect';
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
import { AdminArcade } from './AdminArcade';

type Mode = 'reaction' | 'typing' | 'doodle' | 'bubble' | 'hacker' | 'life' | 'dvd' | 'keysound' | 'fog' | 'admin' | 'admin-arcade';

const BASE_MODES: ModeOption<Mode>[] = [
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

const ADMIN_MODES: ModeOption<Mode>[] = [
  { key: 'admin', label: '🛡️ 관리자', dividerBefore: true },
  { key: 'admin-arcade', label: '👑 관리자 아케이드' },
];

interface Props {
  mascotCharacter?: string;
}

export function FunScreen({ mascotCharacter }: Props) {
  // the admin-only tabs only show up while the admin-crown mascot is equipped -
  // same rule as its matching secret theme
  const adminTabUnlocked = mascotCharacter === 'admin-crown';
  const modes = adminTabUnlocked ? [...BASE_MODES, ...ADMIN_MODES] : BASE_MODES;
  const [mode, setMode] = useState<Mode>('reaction');

  useEffect(() => {
    if ((mode === 'admin' || mode === 'admin-arcade') && !adminTabUnlocked) setMode('reaction');
  }, [mode, adminTabUnlocked]);

  return (
    <div className="screen">
      <ModeSelect value={mode} options={modes} onChange={setMode} />

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
      {mode === 'admin-arcade' && adminTabUnlocked && <AdminArcade />}
    </div>
  );
}
