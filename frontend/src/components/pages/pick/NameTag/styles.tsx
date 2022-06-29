import styled from "@emotion/styled";

export const Tag = styled.span`
  padding: 6px 24px;

  font-size: 16px;
  font-weight: 400;

  border-radius: 50px;
  background-color: ${(props) => props.theme.color.primary500};
  color: ${(props) => props.theme.color.white};
`;
