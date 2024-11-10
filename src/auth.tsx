import * as React from "react";

import { sleep } from "@/lib/utils";
import { PostLoginResponse } from "./services/auth/auth.type";

export interface IAuthForm {
  email: string;
  password: string;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  login: (formValues: PostLoginResponse) => Promise<void>;
  logout: () => Promise<void>;
  user: string | null;
  userId: number | null;
  userRole: string | null;
}

const AuthContext = React.createContext<IAuthContext | null>(null);
AuthContext.displayName = "AuthContext";

const key = "coaching.auth.user";
const keyUserId = "coaching.auth.userId";
const keyUserRole = "coaching.auth.userRole";

function getStoredUser() {
  return localStorage.getItem(key);
}

function getStoredUserId() {
  return localStorage.getItem(keyUserId);
}

function getStoredUserRole() {
  return localStorage.getItem(keyUserRole);
}

function setStoredUser(user: string | null) {
  if (user) {
    localStorage.setItem(key, user);
  } else {
    localStorage.removeItem(key);
  }
}

function setStoredUserId(userId: number | null) {
  if (userId) {
    localStorage.setItem(keyUserId, userId.toString());
  } else {
    localStorage.removeItem(keyUserId);
  }
}

function setStoredUserRole(userRole: string | null) {
  if (userRole) {
    localStorage.setItem(keyUserRole, userRole);
  } else {
    localStorage.removeItem(keyUserRole);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<string | null>(getStoredUser());
  const [userId, setUserId] = React.useState<number | null>(
    Number(getStoredUserId())
  );
  const [userRole, setUserRole] = React.useState<string | null>(
    getStoredUserRole()
  );
  const isAuthenticated = !!userId;

  const logout = React.useCallback(async () => {
    await sleep(250);

    setStoredUser(null);
    setStoredUserId(null);
    setStoredUserRole(null);
    setUser(null);
    setUserId(null);
    setUserRole(null);
  }, []);

  const login = React.useCallback(async (formValues: PostLoginResponse) => {
    await sleep(500);

    setStoredUser(formValues.email);
    setStoredUserId(formValues.id);
    setStoredUserRole(formValues.role);
    setUser(formValues.email);
    setUserId(formValues.id);
    setUserRole(formValues.role);
  }, []);

  React.useEffect(() => {
    setUser(getStoredUser());
    setUserId(Number(getStoredUserId()));
    setUserRole(getStoredUserRole());
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, userId, userRole, login, logout }}
    >
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
