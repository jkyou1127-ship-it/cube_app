import { useEffect, useRef, useState } from 'react';
import type { Solve } from '../../types';
import { generateScramble } from '../../lib/scramble';
import { formatTime } from '../../lib/time';
import { randomQuote } from '../../lib/quotes';
import { computeStreak, todayCount as computeTodayCount } from '../../lib/stats';

type Phase = 'idle' | 'armed' | 'running';

interface Props {
  solves: Solve[];
  dailyGoal: number;
  onRunningChange: (running: boolean) => void;
  onFinishSolve: (ms: number, scramble: string) => void;
}

export function TimerScreen({ solves, dailyGoal, onRunningChange, onFinishSolve }: Props) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [scramble, setScramble] = useState(() => generateScramble());
  const [elapsedMs, setElapsedMs] = useState(0);
  const [lastResultMs, setLastResultMs] = useState<number | null>(null);
  const [quote, setQuote] = useState(() => randomQuote());

  const startTimeRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function tick() {
    setElapsedMs(performance.now() - startTimeRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }

  function startTimer() {
    setPhase('running');
    onRunningChange(true);
    startTimeRef.current = performance.now();
    setElapsedMs(0);
    rafRef.current = requestAnimationFrame(tick);
  }

  function stopTimer() {
    cancelAnimationFrame(rafRef.current);
    const finalMs = Math.round(performance.now() - startTimeRef.current);
    setPhase('idle');
    onRunningChange(false);
    setLastResultMs(finalMs);
    onFinishSolve(finalMs, scramble);
    setScramble(generateScramble());
    setQuote(randomQuote());
  }

  function handlePointerDown(e: React.PointerEvent) {
    e.preventDefault();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    if (phase === 'running') {
      stopTimer();
    } else if (phase === 'idle') {
      setPhase('armed');
    }
  }

  function handlePointerUp() {
    if (phase === 'armed') {
      startTimer();
    }
  }

  function handlePointerCancel() {
    if (phase === 'armed') setPhase('idle');
  }

  const displayMs = phase === 'running' ? elapsedMs : lastResultMs ?? 0;
  const streak = computeStreak(solves, dailyGoal);
  const today = computeTodayCount(solves);

  return (
    <div
      className={`timer-screen ${phase === 'running' ? 'timer-screen--running' : 'timer-screen--idle'}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerCancel}
    >
      {phase !== 'running' && (
        <div className="timer-top">
          <div className="scramble-text mono">{scramble}</div>
          <div className="timer-goal-row">
            {streak > 0 && <span className="badge badge-accent">🔥 {streak}일 연속</span>}
            <span className="badge">
              오늘 {today}/{dailyGoal}
            </span>
          </div>
        </div>
      )}

      <div className={`timer-display mono ${phase}`}>{formatTime(displayMs)}</div>

      {phase !== 'running' && (
        <div className="timer-bottom">
          <p className="timer-hint">
            {phase === 'armed' ? '손을 떼면 시작해요' : '화면을 터치했다가 손을 떼면 타이머가 시작돼요'}
          </p>
          <p className="timer-quote">{quote}</p>
        </div>
      )}
    </div>
  );
}
