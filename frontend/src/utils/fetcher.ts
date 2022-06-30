import axios from "axios";

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

export async function authFetcher(url: string) {
  const token = localStorage.getItem("token");
  if (!token || token === "") {
    const error = new CustomError(401, "Not Authorized");
    throw error;
  }

  return (
    await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
}
