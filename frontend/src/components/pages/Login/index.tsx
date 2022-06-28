import { css } from "@emotion/react";
import AuthFormContainer from "components/common/AuthFormContainer";
import Button from "components/common/Button";
import Link from "next/link";
import { StyledA, StyledInput } from "./styles";

function Login() {
  // TODO: loginRequest 만들기

  // function loginRequest() {
  //   console.log("login Request Sent");
  //   // 로그인 성공 시
  //   // redirect to '/'

  //   // 로그인 실패 시
  // }

  return (
    <AuthFormContainer>
      <form>
        <StyledInput type="text" placeholder="이메일" />
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
    </AuthFormContainer>
  );
}

export default Login;
