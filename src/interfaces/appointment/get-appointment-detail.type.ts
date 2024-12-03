export interface GetAppointmentDetailRequest {
  appointmentId: number;
}

export interface GetAppointmentDetailResponse {
  data: GetAppointmentDetailitem;
}

export interface GetAppointmentDetailitem {
  appointmentDate: string;
  appointmentEndTime: string;
  appointmentId: number;
  appointmentStartTime: string;
  coachId: number;
  coachee: string;
  coacheeId: number;
  sessionName: string;
  status: string;
}
