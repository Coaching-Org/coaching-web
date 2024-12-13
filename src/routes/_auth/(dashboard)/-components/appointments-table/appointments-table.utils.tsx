import { useState } from "react";

export const useAppointmentsTableUtils = () => {
  const [isOpenModalDeleteSession, setIsOpenModalDeleteSession] =
    useState(false);
  const [sessionId, setSessionId] = useState<string | number>(0);

  return {
    state: {
      isOpenModalDeleteSession,
      sessionId,
    },
    event: {
      setIsOpenModalDeleteSession,
      setSessionId,
    },
  };
};
