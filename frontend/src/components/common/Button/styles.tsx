import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const buttonBaseStyle = css`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 16px 32px;
  border-radius: 8px;
  color: white;
  font: inherit;
  font-weight: 400;
  font-size: 16px;

  &:disabled {
    cursor: not-allowed;

    background-color: #aaa;
    &:hover {
      background-color: #aaa;
    }
  }
`;

export const primaryButtonStyle = css`
  ${buttonBaseStyle};
  background-color: dodgerblue;
`;

// styled 에도 사용 가능
export const PrimaryButton = styled.button`
  ${buttonBaseStyle};
  background-color: ${(props) => props.theme.color.primary700};

  &:hover {
    background-color: ${(props) => props.theme.color.primary900};
    transition: background-color 0.25s;
  }
`;

export const DangerButton = styled.button`
  ${buttonBaseStyle};
  background-color: ${(props) => props.theme.color.red700};

  &:hover {
    background-color: ${(props) => props.theme.color.red900};
    transition: background-color 0.25s;
  }
`;
