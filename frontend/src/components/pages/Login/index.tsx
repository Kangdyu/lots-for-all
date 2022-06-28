import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Button from "components/common/Button";
import Input from "components/common/Input";
import Link from "next/link";
import { useRouter } from "next/router";
import { StyledA } from "./styles";

const Container = styled.div`
  max-width: 260px;
  width: 100%;
  padding: 0;
`;

function Login() {
  const router = useRouter();

  function loginRequest() {
    console.log("login Request Sent");
    // 로그인 성공 시
    // redirect to '/'

    // 로그인 실패 시
  }

  const handleClick = (e: Event) => {
    e.preventDefault();
    loginRequest();
  };

  return (
    <Container>
      <form>
        <Input
          type={"text"}
          css={css`
            margin: 5px 0;
            width: 100%;
          `}
          placeholder="아이디"
        />
        <Input
          type={"password"}
          css={css`
            margin: 5px 0;
            width: 100%;
          `}
          placeholder="비밀번호"
        />
        <Button
          css={css`
            margin: 5px 0;
            width: 100%;
          `}
          onClick={() => {
            handleClick(event); // deprecated
          }}
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
