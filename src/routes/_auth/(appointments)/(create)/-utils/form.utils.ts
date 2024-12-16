import { useMemo, useState } from "react";
import { useEffect } from "react";
import { generateTimeSlots } from "./create.utils";
import { useForm } from "react-hook-form";
import { useAuth } from "@/auth";
import { z } from "zod";
import { useCreateAppointmentQuery } from "@/hooks/query/appointments/appointments.query";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";

type IFormInput = {
  coach: IFormData | null;
  coachName: string | null;
  coachId: number | null;
  coachee: IFormData | null;
  coacheeName: string;
  coacheeId: number | null;
  date: string | null;
  time: IFormData | null;
};

type IFormData = {
  value: string | number;
  label: string;
};

export const useFormUtils = () => {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const { userId, userName, userRole } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<IFormInput>({
    defaultValues: {
      coach: null,
      coachName: userName,
      coachId: userId,
      coachee: null,
      coacheeName: "",
      coacheeId: null,
      date: null,
      time: null,
    },
  });
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = form;

  const { mutateAsync: createAppointment } = useCreateAppointmentQuery();

  const onFormSubmit = async (value: IFormInput) => {
    setIsLoadingForm(true);
    const { coach, coachee, date, time } = value;
    console.log("onFormSubmit", value);

    const splitDate = time ? String(time?.value).split("-") : "";
    const startDate = splitDate && new Date(splitDate[0]);
    const endDate = splitDate && new Date(splitDate[1]);

    const data = {
      courseId: 1,
      coacheeId: coachee ? Number(coachee.value) : 0,
      coachId: coach ? Number(coach.value) : Number(userId),
      startDate: String(startDate),
      endDate: String(endDate),
      note: "",
    };

    const transformData = {
      ...data,
      startDate: startDate ? startDate?.toISOString() : "",
      endDate: endDate ? endDate?.toISOString() : "",
    };

    try {
      createAppointment(transformData)
        .then((res) => {
          toast({
            title: "Appointment created successfully",
            variant: "success",
          });
          navigate({ to: "/appointments" });
        })
        .catch((error) => {
          toast({
            title: "Failed to create appointment",
            variant: "destructive",
            description:
              "There is already an existing appointment scheduled for this date and time slot.",
          });
        })
        .finally(() => {
          setIsLoadingForm(false);
        });
    } catch (error) {
      toast({
        title: "Failed to create appointment",
        variant: "destructive",
        description:
          "There is already an existing appointment scheduled for this date and time slot.",
      });
      setIsLoadingForm(false);
    }
  };

  const timeSlots = useMemo(() => {
    if (watch("date") !== null) {
      setValue("time", null);
      return generateTimeSlots(watch("date") as any);
    }

    return [];
  }, [watch("date")]);

  /** Debug Form */
  // useEffect(() => {
  //   console.log("Watch", watch());
  // }, [watch("coach")]);
  return {
    state: { form, timeSlots, isLoadingForm, errors },
    event: { onFormSubmit, watch, register },
  };
};
