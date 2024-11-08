export interface GetAppointmentsListRequest {
  page: number;
  perPage: number;
  keyword?: string;
  sort?: string;
  sortBy?: string;
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

export interface GetAppointmentsListResponse {
  data: AppointmentDetail[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPage: number;
  };
}
