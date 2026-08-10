export type CharacterId =
  | 'blob-blue'
  | 'blob-pink'
  | 'blob-yellow'
  | 'blob-lime'
  | 'bot-yellow'
  | 'bot-mint'
  | 'bot-blue'
  | 'bot-pink';

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

const PALETTES: Record<string, Record<string, string>> = {
  blue: { B: '#6c8cff', D: '#3f5fe0', K: '#22243a', W: '#ffffff', P: '#ff9ec4' },
  pink: { B: '#ff7aa8', D: '#e8508a', K: '#3a1f2b', W: '#ffffff', P: '#ffe1ec' },
  yellow: { B: '#ffcb3d', D: '#e0a51a', K: '#3a2b0a', W: '#ffffff', P: '#fff2c2' },
  mint: { B: '#3ddc9a', D: '#1fae74', K: '#0a2b20', W: '#ffffff', P: '#d6fff0' },
  lime: { B: '#a3e635', D: '#7cc61a', K: '#243a0a', W: '#ffffff', P: '#eaffc2' },
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
];

export function getCharacter(id: CharacterId): MascotCharacter {
  return MASCOT_CHARACTERS.find((c) => c.id === id) ?? MASCOT_CHARACTERS[0];
}
