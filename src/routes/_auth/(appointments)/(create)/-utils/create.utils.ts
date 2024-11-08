import { useCreateAppointmentQuery } from "@/hooks/query/appointments/appointments.query";
import { useCoacheeListQuery } from "@/hooks/query/coachee/coachee.query";
import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const useCreateAppointmentUtils = ({ coachId }: { coachId: number }) => {
  const navigate = useNavigate();
  const { mutateAsync } = useCreateAppointmentQuery();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [selectedCoachee, setSelectedCoachee] = useState<number>(0);
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
    console.log("date", date);
    setSelectedDate(date);
    setSelectedTimeSlot("");
  };

  const onTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const onCoacheeSelect = (coachee: string | number) => {
    console.log("onCoacheeSelect", coachee);
    const coacheeId =
      typeof coachee === "string" ? parseInt(coachee, 10) : coachee;
    setSelectedCoachee(coacheeId);
  };

  const onSubmitAppointment = async () => {
    console.log("selectedDate", selectedDate);
    console.log("selectedTimeSlot", selectedTimeSlot);
    console.log("selectedCoachee", selectedCoachee);
    console.log("selectedCourse", selectedCourse);
    console.log("coachId", coachId);

    const splitDate = selectedTimeSlot?.split("-");
    const startDate = new Date(splitDate[0]);
    const endDate = new Date(splitDate[1]);

    const data = {
      coacheeId: selectedCoachee,
      coachId: coachId,
      courseId: selectedCourse,
      endDate: String(endDate),
      startDate: String(startDate),
      note: "Mark",
    };

    console.log("Data", data);

    try {
      await mutateAsync(data);
      navigate({ to: "/appointments" });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return {
    state: { timeSlots, selectedDate, selectedTimeSlot, coacheeData },
    event: {
      onDateSelect,
      onTimeSlotSelect,
      onSubmitAppointment,
      onCoacheeSelect,
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
