import { HTMLAttributes } from "react";
import Button from "../Button";
import {
  StyledModal,
  StyledModalButton,
  StyledModalContent,
  StyledModalQuitButton,
  StyledModalTitle,
  TitleAndQuitButton,
} from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  buttonText?: string;
}

function Modal({ children, title = "알림", buttonText = "확인", ...props }: Props) {
  return (
    <StyledModal {...props}>
      <TitleAndQuitButton>
        <StyledModalTitle>{title}</StyledModalTitle>
        <StyledModalQuitButton draggable="false">×</StyledModalQuitButton>
      </TitleAndQuitButton>
      <StyledModalContent>{children}</StyledModalContent>
      <StyledModalButton>
        <Button>{buttonText}</Button>
      </StyledModalButton>
    </StyledModal>
  );
}

export default Modal;
