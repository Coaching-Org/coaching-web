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
import { ModalChangePasswordProfile } from "./-components/";

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
    <>
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
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={() => setShowPasswordField(true)}>
            Edit Password
          </Button>
        </CardFooter>
      </Card>
      <ModalChangePasswordProfile
        isOpen={showPasswordField}
        onOpenChange={() => setShowPasswordField(false)}
      />
    </>
  );
}
