import { GameRoute } from "constants/games";
import { GAME_ROUTES } from "constants/routes";
import Link from "next/link";
import { HTMLAttributes } from "react";
import {
  GameForm,
  GameFormContainer,
  GameNavigation,
  GameNavigationAnchor,
  GameParticipants,
} from "./styles";

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
      <GameFormContainer>
        <GameForm>
          <h2>게임 설정</h2>
        </GameForm>
        <GameParticipants>
          <h2>인원</h2>
        </GameParticipants>
      </GameFormContainer>
    </section>
  );
}

export default GameSecton;
