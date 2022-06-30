import Modal from "components/common/Modal";
import useGroups from "hooks/useGroups";
import useUser from "hooks/useUser";
import { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Modal> {}

function NameListModal({ show, onClose, onButtonClick }: Props) {
  const { user } = useUser();
  const { groups, error } = useGroups(user?.id);

  return (
    <Modal
      show={show}
      title="명단에서 추가"
      buttonText="추가"
      onClose={onClose}
      onButtonClick={onButtonClick}
    >
      {groups != null && !error && groups.map((group) => <p key={group.id}>그룹</p>)}
    </Modal>
  );
}

export default NameListModal;
