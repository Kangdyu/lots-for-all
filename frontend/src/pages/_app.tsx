import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import { globalStyles } from "styles/globals";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
