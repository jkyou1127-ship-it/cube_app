import type { Penalty, Settings, Solve } from '../../types';
import { average, bestOf, computeStreak, effectiveMs, sessionMean, todayCount } from '../../lib/stats';
import { formatTime } from '../../lib/time';
import { isNotificationSupported, requestNotificationPermission } from '../../lib/notifications';
import { SolveRow } from './SolveRow';

interface Props {
  solves: Solve[];
  settings: Settings;
  onUpdateSettings: (patch: Partial<Settings>) => void;
  onUpdatePenalty: (id: string, penalty: Penalty) => void;
  onDeleteSolve: (id: string) => void;
  onClearAll: () => void;
}

function fmt(v: number | 'DNF' | null): string {
  if (v === null) return '-';
  if (v === 'DNF') return 'DNF';
  return formatTime(v);
}

export function RecordsScreen({ solves, settings, onUpdateSettings, onUpdatePenalty, onDeleteSolve, onClearAll }: Props) {
  const best = bestOf(solves);
  const ao5 = average(solves, 5);
  const ao12 = average(solves, 12);
  const mean = sessionMean(solves);
  const streak = computeStreak(solves, settings.dailyGoal);
  const today = todayCount(solves);
  const goalProgress = settings.dailyGoal > 0 ? Math.min(1, today / settings.dailyGoal) : 0;

  async function handleReminderToggle(checked: boolean) {
    if (!checked) {
      onUpdateSettings({ reminderEnabled: false });
      return;
    }
    if (!isNotificationSupported()) {
      window.alert('이 브라우저는 알림을 지원하지 않아요.');
      return;
    }
    const perm = await requestNotificationPermission();
    if (perm === 'granted') {
      onUpdateSettings({ reminderEnabled: true });
    } else {
      window.alert('알림 권한이 필요해요. 브라우저 설정에서 허용해주세요.');
    }
  }

  function handleClearAll() {
    if (solves.length === 0) return;
    if (window.confirm('모든 솔브 기록을 삭제할까요? 이 작업은 되돌릴 수 없어요.')) {
      onClearAll();
    }
  }

  return (
    <div className="screen">
      <div className="stat-grid">
        <div className="stat-tile">
          <div className="stat-tile__label">PB</div>
          <div className="stat-tile__value mono">{best ? fmt(effectiveMs(best)) : '-'}</div>
        </div>
        <div className="stat-tile">
          <div className="stat-tile__label">Ao5</div>
          <div className="stat-tile__value mono">{fmt(ao5)}</div>
        </div>
        <div className="stat-tile">
          <div className="stat-tile__label">Ao12</div>
          <div className="stat-tile__value mono">{fmt(ao12)}</div>
        </div>
        <div className="stat-tile">
          <div className="stat-tile__label">평균</div>
          <div className="stat-tile__value mono">{fmt(mean)}</div>
        </div>
        <div className="stat-tile">
          <div className="stat-tile__label">횟수</div>
          <div className="stat-tile__value mono">{solves.length}</div>
        </div>
      </div>

      <div className="section-title">목표 &amp; 스트릭</div>
      <div className="card">
        <div className="row">
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>
              {streak > 0 ? `🔥 ${streak}일 연속 달성` : '오늘부터 스트릭을 시작해보세요'}
            </div>
            <div className="muted">
              오늘 {today} / {settings.dailyGoal}회
            </div>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-bar__fill" style={{ width: `${goalProgress * 100}%` }} />
        </div>
        <div className="row" style={{ marginTop: 14 }}>
          <span className="muted">하루 목표 솔빙 횟수</span>
          <div className="stepper">
            <button
              className="icon-btn"
              onClick={() => onUpdateSettings({ dailyGoal: Math.max(1, settings.dailyGoal - 1) })}
            >
              −
            </button>
            <span className="mono stepper__value">{settings.dailyGoal}</span>
            <button className="icon-btn" onClick={() => onUpdateSettings({ dailyGoal: settings.dailyGoal + 1 })}>
              +
            </button>
          </div>
        </div>
      </div>

      <div className="section-title">알림</div>
      <div className="card">
        <div className="row">
          <div>
            <div style={{ fontWeight: 600 }}>연습 리마인드</div>
            <div className="faint">앱이 열려있을 때만 동작해요</div>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.reminderEnabled}
              onChange={(e) => handleReminderToggle(e.target.checked)}
            />
            <span className="switch-track" />
          </label>
        </div>
        {settings.reminderEnabled && (
          <div className="row" style={{ marginTop: 12 }}>
            <span className="muted">알림 시간</span>
            <input
              type="time"
              className="time-input"
              style={{ width: 120 }}
              value={settings.reminderTime}
              onChange={(e) => onUpdateSettings({ reminderTime: e.target.value })}
            />
          </div>
        )}
      </div>

      <div className="section-title">솔브 기록</div>
      {solves.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: 32, marginBottom: 8 }}>🧊</div>
          <p>아직 기록이 없어요. 타이머 탭에서 첫 솔브를 시작해보세요!</p>
        </div>
      ) : (
        <>
          <div className="solve-list">
            {solves.map((s, i) => (
              <SolveRow
                key={s.id}
                index={solves.length - i}
                solve={s}
                onUpdatePenalty={onUpdatePenalty}
                onDelete={onDeleteSolve}
              />
            ))}
          </div>
          <button className="btn btn-danger btn-block" style={{ marginTop: 16 }} onClick={handleClearAll}>
            전체 기록 삭제
          </button>
        </>
      )}
    </div>
  );
}
