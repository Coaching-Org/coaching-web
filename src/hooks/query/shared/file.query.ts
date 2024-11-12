import { FileService } from "@/services/shared/file.service";
import { useMutation } from "@tanstack/react-query";
import { SharedKey } from "../query-key";

interface UploadFileResponse {
  data: string;
  message: string;
}

export const useUploadFileQuery = () => {
  return useMutation<UploadFileResponse, Error, any>({
    mutationKey: [SharedKey.fileUpload],
    mutationFn: async (params: any) => {
      try {
        const response = await FileService.uploadFile(params);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};
