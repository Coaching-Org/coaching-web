import { createFileRoute } from "@tanstack/react-router";
import { AppointmentsTable } from "./-components/appointments-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAppointmentsUtils } from "./-utils/appointments.utils";
import { DashboardAppointmentsTable } from "../(dashboard)/-components/dashboard-appointments-table";
import { DashboardUpcomingAppointments } from "@/interfaces/dashboard";

export const Route = createFileRoute("/_auth/(appointments)/appointments")({
  component: AppointmentsLayout,
});

const tempDataTable: DashboardUpcomingAppointments[] = [
  {
    id: 1,
    course: "Counseling Session",
    date: String(new Date()),
    duration: 30,
    status: "pending",
    coachee: "Tatas Fachrul",
    sessionTime: "10:00 - 11:00",
  },
  {
    id: 2,
    course: "Counseling Session",
    date: String(new Date()),
    duration: 30,
    status: "pending",
    coachee: "Iwan",
    sessionTime: "10:00 - 11:00",
  },
  {
    id: 3,
    course: "Counseling Session",
    date: String(new Date()),
    duration: 30,
    status: "pending",
    coachee: "Tatas Fachrul",
    sessionTime: "10:00 - 11:00",
  },
  {
    id: 4,
    course: "Counseling Session",
    date: String(new Date()),
    duration: 30,
    status: "pending",
    coachee: "Iwan",
    sessionTime: "10:00 - 11:00",
  },
];

function AppointmentsLayout() {
  const navigate = useNavigate();
  const {
    state: { data },
  } = useAppointmentsUtils();

  const goToReview = (appointmentId: string) => {
    navigate({ to: `appointments/${appointmentId}/review` });
  };

  return (
    <div className="gap-4 lg:p-6">
      <Card className="px-2">
        <CardHeader className="flex-row flex-1 justify-between">
          <div>
            <CardTitle className="text-2xl text-primary">
              Manage Session
            </CardTitle>
            <CardTitle className="mt-4 text-sm font-normal">
              View and managae all your sessions that you have scheduled with
              your coachees.
            </CardTitle>
          </div>
          <Button
            onClick={() => {
              navigate({ to: "/create" });
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Session
          </Button>
          {/* Add Button export */}
        </CardHeader>
        <CardContent>
          {/* <AppointmentsTable navigate={() => goToReview("1")} /> */}
          <DashboardAppointmentsTable data={data?.data || []} />
        </CardContent>
      </Card>
    </div>
  );
}
