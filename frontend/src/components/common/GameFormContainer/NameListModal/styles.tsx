import styled from "@emotion/styled";

export const GroupButton = styled.button`
  outline: none;
  cursor: pointer;

  width: 100%;
  padding: 8px 16px;

  font: inherit;
  font-size: 18px;

  border: 1px solid ${(props) => props.theme.color.primary700};
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.white};
  color: ${(props) => props.theme.color.primary900};

  &:hover {
    background-color: ${(props) => props.theme.color.primary100};
  }

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;
