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

  return (
    <>
      <Navigation />
      <Layout>모두의 추첨</Layout>
      {histories?.map((gameHistory: GameHistory) => (
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
  );
}

export default IndexPage;
