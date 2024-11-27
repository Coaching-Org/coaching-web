import { useAuth } from "@/auth";
import { useAppointmentsFirestoreUtils } from "@/hooks/firebase";
import { useAppointmentsListQuery } from "@/hooks/query/appointments/appointments.query";
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
    { page: 1, perPage: 10, keyword: search, status: "pending" },
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
        {
          field: "status",
          operator: "!=",
          value: "done",
        },
      ]);
      // setAppointmentData(response);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    // fetchAppointment();
  }, []);

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
    state: { data: appointmentData, search },
    event: { setSearch },
  };
};
