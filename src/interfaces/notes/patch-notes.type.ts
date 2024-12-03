export interface PatchNotesRequest {
  appointmentId?: number;
  coachId?: number;
  coacheeId?: number;
  files?: string;
  goals: string;
  options: string;
  reality: string;
  willWayForward: string;
  notes?: string;
  notesId?: number;
}

export interface PatchNotesResponse {
  message: string;
}

export interface PatchNotesParams {
  notesId: number;
}
