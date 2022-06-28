import Image from "next/image";
import { HTMLAttributes } from "react";
import { GameCardContainer, GameCardName } from "./styles";
import lotteryImage from "public/images/lottery.png";

interface Props extends HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  imageAlt?: string;
  name: string;
}

function GameCard({ imageSrc, imageAlt = "Game image", name, ...props }: Props) {
  return (
    <GameCardContainer {...props}>
      <Image src={lotteryImage} alt={imageAlt} width={160} height={160} />
      <GameCardName>{name}</GameCardName>
    </GameCardContainer>
  );
}

export default GameCard;
