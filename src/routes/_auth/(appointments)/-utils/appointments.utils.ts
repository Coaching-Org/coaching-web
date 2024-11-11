import { useAppointmentsListQuery } from "@/hooks/query/appointments/appointments.query";
import { useMeQuery } from "@/hooks/query/auth/auth.query";
import { AuthServices } from "@/services/auth/auth.service";
import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";

export const useAppointmentsUtils = () => {
  const cookie = new Cookies();
  const { data } = useAppointmentsListQuery({ page: 1, perPage: 10 }, true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        // const response = await AuthServices.getMe();
        const response = await axios.get(
          "https://api-service-coaching.tatas.id/auth/me",
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        // console.log("error: ", error);
      }
    };

    fetchMe();
    // console.log("cookie: ", cookie.getAll());
  }, []);

  return {
    state: { data },
    event: {},
  };
};
