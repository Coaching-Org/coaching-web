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
import { Label } from "@/components/ui/label";
import { useMemo } from "react";

export const Route = createFileRoute("/_auth/(appointments)/(create)/create")({
  component: AppointmentCreateLayout,
});

function AppointmentCreateLayout() {
  const { translations } = useLanguage();
  const { userRole } = useAuth();
  const {
    event: {
      onDateSelect,
      onTimeSlotSelect,
      onSubmitAppointment,
      onCoacheeSelect,
      onChangeCoachee,
      setCoacheeKeyword,
      setCoachKeyword,
    },
    state: {
      timeSlots,
      selectedDate,
      selectedTimeSlot,
      coacheeData,
      coachId,
      coachName,
      isButtonDisabled,
      loading,
      coachData,
      loadingCoach,
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
                  <Label className="text-base">
                    {/* <span className="text-red-500">*</span> */}
                    {translations.title.sessionCoach}
                  </Label>
                  <div className="text-xs">
                    <Combobox
                      data={coachData || []}
                      defaultValue={
                        userRole !== "admin"
                          ? {
                              label: coachName || "",
                              value: coachId || "",
                            }
                          : { label: "", value: "" }
                      }
                      disabled={userRole !== "admin"}
                      onSearch={(e) => setCoachKeyword(e.target.value)}
                      loading={loadingCoach}
                    />
                  </div>
                </div>
              </div>

              <div className="w-1/2">
                {/* Form Coachee */}
                <div className="flex-col flex mt-4 ml-4 min-w-[250px]">
                  <Label className="text-base">
                    <span className="text-red-500">*</span>
                    {translations.title.sessionCoachee}
                  </Label>
                  <div className="text-xs">
                    <Combobox
                      data={
                        coacheeData?.map((item) => ({
                          label: item.name,
                          value: item.id,
                        })) || []
                      }
                      // data={coacheeData}
                      onValueChange={onCoacheeSelect}
                      onDataChange={onChangeCoachee}
                      onSearch={(e) => setCoacheeKeyword(e.target.value)}
                      loading={loading}
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
                  <Label className="text-base">
                    <span className="text-red-500">*</span>
                    {translations.title.sessionAppointmentDate}
                  </Label>
                  <DatePicker onDateSelect={onDateSelect} />
                </div>
              </div>

              <div className="w-1/2">
                {/* Form Appointments Time */}
                <div className="flex-col flex mt-4 ml-4 min-w-[250px]">
                  <Label className="text-base">
                    <span className="text-red-500">*</span>
                    {translations.title.sessionAppointmentTime}
                  </Label>
                  <Combobox
                    onValueChange={onTimeSlotSelect}
                    data={timeSlots.map((item) => {
                      return {
                        label: item.label,
                        value: item.id,
                      };
                    })}
                    disabled={selectedDate === null}
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
            disabled={isButtonDisabled}
          >
            {translations.button.action.create}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
