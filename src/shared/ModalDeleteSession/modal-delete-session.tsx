import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModalDeleteSessionUtils } from "./modal-delete-session.utils";

export const ModalDeleteSession = ({
  isOpen,
  onOpenChange,
  sessionId,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId: string | number;
}) => {
  const {
    event: { handleDeleteAppointment },
    state: { isDisabled },
  } = useModalDeleteSessionUtils({ sessionId, onOpenChange });
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this session?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. All session notes related to this
            session will also be deleted.
          </DialogDescription>
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
            onClick={handleDeleteAppointment}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
