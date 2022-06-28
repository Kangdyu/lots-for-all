import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Logo from "components/common/Logo";
import Register from "components/pages/Register";

const Container = styled.div`
  max-width: 260px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
`;

function RegisterPage() {
  return (
    <>
      <Logo />
      <Container>
        <Register />
      </Container>
    </>
  );
}

export default RegisterPage;
