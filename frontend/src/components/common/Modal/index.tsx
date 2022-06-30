import { HTMLAttributes, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "../Button";
import {
  Dimmed,
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
  show: boolean;
  onClose: () => void;
  showButton?: boolean;
  onButtonClick?: () => void;
}

function Modal({
  children,
  title = "알림",
  buttonText = "확인",
  show,
  onClose,
  showButton = true,
  onButtonClick = onClose,
  ...props
}: Props) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    const element = document.querySelector("body");
    if (element != null) {
      element.style.overflow = "hidden";
    }

    return () => {
      if (element != null) {
        element.style.overflow = "visible";
      }
    };
  }, []);

  const modalContent = show ? (
    <Dimmed
      onClick={({ target, currentTarget }) => {
        if (target !== currentTarget) return;
        onClose();
      }}
    >
      <StyledModal {...props}>
        <TitleAndQuitButton>
          <StyledModalTitle>{title}</StyledModalTitle>
          <StyledModalQuitButton onClick={onClose}>×</StyledModalQuitButton>
        </TitleAndQuitButton>
        <StyledModalContent>{children}</StyledModalContent>
        {showButton && (
          <StyledModalButton>
            <Button onClick={onButtonClick}>{buttonText}</Button>
          </StyledModalButton>
        )}
      </StyledModal>
    </Dimmed>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root")!);
  } else {
    return null;
  }
}

export default Modal;
