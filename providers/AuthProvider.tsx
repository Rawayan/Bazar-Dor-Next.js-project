"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { authClient } from "@/lib/auth-client";

type AuthUser = typeof authClient.$Infer.Session.user;

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextValue | null>(null);

export default function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshSession() {
    try {
      const { data } = await authClient.getSession();
      setUser(data?.user ?? null);
    } catch (error) {
      console.error("Failed to refresh session:", error);
      setUser(null);
    }
  }

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const { data } = await authClient.getSession();

        if (mounted) {
          setUser(data?.user ?? null);
        }
      } catch (error) {
        console.error("Failed to load session:", error);

        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadSession();

    return () => {
      mounted = false;
    };
  }, []);

  async function signOut() {
    const { error } = await authClient.signOut();

    if (error) {
      throw new Error(
        error.message || "Sign out failed."
      );
    }

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshSession,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}