import { useEffect, useState } from "react";
import {
  useExportAppointmentsQuery,
  useExportNotesQuery,
  useExportAllCoachesQuery,
  useExportCoachesAppointmentsQuery,
} from "../query/export/exports.query";

export const useExportUtils = () => {
  const [coachId, setCoachId] = useState<number>(0);
  const { data: exportAppointments, refetch: refetchExportAppointments } =
    useExportAppointmentsQuery();
  const { data: exportNotes, refetch: refetchExportNotes } =
    useExportNotesQuery();
  const { data: exportAllCoaches, refetch: refetchExportAllCoaches } =
    useExportAllCoachesQuery();
  const {
    data: exportCoachesAppointments,
    refetch: refetchExportCoachesAppointments,
  } = useExportCoachesAppointmentsQuery({ coachId: coachId ?? 0 });

  const getExportAppointment = () => {
    refetchExportAppointments();
  };

  const getExportNotes = () => {
    refetchExportNotes();
  };

  const getExportAllCoaches = () => {
    refetchExportAllCoaches();
  };

  const getExportCoachesAppointments = ({ coachId }: { coachId: number }) => {
    setCoachId(coachId);
  };

  useEffect(() => {
    if (coachId !== null) {
      refetchExportCoachesAppointments();
    }
  }, [coachId]);

  return {
    state: {
      exportAppointments,
      exportNotes,
      exportAllCoaches,
      exportCoachesAppointments,
    },
    event: {
      getExportAppointment,
      getExportNotes,
      getExportAllCoaches,
      getExportCoachesAppointments,
    },
  };
};
