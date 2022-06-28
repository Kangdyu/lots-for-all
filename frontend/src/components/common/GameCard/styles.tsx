import styled from "@emotion/styled";

export const GameCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 260px;
  height: 260px;
  padding: 24px;

  border-radius: 24px;
  overflow: hidden;

  background-color: ${(props) => props.theme.color.white};
`;

export const GameCardName = styled.span`
  font-size: 32px;
  text-align: center;
  color: ${(props) => props.theme.color.black};
`;
