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

function Register() {
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
          label="아이디"
          type={"text"}
          css={css`
            margin: 8px 0;
            width: 100%;
          `}
          placeholder="영문, 숫자 3 ~ 20자"
        />
        <Input
          label="비밀번호"
          type={"password"}
          css={css`
            margin: 8px 0;
            width: 100%;
          `}
          placeholder="영문, 숫자, 특수문자 6 ~ 50자"
        />
        <Input
          label="비밀번호 확인"
          type={"password"}
          css={css`
            margin: 8px 0;
            width: 100%;
          `}
          placeholder="사용할 비밀번호 다시 입력"
        />
        <Button
          css={css`
            margin: 12px 0 5px;
            width: 100%;
          `}
          onClick={() => {
            handleClick(event); // deprecated
          }}
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
