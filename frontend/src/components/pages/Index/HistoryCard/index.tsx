import Image from "next/image";
import Link from "next/link";

import { HTMLAttributes, useEffect, useState } from "react";
import { GameType } from "types/api";
import playButton from "../../../../../public/images/playButton.svg";

import {
  StyledHistoryCard,
  StyledHistoryCardAction,
  StyledHistoryCardDate,
  StyledHistoryCardDetail,
  StyledHistoryCardInfo,
  StyledHistoryCardTitle,
} from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  gameType: GameType;
  numPeople: number;
  date: Date;
  onClick: () => void;
}
function HistoryCard({ title, gameType, numPeople, date, onClick, ...props }: Props) {
  const [gameName, setGameName] = useState("");
  useEffect(() => {
    switch (gameType) {
      case 1:
        setGameName("제비뽑기");
        break;
      case 2:
        setGameName("사다리타기");
        break;
      // code block
      case 3:
        setGameName("룰렛");
        break;
      case 4:
        setGameName("경마");
        break;
      default:
        setGameName("");
    }
  }, [gameType]);

  return (
    <StyledHistoryCard>
      <StyledHistoryCardInfo>
        <StyledHistoryCardTitle>{title}</StyledHistoryCardTitle>
        <StyledHistoryCardDetail>
          {gameName} | {numPeople} 명
        </StyledHistoryCardDetail>
      </StyledHistoryCardInfo>
      <StyledHistoryCardAction>
        <StyledHistoryCardDate>{date.toString()}</StyledHistoryCardDate>
        <Link href="/">
          <a onClick={onClick}>
            <Image width={40} height={40} src={playButton} alt="playButton" />
          </a>
        </Link>
      </StyledHistoryCardAction>
    </StyledHistoryCard>
  );
}

export default HistoryCard;
