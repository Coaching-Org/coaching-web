import { useMemo } from "react";
import { useEffect } from "react";
import { generateTimeSlots } from "./create.utils";
import { useForm } from "react-hook-form";

export const useFormUtils = () => {
  const form = useForm({
    defaultValues: {
      coachName: "",
      coachId: null,
      coacheeName: "",
      coacheeId: null,
      coachee: null,
      coach: null,
      date: null,
      time: null,
    },
  });
  const { watch } = form;

  const onFormSubmit = (data: any) => {
    console.log("onFormSubmit", data);
  };

  const timeSlots = useMemo(() => {
    if (watch("date") !== null) {
      return generateTimeSlots(watch("date") as any);
    }

    return [];
  }, [watch("date")]);

  useEffect(() => {
    console.log("Watch", watch());
  }, [watch("coach")]);
  return {
    state: { form, timeSlots },
    event: { onFormSubmit, watch },
  };
};
