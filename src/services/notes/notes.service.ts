import { PostNotesRequest } from "@/interfaces/notes/post-notes.type";
import { HttpService } from "../HttpServices";
import { GetNotesRequest } from "@/interfaces/notes/get-notes.type";

export class NotesServices extends HttpService {
  static postNotes(params: PostNotesRequest) {
    return this.post("/v1/appointment-notes", params);
  }

  static getNotesList(params: GetNotesRequest, signal?: AbortSignal) {
    return this.get("/v1/appointment-notes", { params, signal });
  }
}
