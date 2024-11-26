import { useAuth } from "@/auth";
import { useAppointmentsFirestoreUtils } from "@/hooks/firebase";
import { useAppointmentsListQuery } from "@/hooks/query/appointments/appointments.query";
import { AppointmentDetailV2 } from "@/interfaces";
import { useDebounce } from "@/lib";
import { useEffect, useState } from "react";

export const useAppointmentsUtils = () => {
  const { userId } = useAuth();
  const [appointmentData, setAppointmentData] = useState<
    AppointmentDetailV2[] | null
  >();
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: AppointmentListData, refetch } = useAppointmentsListQuery(
    { page: 1, perPage: 10, keyword: search },
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
      setAppointmentData(response);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, []);

  useEffect(() => {
    refetch();
  }, [debouncedSearch]);

  console.log("Session Appointment Data", AppointmentListData);

  return {
    state: { data: appointmentData, search },
    event: { setSearch },
  };
};
