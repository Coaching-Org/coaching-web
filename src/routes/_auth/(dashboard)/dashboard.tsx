import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { DateRangePicker } from "./-components/date-range-picker";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_auth/(dashboard)/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="gap-4 p-4 lg:gap-6 lg:p-6 bg-slate-100">
      <Card>
        <CardHeader className="flex-row flex-1 justify-between">
          <CardTitle>Dashboard</CardTitle>
          <DateRangePicker />
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "p-4 rounded-lg border max-w-52 flex-col flex bg-slate-100 justify-center items-center gap-4"
            )}
          >
            <div className={cn("")}>1</div>
            <div>Total Appointments</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
