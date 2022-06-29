import Link from "next/link";
import { HTMLAttributes, useContext } from "react";
import { MenuBarContext } from "shared/MenuBarContext";
import logout from "utils/logout";
import {
  StyledDropdownDangerItem,
  StyledDropdownItem,
  StyledDropdownSeparator,
  StyledNavBarProfileDropdown,
} from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {}

function NavBarProfileDropdown({ ...props }: Props) {
  const context = useContext(MenuBarContext);

  if (context == null) throw new Error();

  if (context.isShown) {
    return (
      <StyledNavBarProfileDropdown {...props}>
        <Link href="/settings">
          <StyledDropdownItem>마이 페이지</StyledDropdownItem>
        </Link>

        <StyledDropdownSeparator />
        <StyledDropdownDangerItem onClick={logout}>로그아웃</StyledDropdownDangerItem>
      </StyledNavBarProfileDropdown>
    );
  } else {
    return null;
  }
}

export default NavBarProfileDropdown;
