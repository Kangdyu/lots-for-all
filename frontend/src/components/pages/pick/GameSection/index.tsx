import { GameRoute } from "constants/games";
import { HTMLAttributes } from "react";
import { GameForm, GameFormContainer, GameParticipants } from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {
  game: GameRoute;
}

function GameSecton({ game, ...props }: Props) {
  return (
    <section {...props}>
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
