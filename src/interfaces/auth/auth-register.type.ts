export interface AuthRegisterRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface AuthRegisterResponse {
  message: string;
}
