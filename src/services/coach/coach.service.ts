import { PostCoachRequest } from "@/interfaces";
import { HttpService } from "../HttpServices";
import { ParamsPaginationRequest } from "@/interfaces/shared";

export class CoachServices extends HttpService {
  static getCoachList(signal?: AbortSignal, params?: ParamsPaginationRequest) {
    return this.get("/v1/coaches", { signal, params });
  }

  static postCoach(params: PostCoachRequest) {
    return this.post("/v1/coaches", params);
  }
}
