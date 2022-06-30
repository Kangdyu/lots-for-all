import { css } from "@emotion/react";
import axios from "axios";
import AuthFormContainer from "components/common/AuthFormContainer";
import Button from "components/common/Button";
import Modal from "components/common/Modal";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import { StyledA, StyledInput } from "./styles";

// axios response interface(s)
interface Result {
  username: string;
  email: string;
  password: string;
}

interface Data {
  result: Result;
  message: string;
}

// axios request interface
interface FormValue {
  username: string;
  email: string;
  password: string;
}

function Register() {
  // TODO: password frontend hashing
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentProblem, setCurrentProblem] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const router = useRouter();

  const data: FormValue = { username: "", email: "", password: "" };

  async function registerRequest(data: FormValue) {
    await axios
      .post<Data>("/signup", data)
      .then((response) => {
        console.log(response.data.message);
        setIsRegisterSuccess(true);
        openModal({ messageString: "회원가입 성공! " });
      })
      .catch((error) => {
        console.log(error);
        openModal({ messageString: "회원가입 실패" });
      });
    return false;
  }

  const emailInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement>(null);

  // 모달창 열어주는데, 제목이랑 내용 모두 텍스트만 담을려면 이거 쓰시고...
  function openModal({
    messageString,
    titleString = "안내",
  }: {
    messageString: string;
    titleString?: string;
  }) {
    setCurrentTitle(titleString);
    setCurrentProblem(messageString);
    setShowModal(true);
  }

  const handleListSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !(
        emailInputRef.current &&
        usernameInputRef.current &&
        passwordInputRef.current &&
        passwordConfirmInputRef.current
      )
    ) {
      console.log("ERROR");
      return;
    }

    // 이메일 validation
    if (!emailInputRef.current.value) {
      openModal({ messageString: "이메일을 입력해 주세요. " });
      return;
    }

    const emailValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailInputRef.current.value.match(emailValidRegex)) {
      openModal({ messageString: "이메일의 형식을 맞춰주세요. " });
      return;
    }

    // 닉네임 validation
    if (!usernameInputRef.current.value) {
      openModal({ messageString: "닉네임을 입력해 주세요. " });
      return;
    }

    if (usernameInputRef.current.value.length > 10) {
      openModal({ messageString: "닉네임은 1~10자 사이로 입력해 주세요. " });
      return;
    }

    // password validation
    if (!passwordInputRef.current.value) {
      openModal({ messageString: "비밀번호를 입력해 주세요. " });
      return;
    }

    // 영문, 숫자, 특수문자 조합 6-50자리
    const passwordValidRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,50}$/;
    if (!passwordValidRegex.test(passwordInputRef.current.value)) {
      openModal({
        messageString: "비밀번호는 영문, 숫자, 특수문자를 조합하여 6~50자 사이로 입력해 주세요. ",
      });
      return;
    }

    if (!passwordConfirmInputRef.current.value) {
      openModal({
        messageString: "비밀번호 확인을 해주세요. ",
      });
      return;
    }

    // 비밀번호 일치 확인
    if (passwordInputRef.current.value !== passwordConfirmInputRef.current.value) {
      openModal({
        messageString: "비밀번호가 일치하지 않습니다. ",
      });
      return;
    }

    if (usernameInputRef.current) {
      data.username = usernameInputRef.current.value;
      usernameInputRef.current.value = "";
    }

    if (emailInputRef.current) {
      data.email = emailInputRef.current.value;
      emailInputRef.current.value = "";
    }

    if (passwordInputRef.current) {
      data.password = passwordInputRef.current.value;
      passwordInputRef.current.value = "";
    }

    console.log(data);

    registerRequest(data);
  };

  return (
    <>
      <Modal
        title={currentTitle}
        buttonText="확인"
        show={showModal}
        onClose={() => {
          setShowModal(false);
          if (isRegisterSuccess) {
            router.push("/login");
          }
        }}
      >
        {currentProblem}
      </Modal>
      <AuthFormContainer>
        <form onSubmit={handleListSubmit}>
          <StyledInput ref={emailInputRef} label="이메일" type={"text"} placeholder="이메일 입력" />
          <StyledInput
            ref={usernameInputRef}
            label="닉네임"
            type={"text"}
            placeholder="닉네임 1 ~ 10자"
          />

          <StyledInput
            ref={passwordInputRef}
            label="비밀번호"
            type={"password"}
            placeholder="영문, 숫자, 특수문자 6 ~ 50자"
          />
          <StyledInput
            ref={passwordConfirmInputRef}
            label="비밀번호 확인"
            type={"password"}
            placeholder="사용할 비밀번호 다시 입력"
          />
          <Button
            type="submit"
            css={css`
              margin-bottom: 10px;
              width: 100%;
            `}
          >
            회원가입
          </Button>
        </form>
        <Link href={"/login"}>
          <StyledA>이미 회원이신가요? 로그인하러 가기 &gt;</StyledA>
        </Link>
      </AuthFormContainer>
    </>
  );
}

export default Register;
