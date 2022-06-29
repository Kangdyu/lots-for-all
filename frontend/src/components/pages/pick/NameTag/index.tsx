import { FormEvent, HTMLAttributes, useCallback, useEffect, useRef } from "react";
import { DeleteButton, RenameInput, Tag } from "./styles";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  onDelete?: () => void;
  onNameChange?: (changedName: string) => void;
}

function NameTag({ children, onDelete, onNameChange, ...props }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("blur", () => {
        if (inputRef.current) {
          inputRef.current.style.display = "none";
          inputRef.current.value = "";
        }
      });
    }
  }, []);

  const handleTagClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.style.display = "block";
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (inputRef.current) {
        if (inputRef.current.value !== "") {
          onNameChange?.(inputRef.current.value);
          inputRef.current.value = "";
          inputRef.current.style.display = "none";
        }
      }
    },
    [onNameChange]
  );

  return (
    <Tag onClick={handleTagClick} {...props}>
      <form onSubmit={handleSubmit}>
        <RenameInput type="text" ref={inputRef} />
      </form>
      <DeleteButton onClick={onDelete}>×</DeleteButton>
      {children}
    </Tag>
  );
}

export default NameTag;
