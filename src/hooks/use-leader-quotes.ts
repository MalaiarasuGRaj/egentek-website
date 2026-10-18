import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { LeaderQuote } from "@/lib/leader-quotes";

export const leaderQuotesKey = ["published-leader-quotes"];

export function useLeaderQuotes() {
  const [hydrated, setHydrated] = useState(false);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: leaderQuotesKey,
    enabled: hydrated,
    queryFn: async (): Promise<LeaderQuote[]> => {
      const { data, error } = await supabase.from("leader_quotes")
        .select("id,quote,name,role,company")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .order("id", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    // Reconcile missed events after a connection interruption.
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    setHydrated(true);
    const channel = supabase.channel("homepage-leader-quotes")
      .on("postgres_changes", { event: "*", schema: "public", table: "leader_quotes" }, () => {
        void queryClient.invalidateQueries({ queryKey: leaderQuotesKey });
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") void queryClient.invalidateQueries({ queryKey: leaderQuotesKey });
      });
    return () => { void supabase.removeChannel(channel); };
  }, [queryClient]);

  return query;
}