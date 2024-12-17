import { useDeleteNoteQuery } from "@/hooks/query/notes/notes.query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const useModalDeleteNoteUtils = ({
  notesId,
  onOpenChange,
}: {
  notesId: string | number;
  onOpenChange: (open: boolean) => void;
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { mutateAsync: deleteNote } = useDeleteNoteQuery();
  const { toast } = useToast();

  const handleDeleteNote = async () => {
    setIsDisabled(true);
    try {
      deleteNote({ notesId })
        .then((res) => {
          toast({
            title: "Note deleted successfully",
            variant: "success",
          });
          onOpenChange(false);
        })
        .catch((err) => {
          toast({
            title: "Failed to delete note",
            variant: "destructive",
          });
        })
        .finally(() => {
          setIsDisabled(false);
        });
    } catch (error) {
      toast({
        title: "Failed to delete note",
        variant: "destructive",
      });
      setIsDisabled(false);
    }
  };

  return { state: { isDisabled }, event: { handleDeleteNote } };
};
