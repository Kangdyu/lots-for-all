import useCanvas from "hooks/useCanvas";
import { CanvasHTMLAttributes } from "react";
import { Roulette } from "./Roulette";

interface Props extends CanvasHTMLAttributes<HTMLCanvasElement> {
  canvasWidth: number;
  canvasHeight: number;
  participants: string[];
}

function RouletteGame({ canvasWidth, canvasHeight, participants, ...props }: Props) {
  const fillBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  const roulette = new Roulette(canvasWidth, canvasHeight, participants);

  const animate = (ctx: CanvasRenderingContext2D) => {
    fillBackground(ctx);
    roulette.drawBoard(ctx);
  };

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate);

  return <canvas ref={canvasRef} {...props}></canvas>;
}

export default RouletteGame;
