import { useAuth } from "@/auth";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import {
  Calendar,
  CheckSquare,
  Search,
  User,
  WashingMachine,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useEffect, useMemo } from "react";

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
  const currentPath = router.state.location.pathname;

  const handleLogout = () => {
    auth.logout().then(() => {
      router.invalidate().finally(() => {
        navigate({ to: "/" });
      });
    });
  };

  useEffect(() => {
    console.log('Current Path', currentPath)
  }, [currentPath])

  const isActive = (path: string) => {
    return currentPath === path ? "bg-gray-200" : "text-muted-foreground";
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar handleLogout={() => setOpenLogout(true)}>
        {/* Dashboard */}
        <Link
          to="/dashboard"
          className={`${isActive("/dashboard")} flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>
        {/* Coach/Coachee */}
        <Link
          to="/users"
          className={`${isActive('/users')} flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
        >
          <User className="h-4 w-4" />
          Coachee
        </Link>
        {/* Appointments */}
        <Link
          to="/appointments"
          className={`${isActive('/appointments')} flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
        >
          <Calendar className="h-4 w-4" />
          Appointments
        </Link>
        {/* Profile */}
        <Link
          to="/profile"
          className={`${isActive('/profile')} flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
        >
          <UserCircle className="h-4 w-4" />
          Profile
        </Link>
      </Sidebar>
      <div className="flex flex-col">
        <Header handleLogout={() => setOpenLogout(true)}>
          <Link
            to="/users"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <User className="h-5 w-5" />
            Users
          </Link>
          <Link
            to="/appointments"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Calendar className="h-5 w-5" />
            Appointments
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
