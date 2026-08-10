import { useEffect, useState } from 'react';
import './App.css';
import type { Settings, Solve, TabKey } from './types';
import { loadSettings, loadSolves, makeSolveId, saveSettings, saveSolves } from './lib/storage';
import { bestOf, effectiveMs } from './lib/stats';
import { msUntilNextTime, registerServiceWorker, showLocalNotification, RETURN_REMINDER_THRESHOLD_MS } from './lib/notifications';
import { BottomNav } from './components/BottomNav';
import { Confetti } from './components/Confetti';
import { TimerScreen } from './features/timer/TimerScreen';
import { RecordsScreen } from './features/records/RecordsScreen';

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('timer');
  const [solves, setSolves] = useState<Solve[]>(() => loadSolves());
  const [settings, setSettings] = useState<Settings>(() => loadSettings());
  const [running, setRunning] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [showComeback, setShowComeback] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', settings.theme === 'dark' ? '#0c0d10' : '#ffffff');
  }, [settings.theme]);

  useEffect(() => {
    registerServiceWorker();
    const now = Date.now();
    if (settings.lastOpenedAt && now - settings.lastOpenedAt >= RETURN_REMINDER_THRESHOLD_MS) {
      setShowComeback(true);
    }
    updateSettings({ lastOpenedAt: now });
    // run once on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!settings.reminderEnabled) return;
    let timeoutId: number;
    const schedule = () => {
      const delay = msUntilNextTime(settings.reminderTime);
      timeoutId = window.setTimeout(() => {
        showLocalNotification('큐브 연습 시간이에요 🧊', {
          body: '오늘의 목표를 채우러 가볼까요?',
          tag: 'cube-practice-reminder',
        });
        schedule();
      }, delay);
    };
    schedule();
    return () => window.clearTimeout(timeoutId);
  }, [settings.reminderEnabled, settings.reminderTime]);

  function updateSettings(patch: Partial<Settings>) {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveSettings(next);
      return next;
    });
  }

  function addSolve(ms: number, scramble: string) {
    const previousBest = bestOf(solves);
    const solve: Solve = { id: makeSolveId(), ms, scramble, date: Date.now(), penalty: null };
    const next = [solve, ...solves];
    setSolves(next);
    saveSolves(next);

    const prevMs = previousBest ? effectiveMs(previousBest) : null;
    if (prevMs !== null && ms < prevMs) {
      setConfettiKey((k) => k + 1);
    }
  }

  function updateSolvePenalty(id: string, penalty: Solve['penalty']) {
    const next = solves.map((s) => (s.id === id ? { ...s, penalty } : s));
    setSolves(next);
    saveSolves(next);
  }

  function deleteSolve(id: string) {
    const next = solves.filter((s) => s.id !== id);
    setSolves(next);
    saveSolves(next);
  }

  function clearAllSolves() {
    setSolves([]);
    saveSolves([]);
  }

  const showChrome = !running;

  return (
    <>
      {showChrome && (
        <header className="app-header">
          <div className="app-header__title">🧊 큐브 연습</div>
          <div className="app-header__actions">
            <button
              className="icon-btn"
              aria-label="테마 전환"
              onClick={() => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
            >
              {settings.theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </header>
      )}

      <main className="app-main">
        {showComeback && (
          <div className="screen" style={{ paddingBottom: 0 }}>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <span style={{ fontSize: 22 }}>👋</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>다시 오신 것을 환영해요!</div>
                <div className="muted">오랜만이에요. 오늘 목표를 채우러 가볼까요?</div>
              </div>
              <button className="icon-btn" aria-label="닫기" onClick={() => setShowComeback(false)}>
                ✕
              </button>
            </div>
          </div>
        )}

        {activeTab === 'timer' && (
          <TimerScreen
            solves={solves}
            dailyGoal={settings.dailyGoal}
            onRunningChange={setRunning}
            onFinishSolve={addSolve}
          />
        )}
        {activeTab === 'records' && (
          <RecordsScreen
            solves={solves}
            settings={settings}
            onUpdateSettings={updateSettings}
            onUpdatePenalty={updateSolvePenalty}
            onDeleteSolve={deleteSolve}
            onClearAll={clearAllSolves}
          />
        )}
      </main>

      {showChrome && <BottomNav active={activeTab} onChange={setActiveTab} />}
      <Confetti triggerKey={confettiKey} />
    </>
  );
}
