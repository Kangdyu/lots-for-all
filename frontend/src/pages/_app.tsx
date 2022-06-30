import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import GlobalStyles from "styles/GlobalStyles";
import { theme } from "styles/theme";
import axios from "axios";
import { SERVER_URL } from "constants/endpoints";
import Head from "next/head";

axios.defaults.baseURL = SERVER_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>모두의 추첨</title>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
