import Button from "components/common/Button";
import GameFormContainer, { GameFormValues } from "components/common/GameFormContainer";
import Modal from "components/common/Modal";
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

  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const openModal = (modalText: string) => {
    setModalText(modalText);
    setShowModal(true);
  };
  const startGame = useCallback(() => {
    if (gameFormRef.current) {
      if (gameFormRef.current.title === "") {
        openModal("게임 제목을 입력해주세요.");
      } else if (gameFormRef.current.participants.length < 2) {
        openModal("두 명 이상의 인원이 필요합니다.");
      } else {
        setInGame(true);
      }
    }
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const { width } = useClientRect(sectionRef);

  const GameComponent = () => {
    if (gameFormRef.current) {
      if (game === "lottery") return <div>Lottery</div>;
      else if (game === "roulette")
        return (
          <RouletteGame
            gameTitle={gameFormRef.current.title}
            canvasWidth={width}
            canvasHeight={700}
            participants={gameFormRef.current.participants}
          />
        );
      else
        return (
          <RacingGame
            gameTitle={gameFormRef.current.title}
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
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {modalText}
      </Modal>
      {inGame && <GameComponent />}
    </section>
  );
}

export default GameSecton;
