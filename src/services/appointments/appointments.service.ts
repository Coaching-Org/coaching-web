import { HttpService } from "../HttpServices";
import { GetAppointmentsListRequest } from "./appointments.type";

export class AppointmentsServices extends HttpService {
  static getAppointmentList(
    params: GetAppointmentsListRequest,
    signal?: AbortSignal
  ) {
    return this.get("/v1/appointments", { signal, params });
  }
}
