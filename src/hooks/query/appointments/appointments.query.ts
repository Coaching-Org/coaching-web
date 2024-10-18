import {
  GetAppointmentsListRequest,
  GetAppointmentsListResponse,
} from "@/services/appointments/appointments.type";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AppointmentKey } from "../query-key";
import { AppointmentsServices } from "@/services/appointments/appointments.service";

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
