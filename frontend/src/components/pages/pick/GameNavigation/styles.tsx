import styled from "@emotion/styled";

export const GameNavBar = styled.nav`
  display: flex;
  justify-content: center;
`;

export const GameNavigationAnchor = styled.a<{ selected: boolean; disabled?: boolean }>`
  font-size: 24px;
  font-weight: ${({ selected }) => (selected ? 400 : 100)};
  color: ${({ theme, selected, disabled }) =>
    disabled ? "#ccc" : selected ? theme.color.primary700 : theme.color.black};
  cursor: ${({ disabled }) => disabled && "not-allowed"};

  &:not(:last-child) {
    margin-right: 50px;
  }
`;
