import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Login from "components/pages/Login";
import Image from "next/image";
import { HTMLAttributes } from "react";
import logo from "../../public/vercel.svg";

const Container = styled.div`
  max-width: 260px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
`;

const LogoContainer = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 160px auto 60px;
  padding: 0;
`;

interface Props extends HTMLAttributes<HTMLSpanElement> {}

const logoStyle = css`
  display: block;
  text-align: center;
`;

const LogoBigTitle = styled.span`
  ${logoStyle};
  font-size: 79px;
  color: ${(props) => props.theme.color.primary700};
`;

const LogoSmallTitle = styled.span`
  ${logoStyle};
  font-size: 22px;
  color: ${(props) => props.theme.color.primary700};
`;

function Logo({ children, ...props }: Props) {
  return (
    <LogoContainer>
      <LogoBigTitle>모두의 추첨</LogoBigTitle>
      <LogoSmallTitle>모두의 추첨 모두 해 모두의 추첨 모두 해</LogoSmallTitle>
    </LogoContainer>
  );
}

function LoginPage() {
  return (
    <>
      <Logo />
      <Container>
        {/* <Image src={logo} alt="logo" /> */}

        <Login />
      </Container>
    </>
  );
}

export default LoginPage;
