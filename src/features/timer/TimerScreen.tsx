import { useEffect, useRef, useState } from 'react';
import type { Penalty, Solve } from '../../types';
import { generateScramble } from '../../lib/scramble';
import { formatTime } from '../../lib/time';
import { randomQuote } from '../../lib/quotes';
import { computeStreak, todayCount as computeTodayCount } from '../../lib/stats';
import { GanTimerConnection } from '../../lib/ganTimer';
import { PixelMascot } from '../../components/PixelMascot';

type Phase = 'idle' | 'armed' | 'inspecting' | 'inspecting-armed' | 'running';

const INSPECTION_SECONDS = 15;
const INSPECTION_LIMIT_SECONDS = 17;

interface Props {
  solves: Solve[];
  dailyGoal: number;
  inspectionEnabled: boolean;
  onRunningChange: (running: boolean) => void;
  onFinishSolve: (ms: number, scramble: string, penalty: Penalty) => void;
}

const bluetoothSupported = typeof navigator !== 'undefined' && 'bluetooth' in navigator;

export function TimerScreen({ solves, dailyGoal, inspectionEnabled, onRunningChange, onFinishSolve }: Props) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [scramble, setScramble] = useState(() => generateScramble());
  const [elapsedMs, setElapsedMs] = useState(0);
  const [inspectMs, setInspectMs] = useState(0);
  const [lastResultMs, setLastResultMs] = useState<number | null>(null);
  const [resultPending, setResultPending] = useState(false);
  const [quote, setQuote] = useState(() => randomQuote());
  const [btConnected, setBtConnected] = useState(false);
  const [btBusy, setBtBusy] = useState(false);
  const [btError, setBtError] = useState<string | null>(null);

  const startTimeRef = useRef(0);
  const inspectStartRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pendingPenaltyRef = useRef<Penalty>(null);
  const phaseRef = useRef<Phase>(phase);
  const resultPendingRef = useRef(false);
  const ganRef = useRef<GanTimerConnection | null>(null);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    resultPendingRef.current = resultPending;
  }, [resultPending]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      ganRef.current?.disconnect();
    };
  }, []);

  function tickSolve() {
    setElapsedMs(performance.now() - startTimeRef.current);
    rafRef.current = requestAnimationFrame(tickSolve);
  }

  function tickInspect() {
    const elapsed = performance.now() - inspectStartRef.current;
    setInspectMs(elapsed);
    if (elapsed >= INSPECTION_LIMIT_SECONDS * 1000) {
      finish(0, 'DNF');
      return;
    }
    rafRef.current = requestAnimationFrame(tickInspect);
  }

  function computeInspectionPenalty(ms: number): Penalty {
    const sec = ms / 1000;
    if (sec >= INSPECTION_LIMIT_SECONDS) return 'DNF';
    if (sec >= INSPECTION_SECONDS) return '+2';
    return null;
  }

  function startInspection() {
    cancelAnimationFrame(rafRef.current);
    onRunningChange(true);
    setPhase('inspecting');
    inspectStartRef.current = performance.now();
    setInspectMs(0);
    rafRef.current = requestAnimationFrame(tickInspect);
  }

  function startTimer(penalty: Penalty) {
    cancelAnimationFrame(rafRef.current);
    onRunningChange(true);
    pendingPenaltyRef.current = penalty;
    setPhase('running');
    startTimeRef.current = performance.now();
    setElapsedMs(0);
    rafRef.current = requestAnimationFrame(tickSolve);
  }

  function stopTimer() {
    cancelAnimationFrame(rafRef.current);
    const finalMs = Math.round(performance.now() - startTimeRef.current);
    finish(finalMs, pendingPenaltyRef.current);
  }

  function finish(ms: number, penalty: Penalty) {
    cancelAnimationFrame(rafRef.current);
    setPhase('idle');
    onRunningChange(false);
    setLastResultMs(ms);
    setResultPending(true);
    onFinishSolve(ms, scramble, penalty);
    setScramble(generateScramble());
    setQuote(randomQuote());
    pendingPenaltyRef.current = null;
  }

  function handlePointerDown(e: React.PointerEvent) {
    e.preventDefault();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    if (phase === 'running') {
      stopTimer();
    } else if (phase === 'idle') {
      setResultPending(false);
      setPhase('armed');
    } else if (phase === 'inspecting') {
      setPhase('inspecting-armed');
    }
  }

  function handlePointerUp() {
    if (phase === 'armed') {
      if (inspectionEnabled) {
        startInspection();
      } else {
        startTimer(null);
      }
    } else if (phase === 'inspecting-armed') {
      startTimer(computeInspectionPenalty(inspectMs));
    }
  }

  function handlePointerCancel() {
    if (phase === 'armed') setPhase('idle');
    else if (phase === 'inspecting-armed') setPhase('inspecting');
  }

  async function handleBluetoothConnect(e: React.SyntheticEvent) {
    e.stopPropagation();
    setBtError(null);
    setBtBusy(true);
    try {
      if (!ganRef.current) ganRef.current = new GanTimerConnection();
      await ganRef.current.connect({
        onConnectionChange: (connected) => setBtConnected(connected),
        onButton: () => {
          // GAN 타이머의 로고/기능 버튼: 결과가 표시 중이면 먼저 0.00으로 리셋하고,
          // 이미 리셋된 상태에서 다시 누르면 그때 검사 시간을 시작한다.
          const p = phaseRef.current;
          if (p !== 'idle') return;
          if (resultPendingRef.current) {
            setResultPending(false);
            setLastResultMs(0);
            return;
          }
          startInspection();
        },
      });
      setBtConnected(true);
    } catch (err) {
      setBtError(err instanceof Error ? err.message : '연결에 실패했어요.');
    } finally {
      setBtBusy(false);
    }
  }

  function handleBluetoothDisconnect(e: React.SyntheticEvent) {
    e.stopPropagation();
    ganRef.current?.disconnect();
    setBtConnected(false);
  }

  const chromeHidden = phase === 'running' || phase === 'inspecting' || phase === 'inspecting-armed';
  const showTop = phase !== 'running';
  const showBottom = phase === 'idle' || phase === 'armed';
  const inspecting = phase === 'inspecting' || phase === 'inspecting-armed';
  const inspectRemaining = INSPECTION_SECONDS - inspectMs / 1000;

  const displayMs = phase === 'running' ? elapsedMs : lastResultMs ?? 0;
  const streak = computeStreak(solves, dailyGoal);
  const today = computeTodayCount(solves);

  return (
    <div
      className={`timer-screen ${chromeHidden ? 'timer-screen--running' : 'timer-screen--idle'}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerCancel}
    >
      {showTop && (
        <div className="timer-top">
          <div className="scramble-chip">
            <div className="scramble-text mono">{scramble}</div>
          </div>
          <div className="timer-goal-row">
            {inspecting ? (
              <span className="badge badge-accent">🔍 검사 중</span>
            ) : (
              <>
                {streak > 0 && <span className="badge badge-accent">🔥 {streak}일 연속</span>}
                <span className="badge">
                  오늘 {today}/{dailyGoal}
                </span>
                {bluetoothSupported && (
                  <button
                    className={`badge bt-badge${btConnected ? ' badge-accent' : ''}`}
                    onClick={btConnected ? handleBluetoothDisconnect : handleBluetoothConnect}
                    onPointerDown={(e) => e.stopPropagation()}
                    disabled={btBusy}
                  >
                    {btBusy ? '연결 중...' : btConnected ? '🔵 GAN 타이머 연결됨' : '📶 GAN 타이머 연결'}
                  </button>
                )}
              </>
            )}
          </div>
          {btError && (
            <p className="faint" style={{ marginTop: 8 }}>
              {btError}
            </p>
          )}
        </div>
      )}

      {showBottom && (
        <div className="timer-mascot-slot">
          <PixelMascot />
        </div>
      )}

      {inspecting ? (
        <div className={`timer-display mono ${inspectRemaining <= 0 ? 'inspect-over' : inspectRemaining <= 3 ? 'inspect-warn' : ''}`}>
          {inspectRemaining > 0 ? Math.ceil(inspectRemaining) : '+2'}
        </div>
      ) : (
        <div className={`timer-display mono ${phase}`}>{formatTime(displayMs)}</div>
      )}

      {showBottom && (
        <div className="timer-bottom">
          <p className="timer-hint">
            {phase === 'armed'
              ? inspectionEnabled
                ? '손을 떼면 검사가 시작돼요'
                : '손을 떼면 시작해요'
              : '화면을 터치했다가 손을 떼면 시작돼요'}
          </p>
          <p className="timer-quote">{quote}</p>
        </div>
      )}
    </div>
  );
}
