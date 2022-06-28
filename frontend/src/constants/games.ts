export const GAMES = ["lottery", "roulette", "racing"] as const;
export const GAME_NAMES = ["제비뽑기", "룰렛", "경마"] as const;
export type GameRoute = typeof GAMES[number];
export type GameName = typeof GAME_NAMES[number];
