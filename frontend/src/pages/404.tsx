import Layout from "components/common/Layout";
import ErrorLayout from "components/common/Layout/ErrorLayout";

import Navigation from "components/common/Navigation";
import Error404 from "components/pages/404";

function IndexPage() {
  return (
    <>
      <Navigation />
      <Layout>
        <ErrorLayout>
          <Error404></Error404>
        </ErrorLayout>
      </Layout>
    </>
  );
}

export default IndexPage;
