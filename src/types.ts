export type Penalty = null | '+2' | 'DNF';

export interface Solve {
  id: string;
  ms: number;
  scramble: string;
  date: number;
  penalty: Penalty;
}

export interface Settings {
  theme: 'light' | 'dark';
  dailyGoal: number;
  reminderEnabled: boolean;
  reminderTime: string;
  lastOpenedAt: number | null;
  inspectionEnabled: boolean;
}

export type TabKey = 'timer' | 'records' | 'fun';
