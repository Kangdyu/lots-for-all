import Layout from "components/common/Layout";
import Navigation from "components/common/Navigation";
import GroupSection from "components/pages/group/GroupSection";

function GroupsPage() {
  return (
    <>
      <Navigation />
      <Layout>
        <GroupSection />
      </Layout>
    </>
  );
}

export default GroupsPage;
