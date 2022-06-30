import useUser from "hooks/useUser";
import {
  FormEvent,
  forwardRef,
  HTMLAttributes,
  Ref,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Button from "../Button";
import SectionTitle from "../SectionTitle";
import NameListModal from "./NameListModal";
import SaveGroupModal from "./SaveGroupModal";
import {
  Flex,
  NameList,
  NameListContainer,
  NameListForm,
  StyledInput,
  StyledNameTag,
} from "./styles";

export interface NameListItem {
  id: string;
  name: string;
}

export interface GameFormValues {
  title: string;
  participants: string[];
}

interface Props extends HTMLAttributes<HTMLDivElement> {}

const GameFormContainer = forwardRef((props: Props, ref: Ref<GameFormValues>) => {
  const { loggedOut } = useUser();

  const [title, setTitle] = useState("");
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

  const [showNameListModal, setShowNameListModal] = useState(false);
  const handleNameListButtonClick = useCallback(() => {
    setShowNameListModal(true);
  }, []);

  const [showSaveGroupModal, setShowSaveGroupModal] = useState(false);
  const handleSaveGroupButtonClick = useCallback(() => {
    setShowSaveGroupModal(true);
  }, []);

  useImperativeHandle(ref, () => ({
    title,
    participants: nameList.map((item) => item.name),
  }));

  return (
    <>
      <Flex css={{ justifyContent: "space-between", marginBottom: "24px" }} {...props}>
        <SectionTitle>기본 설정</SectionTitle>
        {!loggedOut && (
          <Flex>
            <Button css={{ marginRight: "8px" }}>프리셋</Button>
            <Button>최근 플레이</Button>
          </Flex>
        )}
      </Flex>
      <Flex css={{ justifyContent: "space-between", marginBottom: "40px" }}>
        <NameListForm onSubmit={handleListSubmit}>
          <StyledInput
            type="text"
            label="제목"
            placeholder="게임 제목 입력"
            onChange={(e) => setTitle(e.target.value)}
          />
          <StyledInput
            type="text"
            label="인원 / 항목"
            placeholder="추가할 인원 / 항목 입력"
            ref={nameInputRef}
          />
          <Button type="submit" css={{ marginRight: "8px" }}>
            추가
          </Button>
          {!loggedOut && (
            <Button type="button" onClick={handleNameListButtonClick}>
              명단에서 추가
            </Button>
          )}
        </NameListForm>
      </Flex>

      <SectionTitle css={{ marginBottom: "24px" }}>참여 인원</SectionTitle>
      <NameListContainer>
        <NameList>
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
          <br />
        </NameList>
        {!loggedOut && (
          <Button css={{ display: "block", margin: "0 auto" }} onClick={handleSaveGroupButtonClick}>
            명단 저장
          </Button>
        )}
      </NameListContainer>

      <NameListModal
        show={showNameListModal}
        onClose={() => setShowNameListModal(false)}
        setGroup={setNameList}
      />

      <SaveGroupModal
        show={showSaveGroupModal}
        onClose={() => setShowSaveGroupModal(false)}
        members={nameList.map((member) => member.name)}
      />
    </>
  );
});

export default GameFormContainer;