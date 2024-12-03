import { CoacheeServices } from "@/services/coachee/coachee.service";
import { ParamsPaginationRequest } from "@/interfaces/shared";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { CoacheeKey } from "../query-key";
import {
  GetCoacheeResponse,
  GetCoachListResponse,
  PostCoacheeRequest,
  PostCoacheeResponse,
} from "@/interfaces";

export const useCoacheeListQuery = ({
  enabled,
  params,
}: {
  enabled: boolean;
  params: ParamsPaginationRequest;
}): UseQueryResult<GetCoacheeResponse, Error> => {
  return useQuery({
    queryKey: [CoacheeKey.coacheeList],
    queryFn: async ({ signal }) => {
      try {
        const response = await CoacheeServices.getCoacheeList(signal, params);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: 0,
    enabled: enabled || false,
  });
};

export const useCoacheeMappingListQuery = ({
  enabled,
  params,
}: {
  enabled: boolean;
  params: ParamsPaginationRequest;
}): UseQueryResult<GetCoacheeResponse, Error> => {
  return useQuery({
    queryKey: [CoacheeKey.coacheeMappingList],
    queryFn: async ({ signal }) => {
      try {
        const response = await CoacheeServices.getCoacheeMappingList(
          signal,
          params
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: 0,
    enabled: enabled || false,
  });
};

export const useCreateCoacheeQuery = (): UseMutationResult<
  PostCoacheeResponse,
  Error,
  PostCoacheeRequest
> => {
  return useMutation({
    mutationKey: [CoacheeKey.coacheeCreate],
    mutationFn: async (params: PostCoacheeRequest) => {
      try {
        const response = await CoacheeServices.postCoachee(params);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};
