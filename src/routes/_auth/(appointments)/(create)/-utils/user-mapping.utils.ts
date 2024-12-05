import { useCoacheeMappingListQuery } from "@/hooks/query/coachee/coachee.query";
import { useDebounce } from "@/lib/debounce";
import { useEffect, useState } from "react";

export const useUserMappingUtils = () => {
  const [search, setSearchUserMapping] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const {
    data: coacheeDataQuery,
    refetch: refetchCoachee,
    isLoading: isLoadingUserMapping,
  } = useCoacheeMappingListQuery({
    enabled: true,
    params: { page: 1, perPage: 50, keyword: search },
  });

  /** Refetch when keyword change */
  useEffect(() => {
    refetchCoachee();
  }, [debouncedSearch]);

  return {
    state: { userMappingData: coacheeDataQuery?.data, isLoadingUserMapping },
    event: { setSearchUserMapping },
  };
};
