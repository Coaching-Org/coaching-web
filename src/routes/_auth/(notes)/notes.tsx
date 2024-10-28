import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DashboardAppointmentsTable } from "../(dashboard)/-components/dashboard-appointments-table";
import { DashboardUpcomingAppointments } from "@/interfaces/dashboard";

export const Route = createFileRoute("/_auth/(notes)/notes")({
  component: NotesLayout,
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

function NotesLayout() {
  const navigate = useNavigate();

  return (
    <div className="gap-4 lg:p-6">
      <Card className="px-2">
        <CardHeader className="flex-row flex-1 justify-between">
          <div>
            <CardTitle className="text-2xl text-primary">
              Session Notes
            </CardTitle>
            <CardTitle className="mt-4 text-sm font-normal">
              View all of your past/ongoing notes from session that you have
              scheduled with your coachees.
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <DashboardAppointmentsTable data={tempDataTable} />
        </CardContent>
      </Card>
    </div>
  );
}
