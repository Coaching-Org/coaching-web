import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppointmentDetailV2 } from "@/interfaces";
import { Link } from "@tanstack/react-router";
import moment from "moment";

export function ModalAppointment({
  isOpen,
  onOpenChange,
  appointmentData,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentData: AppointmentDetailV2;
}) {
  console.log("appointmentData", appointmentData);
  return (
    isOpen && (
      <div className="w-[600px]">
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className="w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-xl">Sessions Details</DialogTitle>
            </DialogHeader>
            {/* Section 1 */}
            <div className="flex flex-1 flex-row justify-between">
              <div className="flex-col flex mt-4 min-w-[250px]">
                {/* Size 12 */}
                Session Type
                <div>
                  <span className="font-semibold mt-4 text-sm text-muted-foreground">
                    {appointmentData.courseName}
                  </span>
                </div>
              </div>

              <div className="flex-col flex mt-4 min-w-[250px]">
                {/* Size 12 */}
                Coachee
                <div>
                  <span className="font-semibold mt-4 text-sm text-muted-foreground">
                    {appointmentData.coachName}
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <DialogTitle className="mt-4 -mb-6">Sessions Schedule</DialogTitle>
            <div className="flex flex-1 flex-row justify-between">
              <div className="flex-col flex mt-4 min-w-[250px]">
                {/* Size 12 */}
                Appointment Date
                <div>
                  <span className="font-semibold mt-4 text-sm text-muted-foreground">
                    {moment(appointmentData.date).format("MMMM Do, YYYY")}
                  </span>
                </div>
              </div>

              <div className="flex-col flex mt-4 min-w-[250px]">
                {/* Size 12 */}
                Appointment Time
                <div>
                  <span className="font-semibold mt-4 text-sm text-muted-foreground">
                    {moment(appointmentData.startDate).format("hh:mm")} -{" "}
                    {moment(appointmentData.endDate).format("hh:mm")}
                  </span>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <DialogTitle className="mt-4 -mb-6">Others</DialogTitle>
            <div className="flex flex-1 flex-row justify-between">
              <div className="flex-col flex mt-4 min-w-[250px]">
                {/* Size 12 */}
                Status
                <div>
                  <span className="font-semibold mt-4 text-sm text-muted-foreground capitalize">
                    {appointmentData.status}
                  </span>
                </div>
              </div>

              <div className="flex-col flex mt-4 min-w-[250px]">
                {/* Size 12 */}
                Action
                <div>
                  <Link
                    to={`/$notesId/NoteDetail`}
                    params={{ notesId: appointmentData?.id.toString() }}
                  >
                    <Button variant="link" className="-m-4 underline">
                      Add Notes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            {/* <DialogFooter>
              <Link
                to={`/$notesId/NoteDetail`}
                params={{ notesId: appointmentData?.id.toString() }}
              >
                Add Notes
              </Link>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </div>
    )
  );
}
