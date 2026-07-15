export interface ApiError {
  status: number;
  message: string | string[];
}
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
