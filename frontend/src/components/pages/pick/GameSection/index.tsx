import Button from "components/common/Button";
import GameFormContainer, { GameFormValues } from "components/common/GameFormContainer";
import { GameRoute } from "constants/games";
import useClientRect from "hooks/useClientRect";
import { useRouter } from "next/router";
import { HTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import RacingGame from "../RacingGame";
import RouletteGame from "../RouletteGame";

interface Props extends HTMLAttributes<HTMLDivElement> {
  game: GameRoute;
}

function GameSecton({ game, ...props }: Props) {
  const router = useRouter();
  const [inGame, setInGame] = useState(false);

  useEffect(() => {
    setInGame(false);
  }, [router]);

  const gameFormRef = useRef<GameFormValues>(null);

  const startGame = useCallback(() => {
    setInGame(true);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const { width } = useClientRect(sectionRef);

  const GameComponent = () => {
    if (gameFormRef.current) {
      if (game === "lottery") return <div>Lottery</div>;
      else if (game === "roulette")
        return (
          <RouletteGame
            canvasWidth={width}
            canvasHeight={700}
            participants={gameFormRef.current.participants}
          />
        );
      else
        return (
          <RacingGame
            canvasWidth={width}
            canvasHeight={100 + gameFormRef.current.participants.length * 65}
            participants={gameFormRef.current.participants}
          />
        );
    } else {
      return null;
    }
  };

  return (
    <section ref={sectionRef} {...props}>
      <div css={{ display: inGame ? "none" : "block" }}>
        <GameFormContainer ref={gameFormRef} />
        <Button css={{ width: "100%" }} onClick={startGame} variant="danger">
          게임 시작
        </Button>
      </div>
      {inGame && <GameComponent />}
    </section>
  );
}

export default GameSecton;
