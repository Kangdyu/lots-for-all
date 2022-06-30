import styled from "@emotion/styled";
import Layout from "components/common/Layout";

import Navigation from "components/common/Navigation";
import SectionTitle from "components/common/SectionTitle";
import HistoryCard from "components/pages/Index/HistoryCard";
import useGameHistories from "hooks/useGameHistory";

import useUser from "hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import { GameHistory } from "types/api";

const gameNames = [null, "lottery", "ladder", "roulette", "racing"];

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 40px;
`;

const NewGameAnchor = styled.a`
  display: block;

  font-size: 24px;
  font-weight: 400;
  text-align: center;
  text-decoration: underline;
  color: ${(props) => props.theme.color.primary700};

  margin-bottom: 100px;
`;

function IndexPage() {
  const { user, loggedOut } = useUser();
  const { histories } = useGameHistories(user?.id);

  const router = useRouter();

  return (
    <>
      <Navigation />
      <Layout>
        <Title>새로운 게임을 시작해보세요!</Title>
        <Link href="/pick" passHref>
          <NewGameAnchor>게임 시작하기 &gt;</NewGameAnchor>
        </Link>
        {!loggedOut && (
          <>
            <SectionTitle css={{ marginBottom: "24px" }}>최근 플레이한 게임</SectionTitle>

            {histories?.length === 0
              ? "플레이한 게임이 없습니다."
              : histories?.map((gameHistory: GameHistory) => (
                  <HistoryCard
                    gameHistoryId={gameHistory.id}
                    key={`${gameHistory.type}/${gameHistory.id}`}
                    title={gameHistory.title}
                    gameType={gameHistory.type}
                    numPeople={gameHistory.number}
                    date={gameHistory.createdAt}
                    people={gameHistory.content}
                    winner={gameHistory.result}
                    onClick={() => {
                      router.push(
                        "/pick/" +
                          gameNames[gameHistory.type] +
                          "?title=" +
                          gameHistory.title +
                          "&group=" +
                          gameHistory.content,
                        "/pick/" + gameNames[gameHistory.type]
                      );
                    }}
                  />
                ))}
          </>
        )}
      </Layout>
    </>
  );
}

export default IndexPage;
