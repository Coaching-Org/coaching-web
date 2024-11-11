import { createContext, FC, useContext, useState } from "react";

interface ICoachingStateContextProps {
  contextAppointmentId: string | number;
  contextNotesId: string | number | null;
  contextCoachName: string;
  contextCoachId: number;
  contextCoacheeName: string;
  contextCoacheeId: number;
  contextCourseName: string;
  contextCourseId: number;
  contextDate: string;
}

interface ICoachingEventContextProps {
  setContextAppointmentId: (appointmentId: string | number) => void;
  setContextNotesId: (notesId: string | number | null) => void;
  setContextCoachName: (coachName: string) => void;
  setContextCoachId: (coachId: number) => void;
  setContextCoacheeName: (coacheeName: string) => void;
  setContextCoacheeId: (coacheeId: number) => void;
  setContextCourseName: (courseName: string) => void;
  setContextCourseId: (courseId: number) => void;
  setContextDate: (date: string) => void;
}

const CoachingStateContext = createContext<
  ICoachingStateContextProps | undefined
>(undefined);
const CoachingEventContext = createContext<
  ICoachingEventContextProps | undefined
>(undefined);

export const CoachingProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contextAppointmentId, setContextAppointmentId] = useState<
    string | number
  >("");
  const [contextNotesId, setContextNotesId] = useState<string | number | null>(
    null
  );
  const [contextCoachName, setContextCoachName] = useState<string>("");
  const [contextCoachId, setContextCoachId] = useState<number>(0);
  const [contextCoacheeName, setContextCoacheeName] = useState<string>("");
  const [contextCoacheeId, setContextCoacheeId] = useState<number>(0);
  const [contextCourseName, setContextCourseName] = useState<string>("");
  const [contextCourseId, setContextCourseId] = useState<number>(0);
  const [contextDate, setContextDate] = useState<string>("");

  return (
    <CoachingStateContext.Provider
      value={{
        contextAppointmentId,
        contextNotesId,
        contextCoacheeName,
        contextCoacheeId,
        contextCoachId,
        contextCoachName,
        contextCourseId,
        contextCourseName,
        contextDate,
      }}
    >
      <CoachingEventContext.Provider
        value={{
          setContextAppointmentId,
          setContextNotesId,
          setContextCoachName,
          setContextCoachId,
          setContextCoacheeName,
          setContextCoacheeId,
          setContextCourseName,
          setContextCourseId,
          setContextDate,
        }}
      >
        {children}
      </CoachingEventContext.Provider>
    </CoachingStateContext.Provider>
  );
};

export const useCoachingContext = () => {
  const stateContext = useContext(CoachingStateContext);
  const eventContext = useContext(CoachingEventContext);

  if (!stateContext || !eventContext) {
    throw new Error(
      "useCoachingContext must be used within a CoachingProvider"
    );
  }

  return { stateContext, eventContext };
};
