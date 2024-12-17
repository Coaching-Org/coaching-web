import { useEffect, useState } from "react";

export const useCoachTableUtils = () => {
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");

  useEffect(() => {
    if (currentEmail) {
      setIsOpenChangePassword(true);
    }
  }, [currentEmail]);

  return {
    state: {
      isOpenChangePassword,
      currentEmail,
    },
    event: {
      setIsOpenChangePassword,
      setCurrentEmail,
    },
  };
};
