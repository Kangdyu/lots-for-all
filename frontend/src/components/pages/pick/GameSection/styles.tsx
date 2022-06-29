import styled from "@emotion/styled";
import Input from "components/common/Input";
import NameTag from "../NameTag";

export const Flex = styled.div`
  display: flex;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const StyledInput = styled(Input)`
  margin-right: 8px;
`;

export const NameListForm = styled.form`
  display: flex;
`;

export const NameListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0 0 8px;
`;

export const StyledNameTag = styled(NameTag)`
  margin: -8px 16px 16px -8px;
`;
