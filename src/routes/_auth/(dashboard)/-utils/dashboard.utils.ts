import { useAuth } from "@/auth";
import { useAppointmentsFirestoreUtils } from "@/hooks/firebase";
import { useAppointmentsListQuery } from "@/hooks/query/appointments/appointments.query";
import { useMeQuery } from "@/hooks/query/auth/auth.query";
import { AppointmentDetailV2 } from "@/interfaces";
import { AuthServices } from "@/services/auth/auth.service";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export const useDashboardUtils = () => {
  const { userId } = useAuth();
  const [appointmentData, setAppointmentData] = useState<
    AppointmentDetailV2[] | null
  >();
  // const { data } = useAppointmentsListQuery({ page: 1, perPage: 10 }, true);
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
      console.log("response: ", response);
      setAppointmentData(response);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, []);

  return {
    state: { data: appointmentData },
    event: {},
  };
};
