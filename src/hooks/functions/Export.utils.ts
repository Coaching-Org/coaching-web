import { useEffect, useState } from "react";
import {
  useExportAppointmentsQuery,
  useExportNotesQuery,
  useExportAllCoachesQuery,
  useExportCoachesAppointmentsQuery,
} from "../query/export/exports.query";
import moment from "moment";

type exportType =
  | "appointments"
  | "notes"
  | "allCoaches"
  | "coachesAppointments";

export const useExportUtils = () => {
  const [coachId, setCoachId] = useState<number>(0);
  const [isExportFile, setIsExportFile] = useState<boolean>(false);
  const [exportType, setExportType] = useState<exportType>("appointments");
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
    setIsExportFile(true);
    setExportType("appointments");
    refetchExportAppointments();
  };

  const getExportNotes = () => {
    setIsExportFile(true);
    setExportType("notes");
    refetchExportNotes();
  };

  const getExportAllCoaches = () => {
    setIsExportFile(true);
    setExportType("allCoaches");
    refetchExportAllCoaches();
  };

  const getExportCoachesAppointments = ({ coachId }: { coachId: number }) => {
    setIsExportFile(true);
    setCoachId(coachId);
    setExportType("coachesAppointments");
  };

  useEffect(() => {
    if (coachId !== null) {
      refetchExportCoachesAppointments();
    }
  }, [coachId]);

  /** Transform data to csv file */
  useEffect(() => {
    if (exportAppointments && isExportFile && exportType === "appointments") {
      downloadCSV(
        exportAppointments,
        `${moment().format("YYYY-MM-DD")}_export_appointments.csv`
      );
      setIsExportFile(false);
    }
  }, [exportAppointments, isExportFile, exportType]);

  useEffect(() => {
    if (exportNotes && isExportFile && exportType === "notes") {
      downloadCSV(
        exportNotes,
        `${moment().format("YYYY-MM-DD")}_export_notes.csv`
      );
      setIsExportFile(false);
    }
  }, [exportNotes, isExportFile, exportType]);

  useEffect(() => {
    if (exportAllCoaches && isExportFile && exportType === "allCoaches") {
      downloadCSV(
        exportAllCoaches,
        `${moment().format("YYYY-MM-DD")}_export_all_coaches.csv`
      );
      setIsExportFile(false);
    }
  }, [exportAllCoaches, isExportFile, exportType]);

  useEffect(() => {
    if (
      exportCoachesAppointments &&
      isExportFile &&
      exportType === "coachesAppointments"
    ) {
      downloadCSV(
        exportCoachesAppointments,
        `${moment().format("YYYY-MM-DD")}_export_coaches_appointments.csv`
      );
      setIsExportFile(false);
    }
  }, [exportCoachesAppointments, isExportFile, exportType]);

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
