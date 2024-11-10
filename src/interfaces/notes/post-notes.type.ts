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
