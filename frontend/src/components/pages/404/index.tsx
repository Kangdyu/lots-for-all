import Link from "next/link";
import { StyledH1, StyledSpan } from "./styles";

function Error404() {
  return (
    <>
      <StyledH1>죄송합니다. 요청하신 페이지를 찾을 수 없습니다. </StyledH1>
      <Link href="/">
        <StyledSpan>메인 화면으로 돌아가기</StyledSpan>
      </Link>
    </>
  );
}

export default Error404;
