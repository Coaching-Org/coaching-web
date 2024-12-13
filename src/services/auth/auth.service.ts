import { AuthResetPasswordRequest } from "@/interfaces/auth";
import { HttpService } from "../HttpServices";
import { PostLoginRequest } from "./auth.type";

export class AuthServices extends HttpService {
  static postLogin(params: PostLoginRequest, signal?: AbortSignal) {
    return this.post("/auth/sign-in", params, { signal });
  }

  static getMe(signal?: AbortSignal) {
    return this.get("/v1/auth/me", { signal });
  }

  static logout(signal?: AbortSignal) {
    return this.get("/auth/logout", { signal });
  }

  static resetPassword(params: AuthResetPasswordRequest, signal?: AbortSignal) {
    return this.post("/v1/users/reset-password", params, { signal });
  }
}
