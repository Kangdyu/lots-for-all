import { HTMLAttributes } from "react";
import Button from "components/common/Button";
import { NavBar, NavBarContainer, NavBarContent, NavBarLogo } from "./styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { ROUTES } from "constants/routes";

interface Props extends HTMLAttributes<HTMLElement> {
  loggedIn?: boolean;
}

// TODO: 로그인 구현 시 loggedIn prop 활용하여 수정
function Navigation({ loggedIn = false, ...props }: Props) {
  const { pathname } = useRouter();

  return (
    <NavBar {...props}>
      <NavBarContainer>
        <div>
          <Link href="/" passHref>
            <NavBarLogo>모두의 추첨</NavBarLogo>
          </Link>

          {ROUTES.map((route) => (
            <Link key={route.path} href={route.path} passHref>
              <NavBarContent selected={pathname === route.path}>{route.name}</NavBarContent>
            </Link>
          ))}
        </div>

        <div>{loggedIn ? <></> : <Button>로그인</Button>}</div>
      </NavBarContainer>
    </NavBar>
  );
}

export default Navigation;
