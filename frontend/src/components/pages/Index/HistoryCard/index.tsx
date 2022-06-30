import Image from "next/image";
import Link from "next/link";

import { HTMLAttributes } from "react";
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
  gameType: "룰렛" | "경마" | "사다리타기" | "제비뽑기";
  numPeople: number;
  date: string;
  onClick: () => void;
}
function HistoryCard({ title, gameType, numPeople, date, onClick, ...props }: Props) {
  return (
    <StyledHistoryCard>
      <StyledHistoryCardInfo>
        <StyledHistoryCardTitle>{title}</StyledHistoryCardTitle>
        <StyledHistoryCardDetail>
          {gameType} | {numPeople} 명
        </StyledHistoryCardDetail>
      </StyledHistoryCardInfo>
      <StyledHistoryCardAction>
        <StyledHistoryCardDate>{date}</StyledHistoryCardDate>
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
