import Button from "components/common/Button";
import SectionTitle from "components/common/SectionTitle";
import { GameRoute } from "constants/games";
import useClientRect from "hooks/useClientRect";
import { useRouter } from "next/router";
import { FormEvent, HTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import RacingGame from "../RacingGame";
import RouletteGame from "../RouletteGame";
import { Flex, NameListContainer, NameListForm, StyledInput, StyledNameTag } from "./styles";

interface NameListItem {
  id: string;
  name: string;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  game: GameRoute;
}

function GameSecton({ game, ...props }: Props) {
  const router = useRouter();
  const [inGame, setInGame] = useState(false);

  useEffect(() => {
    setInGame(false);
  }, [router]);

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

  const startGame = useCallback(() => {
    // some validations

    setInGame(true);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const { width } = useClientRect(sectionRef);

  const GameComponent = () => {
    if (game === "lottery") return <div>Lottery</div>;
    else if (game === "roulette")
      return (
        <RouletteGame
          canvasWidth={width}
          canvasHeight={700}
          participants={nameList.map((item) => item.name)}
        />
      );
    else
      return (
        <RacingGame
          canvasWidth={width}
          canvasHeight={100 + nameList.length * 65}
          participants={nameList.map((item) => item.name)}
        />
      );
  };

  return (
    <section ref={sectionRef} {...props}>
      <div css={{ display: inGame ? "none" : "block" }}>
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
              onNameChange={(changedName) =>
                setNameList((p) => {
                  const newList = [...p];
                  newList.find((nItem) => nItem.id === item.id)!.name = changedName;
                  return newList;
                })
              }
            >
              {item.name}
            </StyledNameTag>
          ))}
        </NameListContainer>

        <Button css={{ display: "block", margin: "0 auto" }} onClick={startGame}>
          게임 시작
        </Button>
      </div>
      {inGame && <GameComponent />}
    </section>
  );
}

export default GameSecton;
