import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const GameContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const GameAnchor = styled.a<{ disabled?: boolean }>`
  position: relative;
  ${({ theme, disabled }) =>
    disabled &&
    css`
      &::after {
        content: "공사 중";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 32px;

        border-radius: 24px;
        background-color: rgba(255, 255, 255, 0.9);
        color: ${theme.color.black};

        cursor: not-allowed;
      }
    `}

  &:not(:last-child) {
    margin-right: 20px;
  }
`;
