import { Dispatch, SetStateAction } from "react";
import { RacingGameStatus } from ".";

interface DrawHorseOption {
  name: string;
  x: number;
  y: number;
}

export class Racing {
  private canvasWidth: number;
  private canvasHeight: number;
  private participants: string[];
  private setGameStatus: Dispatch<SetStateAction<RacingGameStatus>>;
  private setResult: Dispatch<SetStateAction<string[]>>;

  private horseImage: HTMLImageElement;
  private originalImageWidth: number;
  private originalImageHeight: number;
  private imageWidth: number;
  private imageHeight: number;

  private inGame: boolean;

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    participants: string[],
    setGameStatus: Dispatch<SetStateAction<RacingGameStatus>>,
    setResult: Dispatch<SetStateAction<string[]>>
  ) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.participants = participants;
    this.setGameStatus = setGameStatus;
    this.setResult = setResult;

    this.inGame = false;

    this.horseImage = new Image();
    this.horseImage.src =
      "https://i.pinimg.com/originals/de/e3/58/dee3582eb486478b349ba3a56f4f2dd1.jpg";
    this.horseImage.addEventListener("load", () => (this.inGame = true), false);
    this.originalImageWidth = 548;
    this.originalImageHeight = 430;
    this.imageWidth = 60;
    this.imageHeight = 40;
  }

  drawStage(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.canvasWidth - 120, 0);
    ctx.lineTo(this.canvasWidth - 120, this.canvasHeight);
    ctx.lineWidth = 5;
    ctx.stroke();
  }

  drawHorse(ctx: CanvasRenderingContext2D, option: DrawHorseOption) {
    ctx.drawImage(
      this.horseImage,
      0,
      0,
      this.originalImageWidth,
      this.originalImageHeight,
      option.x,
      option.y,
      this.imageWidth,
      this.imageHeight
    );

    ctx.font = "14px GmarketSans";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText(option.name, this.imageWidth / 2 + option.x, option.y - 10);
  }

  update(ctx: CanvasRenderingContext2D) {
    if (this.inGame) {
      this.drawStage(ctx);
      this.participants.forEach((participant, idx) => {
        this.drawHorse(ctx, { name: participant, x: 10, y: 50 + (this.imageHeight + 30) * idx });
      });
    }
  }
}
