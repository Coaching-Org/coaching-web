import { useCoachListQuery } from "@/hooks/query/coach/coach.query";
import { useDebounce } from "@/lib/debounce";
import { useEffect, useState } from "react";

export const useCoachUtils = () => {
  const [coachKeyword, setCoachKeyword] = useState<string>("");
  const debouncedCoachKeyword = useDebounce(coachKeyword, 500);
  const {
    data: coachDataQuery,
    refetch: refetchCoach,
    isLoading: isLoadingCoach,
  } = useCoachListQuery({
    enabled: true,
    params: { page: 1, perPage: 5, keyword: coachKeyword },
  });

  /** Refetch when keyword change */
  useEffect(() => {
    refetchCoach();
  }, [debouncedCoachKeyword]);

  return {
    state: { coachData: coachDataQuery?.data, isLoadingCoach },
    event: { setCoachKeyword },
  };
};
