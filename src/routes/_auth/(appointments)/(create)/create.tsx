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
import { useCreateAppointmentUtils } from "./-utils/create.utils";

export const Route = createFileRoute("/_auth/(appointments)/(create)/create")({
  component: AppointmentCreateLayout,
});

const tempCourse = [
  {
    value: 1,
    label: "Professional Coaching",
  },
];

const tempCoach = [
  {
    value: 1,
    label: "Marcel",
  },
];

const tempCoachee = [
  {
    value: 1,
    label: "Tatas",
  },
  {
    value: 2,
    label: "Iwan",
  },
];

function AppointmentCreateLayout() {
  const navigate = useNavigate();
  const {
    event: {
      onDateSelect,
      onTimeSlotSelect,
      onSubmitAppointment,
      onCoacheeSelect,
    },
    state: { timeSlots, selectedDate, selectedTimeSlot, coacheeData },
  } = useCreateAppointmentUtils({ coachId: tempCoach[0].value });
  return (
    <div className="gap-4 p-4 lg:gap-6 lg:p-6">
      {/* Padding Card => 32 */}
      <Card className="p-4 flex-row">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Add Session</CardTitle>
          {/* Heading 16px */}
        </CardHeader>
        <CardContent>
          <CardTitle className="text-xl">Session Details</CardTitle>
          <div className="w-1/2">
            <div className="flex flex-1 flex-row">
              {/* Form Service */}
              <div className="w-1/2">
                {/* Form Service */}
                <div className="flex-col flex mt-4 min-w-[250px]">
                  {/* Size 12 */}
                  Session Type
                  <div className="text-xs">
                    <Combobox
                      data={tempCourse}
                      defaultValue={{
                        label: tempCoach[0].label,
                        value: tempCoach[0].value,
                      }}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>

              <div className="w-1/2">
                {/* Form Coachee */}
                <div className="flex-col flex mt-4 ml-4 min-w-[250px]">
                  Coachee
                  <div className="text-xs">
                    <Combobox
                      data={
                        coacheeData?.data.map((item) => ({
                          label: item.name,
                          value: item.id,
                        })) || []
                      }
                      onValueChange={onCoacheeSelect}
                    />
                  </div>
                </div>
              </div>
            </div>

            <CardTitle className="text-xl mt-4">Session Schedule</CardTitle>
            <div className="flex flex-1 flex-row">
              <div className="w-1/2">
                {/* Form Appointments Date */}
                <div className="flex-col flex mt-4 min-w-[250px]">
                  Appointment Date
                  <DatePicker onDateSelect={onDateSelect} />
                </div>
              </div>

              <div className="w-1/2">
                {/* Form Appointments Time */}
                <div className="flex-col flex mt-4 ml-4 min-w-[250px]">
                  Appointment Time
                  <Combobox
                    onValueChange={onTimeSlotSelect}
                    data={timeSlots.map((item) => {
                      return {
                        label: item.label,
                        value: item.id,
                      };
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2"></div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button
            onClick={() => {
              onSubmitAppointment();
              // navigate({ to: "/appointments" });
            }}
          >
            Create
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
