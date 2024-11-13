import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  createFileRoute,
  useNavigate,
  useParams,
  useRouter,
} from "@tanstack/react-router";
import { useNotesUtils } from "./-utils/notes.utils";
import { useCreateAppointmentFirestoreUtils } from "@/hooks/firebase";
import moment from "moment";

export const Route = createFileRoute("/_auth/(notes)/$notesId/NoteDetail")({
  component: NoteDetailLayout,
});

function NoteDetailLayout() {
  const router = useRouter();
  const navigate = useNavigate();
  const { notesId } = useParams({
    from: "/_auth/$notesId/NoteDetail",
  });
  const {
    state: {
      isButtonDisabled,
      textGoals,
      textReality,
      textOptions,
      textWayForward,
      textNotes,
      contextCoacheeName,
      contextCourseName,
      contextDate,
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
  } = useNotesUtils({ edit: false, notesId });

  return (
    <div className="gap-4 lg:p-6">
      <Card className="px-2">
        <CardHeader className="flex-row flex-1 justify-between">
          <div>
            <CardTitle className="text-2xl text-primary">
              {/* 24px */}
              Session Notes
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-1/2">
            <CardTitle className="text-xl">
              {/* 20px */}
              Session Details
            </CardTitle>
            <div className="flex flex-1 flex-row justify-between">
              {/* Form Service */}
              <div className="flex-col flex mt-4 min-w-[250px]">
                <span className="text-base">Session Date</span>
                <div>
                  <span className="font-semibold mt-4 text-sm text-muted-foreground">
                    {moment(sessionDate).format("MMMM Do, YYYY")}
                  </span>
                </div>
              </div>

              <div className="flex-col flex mt-4 min-w-[250px]">
                {/* Size 12 */}
                Session Type
                <div>
                  <span className="font-semibold mt-4 text-sm text-muted-foreground">
                    {sessionName}
                  </span>
                </div>
              </div>

              <div className="flex-col flex mt-4 min-w-[250px]">
                {/* Size 12 */}
                Coachee
                <div>
                  <span className="font-semibold mt-4 text-sm text-muted-foreground">
                    {sessionCoachee}
                  </span>
                </div>
              </div>
            </div>
            <CardTitle className="text-xl mt-8">Note Details</CardTitle>
            <div className="mt-4">
              {/* min height - 200 */}
              <Label>Goals</Label>
              <Textarea
                value={textGoals}
                onChange={(e) => setTextGoals(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Label>Reality</Label>
              <Textarea
                value={textReality}
                onChange={(e) => setTextReality(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Label>Options</Label>
              <Textarea
                value={textOptions}
                onChange={(e) => setTextOptions(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Label>Will/Way Forward</Label>
              <Textarea
                value={textWayForward}
                onChange={(e) => setTextWayForward(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Label>Notes</Label>
              <Textarea
                value={textNotes}
                onChange={(e) => setTextNotes(e.target.value)}
              />
            </div>
            <div className="mt-4">
              {/* Resize bordernya, with icon upload ditengah, multiple file, pdf, png, jpg, jpeg doc docx xls xlsx ppt pptx, rar zip 7zip max 5mb */}
              {/* Can we make it universal? */}
              <Label>File</Label>
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
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
