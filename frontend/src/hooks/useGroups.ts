import useSWR from "swr";
import { ApiResponse, Group } from "types/api";
import { authFetcher } from "utils/fetcher";

function useGroups(userId?: number) {
  const { data, mutate, error } = useSWR<ApiResponse<Group[]>>(
    userId ? `users/${userId}/groups` : null,
    authFetcher
  );

  return {
    groups: data?.result,
    mutate,
    error,
  };
}

export default useGroups;
