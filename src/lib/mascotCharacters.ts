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
  | 'bunny-orange'
  | 'rip-sq1'
  | 'gold-cube'
  | 'lazy-cat'
  | 'rainbow-cube'
  | 'lightning-cube';

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

// a cute little floating ghost - the friendly spirit of the departed Square-1 event
const GHOST_SPRITE = [
  '....BBBB....',
  '..BBBBBBBB..',
  '.BBBBBBBBBB.',
  'BBBBBBBBBBBB',
  'BBWKBBBBKWBB',
  'BBPBBBBBBPBB',
  'BBBKBBBBKBBB',
  'BBBBKKKKBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBB.BB.BBBB',
  'BBB...B...BB',
];

// cat body with closed, sleepy eyes and a small resting smile
const LAZY_CAT_SPRITE = [
  '.PP......PP.',
  '.BB......BB.',
  '.BBBBBBBBBB.',
  'BBBBBBBBBBBB',
  'BBBKBBBBKBBB',
  'BBPBBBBBBPBB',
  'BBBBBBBBBBBB',
  'BBBBBKKBBBBB',
  'BBBBBBBBBBBB',
  '.BBBBBBBBBB.',
  '..DDDDDDDD..',
  '...DD..DD...',
  '...KK..KK...',
];

// flat cube striped like a rainbow - for the completionist who's tried every event
const RAINBOW_CUBE_SPRITE = [
  'RRRRRRRRRRRR',
  'RRRRRRRRRRRR',
  'OOOOOOOOOOOO',
  'OOOOOOOOOOOO',
  'YYWKYYYYKWYY',
  'YYPYYYYYYPYY',
  'YYYKYYYYKYYY',
  'YYYYKKKKYYYY',
  'GGGGGGGGGGGG',
  'GGGGGGGGGGGG',
  'VVVVVVVVVVVV',
  '...DD..DD...',
  '...KK..KK...',
];

// flat cube with a small lightning-bolt spark on its forehead
const LIGHTNING_CUBE_SPRITE = [
  'BBBBBBBBBBBB',
  'BBBBBZBBBBBB',
  'BBBBZZBBBBBB',
  'BBBZZBBBBBBB',
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
  stone: { B: '#b8bcc4', D: '#8b909c', K: '#4a4e58', W: '#ffffff', P: '#d8dbe0' },
  ghost: { B: '#f1edff', D: '#d8cdfa', K: '#4a4460', W: '#ffffff', P: '#ffd1e8' },
  gold: { B: '#ffd54a', D: '#e0a800', K: '#4a3a08', W: '#ffffff', P: '#fff3c2' },
  sleepy: { B: '#c9c3e0', D: '#a89fc7', K: '#3a3550', W: '#ffffff', P: '#ffd6ea' },
  rainbow: { R: '#ff5c5c', O: '#ff9f43', Y: '#ffd93d', G: '#4ade80', V: '#a78bfa', D: '#8b7fc7', K: '#2a2a2a', W: '#ffffff', P: '#fff3b0' },
  volt: { B: '#22d3ee', D: '#0891b2', K: '#082f35', W: '#ffffff', P: '#d6fbff', Z: '#fde047' },
};

export interface MascotCharacter {
  id: CharacterId;
  name: string;
  sprite: string[];
  colors: Record<string, string>;
  /** hidden easter-egg character - excluded from the picker unless unlocked */
  secret?: boolean;
  /** character-exclusive speech-bubble lines - replaces the shared line pool when tapped */
  quotes?: string[];
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
  {
    id: 'rip-sq1',
    name: '스퀘어-1 유령',
    sprite: GHOST_SPRITE,
    colors: PALETTES.ghost,
    secret: true,
    quotes: ['나는... 원래 스퀘어-1이었어...', '(3,0) / (0,-3)... 아직도 그 스크램블이 잊혀지지 않아', '지워졌지만 잊혀지지는 않을게'],
  },
  {
    id: 'gold-cube',
    name: '황금 큐브',
    sprite: CUBE_SPRITE,
    colors: PALETTES.gold,
    secret: true,
    quotes: [
      '반짝반짝 빛나지? 부럽지?',
      '10번이나 눌러줘서 고마워!',
      '나는 특별해, 아무나 못 봐',
      '황금빛 정기를 받아라',
      '형광펜 아니고 순금이야',
    ],
  },
  {
    id: 'lazy-cat',
    name: '낮잠 냥이',
    sprite: LAZY_CAT_SPRITE,
    colors: PALETTES.sleepy,
    secret: true,
    quotes: ['졸려... 5분만 더 잘게...', '목표? 그냥 자자옹', '타이머 누르기 귀찮다옹', 'Zzz... 하암', '오늘은 그냥 쉬는 날이다옹'],
  },
  {
    id: 'rainbow-cube',
    name: '레인보우 큐브',
    sprite: RAINBOW_CUBE_SPRITE,
    colors: PALETTES.rainbow,
    secret: true,
    quotes: ['모든 종목을 다 해봤어!', '나는 올라운더 큐브다', '무지개처럼 다채롭지?', '12종목 정주행 완료!', '다음엔 뭘 해볼까?'],
  },
  {
    id: 'lightning-cube',
    name: '번개 큐브',
    sprite: LIGHTNING_CUBE_SPRITE,
    colors: PALETTES.volt,
    secret: true,
    quotes: ['번쩍! 빠르게 가자!', '검사 시간 따위 필요없어!', '속도가 생명이다', '찌릿찌릿하지?', '느린 건 못 참아'],
  },
];

export function getCharacter(id: CharacterId): MascotCharacter {
  return MASCOT_CHARACTERS.find((c) => c.id === id) ?? MASCOT_CHARACTERS[0];
}

export function visibleCharacters(unlockedSecretIds: Set<string>): MascotCharacter[] {
  return MASCOT_CHARACTERS.filter((c) => !c.secret || unlockedSecretIds.has(c.id));
}
