import styled from "@emotion/styled";
import Input from "components/common/Input";

// styled 에도 사용 가능

export const StyledA = styled.a`
  font-size: 14px;
  margin: 0px auto;
  display: block;
  text-align: center;
  text-decoration: underline;
  color: ${(props) => props.theme.color.primary700};
  cursor: pointer;
`;

export const StyledInput = styled(Input)`
  width: 100%;
  margin-bottom: 16px;
`;
