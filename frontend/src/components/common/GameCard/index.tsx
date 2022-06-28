import Image, { StaticImageData } from "next/image";
import { HTMLAttributes } from "react";
import { GameCardContainer, GameCardName } from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {
  imageSrc: StaticImageData;
  imageAlt?: string;
  name: string;
}

function GameCard({ imageSrc, imageAlt = "Game image", name, ...props }: Props) {
  return (
    <GameCardContainer {...props}>
      <Image src={imageSrc} alt={imageAlt} width={160} height={160} />
      <GameCardName>{name}</GameCardName>
    </GameCardContainer>
  );
}

export default GameCard;
