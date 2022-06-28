import { InputHTMLAttributes } from "react";
import { StyledInput, StyledInputLabel } from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  valid?: boolean;
  label?: string;
}

function Input({ children, valid = true, label, ...props }: Props) {
  return (
    <>
      {label && <StyledInputLabel>{label}</StyledInputLabel>}
      <StyledInput valid={valid} {...props} />
    </>
  );
}

export default Input;
