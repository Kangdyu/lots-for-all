import styled from "@emotion/styled";
import Logo from "components/common/Logo";
import Login from "components/pages/Login";

const Container = styled.div`
  max-width: 260px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
`;

function LoginPage() {
  return (
    <>
      <Logo />
      <Container>
        <Login />
      </Container>
    </>
  );
}

export default LoginPage;
