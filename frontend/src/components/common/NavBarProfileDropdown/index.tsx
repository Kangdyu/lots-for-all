import { css } from "@emotion/react";
import Link from "next/link";
import { HTMLAttributes, useContext } from "react";
import { MenuBarContext } from "shared/MenuBarContext";
import {
  StyledDropdownDangerItem,
  StyledDropdownItem,
  StyledDropdownSeparator,
  StyledNavBarProfileDropdown,
} from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {}

function NavBarProfileDropdown({ ...props }: Props) {
  const { isShown } = useContext(MenuBarContext);
  if (isShown) {
    return (
      <StyledNavBarProfileDropdown {...props}>
        <Link href="/settings">
          <StyledDropdownItem>마이 페이지</StyledDropdownItem>
        </Link>

        <StyledDropdownSeparator />
        <StyledDropdownDangerItem>로그아웃</StyledDropdownDangerItem>
      </StyledNavBarProfileDropdown>
    );
  }
}

export default NavBarProfileDropdown;
