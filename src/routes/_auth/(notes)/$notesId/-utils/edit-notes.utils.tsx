import { useAuth } from "@/auth";
import { useCoachingContext } from "@/hooks/context";
import { useDetailNotesFirestoreUtils } from "@/hooks/firebase/detail-notes.firestore.utils";
import { useUpdateNotesFirestoreUtils } from "@/hooks/firebase/update-notes.firestore.utils";
import {
  useNoteDetailQuery,
  useUpdateNoteQuery,
} from "@/hooks/query/notes/notes.query";
import { useUploadFileQuery } from "@/hooks/query/shared/file.query";
import { useToast } from "@/hooks/use-toast";
import { PatchNotesRequest } from "@/interfaces/notes/patch-notes.type";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const useEditNotesUtils = ({
  edit,
  notesId,
}: {
  edit?: boolean;
  notesId: string;
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { userId, userName } = useAuth();
  const [deleteFileStatus, setDeleteFileStatus] = useState(false);

  const {
    event: { onFirestoreUpdateNotes },
  } = useUpdateNotesFirestoreUtils({ notesId });

  const {
    state: { notesData: fsNotes },
  } = useDetailNotesFirestoreUtils({ notesId });

  const {
    stateContext: { contextCoacheeName, contextCourseName, contextDate },
  } = useCoachingContext();

  const [textGoals, setTextGoals] = useState("");
  const [textReality, setTextReality] = useState("");
  const [textOptions, setTextOptions] = useState("");
  const [textWayForward, setTextWayForward] = useState("");
  const [textNotes, setTextNotes] = useState("");
  const [textFile, setTextFile] = useState("");
  const [file, setFile] = useState<any>(null);

  const { mutateAsync: uploadFile } = useUploadFileQuery();
  const { mutateAsync: updateNote } = useUpdateNoteQuery();

  const { data: noteDetail } = useNoteDetailQuery(
    { notesId: notesId },
    !!notesId
  );

  const onSaveNotes = async () => {
    try {
      let fileData = null;
      if (file !== null && file !== "") {
        const resFileUpload = await uploadFile(file);
        fileData = resFileUpload.data;
      } else if (file === "") {
        fileData = "";
      }

      const notesData = {
        appointmentId: Number(notesId),
        goals: textGoals,
        reality: textReality,
        options: textOptions,
        wayForward: textWayForward,
        notes: textNotes,
        file:
          fileData !== null && fileData !== ""
            ? fileData
            : fileData === ""
              ? ""
              : textFile,
      };

      /**
       * TODO: Uncomment this when the backend is ready
       */
      const transformedNotesData: Partial<PatchNotesRequest> = {
        ...notesData,
        appointmentId: Number(noteDetail?.data.appointmentId),
        willWayForward: textWayForward,
        coacheeId: Number(noteDetail?.data.coacheeId),
        coachId: Number(noteDetail?.data.coachId),
        notesId: Number(noteDetail?.data.id),
        files: notesData.file,
      };
      updateNote(transformedNotesData as any)
        .then((res) => {
          console.log("res", res);

          onFirestoreUpdateNotes({
            ...fsNotes,
            ...notesData,
            appointmentId: fsNotes?.appointmentId,
          });

          toast({
            title: "Success",
            description: "Notes saved successfully",
            variant: "success",
          });
          navigate({ to: "/notes" });
        })
        .catch((err) => {
          console.error("err", err);
        });
    } catch (error) {
      console.error("error", error);
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
    if (noteDetail?.data) {
      setTextGoals(noteDetail?.data.goals);
      setTextReality(noteDetail?.data.reality);
      setTextOptions(noteDetail?.data.options);
      setTextWayForward(noteDetail?.data.willWayForward);
      setTextNotes(noteDetail?.data.notes);
      setTextFile(noteDetail?.data.file);
    }
  }, [noteDetail?.data]);

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
      sessionDate: noteDetail?.data?.appointmentStartTime,
      sessionName: noteDetail?.data?.courseName,
      sessionCoachee: noteDetail?.data?.coacheeName,
      noteFile: textFile,
      deleteFileStatus,
    },
    event: {
      onSaveNotes,
      setTextGoals,
      setTextReality,
      setTextOptions,
      setTextWayForward,
      setTextNotes,
      setFile,
      setDeleteFileStatus,
    },
  };
};
