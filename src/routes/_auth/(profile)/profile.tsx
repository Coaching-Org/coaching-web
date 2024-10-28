import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarImage } from "@radix-ui/react-avatar";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_auth/(profile)/profile")({
  component: ProfileLayout,
});

function ProfileLayout() {
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
  return (
    <Card className="m-4">
      <CardHeader>
        <h1 className="text-2xl font-semibold md:text-2xl">Profile</h1>
        <Avatar className="size-36">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent>
        <div className="flex-row flex flex-1">
          <div className="w-1/2 mr-1">
            <div>
              <Label>Name</Label>
              <Input type="text" placeholder="Name" disabled value={"Marcel"} />
            </div>
          </div>
          <div className="w-1/2 ml-1">
            <div>
              <Label>Email</Label>
              <Input
                type="text"
                placeholder="Email"
                disabled
                value={"marcel@coaching.id"}
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
                value={"marcel@coaching.id"}
              />
            </div>
            <div className="mt-4">
              <Label>New Password</Label>
              <Input
                type="password"
                placeholder="New Password"
                disabled
                value={"marcel@coaching.id"}
              />
            </div>
            <div className="mt-4">
              <Label>Retype New Password</Label>
              <Input
                type="password"
                placeholder="Re-password"
                disabled
                value={"marcel@coaching.id"}
              />
            </div>
            {/* Form Phone number */}
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={() => setShowPasswordField(!showPasswordField)}>
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
