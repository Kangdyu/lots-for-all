import styled from "@emotion/styled";
import { hexToRgba } from "utils/color";

export const GroupCard = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  padding: 16px 32px;
  border-radius: 16px;

  background-color: ${(props) => props.theme.color.white};
  box-shadow: 0 6px 16px 0 ${(props) => hexToRgba(props.theme.color.primary700, 0.1)};

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const GroupName = styled.span`
  font-size: 20px;
  font-weight: 400;
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const GroupMemberContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const GroupMember = styled.span`
  margin: 0 8px 8px 0;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 24px;

  border: none;
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  background-color: ${(props) => props.theme.color.red700};
  color: white;
`;
