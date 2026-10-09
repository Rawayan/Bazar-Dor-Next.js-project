"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export function useAuth() {
  const [user, setUser] = useState<
    typeof authClient.$Infer.Session.user | null
  >(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const { data } = await authClient.getSession();

        if (!mounted) return;

        setUser(data?.user ?? null);
      } catch (error) {
        console.error(
          "Failed to load auth session:",
          error
        );

        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadSession();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    user,
    loading,
  };
}