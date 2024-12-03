import { useEffect, useState } from "react";
import {
  useExportAppointmentsQuery,
  useExportNotesQuery,
  useExportAllCoachesQuery,
  useExportCoachesAppointmentsQuery,
} from "../query/export/exports.query";
import moment from "moment";
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

  useEffect(() => {
    if (exportAppointments) {
      downloadCSV(
        exportAppointments,
        `${moment().format("YYYY-MM-DD")}_export_appointments.csv`
      );
    }
  }, [exportAppointments]);

  useEffect(() => {
    if (exportNotes) {
      downloadCSV(
        exportNotes,
        `${moment().format("YYYY-MM-DD")}_export_notes.csv`
      );
    }
  }, [exportNotes]);

  useEffect(() => {
    if (exportAllCoaches) {
      downloadCSV(
        exportAllCoaches,
        `${moment().format("YYYY-MM-DD")}_export_all_coaches.csv`
      );
    }
  }, [exportAllCoaches]);

  useEffect(() => {
    if (exportCoachesAppointments) {
      downloadCSV(
        exportCoachesAppointments,
        `${moment().format("YYYY-MM-DD")}_export_coaches_appointments.csv`
      );
    }
  }, [exportCoachesAppointments]);

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

const downloadCSV = (data: string, filename: string) => {
  const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
