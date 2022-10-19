export interface BaseResponse {}

export interface AuthResponse {
  id: string;
  token: string;
}

export interface LoginRequestBody {
  id: string;
  password: string;
}
