import { createContext, Dispatch, SetStateAction } from "react";

interface MenuBarContextValue {
  isShown: boolean;
  setIsShown: Dispatch<SetStateAction<boolean>>;
}

export const MenuBarContext = createContext<MenuBarContextValue | null>(null);
