import axios from "axios";
import Modal from "components/common/Modal";
import useGameHistories from "hooks/useGameHistory";
import useUser from "hooks/useUser";
import Image from "next/image";
import Link from "next/link";

import { HTMLAttributes, useEffect, useState } from "react";
import { GameType } from "types/api";
import playButton from "../../../../../public/images/playButton.svg";
import transhCanIcon from "../../../../../public/images/trashCan.svg";

import {
  Span,
  StyledHistoryCard,
  StyledHistoryCardAction,
  StyledHistoryCardDate,
  StyledHistoryCardDetail,
  StyledHistoryCardIcon,
  StyledHistoryCardInfo,
  StyledHistoryCardTitle,
  StyledHistoryDetailContent,
  StyledNameContent,
} from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {
  gameHistoryId: number;
  title: string;
  gameType: GameType;
  numPeople: number;
  date: Date;
  people: string[];
  winner: string[] | string;
  onClick: () => void;
}
function HistoryCard({
  gameHistoryId,
  title,
  gameType,
  numPeople,
  date,
  onClick,
  people,
  winner,
  ...props
}: Props) {
  const [showModal, setShowModal] = useState(false);
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
    <>
      <Modal
        show={showModal}
        title={title}
        onClose={() => {
          setShowModal(false);
        }}
        showButton={false}
      >
        <StyledHistoryDetailContent>
          <Span css={{ fontWeight: 400 }}>플레이 날짜</Span>
          <Span>{date.toString()}</Span>
          <Span css={{ fontWeight: 400 }}>참가 인원 수</Span>
          <Span>{numPeople} 명</Span>
          <Span css={{ fontWeight: 400 }}>참가 인원</Span>
          <StyledNameContent>
            {people?.map((person: string, i) => (
              <Span key={i}>{person}</Span>
            ))}
          </StyledNameContent>
          <Span css={{ fontWeight: 400 }}>우승 인원</Span>
          <StyledNameContent>
            {typeof winner === "string" ? (
              <Span>{winner}</Span>
            ) : (
              winner?.map((winner: string, i) => <Span key={i}>{winner}</Span>)
            )}
          </StyledNameContent>
        </StyledHistoryDetailContent>
      </Modal>
      <StyledHistoryCard
        onClick={({ target, currentTarget }) => {
          if (target === currentTarget) {
            setShowModal(true);
          }
        }}
      >
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
    </>
  );
}

export default HistoryCard;
