const UNLOCK_KEY = 'cube_app.easterEgg.ripSq1.v1';

export function isRipSq1Unlocked(): boolean {
  try {
    return localStorage.getItem(UNLOCK_KEY) === '1';
  } catch {
    return false;
  }
}

function markUnlocked(): void {
  try {
    localStorage.setItem(UNLOCK_KEY, '1');
  } catch {
    // localStorage unavailable - unlock just won't persist across reloads
  }
}

// Secret unlock sequence for the "RIP 스퀘어-1" mascot: pick the slate theme
// 10 times in a row, switch to the Clock event, then switch the theme to light.
type Stage = 'need-slate-x10' | 'need-clock' | 'need-light';
let stage: Stage = 'need-slate-x10';
let slateStreak = 0;

export function trackThemeChange(themeId: string, onUnlock: () => void): void {
  if (isRipSq1Unlocked()) return;
  if (stage === 'need-slate-x10') {
    if (themeId === 'slate') {
      slateStreak += 1;
      if (slateStreak >= 10) stage = 'need-clock';
    } else {
      slateStreak = 0;
    }
    return;
  }
  if (stage === 'need-light' && themeId === 'light') {
    markUnlocked();
    onUnlock();
  }
}

export function trackEventChange(eventId: string): void {
  if (isRipSq1Unlocked()) return;
  if (stage === 'need-clock' && eventId === 'clock') {
    stage = 'need-light';
  }
}
