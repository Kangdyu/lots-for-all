import { Dispatch, SetStateAction } from "react";
import { RacingGameStatus } from ".";

export class Racing {
  constructor(
    canvasWidth: number,
    canvasHeight: number,
    participants: string[],
    setGameStatus: Dispatch<SetStateAction<RacingGameStatus>>,
    setResult: Dispatch<SetStateAction<string[]>>
  ) {}

  update(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(0, 0, 200, 200);
  }
}
