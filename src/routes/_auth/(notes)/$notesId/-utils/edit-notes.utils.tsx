import { useAuth } from "@/auth";
import { useCoachingContext } from "@/hooks/context";
import { useCreateNotesFirestoreUtils } from "@/hooks/firebase/create-notes.firestore.utils";
import { useDetailAppointmentFirestoreUtils } from "@/hooks/firebase/detail-appointment.firestore.utils";
import { useDetailNotesFirestoreUtils } from "@/hooks/firebase/detail-notes.firestore.utils";
import { useUpdateNotesFirestoreUtils } from "@/hooks/firebase/update-notes.firestore.utils";
import { usePostNotesQuery } from "@/hooks/query/notes/notes.query";
import { useUploadFileQuery } from "@/hooks/query/shared/file.query";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const useEditNotesUtils = ({
  edit,
  notesId,
}: {
  edit?: boolean;
  notesId: string;
}) => {
  const { mutateAsync: postNotes } = usePostNotesQuery();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { userId, userName } = useAuth();
  const {
    event: { onFirestoreUpdateNotes },
  } = useUpdateNotesFirestoreUtils({ notesId });

  const {
    state: { notesData: fsNotes },
  } = useDetailNotesFirestoreUtils({ notesId });

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
  const [textFile, setTextFile] = useState("");
  const [file, setFile] = useState<any>(null);

  const { mutateAsync: uploadFile } = useUploadFileQuery();

  const onSaveNotes = async () => {
    try {
      let fileData = null;
      if (file !== null) {
        const resFileUpload = await uploadFile(file);
        fileData = resFileUpload.data;
      }

      const notesData = {
        appointmentId: Number(notesId),
        goals: textGoals,
        reality: textReality,
        options: textOptions,
        wayForward: textWayForward,
        notes: textNotes,
        file: fileData ? fileData : textFile,
      };

      onFirestoreUpdateNotes({
        ...fsNotes,
        ...notesData,
        appointmentId: fsNotes.appointmentId,
      });
      /**
       * TODO: Uncomment this when the backend is ready
       */
      // postNotes(notesData);
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

  useMemo(() => {
    setTextGoals(fsNotes?.goals);
    setTextReality(fsNotes?.reality);
    setTextOptions(fsNotes?.options);
    setTextWayForward(fsNotes?.wayForward);
    setTextNotes(fsNotes?.notes);
    setTextFile(fsNotes?.file);
  }, [fsNotes]);

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
      sessionDate: fsNotes?.startDate,
      sessionName: fsNotes?.courseName,
      sessionCoachee: fsNotes?.coacheeName,
      noteFile: textFile,
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
