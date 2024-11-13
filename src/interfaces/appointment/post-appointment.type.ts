export interface PostAppointmentRequest {
  coachId: number;
  coacheeId: number;
  courseId: number;
  endDate: string;
  note: string;
  sessionName?: string;
  startDate: string;
}

export interface PostAppointmentResponse {
  message: string;
}
