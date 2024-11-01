import {
  GetCoachListResponse,
  PostCoachRequest,
  PostCoachResponse,
} from "@/interfaces";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { CoachKey } from "../query-key";
import { CoachServices } from "@/services/coach/coach.service";
import { ParamsPaginationRequest } from "@/interfaces/shared";

export const useCoachListQuery = ({
  enabled,
  params,
}: {
  enabled: boolean;
  params: ParamsPaginationRequest;
}): UseQueryResult<GetCoachListResponse, Error> => {
  return useQuery({
    queryKey: [CoachKey.coachList],
    queryFn: async ({ signal }) => {
      try {
        const response = await CoachServices.getCoachList(signal, params);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: 0,
    enabled: enabled || false,
  });
};

export const useCreateCoachQuery = (): UseMutationResult<
  PostCoachResponse,
  Error,
  PostCoachRequest
> => {
  return useMutation({
    mutationKey: [CoachKey.coachCreate],
    mutationFn: async (params: PostCoachRequest) => {
      try {
        const response = await CoachServices.postCoach(params);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};
