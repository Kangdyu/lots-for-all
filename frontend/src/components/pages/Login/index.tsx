import { css } from "@emotion/react";
import axios from "axios";
import AuthFormContainer from "components/common/AuthFormContainer";
import Button from "components/common/Button";
import Modal from "components/common/Modal";
import useUser from "hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";

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
  const { mutate } = useUser();

  const router = useRouter();
  const data: FormValue = { email: "", password: "" };
  const [showModal, setShowModal] = useState(false);

  async function loginRequest(data: FormValue) {
    // TODO: password frontend hashing
    await axios
      .post<Data>("/login", data)
      .then((response) => {
        localStorage.setItem("token", response.data.result.token);
        mutate();
        router.push("/");
      })
      .catch((error) => {
        setShowModal(true);
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

    loginRequest(data);
  };

  return (
    <>
      <Modal
        title="로그인 실패"
        buttonText="확인"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        아이디와 비밀번호를 확인하세요
      </Modal>
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
    </>
  );
}

export default Login;
