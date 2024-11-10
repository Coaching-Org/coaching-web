import { usePostNotesQuery } from "@/hooks/query/notes/notes.query";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";

export const useNotesUtils = () => {
  const { notesId } = useParams({ from: "/_auth/$notesId/NoteDetail" });
  const { mutateAsync: postNotes } = usePostNotesQuery();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [textGoals, setTextGoals] = useState("");
  const [textReality, setTextReality] = useState("");
  const [textOptions, setTextOptions] = useState("");
  const [textWayForward, setTextWayForward] = useState("");
  const [textNotes, setTextNotes] = useState("");
  const [file, setFile] = useState<any>(null);

  const onSaveNotes = async () => {
    try {
      await postNotes({
        appointmentId: Number(notesId),
        goals: textGoals,
        reality: textReality,
        options: textOptions,
        wayForward: textWayForward,
        notes: textNotes,
        file: file,
      });
      toast({
        title: "Success",
        description: "Notes saved successfully",
      });
      navigate({ to: "/dashboard" });
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
