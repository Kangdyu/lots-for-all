import Layout from "components/common/Layout";

import Navigation from "components/common/Navigation";
import HistoryCard from "components/pages/Index/HistoryCard";
import useGameHistories from "hooks/useGameHistory";

import useUser from "hooks/useUser";
import { useRouter } from "next/router";
import { GameHistory } from "types/api";

const gameNames = [null, "lottery", "ladder", "roulette", "racing"];

function IndexPage() {
  // !user && !error => loading 중
  const { user } = useUser();
  console.log(user?.id);
  const { histories } = useGameHistories(user?.id);

  const router = useRouter();

  // const histories: GameHistory[] = [
  //   {
  //     type: GameType.Lottery, // 제비뽑기
  //     id: 1, // 기록 고유 번호
  //     title: "재미있는 데이터 만들기", // 기록 이름
  //     number: 13, // 인원 수
  //     content: [
  //       "추민옥",
  //       "송성준",
  //       "강서우",
  //       "설민혜",
  //       "하효연",
  //       "표대영",
  //       "황보영자",
  //       "복성진",
  //       "황신영",
  //       "김서윤",
  //       "하호석",
  //       "임규희",
  //       "설주옥",
  //     ], // 제비뽑기 전체 명단
  //     result: ["추민옥", "송성준"], // 뽑힌 명단
  //     createdAt: new Date(),
  //   },
  // ];

  return (
    <>
      <Navigation />
      <Layout>모두의 추첨</Layout>
      {histories?.map((gameHistory: GameHistory) => (
        <HistoryCard
          key={`${gameHistory.type}/${gameHistory.id}`}
          title={gameHistory.title}
          gameType={gameHistory.type}
          numPeople={gameHistory.number}
          date={gameHistory.createdAt}
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
  );
}

export default IndexPage;
