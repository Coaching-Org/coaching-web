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

export interface Appointment {
  id: number;
  date: Date;
  courseId: number;
  courseName: string;
  coachId: number;
  coachName: string;
  coacheeId: number;
  coacheeName: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
