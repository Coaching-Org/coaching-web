import { useCoacheeListQuery } from "@/hooks/query/coachee/coachee.query";
import { useDebounce } from "@/lib/debounce";
import { useEffect, useState } from "react";

export const useCoacheeUtils = () => {
  const [coacheeKeyword, setCoacheeKeyword] = useState<string>("");
  const debouncedCoacheeKeyword = useDebounce(coacheeKeyword, 500);
  const {
    data: coacheeDataQuery,
    refetch: refetchCoachee,
    isLoading: isLoadingCoachee,
  } = useCoacheeListQuery({
    enabled: true,
    params: { page: 1, perPage: 50, keyword: coacheeKeyword },
  });

  /** Refetch when keyword change */
  useEffect(() => {
    refetchCoachee();
  }, [debouncedCoacheeKeyword]);

  return {
    state: { coacheeData: coacheeDataQuery?.data, isLoadingCoachee },
    event: { setCoacheeKeyword },
  };
};
