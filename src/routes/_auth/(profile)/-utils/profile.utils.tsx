import { useMeQuery } from "@/hooks/query/auth/auth.query";

export const useProfileUtils = () => {
  const { data } = useMeQuery();
  return {
    state: { data: data },
    event: {},
  };
};
