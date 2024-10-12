import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/(dashboard)/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout(){
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        </div>
      </main>
    );
}

