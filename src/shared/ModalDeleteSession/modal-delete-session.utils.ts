import { useDeleteAppointmentQuery } from "@/hooks/query/appointments/appointments.query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const useModalDeleteSessionUtils = ({
  sessionId,
  onOpenChange,
}: {
  sessionId: string | number;
  onOpenChange: (open: boolean) => void;
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { mutateAsync: deleteAppointment } = useDeleteAppointmentQuery();
  const { toast } = useToast();

  const handleDeleteAppointment = async () => {
    setIsDisabled(true);
    try {
      deleteAppointment({ sessionId })
        .then((res) => {
          toast({
            title: "Session deleted successfully",
            variant: "success",
          });
          onOpenChange(false);
        })
        .catch((err) => {
          toast({
            title: "Failed to delete session",
            variant: "destructive",
          });
        })
        .finally(() => {
          setIsDisabled(false);
        });
    } catch (error) {
      toast({
        title: "Failed to delete session",
        variant: "destructive",
      });
      setIsDisabled(false);
    }
  };

  return { state: { isDisabled }, event: { handleDeleteAppointment } };
};
