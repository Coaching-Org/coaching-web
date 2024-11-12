import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DateRangePicker } from "./-components/date-range-picker";
import { cn } from "@/lib/utils";
import { DashboardAppointmentsTable } from "./-components/dashboard-appointments-table";
import { DashboardUpcomingAppointments } from "@/interfaces/dashboard";
import { useAppointmentsUtils } from "../(appointments)/-utils/appointments.utils";
import { useAppointmentsFirestoreUtils } from "@/hooks/firebase";

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

export const Route = createFileRoute("/_auth/(dashboard)/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const {
    state: { data },
  } = useAppointmentsUtils();
  const {
    state: {
      fsData,
      fsTotalAppointment,
      fsApprovedAppointment,
      fsPendingAppointment,
    },
  } = useAppointmentsFirestoreUtils();

  return (
    <div className="gap-4 lg:gap-6 lg:p-6">
      <Card className="px-2">
        {/* Appointments Section */}
        <CardHeader className="flex-row flex-1 justify-between">
          <CardTitle className="text-2xl text-primary">Dashboard</CardTitle>
          <DateRangePicker />
        </CardHeader>
        <CardContent>
          <div className="flex flex-1 flex-row justify-evenly">
            <div
              className={cn(
                "px-8 py-4 rounded-lg border max-w-52 flex-col flex justify-center items-center"
              )}
            >
              <p className={cn("text-black text-4xl text-center")}>
                {fsTotalAppointment}
              </p>
              <p className={cn("text-muted-foreground text-center")}>
                Total Appointments
              </p>
            </div>

            <div
              className={cn(
                "px-8 py-4 rounded-lg border max-w-52 flex-col flex justify-center items-center"
              )}
            >
              <p className={cn("text-green-400 text-4xl text-center")}>
                {fsApprovedAppointment}
              </p>
              <p className={cn("text-muted-foreground text-center")}>
                Done Appointments
              </p>
            </div>

            <div
              className={cn(
                "px-8 py-4 rounded-lg border max-w-52 flex-col flex justify-center items-center"
              )}
            >
              <p className={cn("text-orange-400 text-4xl text-center")}>
                {fsPendingAppointment}
              </p>
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
          <DashboardAppointmentsTable data={(fsData as any) || []} />
        </CardContent>
      </Card>
    </div>
  );
}
