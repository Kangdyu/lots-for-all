import { Dispatch, SetStateAction } from "react";
import { RouletteGameStatus } from ".";

interface DrawArcOption {
  name: string;
  color: string;
  rotation: number;
  angle: number;
}

export class Roulette {
  private centerX: number;
  private centerY: number;
  private participants: string[];
  private setGameStatus: Dispatch<SetStateAction<RouletteGameStatus>>;
  private setWinner: Dispatch<SetStateAction<string>>;

  private radius: number;
  private colorPalette: string[];
  private velocity: number;

  private winner: string;
  private rotation: number;
  private inGame: boolean;
  private rolling: boolean;

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    participants: string[],
    setGameStatus: Dispatch<SetStateAction<RouletteGameStatus>>,
    setWinner: Dispatch<SetStateAction<string>>
  ) {
    this.centerX = canvasWidth / 2;
    this.centerY = canvasHeight / 2 + 30;
    this.participants = participants;
    this.setGameStatus = setGameStatus;
    this.setWinner = setWinner;

    this.radius = 280;
    this.colorPalette = ["#FD89AD", "#FEBB9E", "#FBFF96", "#B1FFA2", "#AFCEFF", "#B999FE"];
    this.velocity = 0.2;

    this.winner = "";
    this.rotation = 0;
    this.inGame = true;
    this.rolling = true;
  }

  getColor(i: number) {
    if (i === 0) return this.colorPalette[0];
    const palette = this.colorPalette.slice(1, this.colorPalette.length);
    return palette[i % palette.length];
  }

  draw(ctx: CanvasRenderingContext2D) {
    const angle = (Math.PI * 2) / this.participants.length;
    this.participants.forEach((participant, idx) => {
      const rotation = this.rotation + angle * idx;
      const target = Math.PI * 1.5;
      const normalizedRotation = rotation % (Math.PI * 2);
      if (normalizedRotation <= target && normalizedRotation + angle >= target) {
        this.winner = participant;
      }

      this.drawArc(ctx, {
        name: participant,
        color: this.getColor(idx),
        rotation,
        angle,
      });
    });
    this.drawBoard(ctx);
    this.drawWinner(ctx);
  }

  drawArc(ctx: CanvasRenderingContext2D, options: DrawArcOption) {
    ctx.font = "30px GmarketSans";

    ctx.save();
    ctx.translate(this.centerX, this.centerY);
    ctx.rotate(options.rotation);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, this.radius, 0, options.angle);
    ctx.fillStyle = options.color;
    ctx.fill();

    ctx.restore();

    ctx.save();
    ctx.translate(this.centerX, this.centerY);
    ctx.rotate(options.rotation + options.angle * 0.5);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillText(options.name, this.radius / 2.5, 8);
    ctx.restore();
  }

  drawBoard(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.centerX - 10, 80);
    ctx.lineTo(this.centerX + 10, 80);
    ctx.lineTo(this.centerX, 115);
    ctx.fillStyle = "black";
    ctx.fill();
  }

  drawWinner(ctx: CanvasRenderingContext2D) {
    ctx.font = "30px GmarketSans";

    ctx.beginPath();
    ctx.textAlign = "center";
    ctx.fillText(this.winner, this.centerX, 50);
  }

  stop() {
    this.setGameStatus(RouletteGameStatus.STOPPING);
    this.rolling = false;
  }

  update(ctx: CanvasRenderingContext2D) {
    if (this.inGame) {
      this.rotation += this.velocity;
      if (!this.rolling) {
        this.velocity -= 0.0003;
      }

      if (this.velocity <= 0) {
        this.inGame = false;
        this.setGameStatus(RouletteGameStatus.END);
        this.setWinner(this.winner);
      }
    }
    this.draw(ctx);
  }
}
