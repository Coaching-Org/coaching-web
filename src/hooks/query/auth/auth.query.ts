import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AuthKey } from "../query-key";
import { AuthServices } from "@/services/auth/auth.service";
import { PostLoginRequest, PostLoginResponse } from "@/services/auth/auth.type";

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

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: 0,
    onError(error, variables, context) {
      console.log("error", error);
      console.log("variables", variables);
      console.log("context", context);
    },
  });
};
