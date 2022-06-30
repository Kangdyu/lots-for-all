import Button from "components/common/Button";
import Modal from "components/common/Modal";
import useCanvas from "hooks/useCanvas";
import { useRouter } from "next/router";
import { HTMLAttributes, useMemo, useState } from "react";
import { Roulette } from "./Roulette";
import { ResultText, RouletteGameContainer } from "./styles";

export enum RouletteGameStatus {
  "ROLLING",
  "STOPPING",
  "END",
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  canvasWidth: number;
  canvasHeight: number;
  participants: string[];
}

function RouletteGame({ canvasWidth, canvasHeight, participants, ...props }: Props) {
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

  return (
    <RouletteGameContainer {...props}>
      <canvas ref={canvasRef}>Canvas를 지원하지 않는 브라우저입니다.</canvas>
      {gameStatus === RouletteGameStatus.ROLLING && (
        <Button onClick={handleStopButtonClick} variant="danger">
          정지
        </Button>
      )}
      {gameStatus === RouletteGameStatus.END && (
        <Modal title="추첨 결과" show={true} onClose={() => router.push("/pick")}>
          <ResultText>{winner}</ResultText>
        </Modal>
      )}
    </RouletteGameContainer>
  );
}

export default RouletteGame;
