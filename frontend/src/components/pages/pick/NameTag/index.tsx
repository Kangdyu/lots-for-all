import { HTMLAttributes } from "react";
import { DeleteButton, Tag } from "./styles";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  onDelete?: () => void;
}

function NameTag({ children, onDelete, ...props }: Props) {
  return (
    <Tag {...props}>
      <DeleteButton onClick={onDelete}>×</DeleteButton>
      {children}
    </Tag>
  );
}

export default NameTag;
