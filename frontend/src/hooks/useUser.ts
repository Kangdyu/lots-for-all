import useSWR from "swr";
import { userFetcher } from "utils/fetcher";

function useUser() {
  const { data, mutate, error } = useSWR("user", userFetcher);

  const loggedOut = error && error.status === 401;

  return {
    loggedOut,
    user: data,
    error,
    mutate,
  };
}

export default useUser;
