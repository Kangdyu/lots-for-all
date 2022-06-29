import { HTMLAttributes, useEffect, useState } from "react";
import Button from "components/common/Button";
import { NavBar, NavBarContainer, NavBarContent, NavBarLogo } from "./styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { NAV_ROUTES } from "constants/routes";
import NavBarProfileCard from "./NavBarProfileCard";
import { ApiResponse, User } from "types/api";
import axios from "axios";

interface Props extends HTMLAttributes<HTMLElement> {}

// TODO: 로그인 구현 시 loggedIn prop 활용하여 수정
function Navigation({ ...props }: Props) {
  const { pathname } = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  async function tokenValidateRequest(token: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios
      .get<ApiResponse<User>>("/login", config)
      .then((response) => {
        if (response.data.message === "success") {
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return false;
  }

  useEffect(() => {
    // Update the document title using the browser API

    console.log("LOCALTOKEN", localStorage.getItem("token"));
    const token = localStorage.getItem("token");

    if (token) {
      // 이미 localStorage 에 token 이 있으면
      tokenValidateRequest(token);
    }
  }, []);

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
