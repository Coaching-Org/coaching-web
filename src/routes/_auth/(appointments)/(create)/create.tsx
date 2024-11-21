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
import { useLanguage } from "@/components/language.provider";
import { useAuth } from "@/auth";

export const Route = createFileRoute("/_auth/(appointments)/(create)/create")({
  component: AppointmentCreateLayout,
});

function AppointmentCreateLayout() {
  const { translations } = useLanguage();
  const navigate = useNavigate();
  const {
    event: {
      onDateSelect,
      onTimeSlotSelect,
      onSubmitAppointment,
      onCoacheeSelect,
      onChangeCoachee,
    },
    state: {
      timeSlots,
      selectedDate,
      selectedTimeSlot,
      coacheeData,
      coachId,
      coachName,
    },
  } = useCreateAppointmentUtils();

  return (
    <div className="gap-4 p-4 lg:gap-6 lg:p-6">
      {/* Padding Card => 32 */}
      <Card className="p-4 flex-row">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            {translations.button.action.addSession}
          </CardTitle>
          {/* Heading 16px */}
        </CardHeader>
        <CardContent>
          <CardTitle className="text-xl">
            {translations.title.sessionDetail}
          </CardTitle>
          <div className="w-1/2">
            <div className="flex flex-1 flex-row">
              {/* Form Service */}
              <div className="w-1/2">
                {/* Form Service */}
                <div className="flex-col flex mt-4 min-w-[250px]">
                  {/* Size 12 */}
                  {translations.title.sessionCoach}
                  <div className="text-xs">
                    <Combobox
                      data={[]}
                      defaultValue={{
                        label: coachName || "",
                        value: coachId || "",
                      }}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>

              <div className="w-1/2">
                {/* Form Coachee */}
                <div className="flex-col flex mt-4 ml-4 min-w-[250px]">
                  {translations.title.sessionCoachee}
                  <div className="text-xs">
                    <Combobox
                      data={
                        coacheeData?.data.map((item) => ({
                          label: item.name,
                          value: item.id,
                        })) || []
                      }
                      onValueChange={onCoacheeSelect}
                      onDataChange={onChangeCoachee}
                    />
                  </div>
                </div>
              </div>
            </div>

            <CardTitle className="text-xl mt-4">
              {translations.title.sessionSchedule}
            </CardTitle>
            <div className="flex flex-1 flex-row">
              <div className="w-1/2">
                {/* Form Appointments Date */}
                <div className="flex-col flex mt-4 min-w-[250px]">
                  {translations.title.sessionAppointmentDate}
                  <DatePicker onDateSelect={onDateSelect} />
                </div>
              </div>

              <div className="w-1/2">
                {/* Form Appointments Time */}
                <div className="flex-col flex mt-4 ml-4 min-w-[250px]">
                  {translations.title.sessionAppointmentTime}
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
            }}
          >
            {translations.button.action.create}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
