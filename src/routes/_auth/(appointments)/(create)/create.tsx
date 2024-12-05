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
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  generateTimeSlots,
  useCreateAppointmentUtils,
} from "./-utils/create.utils";
import { useLanguage } from "@/components/language.provider";
import { useAuth } from "@/auth";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { useCoachUtils } from "./-utils/coach.utils";
import { useCoacheeUtils } from "./-utils/coachee.utils";
import { CoacheeDetail } from "@/interfaces";
import { useFormUtils } from "./-utils/form.utils";
import { ComboboxCustom } from "@/components/custom/combobox.custom";

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
      <h1>Render Count: {renderCount++}</h1>
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
                              <FormItem className="flex flex-col">
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
                                  {/* <Combobox
                                    data={
                                      coachData?.map((item) => {
                                        return {
                                          label: item.name,
                                          value: item.id,
                                        };
                                      }) || [{ label: "", value: "" }]
                                    }
                                    onDataChange={(value) => {
                                      field.onChange(value);
                                    }}
                                    loading={isLoadingCoach}
                                    onSearch={(e) => {
                                      setCoachKeyword(e.target.value);
                                    }}
                                  /> */}
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
                              <FormItem className="flex flex-col">
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
                                  {/* <Combobox
                                    data={
                                      coacheeData?.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                      })) || [{ label: "", value: "" }]
                                    }
                                    onDataChange={(value) => {
                                      field.onChange(value);
                                    }}
                                    loading={isLoadingCoachee}
                                    onSearch={(e) => {
                                      setCoacheeKeyword(e.target.value);
                                    }}
                                  /> */}
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
                            <FormItem className="flex flex-col">
                              <FormLabel>
                                <span className="text-red-500">*</span>
                                {translations.title.sessionAppointmentDate}
                              </FormLabel>
                              <FormControl>
                                <DatePicker onDateSelect={field.onChange} />
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
                            <FormItem className="flex flex-col">
                              <FormLabel>
                                <span className="text-red-500">*</span>
                                {translations.title.sessionAppointmentTime}
                              </FormLabel>
                              <FormControl>
                                <Combobox
                                  onValueChange={field.onChange}
                                  data={timeSlots.map((item) => {
                                    return {
                                      label: item.label,
                                      value: item.id,
                                    };
                                  })}
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

function AppointmentCreateLayout() {
  const { translations } = useLanguage();
  const navigate = useNavigate();
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
      onChangeCoach,
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
      coacheeDataMapping,
      coachData,
      loadingCoach,
      isButtonLoading,
    },
  } = useCreateAppointmentUtils();

  return (
    <div className="gap-4 p-4 lg:gap-6 lg:p-6">
      <h1>Render Count: {renderCount++}</h1>
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
                      onDataChange={onChangeCoach}
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
                        userRole === "admin"
                          ? coacheeData?.map((item) => ({
                              label: item.name,
                              value: item.id,
                            }))
                          : coacheeDataMapping?.map((item) => ({
                              label: item.name,
                              value: item.id,
                            }))
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
            disabled={isButtonDisabled || isButtonLoading}
            loading={isButtonLoading}
          >
            {translations.button.action.create}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
