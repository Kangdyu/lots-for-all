import Button from "components/common/Button";
import SectionTitle from "components/common/SectionTitle";
import { GameRoute } from "constants/games";
import { FormEvent, HTMLAttributes, useCallback, useRef, useState } from "react";
import { Flex, NameListContainer, NameListForm, StyledInput, StyledNameTag } from "./styles";

interface NameListItem {
  id: string;
  name: string;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  game: GameRoute;
}

function GameSecton({ game, ...props }: Props) {
  const [nameList, setNameList] = useState<NameListItem[]>([]);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const handleListSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameInputRef.current) {
      const name = nameInputRef.current.value;
      if (name === "") return;
      setNameList((p) => p.concat({ id: Date.now().toString(), name }));
      nameInputRef.current.value = "";
    }
  }, []);

  return (
    <section {...props}>
      <Flex css={{ justifyContent: "space-between", marginBottom: "24px" }}>
        <SectionTitle>기본 설정</SectionTitle>
        <Flex>
          <Button css={{ marginRight: "8px" }}>프리셋</Button>
          <Button>최근 플레이</Button>
        </Flex>
      </Flex>
      <Flex css={{ justifyContent: "space-between", marginBottom: "40px" }}>
        <NameListForm onSubmit={handleListSubmit}>
          <StyledInput type="text" label="제목" placeholder="게임 제목 입력" />
          <StyledInput
            type="text"
            label="인원 / 항목"
            placeholder="추가할 인원 / 항목 입력"
            ref={nameInputRef}
          />
          <Button type="submit" css={{ marginRight: "8px" }}>
            추가
          </Button>
          <Button type="button">명단에서 추가</Button>
        </NameListForm>
      </Flex>

      <SectionTitle css={{ marginBottom: "24px" }}>참여 인원</SectionTitle>
      <NameListContainer>
        {nameList.map((item) => (
          <StyledNameTag
            key={item.id}
            onDelete={() => setNameList((p) => p.filter((pItem) => pItem.id !== item.id))}
          >
            {item.name}
          </StyledNameTag>
        ))}
      </NameListContainer>
    </section>
  );
}

export default GameSecton;
