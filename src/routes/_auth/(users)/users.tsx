import { useAuth } from "@/auth";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { UsersTable } from "./-components/users-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCoacheeUtils } from "./-utils/coachee-utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/_auth/(users)/users")({
  component: UsersLayout,
});

function UsersLayout() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const { userRole } = useAuth();
  const {
    state: { data, dataMapping, search },
    event: { setSearch },
  } = useCoacheeUtils();
  return (
    <div className="gap-4 lg:p-6">
      <Card className="px-2">
        <CardHeader className="flex-row flex-1 justify-between">
          <div>
            <CardTitle className="text-2xl text-primary">Coachee</CardTitle>
          </div>
          {userRole === "admin" && (
            <div>
              <Button
                onClick={() => {
                  navigate({ to: "/create-coachee" });
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Coachee
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <UsersTable
            data={dataMapping}
            setSearch={setSearch}
            search={search}
          />
        </CardContent>
      </Card>
    </div>
  );
}
