import { useAuth } from "@/auth";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { UsersTable } from "./-components/users-table";

export const Route = createFileRoute("/_auth/(users)/users")({
  component: UsersLayout,
});

function UsersLayout() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Users</h1>
      </div>
      <UsersTable />
      {/* <div
            x-chunk="An empty state showing no products with a heading, description and a call to action to add a product."
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          >
            <div className="flex flex-col items-center gap-1 text-center p-8">
              <h3 className="text-2xl font-bold tracking-tight">
                There are no users
              </h3>
            </div>
          </div> */}
    </main>
  );
}
