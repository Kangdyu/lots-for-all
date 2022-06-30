import useSWR from "swr";
import { ApiResponse, GameHistory } from "types/api";
import { fetcher } from "utils/fetcher";

function useGameHistories(userId?: number) {
  const { data, mutate, error } = useSWR<ApiResponse<GameHistory[]>>(
    userId ? `/users/${userId}/histories` : null,
    fetcher
  );

  return {
    histories: data?.result,
    error,
    mutate,
  };
}

export default useGameHistories;
