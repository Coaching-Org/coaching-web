import { ExportServices } from "@/services/export/export.service";
import { useQuery } from "@tanstack/react-query";
import { ExportKey } from "../query-key";

export const useExportAppointmentsQuery = () => {
  return useQuery({
    queryKey: [ExportKey.exportAppointments],
    queryFn: async ({ signal }) => {
      try {
        const response = await ExportServices.exportAppointments(signal);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: 0,
    enabled: false,
  });
};

export const useExportNotesQuery = () => {
  return useQuery({
    queryKey: [ExportKey.exportNotes],
    queryFn: async ({ signal }) => {
      try {
        const response = await ExportServices.exportNotes(signal);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: 0,
    enabled: false,
  });
};

export const useExportAllCoachesQuery = () => {
  return useQuery({
    queryKey: [ExportKey.exportAllCoaches],
    queryFn: async ({ signal }) => {
      try {
        const response = await ExportServices.exportAllCoaches(signal);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: 0,
    enabled: false,
  });
};

export const useExportCoachesAppointmentsQuery = (params: {
  coachId: number;
}) => {
  return useQuery({
    queryKey: [ExportKey.exportCoachesAppointments],
    queryFn: async ({ signal }) => {
      try {
        const response = await ExportServices.exportCoachesAppointments(
          params,
          signal
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: 0,
    enabled: false,
  });
};
