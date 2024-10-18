export interface PostLoginRequest {
  email: string;
  password: string;
}

export interface PostLoginResponse {
  email: string;
  id: number;
  isVerified: boolean;
  name: string;
  picture: string;
  role: string;
}
