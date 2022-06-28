import { HTMLAttributes } from "react";
import { Container } from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {}

function AuthFormContainer({ children, ...props }: Props) {
  return <Container {...props}>{children}</Container>;
}

export default AuthFormContainer;
