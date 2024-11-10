import { useMutation } from "@tanstack/react-query";
import { NotesKey } from "../query-key";
import {
  PostNotesRequest,
  PostNotesResponse,
} from "@/interfaces/notes/post-notes.type";
import { NotesServices } from "@/services/notes/notes.service";

export const usePostNotesQuery = () => {
  return useMutation<PostNotesResponse, Error, PostNotesRequest>({
    mutationKey: [NotesKey.notesCreate],
    mutationFn: async (params: PostNotesRequest) => {
      try {
        const response = await NotesServices.postNotes(params);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: 3,
  });
};
