import Modal from "components/common/Modal";
import useGroups from "hooks/useGroups";
import useUser from "hooks/useUser";
import { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Modal> {}

function NameListModal({ show, onClose, onButtonClick }: Props) {
  const { user } = useUser();
  const { groups } = useGroups(user?.id);

  return (
    <Modal
      show={show}
      title="명단에서 추가"
      buttonText="추가"
      onClose={onClose}
      onButtonClick={onButtonClick}
    >
      {groups?.map((group) => (
        <p key={group.id}>{group.title}</p>
      ))}
    </Modal>
  );
}

export default NameListModal;
