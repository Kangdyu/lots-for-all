import Layout from "components/common/Layout";
import Navigation from "components/common/Navigation";

import styled from "@emotion/styled";
import Button from "components/common/Button";
import { hexToRgba } from "utils/color";
import useUser from "hooks/useUser";
import logout from "utils/logout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SERVER_URL } from "constants/endpoints";

const ProfileCard = styled.div`
  max-width: 1100px;
  width: 100%;
  height: 200px;
  margin: 140px auto 0;
  padding: 36px;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 24px;
  box-shadow: 0px 6px 16px ${(props) => hexToRgba(props.theme.color.primary700, 0.1)};
  display: flex;
`;

const ProfilePicture = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 64px;
  background-color: #d9d9d9;
  margin-right: 28px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.span`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 8px;
`;

const Email = styled.span`
  font-size: 16px;
  font-weight: 100;
`;

function SettingsPage() {
  const router = useRouter();

  const { user, loggedOut, mutate } = useUser();
  // const { mutate } = useSWRConfig();

  useEffect(() => {
    if (loggedOut) {
      router.replace("/");
    }
  }, [router, loggedOut]);

  return (
    <>
      <Navigation />
      <Layout>
        <ProfileCard>
          <ProfilePicture src={`${SERVER_URL}${user?.imageUrl}`} alt="avatar" />
          <ActionContainer>
            <InfoContainer>
              <Name>{user?.username}</Name>
              <Email>{user?.email}</Email>
            </InfoContainer>
            <ButtonContainer>
              {/* <Button>비밀번호 변경</Button> */}
              <div></div>
              <Button
                variant="danger"
                onClick={() => {
                  logout();
                  mutate();
                }}
              >
                로그아웃
              </Button>
            </ButtonContainer>
          </ActionContainer>
        </ProfileCard>
      </Layout>
    </>
  );
}

export default SettingsPage;
