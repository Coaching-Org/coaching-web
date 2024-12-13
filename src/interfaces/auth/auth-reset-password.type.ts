export interface AuthResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface AuthResetPasswordResponse {
  message: string;
}
