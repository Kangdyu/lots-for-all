import useSWR from "swr";
import { userFetcher } from "utils/fetcher";

function useUser() {
  const { data, mutate, error } = useSWR("user", userFetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const loggedOut: boolean = error && error.status === 401;

  return {
    loggedOut,
    user: data,
    error,
    mutate,
  };
}

export default useUser;
