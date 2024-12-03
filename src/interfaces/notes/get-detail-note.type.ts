export interface GetNoteDetailsResponse {
  data: {
    id: number;
    appointmentId: number;
    coacheeName: string;
    coacheeId: number;
    coachName: string;
    coachId: number;
    courseName: string;
    appointmentDate: string;
    appointmentStartTime: string;
    appointmentEndTime: string;
    goals: string;
    reality: string;
    options: string;
    willWayForward: string;
    notes: string;
    file: string;
  };
  message: string;
}

export interface GetNoteDetailsRequest {
  notesId: string;
}
