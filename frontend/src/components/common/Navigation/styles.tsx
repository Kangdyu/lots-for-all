import styled from "@emotion/styled";

export const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 80px;

  background-color: ${(props) => props.theme.color.white};
  box-shadow: 0px 8px 24px 4px rgba(117, 113, 218, 0.1);
`;

export const NavBarContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavBarLogo = styled.a`
  margin-right: 90px;

  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.color.black};
`;

export const NavBarContent = styled.a<{ selected: boolean }>`
  font-size: 18px;
  font-weight: ${(props) => props.selected && "400"};
  color: ${({ theme, selected }) => (selected ? theme.color.primary700 : theme.color.black)};

  &:not(:last-child) {
    margin-right: 70px;
  }
`;
