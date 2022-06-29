import Button from "components/common/Button";
import useCanvas from "hooks/useCanvas";
import { HTMLAttributes, useMemo, useState } from "react";
import { Roulette } from "./Roulette";
import { RouletteGameContainer } from "./styles";

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
  const [status, setStatus] = useState<RouletteGameStatus>(RouletteGameStatus.ROLLING);

  const roulette = useMemo(() => new Roulette(canvasWidth, canvasHeight, participants), []);

  const fillBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#F0F0FC";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  const animate = (ctx: CanvasRenderingContext2D) => {
    fillBackground(ctx);
    roulette.update(ctx);
  };

  const handleStopButtonClick = () => {
    setStatus(RouletteGameStatus.STOPPING);
    roulette.stop();
  };

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate);

  return (
    <RouletteGameContainer {...props}>
      <canvas ref={canvasRef}>Canvas를 지원하지 않는 브라우저입니다.</canvas>
      {status === RouletteGameStatus.ROLLING && (
        <Button onClick={handleStopButtonClick} variant="danger">
          정지
        </Button>
      )}
    </RouletteGameContainer>
  );
}

export default RouletteGame;
