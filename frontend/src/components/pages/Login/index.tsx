import { css } from "@emotion/react";
import Button from "components/common/Button";
import Link from "next/link";
import { Container, StyledA, StyledInput } from "./styles";

function Login() {
  function loginRequest() {
    console.log("login Request Sent");
    // 로그인 성공 시
    // redirect to '/'

    // 로그인 실패 시
  }

  return (
    <Container>
      <form>
        <StyledInput type="text" placeholder="아이디" />
        <StyledInput type="password" placeholder="비밀번호" />
        <Button
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
    </Container>
  );
}

export default Login;
