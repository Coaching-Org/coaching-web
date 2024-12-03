import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { NotesKey } from "../query-key";
import {
  PostNotesRequest,
  PostNotesResponse,
} from "@/interfaces/notes/post-notes.type";
import { NotesServices } from "@/services/notes/notes.service";
import {
  GetNotesRequest,
  GetNotesResponse,
} from "@/interfaces/notes/get-notes.type";

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

export const useNotesListQuery = (
  opts: GetNotesRequest,
  enabled: boolean
): UseQueryResult<GetNotesResponse> =>
  useQuery({
    queryKey: [NotesKey.notesList],
    queryFn: async ({ signal }) => {
      try {
        const response = await NotesServices.getNotesList(opts, signal);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: 0,
    enabled: enabled || false,
  });
