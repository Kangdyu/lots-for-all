import Modal from "components/common/Modal";
import useGroups from "hooks/useGroups";
import useUser from "hooks/useUser";
import { ComponentProps, Dispatch, SetStateAction } from "react";
import { Group } from "types/api";
import { NameListItem } from "..";
import { GroupButton } from "./styles";

interface Props extends ComponentProps<typeof Modal> {
  setGroup: Dispatch<SetStateAction<NameListItem[]>>;
}

function NameListModal({ show, onClose, onButtonClick, setGroup }: Props) {
  const { user } = useUser();
  const { groups } = useGroups(user?.id);

  const handleGroupButtonClick = (newGroup: Group) => {
    setGroup((group) =>
      group.concat(
        newGroup.members.map((member, idx) => ({
          id: (group.length + idx + 1).toString(),
          name: member,
        }))
      )
    );
  };

  return (
    <Modal
      show={show}
      title="명단에서 추가"
      onClose={onClose}
      showButton={false}
      onButtonClick={onButtonClick}
    >
      {groups?.length === 0
        ? "명단이 없습니다."
        : groups?.map((group) => (
            <GroupButton
              key={group.id}
              onClick={() => {
                handleGroupButtonClick(group);
                onClose();
              }}
            >
              {group.title}
            </GroupButton>
          ))}
    </Modal>
  );
}

export default NameListModal;
