import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DashboardAppointmentsTable } from "../(dashboard)/-components/dashboard-appointments-table";
import { DashboardUpcomingAppointments } from "@/interfaces/dashboard";
import { useAppointmentsUtils } from "../(appointments)/-utils/appointments.utils";
import { useListNotesFirestoreUtils } from "@/hooks/firebase/list-notes.firestore.utils";
import { NotesAppointmentTable } from "./-component/notes-appointment-table";
import { useLanguage } from "@/components/language.provider";
import { Download } from "lucide-react";
import { useExportUtils } from "@/hooks/functions";
import { useAuth } from "@/auth";
import { useNoteListUtils } from "./-utils/notes.utils";

export const Route = createFileRoute("/_auth/(notes)/notes")({
  component: NotesLayout,
});

function NotesLayout() {
  const navigate = useNavigate();
  const { translations } = useLanguage();
  const {
    state: { data, search },
    event: { setSearch },
  } = useNoteListUtils();

  const {
    state: { fsNotes },
  } = useListNotesFirestoreUtils();

  const {
    event: { getExportNotes },
  } = useExportUtils();

  const { userRole } = useAuth();

  return (
    <div className="gap-4 lg:p-6">
      <Card className="px-2">
        <CardHeader className="flex-row flex-1 justify-between">
          <div>
            <CardTitle className="text-2xl text-primary">
              {/* 20px */}
              {translations.title.sessionNotes}
            </CardTitle>
            <CardTitle className="mt-4 text-sm font-normal">
              {/*  14 */}
              {translations.description.notesDescription}
            </CardTitle>
          </div>
          {userRole === "admin" && (
            <Button onClick={getExportNotes}>
              <Download className="mr-2 h-4 w-4" /> Export Notes
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <NotesAppointmentTable
            data={data}
            search={search}
            setSearch={setSearch}
          />
        </CardContent>
      </Card>
    </div>
  );
}
