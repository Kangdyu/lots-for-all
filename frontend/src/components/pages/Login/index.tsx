import { css } from "@emotion/react";
import axios from "axios";
import AuthFormContainer from "components/common/AuthFormContainer";
import Button from "components/common/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useRef } from "react";

import { StyledA, StyledInput } from "./styles";

// axios response interface(s)
interface Result {
  token: string;
}

interface Data {
  message: string;
  result: Result;
}

// axios request interface
interface FormValue {
  email: string;
  password: string;
}

function Login() {
  const router = useRouter();
  const data: FormValue = { email: "", password: "" };

  async function loginRequest(data: FormValue) {
    // TODO: password frontend hashing
    await axios
      .post<Data>("/login", data)
      .then((response) => {
        console.log(response.data.result.token);
        localStorage.setItem("token", response.data.result.token);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
    return false;
  }

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const handleListSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailInputRef.current) {
      data.email = emailInputRef.current.value;
      emailInputRef.current.value = "";
    }

    if (passwordInputRef.current) {
      data.password = passwordInputRef.current.value;
      passwordInputRef.current.value = "";
    }

    console.log(data);
    loginRequest(data);
  };

  return (
    <AuthFormContainer>
      <form onSubmit={handleListSubmit}>
        <StyledInput ref={emailInputRef} type="text" placeholder="이메일" />
        <StyledInput ref={passwordInputRef} type="password" placeholder="비밀번호" />
        <Button
          type="submit"
          css={css`
            margin-bottom: 10px;
            width: 100%;
          `}
        >
          로그인
        </Button>
      </form>
      <Link href={"/register"}>
        <StyledA>계정이 없으신가요? 회원가입하기 &gt;</StyledA>
      </Link>
    </AuthFormContainer>
  );
}

export default Login;
