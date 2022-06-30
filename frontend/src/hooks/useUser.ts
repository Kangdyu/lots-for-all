import useSWR from "swr";
import { userFetcher } from "utils/fetcher";

function useUser() {
  const { data, mutate, error } = useSWR("user", userFetcher);

  const loading = !data && !error;
  const loggedOut = error && error.status === 401;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}

export default useUser;
