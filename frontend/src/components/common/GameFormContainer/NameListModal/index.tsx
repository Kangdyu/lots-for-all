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
          id: (group.length + idx).toString(),
          name: member,
        }))
      )
    );
  };

  return (
    <Modal
      show={show}
      title="명단에서 추가"
      buttonText="추가"
      onClose={onClose}
      showButton={false}
      onButtonClick={onButtonClick}
    >
      {groups?.map((group) => (
        <GroupButton
          key={group.id}
          onClick={() => {
            handleGroupButtonClick(group);
            onClose();
          }}
        >
          명단
        </GroupButton>
      ))}
    </Modal>
  );
}

export default NameListModal;
