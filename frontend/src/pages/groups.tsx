import Layout from "components/common/Layout";
import Navigation from "components/common/Navigation";
import GroupSection from "components/pages/group/GroupSection";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";

function GroupsPage() {
  const router = useRouter();
  const { loggedOut } = useUser();

  useEffect(() => {
    if (loggedOut) {
      router.replace("/login");
    }
  }, [router, loggedOut]);

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
