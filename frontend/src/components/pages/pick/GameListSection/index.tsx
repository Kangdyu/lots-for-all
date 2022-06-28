import { css } from "@emotion/react";
import SectionTitle from "components/common/SectionTitle";
import { GameAnchor, GameContainer } from "./styles";
import lotteryImage from "public/images/lottery.png";
import rouletteImage from "public/images/roulette.png";
import racingImage from "public/images/racing.png";
import Link from "next/link";
import GameCard from "components/common/GameCard";

function GameListSection() {
  return (
    <section>
      <SectionTitle
        css={css`
          text-align: center;
          margin-bottom: 150px;
        `}
      >
        플레이할 게임을 선택해주세요
      </SectionTitle>
      <GameContainer>
        <Link href="/pick/lottery" passHref>
          <GameAnchor>
            <GameCard name="제비뽑기" imageSrc={lotteryImage} />
          </GameAnchor>
        </Link>
        <Link href="/pick/roulette" passHref>
          <GameAnchor>
            <GameCard name="룰렛" imageSrc={rouletteImage} />
          </GameAnchor>
        </Link>
        <Link href="/pick/racing" passHref>
          <GameAnchor>
            <GameCard name="경마" imageSrc={racingImage} />
          </GameAnchor>
        </Link>
      </GameContainer>
    </section>
  );
}

export default GameListSection;
