import styled from "@emotion/styled";
import Logo from "components/common/Logo";
import Login from "components/pages/Login";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Container = styled.div`
  max-width: 260px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
`;

function LoginPage() {
  const router = useRouter();
  const { loggedOut } = useUser();

  useEffect(() => {
    if (!loggedOut) {
      router.replace("/");
    }
  }, [router, loggedOut]);

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
