export interface GetNotesResponse {
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPage: number;
  };
  data: NoteListDetail[];
}

export interface NoteListDetail {
  id: number;
  date: string;
  coacheeName: string;
  coachName: string;
  SessionName: string;
  courseName: string;
  sessionTime: number;
}

export interface GetNotesRequest {
  page: number;
  perPage: number;
  keyword?: string;
}
