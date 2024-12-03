import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Download, Plus } from "lucide-react";
import { CoachTable } from "./-components/coach-table";
import { useCoachUtils } from "./-utils/coach.utils";
import { useExportUtils } from "@/hooks/functions";
import { useAuth } from "@/auth";

export const Route = createFileRoute("/_auth/(coach)/coach")({
  component: CoachLayout,
});

function CoachLayout() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const { userRole } = useAuth();
  const {
    state: { data },
  } = useCoachUtils();

  const {
    event: { getExportAllCoaches },
  } = useExportUtils();

  return (
    <div className="gap-4 lg:p-6">
      <Card className="px-2">
        <CardHeader className="flex-row flex-1 justify-between">
          <div>
            <CardTitle className="text-2xl text-primary">Coach</CardTitle>
          </div>
          <div>
            {userRole === "admin" && (
              <Button onClick={() => getExportAllCoaches()} className="mr-2">
                <Download className="mr-2 h-4 w-4" /> Export Coaches
              </Button>
            )}
            <Button onClick={() => navigate({ to: "/create-coach" })}>
              <Plus className="mr-2 h-4 w-4" /> Add Coach
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <CoachTable data={data?.data || []} />
        </CardContent>
      </Card>
    </div>
  );
}
