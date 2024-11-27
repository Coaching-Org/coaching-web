import { useCoachListQuery } from "@/hooks/query/coach/coach.query";
import { useDebounce } from "@/lib";
import { useEffect, useState } from "react";

export const useCoachUtils = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, refetch } = useCoachListQuery({
    enabled: true,
    params: {
      page: 1,
      perPage: 10,
      keyword: search,
    },
  });

  useEffect(() => {
    refetch();
  }, [debouncedSearch]);

  return {
    state: { data, search },
    event: { setSearch },
  };
};
