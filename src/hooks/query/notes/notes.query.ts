import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
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
import {
  GetNoteDetailsRequest,
  GetNoteDetailsResponse,
} from "@/interfaces/notes/get-detail-note.type";
import {
  PatchNotesParams,
  PatchNotesRequest,
  PatchNotesResponse,
} from "@/interfaces/notes/patch-notes.type";
import {
  DeleteNotesParamsType,
  DeleteNotesResponseType,
} from "@/interfaces/notes/delete-note.type";

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

export const useNoteDetailQuery = (
  opts: GetNoteDetailsRequest,
  enabled: boolean
): UseQueryResult<GetNoteDetailsResponse> =>
  useQuery({
    queryKey: [NotesKey.notesDetail],
    queryFn: async ({ signal }) => {
      try {
        const response = await NotesServices.getNoteDetails(opts, signal);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: 0,
    enabled: enabled || false,
  });

export const useUpdateNoteQuery = () => {
  return useMutation<PatchNotesResponse, Error, PatchNotesRequest>({
    mutationKey: [NotesKey.notesUpdate],
    mutationFn: async (params) => {
      try {
        const response = await NotesServices.updateNote(
          { notesId: Number(params.notesId) },
          params
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: 0,
  });
};

export const useDeleteNoteQuery = () => {
  const queryClient = useQueryClient();
  return useMutation<DeleteNotesResponseType, Error, DeleteNotesParamsType>({
    mutationKey: [NotesKey.notesDelete],
    mutationFn: async (params) => {
      try {
        const response = await NotesServices.deleteNote(params);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: [NotesKey.notesList],
      });
    },
    retry: 0,
  });
};
