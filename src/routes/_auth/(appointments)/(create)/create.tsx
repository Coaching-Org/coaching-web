import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/datepicker";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useLanguage } from "@/components/language.provider";
import { useAuth } from "@/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useCoachUtils } from "./-utils/coach.utils";
import { useCoacheeUtils } from "./-utils/coachee.utils";
import { useFormUtils } from "./-utils/form.utils";
import { ComboboxCustom } from "@/components/custom/";

let renderCount = 0;

export const Route = createFileRoute("/_auth/(appointments)/(create)/create")({
  component: AppointmentCreateForm,
});

function AppointmentCreateForm() {
  const { translations } = useLanguage();
  const { userRole } = useAuth();
  const {
    state: { coachData, isLoadingCoach },
    event: { setCoachKeyword },
  } = useCoachUtils();
  const {
    state: { coacheeData, isLoadingCoachee },
    event: { setCoacheeKeyword },
  } = useCoacheeUtils();
  const {
    event: { onFormSubmit },
    state: { form, timeSlots },
  } = useFormUtils();

  return (
    <div className="gap-4 p-4 lg:gap-6 lg:p-6">
      {/* Padding Card => 32 */}
      <Card className="p-4 flex-row">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            {translations.button.action.addSession}
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)}>
            <CardContent>
              <CardTitle className="text-xl">
                {translations.title.sessionDetail}
              </CardTitle>
              <div className="w-1/2">
                <div className="flex flex-1 flex-row">
                  <div className="w-1/2">
                    {/* Form Service */}
                    <div className="flex-col flex mt-4 min-w-[250px]">
                      <div className="text-xs">
                        <FormField
                          control={form.control}
                          name="coach"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-col text-base">
                                <FormLabel aria-required="true">
                                  <span className="text-red-500">*</span>
                                  {translations.title.sessionCoach}
                                </FormLabel>
                                <FormControl>
                                  <ComboboxCustom
                                    className="max-w-[250px] min-w-[200px]"
                                    data={
                                      coachData?.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                      })) || []
                                    }
                                    onSelect={(value) => {
                                      field.onChange(value);
                                    }}
                                    onSearch={(e) => {
                                      setCoachKeyword(e);
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-1/2">
                    {/* Form Coachee */}
                    <div className="flex-col flex mt-4 ml-4 min-w-[250px]">
                      <div className="text-xs flex flex-col">
                        <FormField
                          control={form.control}
                          name="coachee"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-col text-base">
                                <FormLabel aria-required="true">
                                  <span className="text-red-500">*</span>
                                  {translations.title.sessionCoachee}
                                </FormLabel>
                                <FormControl>
                                  <ComboboxCustom
                                    className="max-w-[250px] min-w-[200px]"
                                    data={
                                      coacheeData?.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                      })) || [{ label: "", value: "" }]
                                    }
                                    onSelect={(value) => {
                                      field.onChange(value);
                                    }}
                                    onSearch={(e) => {
                                      setCoacheeKeyword(e);
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            );
                          }}
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
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-col min-w-[250px] text-base">
                              <FormLabel>
                                <span className="text-red-500">*</span>
                                {translations.title.sessionAppointmentDate}
                              </FormLabel>
                              <FormControl>
                                <DatePicker
                                  onDateSelect={field.onChange}
                                  className="min-w-[250px]"
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="w-1/2">
                    {/* Form Appointments Time */}
                    <div className="flex-col flex mt-4 ml-4 min-w-[250px]">
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-col text-base">
                              <FormLabel>
                                <span className="text-red-500">*</span>
                                {translations.title.sessionAppointmentTime}
                              </FormLabel>
                              <FormControl>
                                <ComboboxCustom
                                  className="max-w-[250px] min-w-[200px]"
                                  data={timeSlots.map((item) => ({
                                    label: item.label,
                                    value: item.id,
                                  }))}
                                  onSelect={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2"></div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button type="submit">{translations.button.action.create}</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
