import axios from "axios";
import Input from "components/common/Input";
import Modal from "components/common/Modal";
import useUser from "hooks/useUser";
import { ComponentProps, FormEvent, useCallback, useRef } from "react";

interface Props extends ComponentProps<typeof Modal> {
  members: string[];
}

function SaveGroupModal({ show, onClose, members }: Props) {
  const { user } = useUser();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e?: FormEvent<HTMLFormElement>) => {
      e?.preventDefault();

      async function submitGroup() {
        if (!inputRef.current) return;

        const token = localStorage.getItem("token");
        if (token == null || token === "") return;

        try {
          await axios.post(
            `/users/${user?.id}/groups`,
            {
              title: inputRef.current.value,
              members,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          onClose();
        } catch (e) {
          console.log(e);
        }
      }
      submitGroup();
    },
    [user, members]
  );

  return (
    <Modal
      show={show}
      title="명단 저장"
      buttonText="저장"
      onClose={onClose}
      onButtonClick={handleSubmit}
    >
      <form onSubmit={handleSubmit}>
        <Input ref={inputRef} label="명단 이름" />
      </form>
    </Modal>
  );
}

export default SaveGroupModal;
