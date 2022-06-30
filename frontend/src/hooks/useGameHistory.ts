import useSWR from "swr";
import { ApiResponse, GameHistory, GameType } from "types/api";
import { authFetcher } from "utils/fetcher";

function useGameHistories(userId?: number, gameType?: GameType) {
  const { data, mutate, error } = useSWR<ApiResponse<GameHistory[]>>(
    userId ? `/users/${userId}/histories${gameType ? `?type=${gameType}` : ""}` : null,
    authFetcher
  );

  return {
    histories: data?.result,
    error,
    mutate,
  };
}

export default useGameHistories;
