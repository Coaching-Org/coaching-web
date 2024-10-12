import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { DateRangePicker } from "./-components/date-range-picker";
import { cn } from "@/lib/utils";
import { DashboardAppointmentsTable } from "./-components/dashboard-appointments-table";
import { DashboardUpcomingAppointments } from "@/interfaces/dashboard";

const tempDataTable: DashboardUpcomingAppointments[] = [
  {
    id: 1,
    course: "Counseling Session",
    date: String(new Date()),
    duration: 30,
    status: "pending",
    coachee: "Tatas Fachrul",
  },
  {
    id: 2,
    course: "Counseling Session",
    date: String(new Date()),
    duration: 30,
    status: "pending",
    coachee: "Marcel",
  },
  {
    id: 3,
    course: "Counseling Session",
    date: String(new Date()),
    duration: 30,
    status: "pending",
    coachee: "Tatas Fachrul",
  },
  {
    id: 4,
    course: "Counseling Session",
    date: String(new Date()),
    duration: 30,
    status: "pending",
    coachee: "Marcel",
  },
];

export const Route = createFileRoute("/_auth/(dashboard)/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="gap-4 p-4 lg:gap-6 lg:p-6">
      <Card>
        {/* Appointments Section */}
        <CardHeader className="flex-row flex-1 justify-between">
          <CardTitle>Dashboard</CardTitle>
          <DateRangePicker />
        </CardHeader>
        <CardContent>
          <div className="flex flex-1 flex-row justify-evenly">
            <div
              className={cn(
                "p-4 rounded-lg border max-w-52 flex-col flex justify-center items-center gap-4"
              )}
            >
              <p className={cn("text-black text-4xl text-center")}>2</p>
              <p className={cn("text-muted-foreground text-center")}>
                Total Appointments
              </p>
            </div>

            <div
              className={cn(
                "p-4 rounded-lg border max-w-52 flex-col flex justify-center items-center gap-4"
              )}
            >
              <p className={cn("text-green-400 text-4xl text-center")}>1</p>
              <p className={cn("text-muted-foreground text-center")}>
                Approved Appointments
              </p>
            </div>

            <div
              className={cn(
                "p-4 rounded-lg border max-w-52 flex-col flex justify-center items-center gap-4"
              )}
            >
              <p className={cn("text-orange-400 text-4xl text-center")}>1</p>
              <p className={cn("text-muted-foreground text-center")}>
                Pending Appointments
              </p>
            </div>
          </div>
        </CardContent>

        {/* Upcoming Seciton */}
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <DashboardAppointmentsTable data={tempDataTable} />
        </CardContent>
      </Card>
    </div>
  );
}
