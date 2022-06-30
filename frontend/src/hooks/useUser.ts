import useSWR from "swr";
import { ApiResponse, User } from "types/api";
import { authFetcher } from "utils/fetcher";

function useUser() {
  const { data, mutate, error } = useSWR<ApiResponse<User>>("/login", authFetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const loggedOut: boolean = error && error.status === 401;

  return {
    loggedOut,
    user: data?.result,
    error,
    mutate,
  };
}

export default useUser;
