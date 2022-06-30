import styled from "@emotion/styled";
import { hexToRgba } from "utils/color";

export const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 80px;

  background-color: ${(props) => props.theme.color.white};
  box-shadow: 0px 8px 24px 4px ${(props) => hexToRgba(props.theme.color.primary700, 0.1)};

  z-index: 20;
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

export const NavBarContent = styled.a<{ selected: boolean; disabled?: boolean }>`
  font-size: 18px;
  font-weight: ${(props) => props.selected && "400"};
  color: ${({ theme, selected, disabled }) =>
    disabled ? "#ccc" : selected ? theme.color.primary700 : theme.color.black};
  pointer-events: ${({ disabled }) => disabled && "none"};

  &:not(:last-child) {
    margin-right: 70px;
  }
`;
