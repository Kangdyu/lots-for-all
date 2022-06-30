import Layout from "components/common/Layout";

import Navigation from "components/common/Navigation";

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
      <Layout>모두의 추첨</Layout>
    </>
  );
}

export default IndexPage;
