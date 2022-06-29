import useCanvas from "hooks/useCanvas";
import { HTMLAttributes, useState } from "react";
import { Racing } from "./Racing";

export enum RacingGameStatus {
  "INGAME",
  "END",
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  canvasWidth: number;
  canvasHeight: number;
  participants: string[];
}

function RacingGame({ canvasWidth, canvasHeight, participants, ...props }: Props) {
  const [gameStatus, setGameStatus] = useState<RacingGameStatus>(RacingGameStatus.INGAME);
  const [result, setResult] = useState<string[]>([]);

  // eslint-disable-next-line no-unused-vars
  const [racing, _] = useState(
    new Racing(canvasWidth, canvasHeight, participants, setGameStatus, setResult)
  );
  const fillBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  const animate = (ctx: CanvasRenderingContext2D) => {
    fillBackground(ctx);
    racing.update(ctx);
  };

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate);

  return (
    <div {...props}>
      <canvas ref={canvasRef}>Canvas를 지원하지 않는 브라우저입니다.</canvas>
    </div>
  );
}

export default RacingGame;
