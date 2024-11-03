export interface PostAppointmentRequest {
  coachId: number;
  coacheeId: number;
  courseId: number;
  endDate: string;
  note: string;
  startDate: string;
}

export interface PostAppointmentResponse {
  message: string;
}