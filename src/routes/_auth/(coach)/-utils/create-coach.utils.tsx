import { useCreateCoachQuery } from "@/hooks/query/coach/coach.query";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const useCreateCoachUtils = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<number>(2);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const { mutateAsync: createCoach } = useCreateCoachQuery();

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

  const onSaveCoach = async () => {
    setIsButtonLoading(true);
    try {
      await createCoach({
        name,
        email,
        phoneNumber,
        password,
      });

      toast({ title: "Coach created successfully", variant: "success" });
      navigate({ to: "/coach" });
    } catch (error) {
      toast({ title: "Coach creation failed", variant: "destructive" });
    } finally {
      setIsButtonLoading(false);
    }
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
      isButtonLoading,
    },
    event: {
      setName,
      setEmail,
      setPhoneNumber,
      setPassword,
      setConfirmPassword,
      setRole,
      onSaveCoach,
    },
  };
};
