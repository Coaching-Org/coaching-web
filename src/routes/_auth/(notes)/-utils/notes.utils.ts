import { useAuth } from "@/auth";
import { useAppointmentsFirestoreUtils } from "@/hooks/firebase";
import { useAppointmentsListQuery } from "@/hooks/query/appointments/appointments.query";
import { useNotesListQuery } from "@/hooks/query/notes/notes.query";
import { AppointmentDetail, AppointmentDetailV2 } from "@/interfaces";
import { NoteListDetail } from "@/interfaces/notes/get-notes.type";
import { useDebounce } from "@/lib";
import { useEffect, useState } from "react";

export const useNoteListUtils = () => {
  const { userId } = useAuth();
  const [notesData, setNotesData] = useState<NoteListDetail[]>([]);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: NotesListData, refetch } = useNotesListQuery(
    { page: 1, perPage: 50, keyword: search },
    true
  );
  const {
    event: { getFsAppointmentList },
  } = useAppointmentsFirestoreUtils();

  const fetchAppointment = async () => {
    try {
      const response = await getFsAppointmentList([
        {
          field: "coachId",
          operator: "==",
          value: userId,
        },
      ]);
      setNotesData(response);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    // fetchAppointment();
  }, []);

  useEffect(() => {
    if (NotesListData?.data) {
      setNotesData(NotesListData.data);
    }
  }, [NotesListData?.data]);

  useEffect(() => {
    refetch();
  }, [debouncedSearch]);

  console.log("Session Notes Data", NotesListData);

  return {
    state: { data: notesData, search },
    event: { setSearch },
  };
};
