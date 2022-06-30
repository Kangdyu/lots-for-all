import styled from "@emotion/styled";
import { hexToRgba } from "utils/color";

// styled 에도 사용 가능

export const StyledHistoryCard = styled.div`
  max-width: 1100px;
  width: 100%;
  height: 80px;
  margin: 0 auto 20px;
  padding: 16px 40px;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 24px;
  box-shadow: 0px 6px 16px ${(props) => hexToRgba(props.theme.color.primary700, 0.1)};
  display: flex;
  justify-content: space-between;

  :last-child {
    margin-bottom: 0;
  }
`;

export const StyledHistoryCardInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledHistoryCardTitle = styled.span`
  font-size: 24px;
  font-weight: 400;
  display: block;
  margin: 0;
`;

export const StyledHistoryCardDetail = styled.span`
  margin: 0;
  font-size: 16px;
  display: block;
`;

export const StyledHistoryCardAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledHistoryCardDate = styled.span`
  margin-right: 24px;
  font-size: 14px;
  display: block;
`;

export const StyledHistoryCardIcon = styled.div`
  margin: 0 5px;
`;
