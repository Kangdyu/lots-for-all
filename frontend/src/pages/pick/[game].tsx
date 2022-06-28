import Layout from "components/common/Layout";
import Navigation from "components/common/Navigation";
import GameSecton from "components/pages/pick/GameSection";
import { GetStaticPaths, GetStaticProps } from "next";
import { GameRoute, GAMES } from "constants/games";

interface Props {
  game: GameRoute;
}

function GamePage({ game }: Props) {
  return (
    <>
      <Navigation />
      <Layout>
        <GameSecton game={game} />
      </Layout>
    </>
  );
}

export default GamePage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: GAMES.map((game) => ({ params: { game } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  return {
    props: {
      game: params?.game,
    },
  };
};
