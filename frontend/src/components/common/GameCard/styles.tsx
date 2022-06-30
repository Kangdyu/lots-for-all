import styled from "@emotion/styled";
import Image from "next/image";
import { hexToRgba } from "utils/color";

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
  box-shadow: 0 6px 16px 0 ${(props) => hexToRgba(props.theme.color.primary700, 0.1)};
`;

export const GameImage = styled(Image)`
  border-radius: 24px;
`;

export const GameCardName = styled.span`
  font-size: 32px;
  text-align: center;
  color: ${(props) => props.theme.color.black};
`;
