import router from "next/router";

function logout() {
  localStorage.removeItem("token");
  router.push("/login");
}

export default logout;
