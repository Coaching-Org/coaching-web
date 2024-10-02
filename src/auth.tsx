import * as React from "react";

import { sleep } from "@/lib/utils";

export interface IAuthForm {
  email: string;
  password: string;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  login: (formValues: IAuthForm) => Promise<void>;
  logout: () => Promise<void>;
  user: string | null;
}

const AuthContext = React.createContext<IAuthContext | null>(null);
AuthContext.displayName = "AuthContext";

const key = "coaching.auth.user";

function getStoredUser() {
  return localStorage.getItem(key);
}

function setStoredUser(user: string | null) {
  if (user) {
    localStorage.setItem(key, user);
  } else {
    localStorage.removeItem(key);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<string | null>(getStoredUser());
  const isAuthenticated = !!user;

  const logout = React.useCallback(async () => {
    await sleep(250);

    setStoredUser(null);
    setUser(null);
  }, []);

  const login = React.useCallback(async (formValues: IAuthForm) => {
    await sleep(500);

    setStoredUser(formValues.email);
    setUser(formValues.email);
  }, []);

  React.useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
