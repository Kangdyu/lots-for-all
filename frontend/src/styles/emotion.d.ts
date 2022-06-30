import "@emotion/react";

declare module "@emotion/react" {
  // 프로젝트 전역으로 사용할 테마 관련 아무거나 넣으면 됨
  export interface Theme {
    color: {
      primary100: string;
      primary300: string;
      primary500: string;
      primary700: string;
      primary900: string;
      white: string;
      black: string;
      red500: string;
      red700: string;
      red900: string;
    };
    padding: {
      container: string;
      button: string;
    };
  }
}
