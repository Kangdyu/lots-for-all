import styled from "@emotion/styled";
import Input from "components/common/Input";

export const Flex = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const StyledInput = styled(Input)`
  margin-right: 8px;
`;
