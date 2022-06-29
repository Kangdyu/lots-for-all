import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import GlobalStyles from "styles/GlobalStyles";
import { theme } from "styles/theme";
import axios from "axios";
import { useEffect } from "react";
import { stringify } from "querystring";
import { useRouter } from "next/router";

axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

interface Result {
  id: number;
  username: string;
  email: string;
  imageUrl: string;
}

interface Data {
  result: Result;
  message: string;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  async function tokenValidateRequest(token: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios
      .get<Data | any>("/login", config)
      .then((response) => {
        if (response.data.message === "success") {
          console.log(response.data.message);
          router.push("/");
        } else {
          console.log("login needed");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return false;
  }

  useEffect(() => {
    // Update the document title using the browser API

    console.log("LOCALTOKEN", localStorage.getItem("token"));

    if (localStorage.getItem("token")) {
      // 이미 localStorage 에 token 이 있으면
      const token = localStorage.getItem("token");

      tokenValidateRequest(token);
    } else {
      console.log("there is no token login Needed");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
