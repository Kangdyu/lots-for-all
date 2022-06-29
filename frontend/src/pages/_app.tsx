import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import GlobalStyles from "styles/GlobalStyles";
import { theme } from "styles/theme";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ApiResponse, User } from "types/api";

axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Update the document title using the browser API

    async function tokenValidateRequest(token: string) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios
        .get<ApiResponse<User>>("/login", config)
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

    console.log("LOCALTOKEN", localStorage.getItem("token"));
    const token = localStorage.getItem("token");

    if (token) {
      // 이미 localStorage 에 token 이 있으면
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
