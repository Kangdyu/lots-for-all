import Modal from "components/common/Modal";
import useGameHistories from "hooks/useGameHistory";
import useUser from "hooks/useUser";
import { ComponentProps, Dispatch, RefObject, SetStateAction } from "react";
import { GameHistory, GameType } from "types/api";
import { NameListItem } from "..";
import { HistoryButton, HistoryInfo, HistoryTitle } from "./styles";

interface Props extends ComponentProps<typeof Modal> {
  gameType: GameType;
  titleInputRef: RefObject<HTMLInputElement>;
  setGroup: Dispatch<SetStateAction<NameListItem[]>>;
}

function HistoryModal({ show, onClose, onButtonClick, gameType, titleInputRef, setGroup }: Props) {
  const { user } = useUser();
  const { histories } = useGameHistories(user?.id, gameType);

  const handleGroupButtonClick = (history: GameHistory) => {
    setGroup(history.content.map((member, idx) => ({ id: idx.toString(), name: member })));
    if (titleInputRef.current) {
      titleInputRef.current.value = history.title;
    }
    onClose();
  };

  return (
    <Modal
      show={show}
      title="플레이 기록"
      onClose={onClose}
      showButton={false}
      onButtonClick={onButtonClick}
    >
      {histories?.map((history) => (
        <HistoryButton key={history.id} onClick={() => handleGroupButtonClick(history)}>
          <HistoryTitle>{history.title}</HistoryTitle>
          <HistoryInfo>{history.number}명</HistoryInfo>
          <HistoryInfo>{history.createdAt.toString()}</HistoryInfo>
        </HistoryButton>
      ))}
    </Modal>
  );
}

export default HistoryModal;
