import { useCreateCoacheeQuery } from "@/hooks/query/coachee/coachee.query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const useCreateCoacheeUtils = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<number>(2);

  const { mutateAsync: createCoachee } = useCreateCoacheeQuery();

  const isPasswordMatch = () => {
    return password === confirmPassword;
  };

  const isButtonDisabled = () => {
    if (!isPasswordMatch()) {
      return true;
    }

    if (
      name === "" ||
      email === "" ||
      phoneNumber === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      return true;
    }

    return false;
  };

  const onSaveCoachee = async () => {
    await createCoachee({
      name,
      email,
      phoneNumber,
      password,
    });

    navigate({ to: "/users" });
  };

  return {
    state: {
      name,
      email,
      phoneNumber,
      password,
      confirmPassword,
      role,
      isButtonDisabled,
    },
    event: {
      setName,
      setEmail,
      setPhoneNumber,
      setPassword,
      setConfirmPassword,
      setRole,
      onSaveCoachee,
    },
  };
};
