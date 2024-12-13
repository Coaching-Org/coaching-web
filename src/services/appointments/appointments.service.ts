import { PostAppointmentRequest } from "@/interfaces/appointment/post-appointment.type";
import { HttpService } from "../HttpServices";
import { GetAppointmentsListRequest } from "./appointments.type";
import { GetAppointmentDetailRequest } from "@/interfaces";
import { DeleteAppointmentParamsType } from "@/interfaces/appointment/delete-appointment.type";

export class AppointmentsServices extends HttpService {
  static getAppointmentList(
    params: GetAppointmentsListRequest,
    signal?: AbortSignal
  ) {
    return this.get("/v1/appointments", { signal, params });
  }

  static postAppointment(params: PostAppointmentRequest) {
    return this.post("/v1/appointments", params);
  }

  static getAppointmentDetail(
    params: GetAppointmentDetailRequest,
    signal?: AbortSignal
  ) {
    return this.get(`/v1/appointments/${params.appointmentId}`, { signal });
  }

  static deleteAppointment(
    params: DeleteAppointmentParamsType,
    signal?: AbortSignal
  ) {
    return this.delete(`/v1/appointments/${params.sessionId}`, {
      signal,
    });
  }
}
