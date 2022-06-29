import { HTMLAttributes, useContext } from "react";
import { MenuBarContext } from "shared/MenuBarContext";
import NavBarProfileDropdown from "../NavBarProfileDropdown";

import { StyledNavBarProfileCard, StyledProfilePicture, StyledUserName } from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {
  name: string;
}

function NavBarProfileCard({ name, ...props }: Props) {
  const { isShown, setIsShown } = useContext(MenuBarContext);
  console.log(isShown);
  return (
    <StyledNavBarProfileCard {...props}>
      <StyledProfilePicture />
      <StyledUserName>{name}</StyledUserName>
      <span
        onClick={() => {
          // isShown ? setIsShown(false) : setIsShown(true);
          setIsShown((prev: boolean) => !prev);
        }}
      >
        ∨
      </span>
    </StyledNavBarProfileCard>
  );
}

export default NavBarProfileCard;
