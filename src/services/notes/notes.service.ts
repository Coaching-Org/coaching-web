import { PostNotesRequest } from "@/interfaces/notes/post-notes.type";
import { HttpService } from "../HttpServices";

export class NotesServices extends HttpService {
  static postNotes(params: PostNotesRequest) {
    return this.post("/v1/notes", params);
  }
}
