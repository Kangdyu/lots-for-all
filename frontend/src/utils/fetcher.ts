import axios from "axios";
import { ApiResponse, User } from "types/api";

class CustomError extends Error {
  status: number;

  constructor(status: number, message?: string) {
    super(message);
    this.status = status;
  }
}

export async function fetcher(url: string) {
  return (await axios.get(url)).data;
}

export async function userFetcher() {
  const token = localStorage.getItem("token");
  if (!token || token === "") {
    const error = new CustomError(401, "Not Authorized");
    throw error;
  }

  return (
    await axios.get<ApiResponse<User>>("/login", {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data.result;
}
