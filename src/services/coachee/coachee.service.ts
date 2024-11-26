import { PostCoacheeRequest } from "@/interfaces/coachee/post-coachee.type";
import { HttpService } from "../HttpServices";
import { ParamsPaginationRequest } from "@/interfaces/shared";

export class CoacheeServices extends HttpService {
  static getCoacheeList(
    signal?: AbortSignal,
    params?: ParamsPaginationRequest
  ) {
    return this.get("/v2/coachees", { signal, params });
  }

  static postCoachee(params: PostCoacheeRequest) {
    return this.post("/v1/coachees", params);
  }
}
