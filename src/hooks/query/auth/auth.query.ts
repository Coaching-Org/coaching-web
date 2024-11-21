import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { AuthKey } from "../query-key";
import { AuthServices } from "@/services/auth/auth.service";
import { PostLoginRequest, PostLoginResponse } from "@/services/auth/auth.type";
import { AuthMeResponse } from "@/interfaces";

export const useLoginQuery = (): UseMutationResult<
  PostLoginResponse,
  Error,
  PostLoginRequest
> => {
  return useMutation<PostLoginResponse, Error, PostLoginRequest>({
    mutationKey: [AuthKey.authLogin],
    mutationFn: async (params: PostLoginRequest) => {
      try {
        const response = await AuthServices.postLogin(params);

        return response.data.data;
      } catch (error) {
        throw error;
      }
    },
    retry: 0,
    onError(error, variables, context) {
      console.error("error", error);
      console.error("variables", variables);
      console.error("context", context);
    },
  });
};

export const useMeQuery = (): UseQueryResult<AuthMeResponse, Error> => {
  return useQuery({
    queryKey: [AuthKey.authMe],
    queryFn: async ({ signal }) => {
      try {
        const response = await AuthServices.getMe(signal);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    enabled: true,
  });
};

export const useLogoutQuery = (): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: [AuthKey.authLogout],
    queryFn: async ({ signal }) => {
      await AuthServices.logout(signal);
    },
    retry: 0,
    enabled: true,
  });
};
