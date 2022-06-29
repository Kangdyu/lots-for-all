import { css } from "@emotion/react";
import styled from "@emotion/styled";

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Tag = styled.span`
  position: relative;

  padding: 6px 24px;

  font-size: 16px;
  font-weight: 400;

  border-radius: 50px;
  background-color: ${(props) => props.theme.color.primary500};
  color: ${(props) => props.theme.color.white};

  cursor: pointer;

  &:hover {
    button {
      ${flexCenter};
    }
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: -4px;
  left: -4px;

  display: none;

  width: 16px;
  height: 16px;

  border: none;
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  background-color: ${(props) => props.theme.color.red700};
  color: ${(props) => props.theme.color.white};

  &:hover {
    background-color: ${(props) => props.theme.color.red900};
  }
`;
