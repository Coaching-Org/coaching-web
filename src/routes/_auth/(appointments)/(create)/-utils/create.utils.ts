import { useAuth } from "@/auth";
import { useCreateAppointmentFirestoreUtils } from "@/hooks/firebase";
import { useCreateAppointmentQuery } from "@/hooks/query/appointments/appointments.query";
import {
  useCoacheeListQuery,
  useCoacheeMappingListQuery,
} from "@/hooks/query/coachee/coachee.query";
import { useCoachListQuery } from "@/hooks/query/coach/coach.query";
import { useToast } from "@/hooks/use-toast";
import { CoacheeDetail } from "@/interfaces";
import { useDebounce } from "@/lib";
import { useNavigate } from "@tanstack/react-router";
import { Timestamp } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

export const useCreateAppointmentUtils = () => {
  const { userId, userName, userRole } = useAuth();
  const { toast } = useToast();
  const {
    event: { onFirestoreSaveAppointments },
  } = useCreateAppointmentFirestoreUtils();
  const navigate = useNavigate();
  const { mutateAsync } = useCreateAppointmentQuery();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [selectedCoachee, setSelectedCoachee] = useState<number | null>(null);
  const [selectedCoacheeName, setSelectedCoacheeName] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<number>(1);
  const [coacheeKeyword, setCoacheeKeyword] = useState<string>("");
  const [coachKeyword, setCoachKeyword] = useState<string>("");
  const [coacheeData, setCoacheeData] = useState<any[]>([]);
  const [coacheeDataMapping, setCoacheeDataMapping] = useState<any[]>([]);
  const [coachData, setCoachData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const debouncedCoacheeKeyword = useDebounce(coacheeKeyword, 500);
  const debouncedCoachKeyword = useDebounce(coachKeyword, 500);

  const { data, refetch, isLoading } = useCoacheeListQuery({
    enabled: true,
    params: { page: 1, perPage: 10, keyword: coacheeKeyword },
  });

  const { data: dataMapping, refetch: refetchMapping } =
    useCoacheeMappingListQuery({
      params: { page: 1, perPage: 50, keyword: search },
      enabled: true,
    });
  const {
    data: coachDataQuery,
    refetch: refetchCoach,
    isLoading: isLoadingCoach,
  } = useCoachListQuery({
    enabled: true,
    params: { page: 1, perPage: 10, keyword: coachKeyword },
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
    setSelectedCoachee(Number(value));
    setSelectedCoacheeName(label);
  };

  const onSubmitAppointment = async () => {
    const splitDate = selectedTimeSlot?.split("-");
    const startDate = new Date(splitDate[0]);
    const endDate = new Date(splitDate[1]);

    const data = {
      coacheeId: selectedCoachee !== null ? selectedCoachee : 0,
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
      mutateAsync(data)
        .then((res) => console.log("Created Session", res))
        .catch((error) => console.error("Failed to create"));
      toast({ title: "Appointment created successfully", variant: "success" });
      navigate({ to: "/appointments" });
    } catch (error) {
      console.error("error: ", error);
      toast({ title: "Appointment creation failed", variant: "destructive" });
    }
  };

  useEffect(() => {
    if (data?.data) {
      setCoacheeData(data.data);
    }

    // if (coacheeKeyword) {
    //   const filteredData = coacheeData.filter((item: CoacheeDetail) =>
    //     item.name.toLowerCase().includes(coacheeKeyword.toLowerCase())
    //   );
    //   setCoacheeData(filteredData);
    //   setCoacheeData(
    //    filteredData.map((item) => ({ label: item.name, value: item.id }))
    //   );
    // }
  }, [data?.data, coacheeKeyword]);

  useEffect(() => {
    if (dataMapping?.data) {
      setCoacheeDataMapping(dataMapping.data);
    }
  }, [dataMapping?.data]);

  const isButtonDisabled =
    selectedCoachee === null ||
    selectedTimeSlot === "" ||
    selectedDate === null ||
    selectedTimeSlot === "";

  useEffect(() => {
    refetch();
    refetchMapping();
  }, [debouncedSearch, debouncedCoacheeKeyword]);

  useEffect(() => {
    if (coachDataQuery?.data) {
      setCoachData(coachDataQuery.data);
    }
  }, [coachDataQuery?.data]);

  useEffect(() => {
    refetchCoach();
  }, [debouncedCoachKeyword]);

  // useEffect(() => {
  //   console.log("coachKeyword Changed", coachKeyword);
  //   console.log("isLoadingCoach", isLoadingCoach);
  // }, [coachKeyword, isLoadingCoach]);

  return {
    state: {
      timeSlots,
      selectedDate,
      selectedTimeSlot,
      coacheeData,
      coacheeDataMapping,
      coachName: userName,
      coachId: userId,
      isButtonDisabled,
      loading: isLoading,
      loadingCoach: isLoadingCoach,
      coachData: useMemo(() => {
        return coachDataQuery?.data?.map((item) => ({
          label: item.name,
          value: item.id,
        }));
      }, [coachDataQuery?.data]),
    },
    event: {
      onDateSelect,
      onTimeSlotSelect,
      onSubmitAppointment,
      onCoacheeSelect,
      onChangeCoachee,
      setCoacheeKeyword,
      setCoachKeyword,
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
