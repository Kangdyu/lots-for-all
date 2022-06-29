export interface ApiResponse<T> {
  result: T;
  message: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  imageUrl: string;
}
