import { HTMLAttributes } from "react";
import { Tag } from "./styles";

interface Props extends HTMLAttributes<HTMLSpanElement> {}

function NameTag({ children, ...props }: Props) {
  return <Tag {...props}>{children}</Tag>;
}

export default NameTag;
