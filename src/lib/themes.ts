export type ThemeId = 'light' | 'dark' | 'ocean' | 'mint' | 'lavender' | 'peach' | 'forest' | 'sunset' | 'rose' | 'midnight';

export interface ThemeDef {
  id: ThemeId;
  name: string;
  /** representative accent color, used for the picker's little dot */
  swatch: string;
  /** actual page background color, used for the browser theme-color meta tag */
  bg: string;
  dark: boolean;
}

export const THEMES: ThemeDef[] = [
  { id: 'light', name: '라이트', swatch: '#3b6cf6', bg: '#f4f5f7', dark: false },
  { id: 'dark', name: '다크', swatch: '#5b8bff', bg: '#0a0b0d', dark: true },
  { id: 'ocean', name: '오션', swatch: '#0e7cc4', bg: '#eef4fb', dark: false },
  { id: 'mint', name: '민트', swatch: '#12b886', bg: '#eefaf5', dark: false },
  { id: 'lavender', name: '라벤더', swatch: '#8452d9', bg: '#f5f1fc', dark: false },
  { id: 'peach', name: '피치', swatch: '#f2703f', bg: '#fdf2ee', dark: false },
  { id: 'forest', name: '포레스트', swatch: '#33c07a', bg: '#0a120d', dark: true },
  { id: 'sunset', name: '선셋', swatch: '#e8890c', bg: '#fff6ea', dark: false },
  { id: 'rose', name: '로즈', swatch: '#e0447a', bg: '#fdf1f4', dark: false },
  { id: 'midnight', name: '미드나잇', swatch: '#7c8cff', bg: '#070b18', dark: true },
];

export function getTheme(id: ThemeId): ThemeDef {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
