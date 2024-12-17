export interface GetAppointmentStatusResponse {
  data: GetAppointmentStatusData;
  message: string;
}

export interface GetAppointmentStatusData {
  pendingCount: number;
  doneCount: number;
  totalCount: number;
}

export interface GetAppointmentStatusParams {
  coachId: number;
}
