import {
  GetAppointmentsListRequest,
  GetAppointmentsListResponse,
} from "@/services/appointments/appointments.type";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { AppointmentKey } from "../query-key";
import { AppointmentsServices } from "@/services/appointments/appointments.service";
import {
  PostAppointmentRequest,
  PostAppointmentResponse,
} from "@/interfaces/appointment/post-appointment.type";
import {
  GetAppointmentDetailRequest,
  GetAppointmentDetailResponse,
  GetAppointmentStatusParams,
  GetAppointmentStatusResponse,
} from "@/interfaces";
import {
  DeleteAppointmentParamsType,
  DeleteAppointmentResponseType,
} from "@/interfaces/appointment/delete-appointment.type";

export const useAppointmentsListQuery = (
  opts: GetAppointmentsListRequest,
  enabled: boolean
): UseQueryResult<GetAppointmentsListResponse> =>
  useQuery({
    queryKey: [AppointmentKey.appointmentsList],
    queryFn: async ({ signal }) => {
      try {
        const response = await AppointmentsServices.getAppointmentList(
          opts,
          signal
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: 0,
    enabled: enabled || false,
  });

export const useCreateAppointmentQuery = () => {
  return useMutation<PostAppointmentResponse, Error, PostAppointmentRequest>({
    mutationKey: [AppointmentKey.appointmentsCreate],
    mutationFn: async (params: PostAppointmentRequest) => {
      try {
        const response = await AppointmentsServices.postAppointment(params);

        return response.data;
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

export const useAppointmentDetailQuery = (
  opts: GetAppointmentDetailRequest,
  enabled: boolean
): UseQueryResult<GetAppointmentDetailResponse> =>
  useQuery({
    queryKey: [AppointmentKey.appointmentsDetail],
    queryFn: async ({ signal }) => {
      try {
        const response = await AppointmentsServices.getAppointmentDetail(
          opts,
          signal
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: 0,
    enabled: enabled || false,
  });

export const useDeleteAppointmentQuery = () => {
  const queryClient = useQueryClient();
  return useMutation<
    DeleteAppointmentResponseType,
    Error,
    DeleteAppointmentParamsType
  >({
    mutationKey: [AppointmentKey.appointmentsDelete],
    mutationFn: async (params: DeleteAppointmentParamsType) => {
      try {
        const response = await AppointmentsServices.deleteAppointment(params);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: [AppointmentKey.appointmentsList],
      });
    },
    retry: 0,
  });
};

export const useAppointmentStatusQuery = (
  opts: GetAppointmentStatusParams,
  enabled: boolean
): UseQueryResult<GetAppointmentStatusResponse> =>
  useQuery({
    queryKey: [AppointmentKey.appointmentsStatus],
    queryFn: async ({ signal }) => {
      try {
        const response = await AppointmentsServices.getAppointmentStatus(
          opts,
          signal
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: 0,
    enabled: enabled || false,
  });
