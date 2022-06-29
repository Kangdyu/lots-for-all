import { HTMLAttributes, useState } from "react";
import NavBarProfileDropdown from "./NavBarProfileDropdown";

import { StyledNavBarProfileCard, StyledProfilePicture, StyledUserName } from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {
  name: string;
}

function NavBarProfileCard({ name, ...props }: Props) {
  const [isShown, setIsShown] = useState(false);
  return (
    <>
      <StyledNavBarProfileCard {...props}>
        <StyledProfilePicture />
        <StyledUserName>{name}</StyledUserName>
        <span
          onClick={() => {
            setIsShown((prev: boolean) => !prev);
          }}
        >
          ∨
        </span>
      </StyledNavBarProfileCard>
      <NavBarProfileDropdown isShown={isShown} />
    </>
  );
}

export default NavBarProfileCard;
