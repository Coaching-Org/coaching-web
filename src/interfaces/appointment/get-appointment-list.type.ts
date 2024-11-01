import { MetaPaginationResponse } from "../shared";

export interface GetAppointmentListResponse {
  data: AppointmentDetail[];
  meta: MetaPaginationResponse;
}

export interface AppointmentDetail {
  coachName: string;
  coacheeName: string;
  courseName: string;
  date: string;
  duration: number;
  id: number;
  status: string;
}
