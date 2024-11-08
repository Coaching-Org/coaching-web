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
import { createFileRoute } from "@tanstack/react-router";
import { useCreateCoacheeUtils } from "./-utils/create-coachee.utils";

export const Route = createFileRoute("/_auth/(users)/create-coachee")({
  component: CreateCoacheeLayout,
});

function CreateCoacheeLayout() {
  const {
    state: {
      name,
      email,
      phoneNumber,
      password,
      confirmPassword,
      isButtonDisabled,
    },
    event: {
      setName,
      setEmail,
      setPhoneNumber,
      setPassword,
      setConfirmPassword,
      onSaveCoachee,
    },
  } = useCreateCoacheeUtils();
  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold md:text-2xl text-primary">
          Create Coachee
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex-row flex flex-1">
          <div className="w-1/2 mr-1">
            <div className="mb-4">
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label>Phone Number</Label>
              <Input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-1/2 mr-1">
            <div className="mb-4">
              <Label>Email</Label>
              <Input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label>Role</Label>
              <Input
                type="text"
                placeholder="Role"
                defaultValue={"Coachee"}
                disabled
              />
            </div>
            <div className="mb-4">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={onSaveCoachee} disabled={isButtonDisabled()}>
          Add Coachee
        </Button>
      </CardFooter>
    </Card>
  );
}
