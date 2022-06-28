import { InputHTMLAttributes } from "react";
import { StyledInput, StyledInputLabel } from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  valid?: boolean;
  label?: string;
}

function Input({ children, className, valid = true, label, ...props }: Props) {
  return (
    <div className={className}>
      {label && <StyledInputLabel>{label}</StyledInputLabel>}
      <StyledInput valid={valid} {...props} />
    </div>
  );
}

export default Input;
