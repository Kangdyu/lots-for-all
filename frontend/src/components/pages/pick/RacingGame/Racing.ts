import { Dispatch, SetStateAction } from "react";
import { RacingGameStatus } from ".";

export class Racing {
  private inGame: boolean;

  private horseImage: HTMLImageElement;
  private originalImageWidth: number;
  private originalImageHeight: number;
  private imageWidth: number;
  private imageHeight: number;

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    participants: string[],
    setGameStatus: Dispatch<SetStateAction<RacingGameStatus>>,
    setResult: Dispatch<SetStateAction<string[]>>
  ) {
    this.inGame = false;

    this.horseImage = new Image();
    this.horseImage.src =
      "https://i.pinimg.com/originals/de/e3/58/dee3582eb486478b349ba3a56f4f2dd1.jpg";
    this.horseImage.addEventListener("load", () => (this.inGame = true), false);
    this.originalImageWidth = 548;
    this.originalImageHeight = 430;
    this.imageWidth = 90;
    this.imageHeight = 65;
  }

  update(ctx: CanvasRenderingContext2D) {
    if (this.inGame) {
      ctx.drawImage(
        this.horseImage,
        0,
        0,
        this.originalImageWidth,
        this.originalImageHeight,
        0,
        0,
        this.imageWidth,
        this.imageHeight
      );
    }
  }
}
