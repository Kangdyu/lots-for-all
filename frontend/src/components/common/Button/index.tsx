import { ButtonHTMLAttributes } from "react";
import { DangerButton, PrimaryButton } from "./styles";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "danger" | "primary";
}

function Button({ children, variant = "primary", ...props }: Props) {
  if (variant === "primary") {
    return <PrimaryButton {...props}>{children}</PrimaryButton>;
  } else if (variant === "danger") {
    return <DangerButton {...props}>{children}</DangerButton>;
  } else {
    return <span>nothing</span>;
  }
}

export default Button;
