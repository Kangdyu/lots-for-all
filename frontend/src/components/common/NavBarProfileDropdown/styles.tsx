import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { hexToRgba } from "utils/color";

export const StyledNavBarProfileDropdown = styled.div`
  position: absolute;
  top: 90px;
  right: 40px;
  width: 200px;
  padding: 20px 10px;
  display: flex;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 16px;
  box-shadow: 0px 6px 16px ${(props) => hexToRgba(props.theme.color.primary700, 0.1)};

  flex-direction: column;
  z-index: 50;
`;

export const dropDownBaseStyle = css`
  font-size: 18px;
  margin: 15px 0;
  padding: 0 10px;
  :first-child {
    margin-top: 0;
  }
  :last-child {
    margin-bottom: 0;
  }
`;

export const StyledDropdownItem = styled.span`
  ${dropDownBaseStyle}
`;

export const StyledDropdownDangerItem = styled.span`
  ${dropDownBaseStyle}
  color: ${(props) => props.theme.color.red700};
`;

export const StyledDropdownSeparator = styled.hr`
  margin: 0;
  padding: 0;
  width: 180px;
  height: 0;
  color: #aaaaaa;
`;
