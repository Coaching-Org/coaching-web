import { useAuth } from "@/auth";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { UsersTable } from "./-components/users-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_auth/(users)/users")({
  component: UsersLayout,
});

function UsersLayout() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  return (
    <div className="gap-4 lg:p-6">
      <Card className="px-2">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Coachee</CardTitle>
        </CardHeader>
        <CardContent>
          <UsersTable />
        </CardContent>
      </Card>
    </div>
  );
}
