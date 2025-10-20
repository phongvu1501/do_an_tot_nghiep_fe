import React, { useCallback, useEffect, useMemo, useState } from "react";
import { storage } from "../utils/storage";
import {
  AuthContext,
  type AuthContextValue,
  type AuthUser,
} from "./authContextBase";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const t = storage.getToken();
    const u = storage.getUser();
    setToken(t);
    setUser(u);
  }, []);

  const login = useCallback((newToken: string, newUser: AuthUser) => {
    storage.setToken(newToken);
    storage.setUser(newUser);
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    storage.clearAuth();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      login,
      logout,
      setUser,
    }),
    [user, token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
