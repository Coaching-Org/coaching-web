import { useAuth } from "@/auth";
import { useCoachingContext } from "@/hooks/context";
import { useCreateNotesFirestoreUtils } from "@/hooks/firebase/create-notes.firestore.utils";
import { useDetailAppointmentFirestoreUtils } from "@/hooks/firebase/detail-appointment.firestore.utils";
import { useUpdateAppointmentFirestoreUtils } from "@/hooks/firebase/update-appointment.firestore.utils";
import { usePostNotesQuery } from "@/hooks/query/notes/notes.query";
import { useUploadFileQuery } from "@/hooks/query/shared/file.query";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";

export const useNotesUtils = ({
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
    event: { onFirestoreSaveNotes },
  } = useCreateNotesFirestoreUtils();
  const {
    state: { appointmentDetail },
  } = useDetailAppointmentFirestoreUtils();
  const {
    event: { onFirestoreUpdateAppointment },
  } = useUpdateAppointmentFirestoreUtils({ appointmentId: notesId });

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

  const { mutateAsync: uploadFile } = useUploadFileQuery();

  const onSaveNotes = async () => {
    try {
      let fileData = null;
      if (file) {
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
        file: fileData,
      };

      onFirestoreSaveNotes({
        ...notesData,
        appointmentId: appointmentDetail?.id,
        coachId: userId,
        coachName: userName,
        coacheeId: appointmentDetail?.coacheeId,
        coacheeName: appointmentDetail?.coacheeName,
        courseId: appointmentDetail?.courseId,
        courseName: appointmentDetail?.courseName,
        startDate: appointmentDetail?.startDate,
        endDate: appointmentDetail?.endDate,
        sessionName: appointmentDetail?.sessionName || "",
      });

      onFirestoreUpdateAppointment({ status: "done" });
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
    textWayForward === "" ||
    file === null;

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
      sessionDate: appointmentDetail?.startDate,
      sessionName: appointmentDetail?.courseName,
      sessionCoachee: appointmentDetail?.coacheeName,
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
