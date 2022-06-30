import styled from "@emotion/styled";

export const HistoryButton = styled.button`
  display: flex;
  flex-direction: column;

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

export const HistoryTitle = styled.span`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 12px;
`;

export const HistoryInfo = styled.span`
  font-size: 16px;

  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;
