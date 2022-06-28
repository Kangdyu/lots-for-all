import Layout from "components/common/Layout";
import Navigation from "components/common/Navigation";
import GameListSection from "components/pages/pick/GameListSection";

function PickPage() {
  return (
    <>
      <Navigation />
      <Layout>
        <GameListSection />
      </Layout>
    </>
  );
}

export default PickPage;
