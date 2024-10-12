import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/datepicker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/(appointments)/(create)/create")({
  component: AppointmentCreateLayout,
});

const tempCourse = [
  {
    value: "1",
    label: "Professional Coaching",
  },
];

const tempCoach = [
  {
    value: "1",
    label: "Marcel",
  },
];

const tempCoachee = [
  {
    value: "1",
    label: "Tatas",
  },
  {
    value: "2",
    label: "Iwan",
  },
];

const tempAppointmentTime = [
  {
    value: "1",
    label: "09.00 - 09.30",
  },
  {
    value: "2",
    label: "09.30 - 10.00",
  },
  {
    value: "3",
    label: "10.00 - 10.30",
  },
  {
    value: "4",
    label: "10.30 - 11.00",
  },
];

function AppointmentCreateLayout() {
  return (
    <div className="gap-4 p-4 lg:gap-6 lg:p-6">
      <Card className="p-4 flex-row">
        <CardHeader>
          <CardTitle>Add Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-1 flex-row justify-between">
            {/* Form Service */}
            <div className="flex-col flex">
              Select Service
              <Combobox
                data={tempCourse}
                defaultValue={{ label: "Professional Coaching", value: "1" }}
              />
            </div>

            {/* Form Coach */}
            <div className="flex-col flex">
              Select Coach
              <Combobox
                data={tempCoach}
                defaultValue={{ label: "Marcel", value: "1" }}
                disabled={true}
              />
            </div>

            {/* Form Coachee */}
            <div className="flex-col flex">
              Select Coachee
              <Combobox data={tempCoachee} />
            </div>
          </div>

          <div className="flex flex-1 flex-row justify-between mt-8">
            {/* Form Appointments Date */}
            <div className="flex-col flex">
              Appointment Date
              <DatePicker />
            </div>
            {/* Form Appointments Time */}
            <div className="flex-col flex">
              Appointment Time
              <Combobox data={tempAppointmentTime} />
            </div>
            {/* Form Status */}
            <div className="flex-col flex">
              Select Status
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Pending" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="decline">Decline</SelectItem>
                    <SelectItem value="accept">Accept</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Create</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
