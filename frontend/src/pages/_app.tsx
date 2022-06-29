import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import GlobalStyles from "styles/GlobalStyles";
import { theme } from "styles/theme";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

function MyApp({ Component, pageProps }: AppProps) {
  // TODO: token 확인 후 ...
  // if (localStorage.getItem("token")) { // 이미 localStorage 에 token 이 있으면

  // }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
