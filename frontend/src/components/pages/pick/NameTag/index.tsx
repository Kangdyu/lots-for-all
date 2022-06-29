import { HTMLAttributes } from "react";
import { DeleteButton, Tag } from "./styles";

interface Props extends HTMLAttributes<HTMLSpanElement> {}

function NameTag({ children, ...props }: Props) {
  return (
    <Tag {...props}>
      <DeleteButton>×</DeleteButton>
      {children}
    </Tag>
  );
}

export default NameTag;
