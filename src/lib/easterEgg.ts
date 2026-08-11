export type SecretId = 'rip-sq1' | 'gold-cube';

const STORAGE_KEY = 'cube_app.easterEgg.unlocked.v1';

function loadUnlocked(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function saveUnlocked(ids: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // localStorage unavailable - unlock just won't persist across reloads
  }
}

let unlocked = loadUnlocked();

export function isUnlocked(id: SecretId): boolean {
  return unlocked.has(id);
}

export function getUnlockedIds(): Set<string> {
  return new Set(unlocked);
}

function unlock(id: SecretId, onUnlock: () => void): void {
  if (unlocked.has(id)) return;
  unlocked = new Set(unlocked).add(id);
  saveUnlocked(unlocked);
  onUnlock();
}

// Egg 1 - "스퀘어-1 유령": pick the slate theme 10 times in a row, switch to the
// Clock event, then switch the theme to light.
type Egg1Stage = 'need-slate-x10' | 'need-clock' | 'need-light';
let egg1Stage: Egg1Stage = 'need-slate-x10';
let slateStreak = 0;

export function trackThemeChange(themeId: string, onUnlock: () => void): void {
  if (!isUnlocked('rip-sq1')) {
    if (egg1Stage === 'need-slate-x10') {
      if (themeId === 'slate') {
        slateStreak += 1;
        if (slateStreak >= 10) egg1Stage = 'need-clock';
      } else {
        slateStreak = 0;
      }
    } else if (egg1Stage === 'need-light' && themeId === 'light') {
      unlock('rip-sq1', onUnlock);
    }
  }
}

export function trackEventChange(eventId: string): void {
  if (!isUnlocked('rip-sq1') && egg1Stage === 'need-clock' && eventId === 'clock') {
    egg1Stage = 'need-light';
  }
}

// Egg 2 - "황금 큐브": tap the 🧊 logo in the header 10 times.
let logoClicks = 0;

export function trackLogoClick(onUnlock: () => void): void {
  if (isUnlocked('gold-cube')) return;
  logoClicks += 1;
  if (logoClicks >= 10) unlock('gold-cube', onUnlock);
}
