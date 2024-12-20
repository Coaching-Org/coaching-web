import {
  CircleUser,
  Dumbbell,
  Folder,
  Menu,
  Package2,
  Search,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { logoHD } from "@/assets/logo";

interface IHeaderProps {
  handleLogout: () => void;
  children: JSX.Element | JSX.Element[];
}

export default function Header({ handleLogout, children }: IHeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 md:justify-end lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SheetDescription className="sr-only">
          Access coaching dashboard through navigation menu.
        </SheetDescription>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <div className="flex flex-col h-[95vh]">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                to="/dashboard"
                className="flex items-center justify-center font-semibold"
              >
                <div className="p-4">
                  <img src={logoHD} alt="logo" className="h-12 w-fit" />
                </div>
              </Link>
              {children}
            </nav>
            <div className="mt-auto">
              <Card x-chunk="A card with a call to action">
                <CardContent className="p-2">
                  <Button size="sm" className="w-full" onClick={handleLogout}>
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex flex-row gap-4">
        {/* <ThemeToggle /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Sign Out</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled className="text-xs text-neutral-500">
              v2.0.1
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
