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
import { createFileRoute } from "@tanstack/react-router";
import { useCreateCoachUtils } from "./-utils/create-coach.utils";

export const Route = createFileRoute("/_auth/(coach)/create-coach")({
  component: CreateCoachLayout,
});

function CreateCoachLayout() {
  const {
    state: {
      name,
      email,
      phoneNumber,
      password,
      confirmPassword,
      isButtonDisabled,
      isButtonLoading,
    },
    event: {
      setName,
      setEmail,
      setPhoneNumber,
      setPassword,
      setConfirmPassword,
      onSaveCoach,
    },
  } = useCreateCoachUtils();
  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold md:text-2xl text-primary">
          Create Coach
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
                defaultValue={"Coach"}
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
        <Button
          onClick={onSaveCoach}
          disabled={isButtonDisabled() || isButtonLoading}
        >
          Add Coach
        </Button>
      </CardFooter>
    </Card>
  );
}
