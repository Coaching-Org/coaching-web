import { PostNotesRequest } from "@/interfaces/notes/post-notes.type";
import { HttpService } from "../HttpServices";
import { GetNotesRequest } from "@/interfaces/notes/get-notes.type";
import { GetNoteDetailsRequest } from "@/interfaces/notes/get-detail-note.type";
import {
  PatchNotesParams,
  PatchNotesRequest,
} from "@/interfaces/notes/patch-notes.type";

export class NotesServices extends HttpService {
  static postNotes(params: PostNotesRequest) {
    return this.post("/v1/appointment-notes", params);
  }

  static getNotesList(params: GetNotesRequest, signal?: AbortSignal) {
    return this.get("/v1/appointment-notes", { params, signal });
  }

  static getNoteDetails(params: GetNoteDetailsRequest, signal?: AbortSignal) {
    return this.get(`/v1/appointment-notes/${params.notesId}`, { signal });
  }

  static updateNote(params: PatchNotesParams, body: PatchNotesRequest) {
    return this.patch(`/v1/appointment-notes/${params.notesId}`, body);
  }
}
