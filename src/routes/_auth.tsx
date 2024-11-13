import { useAuth } from "@/auth";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { Calendar, User, LayoutDashboard, UserCircle } from "lucide-react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FileTextIcon } from "@radix-ui/react-icons";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const auth = useAuth();
  const [openLogout, setOpenLogout] = React.useState(false);
  const [currentPath, setCurrentPath] = useState(
    router.state.location.pathname
  );

  const handleLogout = () => {
    auth.logout().then(() => {
      router.invalidate().finally(() => {
        navigate({ to: "/" });
      });
    });
  };

  useEffect(() => {
    setCurrentPath(router.state.location.pathname);
  }, [router.state.location.pathname]);

  const isActive = (path: string) => {
    return currentPath === path
      ? "bg-primary text-white hover:text-white"
      : "text-muted-foreground hover:text-primary";
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Full menu */}
      <Sidebar handleLogout={() => setOpenLogout(true)}>
        {/* Dashboard */}
        <Link
          to="/dashboard"
          onClick={() => setCurrentPath("/dashboard")}
          className={`${isActive("/dashboard")}  ${auth.userRole === "admin" ? "hidden" : ""}  flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>
        {/* Calendar */}
        {/* <Link
          to="/calendar"
          className={`${isActive("/calendar")} flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
        >
          <Calendar className="h-4 w-4" />
          Calendar
        </Link> */}
        {/* Appointments */}
        <Link
          to="/appointments"
          onClick={() => setCurrentPath("/appointments")}
          className={`${isActive("/appointments")} flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
        >
          <Calendar className="h-4 w-4" />
          Sessions
        </Link>
        {/* Notes */}
        <Link
          to="/notes"
          onClick={() => setCurrentPath("/notes")}
          className={`${isActive("/notes")} flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
        >
          <FileTextIcon className="h-4 w-4" />
          Notes
        </Link>
        {/* Coach */}
        <Link
          to="/users"
          onClick={() => setCurrentPath("/users")}
          className={`${isActive("/users")} flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
        >
          <User className="h-4 w-4" />
          Coachee
        </Link>

        {/* Coach */}
        <Link
          to="/coach"
          onClick={() => setCurrentPath("/coach")}
          className={`${isActive("/coach")} ${auth.userRole !== "admin" ? "hidden" : ""} flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
        >
          <User className="h-4 w-4" />
          Coach
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          onClick={() => setCurrentPath("/profile")}
          className={`${isActive("/profile")} flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
        >
          <UserCircle className="h-4 w-4" />
          Profile
        </Link>
      </Sidebar>
      {/* Mini Menu Section */}
      <div className="flex flex-col">
        <Header handleLogout={() => setOpenLogout(true)}>
          <Link
            to="/dashboard"
            onClick={() => setCurrentPath("/dashboard")}
            className={`${auth.userRole === "admin" ? "hidden" : ""} mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/appointments"
            onClick={() => setCurrentPath("/appointments")}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Calendar className="h-5 w-5" />
            Sessions
          </Link>
          <Link
            to="/notes"
            onClick={() => setCurrentPath("/notes")}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <FileTextIcon className="h-5 w-5" />
            Notes
          </Link>
          <Link
            to="/users"
            onClick={() => setCurrentPath("/users")}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <User className="h-5 w-5" />
            Coachee
          </Link>
          <Link
            to="/coach"
            onClick={() => setCurrentPath("/coach")}
            className={`${auth.userRole !== "admin" ? "hidden" : ""} mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
          >
            <User className="h-5 w-5" />
            Coach
          </Link>
          <Link
            to="/profile"
            onClick={() => setCurrentPath("/profile")}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <UserCircle className="h-5 w-5" />
            Profile
          </Link>
        </Header>
        <Outlet />
      </div>
      <Dialog open={openLogout} onOpenChange={setOpenLogout}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exit</DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleLogout}>Sign Out</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
