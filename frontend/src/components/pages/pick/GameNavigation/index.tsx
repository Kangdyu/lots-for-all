import { GAME_ROUTES } from "constants/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import { HTMLAttributes } from "react";
import { GameNavBar, GameNavigationAnchor } from "./styles";

interface Props extends HTMLAttributes<HTMLElement> {}

function GameNavigation({ ...props }: Props) {
  const { asPath } = useRouter();

  return (
    <GameNavBar {...props}>
      {GAME_ROUTES.map((route) => (
        <Link key={route.path} href={route.path} passHref>
          <GameNavigationAnchor selected={asPath === route.path} disabled={route.disable}>
            {route.name}
          </GameNavigationAnchor>
        </Link>
      ))}
    </GameNavBar>
  );
}

export default GameNavigation;
