import { Theme } from "@emotion/react";

// emotion.d.ts 파일에서 정의한 테마 인터페이스대로 구현하면 됨
export const theme: Theme = {
  color: {
    primary100: "#F0F0FC",
    primary300: "#D4D8FD",
    primary500: "#A4ACF2",
    primary700: "#7571DA",
    primary900: "#5651C3",
    white: "FFFFFF",
    black: "#333333",
    red700: "#FF7B7B",
    red900: "#FA6363",
  },
  padding: {
    container: "0 16px",
    button: "12px 16px",
  },
};
