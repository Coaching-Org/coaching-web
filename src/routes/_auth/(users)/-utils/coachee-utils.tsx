import { useAuth } from "@/auth";
import { useAppointmentsFirestoreUtils } from "@/hooks/firebase";
import {
  useCoacheeListQuery,
  useCoacheeMappingListQuery,
} from "@/hooks/query/coachee/coachee.query";
import { useDebounce } from "@/lib";
import { useEffect, useState } from "react";

export const useCoacheeUtils = () => {
  const { userRole } = useAuth();
  const [listCoachee, setListCoachee] = useState<any[]>([]);
  const [listCoacheeMapping, setListCoacheeMapping] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    state: { fsTotalUserAppointment },
  } = useAppointmentsFirestoreUtils();

  const { data, refetch } = useCoacheeListQuery({
    params: { page: 1, perPage: 50, keyword: search },
    enabled: true,
  });

  const { data: dataMapping, refetch: refetchMapping } =
    useCoacheeMappingListQuery({
      params: { page: 1, perPage: 50, keyword: search },
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

  useEffect(() => {
    if (dataMapping?.data && dataMapping?.data.length > 0) {
      const transformData = dataMapping.data.map((item: any) => {
        return {
          ...item,
          numberOfAppointments:
            fsTotalUserAppointment.find(
              (appointment: any) => appointment.coacheeId === item.id
            )?.total || 0,
        };
      });

      setListCoacheeMapping(transformData);
    }
  }, [dataMapping?.data, fsTotalUserAppointment]);

  useEffect(() => {
    refetch();
    refetchMapping();
  }, [debouncedSearch]);

  return {
    state: { data: listCoachee, dataMapping: listCoacheeMapping, search },
    event: { setSearch },
  };
};
