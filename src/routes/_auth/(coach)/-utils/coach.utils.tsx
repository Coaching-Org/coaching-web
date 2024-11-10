import { useCoachListQuery } from "@/hooks/query/coach/coach.query";

export const useCoachUtils = () => {
  const { data } = useCoachListQuery({
    enabled: true,
    params: {
      page: 1,
      perPage: 10,
    },
  });

  return {
    state: { data },
    event: {},
  };
};
