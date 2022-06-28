import { HTMLAttributes } from "react";
import { LogoBigTitle, LogoContainer, LogoSmallTitle } from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {}

function Logo({ ...props }: Props) {
  return (
    <LogoContainer {...props}>
      <LogoBigTitle>모두의 추첨</LogoBigTitle>
      <LogoSmallTitle>모두의 추첨 모두 해 모두의 추첨 모두 해</LogoSmallTitle>
    </LogoContainer>
  );
}

export default Logo;
