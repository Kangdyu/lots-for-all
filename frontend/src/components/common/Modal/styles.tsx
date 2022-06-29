import styled from "@emotion/styled";
import { hexToRgba } from "utils/color";

export const StyledModal = styled.div`
  max-width: 1100px;
  width: 500px;
  min-height: 300px;
  margin: 0 auto;
  padding: 24px;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 24px;
  box-shadow: 0px 6px 16px ${(props) => hexToRgba(props.theme.color.primary700, 0.1)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 100;
`;

export const StyledModalButton = styled.div`
  display: flex;
  justify-content: right;
`;

export const StyledModalTitle = styled.span`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 4px;
  display: block;
`;

export const StyledModalQuitButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  text-align: center;
  font-weight: 400;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #d9d9d9;
  border-radius: 12px;
  user-select: none; // 드래그 불가능하게
`;

// flexboxes
export const TitleAndQuitButton = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledModalContent = styled.div`
  margin: 24px 0;
  flex: 1;
`;

export const Dimmed = styled.div`
  z-index: 50;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;
