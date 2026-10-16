import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SessionUser = { id: string; email: string; fullName: string };

type AuthState = {
  user: SessionUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({ user: null, loading: true, signOut: async () => {} });

export const useAuth = () => useContext(AuthContext);

function toSessionUser(user: { id: string; email?: string; user_metadata?: Record<string, unknown> } | null): SessionUser | null {
  if (!user) return null;
  const name = user.user_metadata?.["full_name"];
  return { id: user.id, email: user.email ?? "", fullName: typeof name === "string" ? name : "" };
}

// Single auth listener for the whole app: keeps the header and the router in
// step with the session, and clears cached data on sign-out.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const read = () =>
      supabase.auth.getSession().then(({ data }) => {
        if (active) setUser(toSessionUser(data.session?.user ?? null));
      });

    read().finally(() => {
      if (active) setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
      read();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [router, queryClient]);

  const signOut = useCallback(async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }, [queryClient, navigate]);

  return <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>;
}
