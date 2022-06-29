export class Roulette {
  private centerX: number;
  private centerY: number;
  private participants: string[];

  constructor(canvasWidth: number, canvasHeight: number, participants: string[]) {
    this.centerX = canvasWidth / 2;
    this.centerY = canvasHeight / 2;
    this.participants = participants;
  }

  drawBoard(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY + 30, 280, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.centerX - 10, 80);
    ctx.lineTo(this.centerX + 10, 80);
    ctx.lineTo(this.centerX, 115);
    ctx.fillStyle = "black";
    ctx.fill();
  }
}
