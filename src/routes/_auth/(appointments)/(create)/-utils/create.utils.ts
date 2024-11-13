import { useAuth } from "@/auth";
import { useCreateAppointmentFirestoreUtils } from "@/hooks/firebase";
import { useCreateAppointmentQuery } from "@/hooks/query/appointments/appointments.query";
import { useCoacheeListQuery } from "@/hooks/query/coachee/coachee.query";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";
import { Timestamp } from "firebase/firestore";
import { useMemo, useState } from "react";

export const useCreateAppointmentUtils = ({ coachId }: { coachId: number }) => {
  const { userId, userName } = useAuth();
  const { toast } = useToast();
  const {
    event: { onFirestoreSaveAppointments },
  } = useCreateAppointmentFirestoreUtils();
  const navigate = useNavigate();
  const { mutateAsync } = useCreateAppointmentQuery();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [selectedCoachee, setSelectedCoachee] = useState<number>(0);
  const [selectedCoacheeName, setSelectedCoacheeName] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<number>(1);

  const { data: coacheeData } = useCoacheeListQuery({
    enabled: true,
    params: { page: 1, perPage: 10 },
  });

  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];

    return generateTimeSlots(selectedDate);
  }, [selectedDate]);

  const onDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTimeSlot("");
  };

  const onTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const onCoacheeSelect = (coachee: string | number) => {
    // console.log("coachee", coachee);
    // const coacheeId =
    //   typeof coachee === "string" ? parseInt(coachee, 10) : coachee;
    // setSelectedCoachee(coacheeId);
  };

  const onChangeCoachee = ({
    value,
    label,
  }: {
    value: string;
    label: string;
  }) => {
    console.log("onChangeCoachee value", value);
    console.log("onChangeCoachee label", label);
    setSelectedCoachee(Number(value));
    setSelectedCoacheeName(label);
  };

  const onSubmitAppointment = async () => {
    const splitDate = selectedTimeSlot?.split("-");
    const startDate = new Date(splitDate[0]);
    const endDate = new Date(splitDate[1]);

    const data = {
      coacheeId: selectedCoachee,
      coachId: Number(userId),
      courseId: selectedCourse,
      endDate: String(endDate),
      startDate: String(startDate),
      note: "",
    };

    try {
      onFirestoreSaveAppointments({
        ...data,
        coachName: userName,
        coacheeName: selectedCoacheeName,
        courseName: "Professional Coaching",
        status: "pending",
        fsSessionDate: Timestamp.fromDate(new Date(splitDate[0])),
      });
      /** Change to Backend Server */
      // await mutateAsync(data);
      toast({ title: "Appointment created successfully", variant: "success" });
      navigate({ to: "/appointments" });
    } catch (error) {
      console.error("error: ", error);
      toast({ title: "Appointment creation failed", variant: "destructive" });
    }
  };

  return {
    state: {
      timeSlots,
      selectedDate,
      selectedTimeSlot,
      coacheeData,
      coachName: userName,
      coachId: userId,
    },
    event: {
      onDateSelect,
      onTimeSlotSelect,
      onSubmitAppointment,
      onCoacheeSelect,
      onChangeCoachee,
    },
  };
};

interface TimeSlot {
  id: string;
  duration: string;
  startDate: string;
  endDate: string;
  label: string;
}
const generateTimeSlots = (selectedDate: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const baseDate = new Date(selectedDate);
  baseDate.setHours(9, 0, 0, 0); // Set to 9 AM

  while (baseDate.getHours() < 17) {
    const startDate = new Date(baseDate);
    const endDate = new Date(baseDate);
    endDate.setMinutes(baseDate.getMinutes() + 30);

    const formatTime = (date: Date) => {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    };

    slots.push({
      id: `${startDate}-${endDate}`,
      duration: "30 min",
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      label: `${formatTime(startDate)} - ${formatTime(endDate)}`,
    });

    baseDate.setMinutes(baseDate.getMinutes() + 30);
  }
  return slots;
};
