import { forwardRef, InputHTMLAttributes } from "react";
import { StyledInput, StyledInputLabel } from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  valid?: boolean;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ children, className, valid = true, label, ...props }, ref) => {
    return (
      <div className={className}>
        {label && <StyledInputLabel>{label}</StyledInputLabel>}
        <StyledInput valid={valid} ref={ref} {...props} />
      </div>
    );
  }
);

export default Input;
