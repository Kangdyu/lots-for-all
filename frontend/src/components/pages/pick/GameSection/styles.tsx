import styled from "@emotion/styled";

export const GameNavigation = styled.nav`
  display: flex;
  justify-content: center;
`;

export const GameNavigationAnchor = styled.a<{ selected: boolean }>`
  font-size: 24px;
  font-weight: ${({ theme, selected }) => (selected ? 400 : 100)};
  color: ${({ theme, selected }) => (selected ? theme.color.primary700 : theme.color.black)};

  &:not(:last-child) {
    margin-right: 50px;
  }
`;
