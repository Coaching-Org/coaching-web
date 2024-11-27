import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DateRangePicker } from "./-components/date-range-picker";
import { cn } from "@/lib/utils";
import { DashboardAppointmentsTable } from "./-components/dashboard-appointments-table";
import { DashboardUpcomingAppointments } from "@/interfaces/dashboard";
import { useAppointmentsUtils } from "../(appointments)/-utils/appointments.utils";
import { useAppointmentsFirestoreUtils } from "@/hooks/firebase";
import { useDashboardUtils } from "./-utils/dashboard.utils";
import { useLanguage } from "@/components/language.provider";

export const Route = createFileRoute("/_auth/(dashboard)/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { translations } = useLanguage();
  const {
    state: { data, search },
    event: { setSearch },
  } = useDashboardUtils();
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
          <CardTitle className="text-2xl text-primary">
            {translations.title.dashboard}
          </CardTitle>
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
                {translations.description.dashboardTotalAppointment}
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
                {translations.description.dashboardDoneAppointment}
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
                {translations.description.dashboardPendingAppointment}
              </p>
            </div>
          </div>
        </CardContent>

        {/* Upcoming Seciton */}
        <CardHeader>
          <CardTitle>
            {translations.description.dashboardUpcomingAppointment}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DashboardAppointmentsTable
            data={(data as any) || []}
            search={search}
            setSearch={setSearch}
          />
        </CardContent>
      </Card>
    </div>
  );
}
