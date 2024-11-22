import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { AvatarImage } from "@radix-ui/react-avatar";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useProfileUtils } from "./-utils/profile.utils";
import { useAuth } from "@/auth";

export const Route = createFileRoute("/_auth/(profile)/profile")({
  component: ProfileLayout,
});

function ProfileLayout() {
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
  const {
    state: { data },
  } = useProfileUtils();

  const { userEmail, userName } = useAuth();

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle className="text-2xl text-primary mb-4">Profile</CardTitle>
        <Avatar className="size-36">
          <AvatarImage src={data?.picture} />
          <AvatarFallback>Profile Picture</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent>
        <div className="flex-row flex flex-1">
          <div className="w-1/2 mr-1">
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Name"
                disabled
                value={userName ?? "-"}
              />
            </div>

            {/* <div className="mt-4">
              <Label>Phone Number</Label>
              <Input
                type="text"
                placeholder="Phone"
                disabled
                value={data?.email ?? "-"}
              />
            </div> */}
          </div>
          <div className="w-1/2 ml-1">
            <div>
              <Label>Email</Label>
              <Input
                type="text"
                placeholder="Email"
                disabled
                value={userEmail ?? "-"}
              />
            </div>
          </div>
        </div>
        {showPasswordField && (
          <div className="mt-6">
            <div className="mt-4">
              <Label>Old Password</Label>
              <Input
                type="password"
                placeholder="Old Password"
                disabled
                value={"coaching"}
              />
            </div>
            <div className="mt-4">
              <Label>New Password</Label>
              <Input
                type="password"
                placeholder="New Password"
                disabled
                value={"coaching"}
              />
            </div>
            <div className="mt-4">
              <Label>Retype New Password</Label>
              <Input
                type="password"
                placeholder="Re-password"
                disabled
                value={"coaching"}
              />
            </div>
            {/* Form Phone number */}
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          onClick={() => setShowPasswordField(!showPasswordField)}
          disabled
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
