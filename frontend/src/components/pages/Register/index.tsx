import { css } from "@emotion/react";
import Button from "components/common/Button";
import Input from "components/common/Input";
import Link from "next/link";
import { StyledA, Container, StyledInput } from "./styles";

function Register() {
  function registerRequest() {
    console.log("register Request Sent");
    // 로그인 성공 시
    // redirect to '/'

    // 로그인 실패 시
  }

  return (
    <Container>
      <form>
        <StyledInput label="아이디" type={"text"} placeholder="영문, 숫자 3 ~ 20자" />
        <StyledInput
          label="비밀번호"
          type={"password"}
          placeholder="영문, 숫자, 특수문자 6 ~ 50자"
        />
        <StyledInput
          label="비밀번호 확인"
          type={"password"}
          placeholder="사용할 비밀번호 다시 입력"
        />
        <Button
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
    </Container>
  );
}

export default Register;
