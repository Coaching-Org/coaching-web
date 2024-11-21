import { useAppointmentsFirestoreUtils } from "@/hooks/firebase";
import { useCoacheeListQuery } from "@/hooks/query/coachee/coachee.query";
import { useEffect, useState } from "react";

export const useCoacheeUtils = () => {
  const [listCoachee, setListCoachee] = useState<any[]>([]);
  const {
    state: { fsTotalUserAppointment },
  } = useAppointmentsFirestoreUtils();

  const { data } = useCoacheeListQuery({
    params: { page: 1, perPage: 50 },
    enabled: true,
  });

  useEffect(() => {
    if (data?.data && data?.data.length > 0) {
      const transformData = data.data.map((item: any) => {
        return {
          ...item,
          numberOfAppointments:
            fsTotalUserAppointment.find(
              (appointment: any) => appointment.coacheeId === item.id
            )?.total || 0,
        };
      });

      setListCoachee(transformData);
    }
  }, [data?.data, fsTotalUserAppointment]);

  return {
    state: { data: listCoachee },
    event: {},
  };
};
