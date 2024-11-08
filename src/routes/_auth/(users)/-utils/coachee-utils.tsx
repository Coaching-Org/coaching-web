import { useCoacheeListQuery } from "@/hooks/query/coachee/coachee.query";
import { useEffect } from "react";

export const useCoacheeUtils = () => {
  const { data } = useCoacheeListQuery({
    params: { page: 1, perPage: 10 },
    enabled: true,
  });
  useEffect(() => {
    console.log("coachee utils");
  }, []);

  return {
    state: { data },
    event: {},
  };
};
