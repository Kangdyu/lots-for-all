import { HTMLAttributes } from "react";
import Button from "components/common/Button";
import { NavBar, NavBarContainer, NavBarContent, NavBarLogo } from "./styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { NAV_ROUTES } from "constants/routes";
import NavBarProfileCard from "../NavBarProfileCard";

interface Props extends HTMLAttributes<HTMLElement> {}

// TODO: 로그인 구현 시 loggedIn prop 활용하여 수정
function Navigation({ ...props }: Props) {
  const { pathname } = useRouter();
  const loggedIn = true;
  return (
    <NavBar {...props}>
      <NavBarContainer>
        <div>
          <Link href="/" passHref>
            <NavBarLogo>모두의 추첨</NavBarLogo>
          </Link>

          {NAV_ROUTES.map((route) => (
            <Link key={route.path} href={route.path} passHref>
              <NavBarContent selected={pathname === route.path}>{route.name}</NavBarContent>
            </Link>
          ))}
        </div>

        <div>
          {loggedIn ? (
            <NavBarProfileCard name="홍길동은아버지를아버지라" />
          ) : (
            <Button>로그인</Button>
          )}
        </div>
      </NavBarContainer>
    </NavBar>
  );
}

export default Navigation;
