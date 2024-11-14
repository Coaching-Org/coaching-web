import * as React from "react";
import {
  Link,
  Outlet,
  createRootRoute,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { IAuthContext } from "@/auth";
import { LanguageProvider } from "@/components/language.provider";

interface IRootContext {
  auth: IAuthContext;
}

export const Route = createRootRouteWithContext<IRootContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="coaching-ui-theme">
      <LanguageProvider defaultLanguage="en" storageKey="app-language">
        <Outlet />
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  );
}
