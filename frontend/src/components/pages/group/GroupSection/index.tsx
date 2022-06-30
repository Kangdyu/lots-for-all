import axios from "axios";
import SectionTitle from "components/common/SectionTitle";
import useGroups from "hooks/useGroups";
import useUser from "hooks/useUser";
import { useCallback } from "react";
import { DeleteButton, GroupCard, GroupMember, GroupMemberContainer, GroupName } from "./styles";

function GroupSection() {
  const { user } = useUser();
  const { groups, mutate } = useGroups(user?.id);

  const handleDeleteButtonClick = useCallback(
    async (groupId: number) => {
      if (!user || !groups) return;
      const token = localStorage.getItem("token");
      if (!token || token === "") return;

      try {
        await axios.delete(`/users/${user.id}/groups/${groupId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        mutate();
      } catch (error) {
        console.log(error);
      }
    },
    [user, groups, mutate]
  );

  return (
    <section>
      <SectionTitle css={{ marginBottom: "24px" }}>명단 관리</SectionTitle>
      {groups?.map((group) => (
        <GroupCard key={group.id}>
          <GroupName>{group.title}</GroupName>
          <GroupMemberContainer>
            {group.members.map((member, idx) => (
              <GroupMember key={idx}>{member}</GroupMember>
            ))}
          </GroupMemberContainer>
          <DeleteButton onClick={() => handleDeleteButtonClick(group.id)}>×</DeleteButton>
        </GroupCard>
      ))}
    </section>
  );
}

export default GroupSection;
