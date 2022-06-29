import styled from "@emotion/styled";

// styled 에도 사용 가능
export const StyledInput = styled.input<{ valid: boolean }>`
  outline: none;
  padding: 15px 18px 12px;
  border-radius: 8px;
  color: ${(props) => props.theme.color.black};
  font: inherit;
  border: 1px solid ${({ theme, valid }) => (valid ? theme.color.primary700 : theme.color.red700)};
  border-radius: 8px;
  width: 100%;
  &::placeholder {
    color: ${(props) => props.theme.color.primary500};
  }
  background-color: ${(props) => props.theme.color.white};

  &:focus {
    outline: none;
    box-shadow: 0 0 10px
      ${({ theme, valid }) => (valid ? theme.color.primary700 : theme.color.red700)};
  }
`;

export const StyledInputLabel = styled.span`
  font-size: 14px;
  margin-bottom: 4px;
  display: block;
  color: ${(props) => props.theme.color.primary700};
`;
