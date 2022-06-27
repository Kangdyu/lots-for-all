import { css, Global, Theme, useTheme } from "@emotion/react";

export const globalStyles = (theme: Theme) => css`
  @font-face {
    font-family: "GmarketSans";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff")
      format("woff");
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: "GmarketSans";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
      format("woff");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "GmarketSans";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff")
      format("woff");
    font-weight: 700;
    font-style: normal;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: "GmarketSans", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
      Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-weight: 100;
  }

  body {
    position: relative;
    background-color: ${theme.color.primary100};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

function GlobalStyles() {
  const theme = useTheme();

  return <Global styles={globalStyles(theme)} />;
}

export default GlobalStyles;
