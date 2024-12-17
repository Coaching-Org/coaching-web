import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModalDeleteNoteUtils } from "./modal-delete-note.utils";

export const ModalDeleteNote = ({
  isOpen,
  onOpenChange,
  notesId,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  notesId: string | number;
}) => {
  const {
    event: { handleDeleteNote },
    state: { isDisabled },
  } = useModalDeleteNoteUtils({ notesId, onOpenChange });
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this note?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            disabled={isDisabled}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isDisabled}
            onClick={handleDeleteNote}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
