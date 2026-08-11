import {
  generateClockScramble,
  generateMegaminxScramble,
  generateNxNScramble,
  generatePyraminxScramble,
  generateSkewbScramble,
} from './scrambles';

export type EventId = '222' | '333' | '444' | '555' | '666' | '777' | '333oh' | '333bf' | 'pyram' | 'skewb' | 'minx' | 'clock';

export interface EventDef {
  id: EventId;
  name: string;
  /** WCA sighted events use a 15s inspection countdown; blindfolded events don't. */
  usesInspection: boolean;
  /** scramble notation is a well-established random-move generator for this event */
  wellEstablishedNotation: boolean;
  generateScramble: () => string;
}

export const EVENTS: EventDef[] = [
  { id: '333', name: '3x3x3', usesInspection: true, wellEstablishedNotation: true, generateScramble: () => generateNxNScramble(3, 20) },
  {
    id: '222',
    name: '2x2x2',
    usesInspection: true,
    wellEstablishedNotation: true,
    generateScramble: () => generateNxNScramble(2, 9, ['R', 'U', 'F']),
  },
  { id: '444', name: '4x4x4', usesInspection: true, wellEstablishedNotation: true, generateScramble: () => generateNxNScramble(4, 40) },
  { id: '555', name: '5x5x5', usesInspection: true, wellEstablishedNotation: true, generateScramble: () => generateNxNScramble(5, 60) },
  { id: '666', name: '6x6x6', usesInspection: true, wellEstablishedNotation: true, generateScramble: () => generateNxNScramble(6, 80) },
  { id: '777', name: '7x7x7', usesInspection: true, wellEstablishedNotation: true, generateScramble: () => generateNxNScramble(7, 100) },
  {
    id: '333oh',
    name: '3x3x3 한손',
    usesInspection: true,
    wellEstablishedNotation: true,
    generateScramble: () => generateNxNScramble(3, 20),
  },
  {
    id: '333bf',
    name: '3x3x3 블라인드',
    usesInspection: false,
    wellEstablishedNotation: true,
    generateScramble: () => generateNxNScramble(3, 20),
  },
  { id: 'pyram', name: '피라밍크스', usesInspection: true, wellEstablishedNotation: true, generateScramble: generatePyraminxScramble },
  { id: 'skewb', name: '스큐브', usesInspection: true, wellEstablishedNotation: true, generateScramble: generateSkewbScramble },
  { id: 'minx', name: '메가밍크스', usesInspection: true, wellEstablishedNotation: false, generateScramble: generateMegaminxScramble },
  { id: 'clock', name: 'Clock', usesInspection: true, wellEstablishedNotation: true, generateScramble: generateClockScramble },
];

export function getEvent(id: EventId): EventDef {
  return EVENTS.find((e) => e.id === id) ?? EVENTS[0];
}
