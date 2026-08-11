export type CharacterId =
  | 'blob-blue'
  | 'blob-pink'
  | 'blob-yellow'
  | 'blob-lime'
  | 'bot-yellow'
  | 'bot-mint'
  | 'bot-blue'
  | 'bot-pink'
  | 'cat-purple'
  | 'cat-red'
  | 'cat-orange'
  | 'cat-sky'
  | 'cube-purple'
  | 'cube-red'
  | 'cube-orange'
  | 'cube-sky'
  | 'bunny-pink'
  | 'bunny-mint'
  | 'bunny-lime'
  | 'bunny-sky'
  | 'bunny-yellow'
  | 'bunny-purple'
  | 'bunny-red'
  | 'bunny-orange';

// 12x13 pixel-art grids. '.' = transparent.
const BLOB_SPRITE = [
  '....BBBB....',
  '..BBBBBBBB..',
  '.BBBBBBBBBB.',
  'BBBBBBBBBBBB',
  'BBWKBBBBKWBB',
  'BBPBBBBBBPBB',
  'BBBKBBBBKBBB',
  'BBBBKKKKBBBB',
  'BBBBBBBBBBBB',
  '.BBBBBBBBBB.',
  '..DDDDDDDD..',
  '...DD..DD...',
  '...KK..KK...',
];

const BOT_SPRITE = [
  '.....BB.....',
  '.....KK.....',
  '...BBBBBB...',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBWKBBBBKWBB',
  'BBPBBBBBBPBB',
  'BBBBKKKKBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  '.BBBBBBBBBB.',
  '...DD..DD...',
  '...KK..KK...',
];

// blob body with pointy cat ears (pink inner-ear peek for extra cute)
const CAT_SPRITE = [
  '.PP......PP.',
  '.BB......BB.',
  '.BBBBBBBBBB.',
  'BBBBBBBBBBBB',
  'BBWKBBBBKWBB',
  'BBPBBBBBBPBB',
  'BBBKBBBBKBBB',
  'BBBBKKKKBBBB',
  'BBBBBBBBBBBB',
  '.BBBBBBBBBB.',
  '..DDDDDDDD..',
  '...DD..DD...',
  '...KK..KK...',
];

// flat-topped cube-headed friend
const CUBE_SPRITE = [
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBWKBBBBKWBB',
  'BBPBBBBBBPBB',
  'BBBKBBBBKBBB',
  'BBBBKKKKBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'DDDDDDDDDDDD',
  '...DD..DD...',
  '...KK..KK...',
];

// blob body with tall, close-set bunny ears
const BUNNY_SPRITE = [
  '...PP..PP...',
  '...BB..BB...',
  '..BBBBBBBB..',
  'BBBBBBBBBBBB',
  'BBWKBBBBKWBB',
  'BBPBBBBBBPBB',
  'BBBKBBBBKBBB',
  'BBBBKKKKBBBB',
  'BBBBBBBBBBBB',
  '.BBBBBBBBBB.',
  '..DDDDDDDD..',
  '...DD..DD...',
  '...KK..KK...',
];

const PALETTES: Record<string, Record<string, string>> = {
  blue: { B: '#6c8cff', D: '#3f5fe0', K: '#22243a', W: '#ffffff', P: '#ff9ec4' },
  pink: { B: '#ff7aa8', D: '#e8508a', K: '#3a1f2b', W: '#ffffff', P: '#ffe1ec' },
  yellow: { B: '#ffcb3d', D: '#e0a51a', K: '#3a2b0a', W: '#ffffff', P: '#fff2c2' },
  mint: { B: '#3ddc9a', D: '#1fae74', K: '#0a2b20', W: '#ffffff', P: '#d6fff0' },
  lime: { B: '#a3e635', D: '#7cc61a', K: '#243a0a', W: '#ffffff', P: '#eaffc2' },
  purple: { B: '#a78bfa', D: '#7c5cf0', K: '#241a3d', W: '#ffffff', P: '#f1e8ff' },
  red: { B: '#ff6b6b', D: '#e0403f', K: '#3a1414', W: '#ffffff', P: '#ffd6d6' },
  orange: { B: '#ff9f43', D: '#e8791a', K: '#3a2308', W: '#ffffff', P: '#ffe4c2' },
  sky: { B: '#5ec8f2', D: '#2ea3d6', K: '#0f2a38', W: '#ffffff', P: '#dff5ff' },
};

export interface MascotCharacter {
  id: CharacterId;
  name: string;
  sprite: string[];
  colors: Record<string, string>;
}

export const MASCOT_CHARACTERS: MascotCharacter[] = [
  { id: 'blob-blue', name: '블루', sprite: BLOB_SPRITE, colors: PALETTES.blue },
  { id: 'blob-pink', name: '핑크', sprite: BLOB_SPRITE, colors: PALETTES.pink },
  { id: 'blob-yellow', name: '노랑', sprite: BLOB_SPRITE, colors: PALETTES.yellow },
  { id: 'blob-lime', name: '연두', sprite: BLOB_SPRITE, colors: PALETTES.lime },
  { id: 'bot-yellow', name: '옐로 봇', sprite: BOT_SPRITE, colors: PALETTES.yellow },
  { id: 'bot-mint', name: '민트 봇', sprite: BOT_SPRITE, colors: PALETTES.mint },
  { id: 'bot-blue', name: '블루 봇', sprite: BOT_SPRITE, colors: PALETTES.blue },
  { id: 'bot-pink', name: '핑크 봇', sprite: BOT_SPRITE, colors: PALETTES.pink },
  { id: 'cat-purple', name: '라벤더 냥이', sprite: CAT_SPRITE, colors: PALETTES.purple },
  { id: 'cat-red', name: '레드 냥이', sprite: CAT_SPRITE, colors: PALETTES.red },
  { id: 'cat-orange', name: '오렌지 냥이', sprite: CAT_SPRITE, colors: PALETTES.orange },
  { id: 'cat-sky', name: '하늘 냥이', sprite: CAT_SPRITE, colors: PALETTES.sky },
  { id: 'cube-purple', name: '퍼플 큐브', sprite: CUBE_SPRITE, colors: PALETTES.purple },
  { id: 'cube-red', name: '레드 큐브', sprite: CUBE_SPRITE, colors: PALETTES.red },
  { id: 'cube-orange', name: '오렌지 큐브', sprite: CUBE_SPRITE, colors: PALETTES.orange },
  { id: 'cube-sky', name: '하늘 큐브', sprite: CUBE_SPRITE, colors: PALETTES.sky },
  { id: 'bunny-pink', name: '핑크 토끼', sprite: BUNNY_SPRITE, colors: PALETTES.pink },
  { id: 'bunny-mint', name: '민트 토끼', sprite: BUNNY_SPRITE, colors: PALETTES.mint },
  { id: 'bunny-lime', name: '연두 토끼', sprite: BUNNY_SPRITE, colors: PALETTES.lime },
  { id: 'bunny-sky', name: '하늘 토끼', sprite: BUNNY_SPRITE, colors: PALETTES.sky },
  { id: 'bunny-yellow', name: '노랑 토끼', sprite: BUNNY_SPRITE, colors: PALETTES.yellow },
  { id: 'bunny-purple', name: '라벤더 토끼', sprite: BUNNY_SPRITE, colors: PALETTES.purple },
  { id: 'bunny-red', name: '레드 토끼', sprite: BUNNY_SPRITE, colors: PALETTES.red },
  { id: 'bunny-orange', name: '오렌지 토끼', sprite: BUNNY_SPRITE, colors: PALETTES.orange },
];

export function getCharacter(id: CharacterId): MascotCharacter {
  return MASCOT_CHARACTERS.find((c) => c.id === id) ?? MASCOT_CHARACTERS[0];
}
