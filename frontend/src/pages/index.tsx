import Layout from "components/common/Layout";

import Navigation from "components/common/Navigation";
import { useState } from "react";
import { MenuBarContext } from "shared/MenuBarContext";

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
  const [isShown, setIsShown] = useState(false);

  return (
    <MenuBarContext.Provider value={{ isShown, setIsShown }}>
      <Navigation />
      <Layout>모두의 추첨</Layout>
    </MenuBarContext.Provider>
  );
}

export default IndexPage;
