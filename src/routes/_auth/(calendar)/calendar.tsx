import { Card } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/(calendar)/calendar")({
  component: CalendarLayout,
});

function CalendarLayout() {
  // Take out calendar
  return (
    <Card className="m-4">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold md:text-2xl">Calendar</h1>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">This Week</h2>
              <button className="text-sm font-medium text-blue-500 hover:text-blue-700">
                Today
              </button>
            </div>
            <div className="grid grid-cols-7 gap-4">
              <div className="text-center">
                <span className="text-sm font-medium">Mon</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-medium">Tue</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-medium">Wed</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-medium">Thu</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-medium">Fri</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-medium">Sat</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-medium">Sun</span>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-4">
              <div className="p-4 rounded-lg bg-gray-100">
                <span className="text-sm font-medium">1</span>
              </div>
              <div className="p-4 rounded-lg bg-gray-100">
                <span className="text-sm font-medium">2</span>
              </div>
              <div className="p-4 rounded-lg bg-gray-100">
                <span className="text-sm font-medium">3</span>
              </div>
              <div className="p-4 rounded-lg bg-gray-100">
                <span className="text-sm font-medium">4</span>
              </div>
              <div className="p-4 rounded-lg bg-gray-100">
                <span className="text-sm font-medium">5</span>
              </div>
              <div className="p-4 rounded-lg bg-gray-100">
                <span className="text-sm font-medium">6</span>
              </div>
              <div className="p-4 rounded-lg bg-gray-100">
                <span className="text-sm font-medium">7</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Card>
  );
}
