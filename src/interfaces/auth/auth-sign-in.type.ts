export interface AuthSignInRequest {
  email: string;
  password: string;
}

export interface AuthSignInResponse {
  email: string;
  id: number;
  isVerified: boolean;
  name: string;
  picture: string;
  role: string;
}
