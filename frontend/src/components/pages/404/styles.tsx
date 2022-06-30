import styled from "@emotion/styled";
import Input from "components/common/Input";

// styled 에도 사용 가능

export const StyledH1 = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin: 120px auto;
  display: block;
  text-align: center;

  color: ${(props) => props.theme.color.primary700};
`;

export const StyledSpan = styled.span`
  font-size: 20px;
  margin: 0px auto;
  display: block;
  text-align: center;
  text-decoration: underline;
  color: ${(props) => props.theme.color.primary700};
`;

export const StyledInput = styled(Input)`
  width: 100%;

  margin-bottom: 10px;
`;
