import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/(profile)/profile")({
  component: ProfileLayout,
});

function ProfileLayout() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold md:text-2xl">Profile</h1>
      </div>
    </main>
  );
}
