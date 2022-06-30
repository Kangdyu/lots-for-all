import useUser from "hooks/useUser";
import { HTMLAttributes, useState } from "react";
import NavBarProfileDropdown from "./NavBarProfileDropdown";

import { StyledNavBarProfileCard, StyledProfilePicture, StyledUserName } from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {}

function NavBarProfileCard({ ...props }: Props) {
  const [isShown, setIsShown] = useState(false);

  const { user, error } = useUser();

  if (!user && !error) return null;

  return (
    <>
      <StyledNavBarProfileCard
        onClick={() => {
          setIsShown((prev: boolean) => !prev);
        }}
        {...props}
      >
        <StyledProfilePicture />
        <StyledUserName>{user?.username}</StyledUserName>
        <span>∨</span>
      </StyledNavBarProfileCard>
      <NavBarProfileDropdown isShown={isShown} />
    </>
  );
}

export default NavBarProfileCard;
