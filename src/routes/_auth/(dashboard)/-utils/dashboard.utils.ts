import { useAuth } from "@/auth";
import {
  useAppointmentsListQuery,
  useAppointmentStatusQuery,
} from "@/hooks/query/appointments/appointments.query";
import { useMeQuery } from "@/hooks/query/auth/auth.query";
import { AppointmentDetail, AppointmentDetailV2 } from "@/interfaces";
import { useDebounce } from "@/lib";
import { AuthServices } from "@/services/auth/auth.service";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export const useDashboardUtils = () => {
  const { userId } = useAuth();
  const [appointmentData, setAppointmentData] = useState<
    AppointmentDetailV2[] | AppointmentDetail[] | null
  >();
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: AppointmentListData, refetch } = useAppointmentsListQuery(
    { page: 1, perPage: 50, keyword: search, status: "pending" },
    true
  );
  const { data: appointmentStatusData } = useAppointmentStatusQuery(
    { coachId: !!userId ? userId : 0 },
    !!userId
  );

  useEffect(() => {
    if (AppointmentListData?.data) {
      setAppointmentData(AppointmentListData.data);
    }
  }, [AppointmentListData?.data]);

  useEffect(() => {
    refetch();
  }, [debouncedSearch]);

  console.log("Dashboard Appointment Data", AppointmentListData);

  return {
    state: {
      data: appointmentData,
      search,
      appointmentStatusData: appointmentStatusData?.data,
    },
    event: { setSearch },
  };
};
