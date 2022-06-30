export const GAMES = ["roulette", "racing", "lottery", "ladder"] as const;
export const GAME_NAMES = ["룰렛", "경마", "제비뽑기", "사다리타기"] as const;
export type GameRoute = typeof GAMES[number];
export type GameName = typeof GAME_NAMES[number];
