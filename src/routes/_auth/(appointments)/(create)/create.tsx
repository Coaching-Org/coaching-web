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
import { createFileRoute, useNavigate } from "@tanstack/react-router";

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
  const navigate = useNavigate();
  return (
    <div className="gap-4 p-4 lg:gap-6 lg:p-6">
      {/* Padding Card => 32 */}
      <Card className="p-4 flex-row">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Add Session</CardTitle>
          {/* Heading 16px */}
        </CardHeader>
        <CardContent>
          <div className="w-1/2">
            <CardTitle className="text-xl">Session Details</CardTitle>
            <div className="flex flex-1 flex-row justify-between">
              {/* Form Service */}
              <div className="flex-col flex mt-4 min-w-[250px]">
                {/* Size 12 */}
                Session Type
                <div className="text-xs">
                  <Combobox
                    data={tempCourse}
                    defaultValue={{
                      label: "Professional Coaching",
                      value: "1",
                    }}
                    // Size 12
                    // Padding placeholder 4
                  />
                </div>
              </div>

              {/* Form Coachee */}
              <div className="flex-col flex mt-4 ml-4 min-w-[250px]">
                Coachee
                <div className="text-xs">
                  <Combobox data={tempCoachee} />
                </div>
              </div>
            </div>

            <CardTitle className="text-xl mt-4">Session Schedule</CardTitle>
            <div className="flex flex-1 flex-row justify-between">
              {/* Form Appointments Date */}
              <div className="flex-col flex mt-4 min-w-[250px]">
                Appointment Date
                <DatePicker />
              </div>
              {/* Form Appointments Time */}
              <div className="flex-col flex mt-4 ml-4 min-w-[250px]">
                Appointment Time
                <Combobox data={tempAppointmentTime} />
              </div>
            </div>
          </div>
          <div className="w-1/2"></div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button
            onClick={() => {
              navigate({ to: "/appointments" });
            }}
          >
            Create
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
