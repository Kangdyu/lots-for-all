import axios from "axios";
import useGameHistories from "hooks/useGameHistory";
import useUser from "hooks/useUser";
import Image from "next/image";
import Link from "next/link";

import { HTMLAttributes, useEffect, useState } from "react";
import { GameType } from "types/api";
import playButton from "../../../../../public/images/playButton.svg";
import transhCanIcon from "../../../../../public/images/trashCan.svg";

import {
  StyledHistoryCard,
  StyledHistoryCardAction,
  StyledHistoryCardDate,
  StyledHistoryCardDetail,
  StyledHistoryCardIcon,
  StyledHistoryCardInfo,
  StyledHistoryCardTitle,
} from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {
  gameHistoryId: number;
  title: string;
  gameType: GameType;
  numPeople: number;
  date: Date;
  onClick: () => void;
}
function HistoryCard({
  gameHistoryId,
  title,
  gameType,
  numPeople,
  date,
  onClick,
  ...props
}: Props) {
  const { user } = useUser();

  const { mutate } = useGameHistories(user?.id);
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

  async function deleteHistory() {
    // TODO: password frontend hashing
    const token = localStorage.getItem("token");

    if (user) {
      await axios
        .delete("/users/" + user.id + "/histories/" + gameHistoryId + "?type=" + gameType, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          mutate();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return false;
  }

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
            <StyledHistoryCardIcon>
              <Image width={40} height={40} src={playButton} alt="playButton" />
            </StyledHistoryCardIcon>
          </a>
        </Link>
        <Link href="/">
          <a onClick={deleteHistory}>
            <StyledHistoryCardIcon>
              <Image width={40} height={40} src={transhCanIcon} alt="trashCanIcon" />
            </StyledHistoryCardIcon>
          </a>
        </Link>
      </StyledHistoryCardAction>
    </StyledHistoryCard>
  );
}

export default HistoryCard;
