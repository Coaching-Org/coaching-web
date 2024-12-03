import { createFileRoute } from "@tanstack/react-router";
import { AppointmentsTable } from "./-components/appointments-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAppointmentsUtils } from "./-utils/appointments.utils";
import { DashboardAppointmentsTable } from "../(dashboard)/-components/dashboard-appointments-table";
import { DashboardUpcomingAppointments } from "@/interfaces/dashboard";
import { useAppointmentsFirestoreUtils } from "@/hooks/firebase";
import { useLanguage } from "@/components/language.provider";
import { useExportUtils } from "@/hooks/functions";
import { useAuth } from "@/auth";

export const Route = createFileRoute("/_auth/(appointments)/appointments")({
  component: AppointmentsLayout,
});

function AppointmentsLayout() {
  const { translations } = useLanguage();
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const {
    state: { data, search },
    event: { setSearch },
  } = useAppointmentsUtils();

  const {
    event: { getExportAppointment },
  } = useExportUtils();

  return (
    <div className="gap-4 lg:p-6">
      <Card className="px-2">
        <CardHeader className="flex-row flex-1 justify-between">
          <div>
            <CardTitle className="text-2xl text-primary">
              {translations.title.sessionManage}
            </CardTitle>
            <CardTitle className="mt-4 text-sm font-normal">
              {translations.description.sessionManageDescription}
            </CardTitle>
          </div>
          <div>
            {userRole === "admin" && (
              <Button onClick={() => getExportAppointment()} className="mr-2">
                <Download className="mr-2 h-4 w-4" /> Export Sessions
              </Button>
            )}
            <Button
              onClick={() => {
                navigate({ to: "/create" });
              }}
            >
              <Plus className="mr-2 h-4 w-4" />{" "}
              {translations.button.action.addSession}
            </Button>
          </div>
          {/* Add Button export */}
        </CardHeader>
        <CardContent>
          <DashboardAppointmentsTable
            data={(data as any) || []}
            setSearch={setSearch}
            search={search}
          />
        </CardContent>
      </Card>
    </div>
  );
}
