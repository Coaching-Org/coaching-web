import { createFileRoute } from "@tanstack/react-router";
import { AppointmentsTable } from "./-components/appointments-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAppointmentsUtils } from "./-utils/appointments.utils";

export const Route = createFileRoute("/_auth/(appointments)/appointments")({
  component: AppointmentsLayout,
});

function AppointmentsLayout() {
  const navigate = useNavigate();
  const {} = useAppointmentsUtils();

  const goToReview = (appointmentId: string) => {
    navigate({ to: `appointments/${appointmentId}/review` });
  };

  return (
    <div className="gap-4 p-4 lg:gap-6 lg:p-6">
      <Card>
        <CardHeader className="flex-row flex-1 justify-between">
          <CardTitle className="text-2xl">Manage Appointments</CardTitle>
          <Button
            onClick={() => {
              navigate({ to: "/create" });
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Appointment
          </Button>
          {/* Add Button export */}
        </CardHeader>
        <CardContent>
          <AppointmentsTable navigate={() => goToReview("1")} />
        </CardContent>
      </Card>
    </div>
  );
}
