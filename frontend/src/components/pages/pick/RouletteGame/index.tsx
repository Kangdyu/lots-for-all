import axios from "axios";
import Button from "components/common/Button";
import Modal from "components/common/Modal";
import useCanvas from "hooks/useCanvas";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";
import { HTMLAttributes, useCallback, useMemo, useState } from "react";
import { Roulette } from "./Roulette";
import { ResultText, RouletteGameContainer } from "./styles";

export enum RouletteGameStatus {
  "ROLLING",
  "STOPPING",
  "END",
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  gameTitle: string;
  canvasWidth: number;
  canvasHeight: number;
  participants: string[];
}

function RouletteGame({ gameTitle, canvasWidth, canvasHeight, participants, ...props }: Props) {
  const { user } = useUser();

  const router = useRouter();

  const [gameStatus, setGameStatus] = useState<RouletteGameStatus>(RouletteGameStatus.ROLLING);
  const [winner, setWinner] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [roulette, _] = useState(
    new Roulette(canvasWidth, canvasHeight, participants, setGameStatus, setWinner)
  );

  const fillBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#F0F0FC";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  const animate = (ctx: CanvasRenderingContext2D) => {
    fillBackground(ctx);
    roulette.update(ctx);
  };

  const handleStopButtonClick = () => {
    roulette.stop();
  };

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate);

  const handleModalButtonClick = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (user && token) {
      try {
        await axios.post(
          `/users/${user.id}/histories`,
          {
            type: 3,
            title: gameTitle,
            number: participants.length,
            content: participants,
            result: winner,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.log(error);
      }
    }
    router.push("/pick");
  }, []);

  return (
    <RouletteGameContainer {...props}>
      <canvas ref={canvasRef}>Canvas를 지원하지 않는 브라우저입니다.</canvas>
      {gameStatus === RouletteGameStatus.ROLLING && (
        <Button onClick={handleStopButtonClick} variant="danger">
          정지
        </Button>
      )}
      {gameStatus === RouletteGameStatus.END && (
        <Modal title="추첨 결과" show={true} onClose={handleModalButtonClick}>
          <ResultText>{winner}</ResultText>
        </Modal>
      )}
    </RouletteGameContainer>
  );
}

export default RouletteGame;
