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
  useRouter,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/(notes)/[notesId]/NoteDetail")({
  component: NoteDetailLayout,
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

function NoteDetailLayout() {
  const router = useRouter();
  const navigate = useNavigate();
  // const test = router.

  return (
    <div className="gap-4 lg:p-6">
      <Card className="px-2">
        <CardHeader className="flex-row flex-1 justify-between">
          <div>
            <CardTitle className="text-2xl text-primary">
              Session Notes
            </CardTitle>
            <CardTitle className="mt-4 text-sm font-normal">
              View and manage all your sessions that you have scheduled with
              your coachees.
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-1/2">
            <CardTitle className="text-xl">Session Details</CardTitle>
            <div className="flex flex-1 flex-row justify-between">
              {/* Form Service */}
              <div className="flex-col flex mt-4 min-w-[250px]">
                {/* Size 12 */}
                Session Date
                <div>
                  <span className="font-semibold mt-4 text-xs text-muted-foreground">
                    October 2nd, 2024
                  </span>
                </div>
              </div>

              <div className="flex-col flex mt-4 min-w-[250px]">
                {/* Size 12 */}
                Session Type
                <div>
                  <span className="font-semibold mt-4 text-xs text-muted-foreground">
                    Professional Coaching
                  </span>
                </div>
              </div>

              <div className="flex-col flex mt-4 min-w-[250px]">
                {/* Size 12 */}
                Coachee
                <div>
                  <span className="font-semibold mt-4 text-xs text-muted-foreground">
                    Tatas Fachrul
                  </span>
                </div>
              </div>
            </div>
            <CardTitle className="text-xl mt-8">Note Details</CardTitle>
            <div className="mt-4">
              <Label>Goals</Label>
              <Textarea />
            </div>
            <div className="mt-4">
              <Label>Reality</Label>
              <Textarea />
            </div>
            <div className="mt-4">
              <Label>Options</Label>
              <Textarea />
            </div>
            <div className="mt-4">
              <Label>Will/Way Forward</Label>
              <Textarea />
            </div>
            <div className="mt-4">
              <Label>Notes</Label>
              <Textarea />
            </div>
            <div className="mt-4">
              <Label>File</Label>
              <Input type="file" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button
            onClick={() => {
              navigate({ to: "/dashboard" });
            }}
          >
            Create
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
