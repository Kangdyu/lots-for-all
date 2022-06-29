import { Dispatch, SetStateAction } from "react";
import { RacingGameStatus } from ".";

interface DrawHorseOption {
  name: string;
  x: number;
  y: number;
  rank?: number;
}

interface Player {
  name: string;
  velocity: number;
  x: number;
  y: number;
  goal: boolean;
  rank?: number;
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
  private players: Player[];
  private ranking: string[];

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

    this.horseImage = new Image();
    this.horseImage.src =
      "https://i.pinimg.com/originals/de/e3/58/dee3582eb486478b349ba3a56f4f2dd1.jpg";
    this.horseImage.addEventListener("load", () => (this.inGame = true), false);
    this.originalImageWidth = 548;
    this.originalImageHeight = 430;
    this.imageWidth = 60;
    this.imageHeight = 40;

    this.inGame = false;
    this.players = this.participants.map((participant, idx) => ({
      name: participant,
      velocity: Math.random() * 0.5,
      x: 10,
      y: 50 + (this.imageHeight + 30) * idx,
      goal: false,
      rank: undefined,
    }));
    this.ranking = [];
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

    if (option.rank) {
      ctx.font = "18px GmarketSans";
      if (option.rank === 1) {
        ctx.fillStyle = "#E5B80B";
      } else if (option.rank === 2) {
        ctx.fillStyle = "#A8A9AD";
      } else if (option.rank === 3) {
        ctx.fillStyle = "#CD7F32";
      }
      ctx.fillText(
        option.rank.toString(),
        this.imageWidth + option.x + 20,
        this.imageHeight / 2 + option.y
      );
    }
  }

  getVelocityDeltaWithScore(currentVelocity: number) {
    let delta;
    if (currentVelocity > 1) {
      delta = Math.random() * 0.01 - 0.02;
    } else if (currentVelocity > 0.3) {
      delta = Math.random() * 0.1 - 0.05;
    } else {
      delta = Math.random();
    }

    return delta;
  }

  update(ctx: CanvasRenderingContext2D) {
    if (this.inGame) {
      this.players.forEach((player) => {
        if (!player.goal) {
          player.velocity += this.getVelocityDeltaWithScore(player.velocity);
          player.x += player.velocity;
          if (player.x >= this.canvasWidth - 120) {
            this.ranking.push(player.name);
            player.goal = true;
            player.rank = this.ranking.length;
          }
          if (player.x <= 0) player.x = 0;
        }
        this.drawHorse(ctx, {
          name: player.name,
          x: player.x,
          y: player.y,
          rank: player.rank,
        });
      });
    }
    this.drawStage(ctx);
  }
}
