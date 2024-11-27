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
  sessionName: string;
  courseName: string;
  sessionTime: number;
  startDate: string;
  endDate: string;
}

export interface GetNotesRequest {
  page: number;
  perPage: number;
  keyword?: string;
}
