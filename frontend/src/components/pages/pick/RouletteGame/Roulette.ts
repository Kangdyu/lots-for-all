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

  private radius: number;
  private colorPalette: string[];
  private velocity: number;

  private rotation: number;

  constructor(canvasWidth: number, canvasHeight: number, participants: string[]) {
    this.centerX = canvasWidth / 2;
    this.centerY = canvasHeight / 2 + 30;
    this.participants = participants;

    this.radius = 280;
    this.colorPalette = ["#FD89AD", "#FEBB9E", "#FBFF96", "#B1FFA2", "#AFCEFF", "#B999FE"];
    this.velocity = 0.2;

    this.rotation = 0;
  }

  getColor(i: number) {
    if (i === 0) return this.colorPalette[0];
    const palette = this.colorPalette.slice(1, this.colorPalette.length);
    return palette[i % palette.length];
  }

  draw(ctx: CanvasRenderingContext2D) {
    const angle = (Math.PI * 2) / this.participants.length;
    this.participants.map((participant, idx) =>
      this.drawArc(ctx, {
        name: participant,
        color: this.getColor(idx),
        rotation: this.rotation + angle * idx,
        angle,
      })
    );
    this.drawBoard(ctx);
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

  update(ctx: CanvasRenderingContext2D) {
    this.rotation += this.velocity;
    this.draw(ctx);
  }
}
