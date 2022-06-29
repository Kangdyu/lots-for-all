export class Roulette {
  private centerX: number;
  private centerY: number;
  private participants: string[];
  private radius: number;
  private colorPalette: string[];

  constructor(canvasWidth: number, canvasHeight: number, participants: string[]) {
    this.centerX = canvasWidth / 2;
    this.centerY = canvasHeight / 2 + 30;
    this.participants = participants;
    this.radius = 280;
    this.colorPalette = ["#FD89AD", "#FEBB9E", "#FBFF96", "#B1FFA2", "#AFCEFF", "#B999FE"];
  }

  getColor(i: number) {
    if (i === 0) return this.colorPalette[0];
    const palette = this.colorPalette.slice(1, this.colorPalette.length);
    return palette[i % palette.length];
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.drawParticipants(ctx);
    this.drawBoard(ctx);
  }

  drawParticipants(ctx: CanvasRenderingContext2D) {
    const count = this.participants.length;
    const arcLength = (Math.PI * 2) / count;

    ctx.font = "30px GmarketSans";

    this.participants.forEach((participant, idx) => {
      ctx.beginPath();
      ctx.save();
      ctx.moveTo(this.centerX, this.centerY);
      ctx.arc(this.centerX, this.centerY, this.radius, arcLength * idx, arcLength * (idx + 1));
      ctx.fillStyle = this.getColor(idx);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(this.centerX, this.centerY);
      ctx.rotate(arcLength * (idx + 0.5));

      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.fillText(participant, this.radius / 2.5, 8);
      ctx.restore();
    });
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
}
