import Modal from "components/common/Modal";
import useCanvas from "hooks/useCanvas";
import { useRouter } from "next/router";
import { HTMLAttributes, useState } from "react";
import { Racing } from "./Racing";
import { RankingListItem } from "./styles";

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
  const router = useRouter();

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
      {gameStatus === RacingGameStatus.END && (
        <Modal title="결과" show={true} onClose={() => router.push("/pick")}>
          <ul>
            {result.map((name, idx) => (
              <RankingListItem key={idx}>
                {idx + 1}위: {name}
              </RankingListItem>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
}

export default RacingGame;
