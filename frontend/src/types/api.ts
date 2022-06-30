export interface ApiResponse<T> {
  result: T;
  message: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  imageUrl: string;
}

export enum GameType {
  "Lottery" = 1,
  "Ladder",
  "Roulette",
  "Racing",
}

export interface GameHistory {
  // "History" 는 예약됨
  type: GameType; // 제비뽑기
  id: number; // 기록 고유 번호
  title: string; // 기록 이름
  number: number; // 인원 수
  content: string[]; // 제비뽑기 전체 명단
  result: string[]; // 뽑힌 명단
  createdAt: Date;
}
export interface Group {
  id: number;
  title: string;
  members: string[];
}
