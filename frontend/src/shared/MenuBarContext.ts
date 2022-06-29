import { createContext } from "react";

export const MenuBarContext = createContext({
  // 기본값을 넣어둠 -> 적지 않아도 상관은 없다.
  isShown: false,
  setIsShown: (isShown: Boolean) => {},
});
