import { GAMES, GAME_NAMES } from "./games";

interface Route {
  path: string;
  name: string;
  disable?: boolean;
}

export const NAV_ROUTES: Route[] = [
  {
    path: "/",
    name: "대시보드",
  },
  {
    path: "/pick",
    name: "추첨",
  },
  {
    path: "/groups",
    name: "명단 관리",
  },
  {
    path: "/presets",
    name: "프리셋 관리",
    disable: true,
  },
];

export const GAME_ROUTES: Route[] = GAMES.map((game, idx) => ({
  path: `/pick/${game}`,
  name: GAME_NAMES[idx],
  disable: game === "lottery" || game === "ladder" ? true : false,
}));
