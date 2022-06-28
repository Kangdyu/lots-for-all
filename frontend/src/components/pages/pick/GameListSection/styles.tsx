import styled from "@emotion/styled";

export const GameContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const GameAnchor = styled.a`
  &:not(:last-child) {
    margin-right: 20px;
  }
`;
