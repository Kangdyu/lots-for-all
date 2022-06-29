import Button from "components/common/Button";
import SectionTitle from "components/common/SectionTitle";
import { GameRoute } from "constants/games";
import { FormEvent, HTMLAttributes, useCallback, useRef, useState } from "react";
import { Flex, StyledInput } from "./styles";

interface Props extends HTMLAttributes<HTMLDivElement> {
  game: GameRoute;
}

function GameSecton({ game, ...props }: Props) {
  const [list, setList] = useState<string[]>([]);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const handleListSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameInputRef.current) {
      const name = nameInputRef.current.value;
      setList((p) => p.concat(name));
      nameInputRef.current.value = "";
    }
  }, []);

  return (
    <section {...props}>
      <SectionTitle css={{ marginBottom: "24px" }}>기본 설정</SectionTitle>
      <form onSubmit={handleListSubmit}>
        <Flex css={{ justifyContent: "space-between", marginBottom: "40px" }}>
          <Flex>
            <StyledInput type="text" label="제목" placeholder="게임 제목 입력" />
            <StyledInput
              type="text"
              label="인원 / 항목"
              placeholder="추가할 인원 / 항목 입력"
              ref={nameInputRef}
            />
            <Button>명단</Button>
          </Flex>
          <Flex>
            <Button css={{ marginRight: "8px" }}>프리셋</Button>
            <Button>최근 플레이</Button>
          </Flex>
        </Flex>
        <SectionTitle css={{ marginBottom: "12px" }}>참여 인원</SectionTitle>
        <Flex>
          {list.map((item, idx) => (
            <span key={idx} css={{ marginRight: "8px" }}>
              {item}
            </span>
          ))}
        </Flex>
      </form>
    </section>
  );
}

export default GameSecton;
