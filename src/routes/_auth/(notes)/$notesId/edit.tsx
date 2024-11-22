import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useNotesUtils } from "./-utils/notes.utils";
import moment from "moment";
import { useDetailNotesFirestoreUtils } from "@/hooks/firebase/detail-notes.firestore.utils";
import { useEditNotesUtils } from "./-utils/edit-notes.utils";
import { useLanguage } from "@/components/language.provider";

export const Route = createFileRoute("/_auth/(notes)/$notesId/edit")({
  component: EdiNotesLayout,
});

function EdiNotesLayout() {
  const { translations } = useLanguage();
  const { notesId } = useParams({ from: "/_auth/$notesId/edit" });
  const {
    state: {
      isButtonDisabled,
      textGoals,
      textReality,
      textOptions,
      textWayForward,
      textNotes,
      sessionDate,
      sessionName,
      sessionCoachee,
    },
    event: {
      onSaveNotes,
      setTextGoals,
      setTextReality,
      setTextOptions,
      setTextWayForward,
      setTextNotes,
      setFile,
    },
  } = useEditNotesUtils({ edit: true, notesId });

  const {
    state: { notesData },
  } = useDetailNotesFirestoreUtils({ notesId });

  return (
    <div className="gap-4 lg:p-6">
      <Card className="px-2">
        <CardHeader className="flex-row flex-1 justify-between">
          <div>
            <CardTitle className="text-2xl text-primary">
              {/* 24px */}
              {translations.title.sessionNotes}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-1/2">
            <CardTitle className="text-xl">
              {/* 20px */}
              {translations.title.sessionDetail}
            </CardTitle>
            <div className="flex flex-1 flex-row justify-between">
              {/* Form Service */}
              <div className="flex-col flex mt-4 min-w-[250px]">
                <span className="text-base">
                  {translations.title.sessionAppointmentDate}
                </span>
                <div>
                  <span className="font-semibold mt-4 text-sm text-muted-foreground">
                    {moment(sessionDate).format("MMMM Do, YYYY")}
                  </span>
                </div>
              </div>

              <div className="flex-col flex mt-4 min-w-[250px]">
                {/* Size 12 */}
                {translations.title.sessionType}
                <div>
                  <span className="font-semibold mt-4 text-sm text-muted-foreground">
                    {sessionName}
                  </span>
                </div>
              </div>

              <div className="flex-col flex mt-4 min-w-[250px]">
                {/* Size 12 */}
                {translations.title.sessionCoachee}
                <div>
                  <span className="font-semibold mt-4 text-sm text-muted-foreground">
                    {sessionCoachee}
                  </span>
                </div>
              </div>
            </div>
            <CardTitle className="text-xl mt-8">
              {translations.title.notesDetail}
            </CardTitle>
            <div className="mt-4">
              {/* min height - 200 */}
              <Label>
                {" "}
                <span className="text-red-500">*</span>
                {translations.title.notesGoals}
              </Label>
              <Textarea
                value={textGoals}
                onChange={(e) => setTextGoals(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Label>
                {" "}
                <span className="text-red-500">*</span>
                {translations.title.notesReality}
              </Label>
              <Textarea
                value={textReality}
                onChange={(e) => setTextReality(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Label>
                {" "}
                <span className="text-red-500">*</span>
                {translations.title.notesOptions}
              </Label>
              <Textarea
                value={textOptions}
                onChange={(e) => setTextOptions(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Label>
                {" "}
                <span className="text-red-500">*</span>
                {translations.title.notesWayForward}
              </Label>
              <Textarea
                value={textWayForward}
                onChange={(e) => setTextWayForward(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Label>{translations.title.notesNotes}</Label>
              <Textarea
                value={textNotes}
                onChange={(e) => setTextNotes(e.target.value)}
              />
            </div>
            <div className="mt-4">
              {/* Resize bordernya, with icon upload ditengah, multiple file, pdf, png, jpg, jpeg doc docx xls xlsx ppt pptx, rar zip 7zip max 5mb */}
              {/* Can we make it universal? */}
              <Label>
                <span className="text-red-500">*</span>
                {translations.title.notesFile}
              </Label>
              <Input
                type="file"
                multiple={false}
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.rar,.zip"
                onChange={(e) => {
                  const formData = new FormData();
                  const files = e.target?.files?.[0];
                  formData.append("file", files as any, files?.name);
                  // handleUploadFile(formData);
                  setFile(formData);
                  // if (files) {
                  //   const validFiles = Array.from(files).filter(
                  //     (file) => file.size <= 5 * 1024 * 1024
                  //   );
                  //   if (validFiles.length !== files.length) {
                  //     alert("File size exceeds 5MB");
                  //   }

                  //   formData.append("file", validFiles[0]);

                  //   setFile(validFiles);
                  //   handleUploadFile(validFiles[0]);
                  // }
                }}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          {/* Add validation for GROW*/}
          <Button onClick={onSaveNotes} disabled={isButtonDisabled}>
            {translations.button.action.save}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
