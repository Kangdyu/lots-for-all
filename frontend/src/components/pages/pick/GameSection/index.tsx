import { GameRoute } from "constants/games";
import { GAME_ROUTES } from "constants/routes";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { GameNavigation, GameNavigationAnchor } from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {
  game: GameRoute;
}

function GameSecton({ game, ...props }: Props) {
  return (
    <section {...props}>
      <GameNavigation>
        {GAME_ROUTES.map((route, idx) => (
          <Link key={route.path} href={route.path} passHref>
            <GameNavigationAnchor selected={`/pick/${game}` === route.path}>
              {route.name}
            </GameNavigationAnchor>
          </Link>
        ))}
      </GameNavigation>
    </section>
  );
}

export default GameSecton;
