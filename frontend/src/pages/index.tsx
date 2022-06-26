import styled from "@emotion/styled";

const Test = styled.div`
  width: 500px;
  margin: 0 auto;
`;

function IndexPage() {
  return <Test css={{ color: "dodgerblue" }}>모두의 추첨</Test>;
}

export default IndexPage;
