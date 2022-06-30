import axios from "axios";
import Modal from "components/common/Modal";
import useCanvas from "hooks/useCanvas";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";
import { HTMLAttributes, useCallback, useState } from "react";
import { Racing } from "./Racing";
import { Container, RankingListItem } from "./styles";

export enum RacingGameStatus {
  "INGAME",
  "END",
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  gameTitle: string;
  canvasWidth: number;
  canvasHeight: number;
  participants: string[];
}

function RacingGame({ gameTitle, canvasWidth, canvasHeight, participants, ...props }: Props) {
  const { user } = useUser();

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

  const handleModalButtonClick = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (user && token) {
      try {
        await axios.post(
          `/users/${user.id}/histories`,
          {
            type: 4,
            title: gameTitle,
            number: participants.length,
            content: participants,
            result,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.log(error);
      }
    }
    router.push("/pick");
  }, [result]);

  return (
    <Container {...props}>
      <canvas ref={canvasRef}>Canvas를 지원하지 않는 브라우저입니다.</canvas>
      {gameStatus === RacingGameStatus.END && (
        <Modal title="결과" show={true} onClose={handleModalButtonClick}>
          <ul>
            {result.map((name, idx) => (
              <RankingListItem key={idx}>
                {idx + 1}위: {name}
              </RankingListItem>
            ))}
          </ul>
        </Modal>
      )}
    </Container>
  );
}

export default RacingGame;
