import Link from "next/link";
import { HTMLAttributes } from "react";

import logout from "utils/logout";
import {
  StyledDropdownDangerItem,
  StyledDropdownItem,
  StyledDropdownSeparator,
  StyledNavBarProfileDropdown,
} from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {
  isShown: boolean;
}

function NavBarProfileDropdown({ isShown, ...props }: Props) {
  if (isShown) {
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
