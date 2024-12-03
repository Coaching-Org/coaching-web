export interface PostNotesRequest {
  appointmentId: number;
  goals: string;
  reality: string;
  options: string;
  wayForward: string;
  notes?: string;
  file?: any;
}

export interface PostNotesResponse {
  message: string;
}

export interface PostNotesRequestV2 {
  appointmentId: number;
  coachId: number;
  coacheeId: number;
  files: string;
  goals: string;
  options: string;
  reality: string;
  willWayForward: string;
  notes: string;
}
