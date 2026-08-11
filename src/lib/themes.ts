export type ThemeId =
  | 'light'
  | 'dark'
  | 'ocean'
  | 'mint'
  | 'lavender'
  | 'peach'
  | 'forest'
  | 'sunset'
  | 'rose'
  | 'midnight'
  | 'lemon'
  | 'gray'
  | 'wine'
  | 'teal'
  | 'charcoal'
  | 'coral'
  | 'sky'
  | 'olive'
  | 'plum'
  | 'slate';

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
  { id: 'light', name: '라이트', swatch: '#ffffff', bg: '#f4f5f7', dark: false },
  { id: 'dark', name: '다크', swatch: '#000000', bg: '#0a0b0d', dark: true },
  { id: 'ocean', name: '오션', swatch: '#0e7cc4', bg: '#eef4fb', dark: false },
  { id: 'mint', name: '민트', swatch: '#12b886', bg: '#eefaf5', dark: false },
  { id: 'lavender', name: '라벤더', swatch: '#8452d9', bg: '#f5f1fc', dark: false },
  { id: 'peach', name: '피치', swatch: '#f2703f', bg: '#fdf2ee', dark: false },
  { id: 'forest', name: '포레스트', swatch: '#33c07a', bg: '#0a120d', dark: true },
  { id: 'sunset', name: '선셋', swatch: '#e8890c', bg: '#fff6ea', dark: false },
  { id: 'rose', name: '로즈', swatch: '#e0447a', bg: '#fdf1f4', dark: false },
  { id: 'midnight', name: '미드나잇', swatch: '#7c8cff', bg: '#070b18', dark: true },
  { id: 'lemon', name: '레몬', swatch: '#d4b106', bg: '#fdfbe8', dark: false },
  { id: 'gray', name: '그레이', swatch: '#52525b', bg: '#f4f4f5', dark: false },
  { id: 'wine', name: '와인', swatch: '#d94858', bg: '#150708', dark: true },
  { id: 'teal', name: '터콰이즈', swatch: '#0d9488', bg: '#eafbfa', dark: false },
  { id: 'charcoal', name: '차콜', swatch: '#b0b3ba', bg: '#1a1b1e', dark: true },
  { id: 'coral', name: '코랄', swatch: '#ff6b5b', bg: '#fff3f1', dark: false },
  { id: 'sky', name: '스카이', swatch: '#2f9bf0', bg: '#eaf6ff', dark: false },
  { id: 'olive', name: '올리브', swatch: '#7c8c1e', bg: '#f8faec', dark: false },
  { id: 'plum', name: '플럼', swatch: '#c76dd6', bg: '#180a1c', dark: true },
  { id: 'slate', name: '슬레이트', swatch: '#64748b', bg: '#0f172a', dark: true },
];

export function getTheme(id: ThemeId): ThemeDef {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
