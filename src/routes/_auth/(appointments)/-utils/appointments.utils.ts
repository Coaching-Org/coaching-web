import { useAuth } from "@/auth";
import { useAppointmentsListQuery } from "@/hooks/query/appointments/appointments.query";
import { AppointmentDetail, AppointmentDetailV2 } from "@/interfaces";
import { useDebounce } from "@/lib";
import { useEffect, useState } from "react";

export const useAppointmentsUtils = () => {
  const { userId } = useAuth();
  const [appointmentData, setAppointmentData] = useState<
    AppointmentDetailV2[] | AppointmentDetail[] | null
  >();
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: AppointmentListData, refetch } = useAppointmentsListQuery(
    { page: 1, perPage: 50, keyword: search },
    true
  );

  useEffect(() => {
    if (AppointmentListData?.data) {
      setAppointmentData(AppointmentListData.data);
    }
  }, [AppointmentListData?.data]);

  useEffect(() => {
    refetch();
  }, [debouncedSearch]);

  console.log("Session Appointment Data", AppointmentListData);

  return {
    state: { data: appointmentData, search },
    event: { setSearch },
  };
};
