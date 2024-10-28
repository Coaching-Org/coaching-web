import { Link, LinkComponent } from "@tanstack/react-router";
import { Dumbbell, Folder, Package2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { logo } from "@/assets/logo";

interface ISidebarProps {
  handleLogout: () => void;
  children: JSX.Element | JSX.Element[];
}

export default function Sidebar({ handleLogout, children }: ISidebarProps) {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <img src={logo} alt="logo" className="h-12 w-fit" />
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-base font-medium lg:px-4">
            {children}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="A card with a call to action">
            <CardContent className="p-2">
              <Button
                variant={"outline"}
                size="sm"
                className="w-full border-primary text-primary"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
