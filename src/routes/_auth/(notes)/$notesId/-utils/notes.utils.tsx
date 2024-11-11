import { useAuth } from "@/auth";
import { useCoachingContext } from "@/hooks/context";
import { useCreateNotesFirestoreUtils } from "@/hooks/firebase/create-notes.firestore.utils";
import { usePostNotesQuery } from "@/hooks/query/notes/notes.query";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";

export const useNotesUtils = () => {
  const { notesId } = useParams({ from: "/_auth/$notesId/NoteDetail" });
  const { mutateAsync: postNotes } = usePostNotesQuery();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { userId, userName } = useAuth();
  const {
    event: { onFirestoreSaveNotes },
  } = useCreateNotesFirestoreUtils();

  const {
    stateContext: {
      contextAppointmentId,
      contextCoachId,
      contextCoacheeId,
      contextCourseId,
      contextNotesId,
      contextCoachName,
      contextCoacheeName,
      contextCourseName,
      contextDate,
    },
  } = useCoachingContext();

  const [textGoals, setTextGoals] = useState("");
  const [textReality, setTextReality] = useState("");
  const [textOptions, setTextOptions] = useState("");
  const [textWayForward, setTextWayForward] = useState("");
  const [textNotes, setTextNotes] = useState("");
  const [file, setFile] = useState<any>(null);

  const onSaveNotes = async () => {
    try {
      const notesData = {
        appointmentId: Number(notesId),
        goals: textGoals,
        reality: textReality,
        options: textOptions,
        wayForward: textWayForward,
        notes: textNotes,
        file: file,
      };

      onFirestoreSaveNotes({
        ...notesData,
        appointmentId: contextAppointmentId,
        coachId: userId,
        coachName: userName,
        coacheeId: contextCoacheeId,
        coacheeName: contextCoacheeName,
        courseId: contextCourseId,
        courseName: contextCourseName,
      });
      /**
       * TODO: Uncomment this when the backend is ready
       */
      // await postNotes(notesData);
      toast({
        title: "Success",
        description: "Notes saved successfully",
        variant: "success",
      });
      navigate({ to: "/notes" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save notes",
        variant: "destructive",
      });
    }
  };

  const isButtonDisabled =
    textGoals === "" ||
    textReality === "" ||
    textOptions === "" ||
    textWayForward === "";

  return {
    state: {
      textGoals,
      textReality,
      textOptions,
      textWayForward,
      textNotes,
      isButtonDisabled,
      contextCoacheeName,
      contextCourseName,
      contextDate,
    },
    event: {
      onSaveNotes,
      setTextGoals,
      setTextReality,
      setTextOptions,
      setTextWayForward,
      setTextNotes,
      setFile,
    },
  };
};
