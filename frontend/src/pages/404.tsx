import Layout from "components/common/Layout";
import ErrorLayout from "components/common/Layout/ErrorLayout";

import Navigation from "components/common/Navigation";
import Error404 from "components/pages/404";

function IndexPage() {
  // login 여부 체크
  // const userId = 1;
  // async function userInfoRequest() {
  //   const token = localStorage.getItem("token");
  //   console.log(token);
  //   axios.get("/users/" + userId, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
  //     console.log(res.data);
  //   });
  // }

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
