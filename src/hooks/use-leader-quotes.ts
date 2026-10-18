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
        .select("id,quote,name,role,company,image_url,image_source_url")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .order("id", { ascending: false });
      const missingImageColumns = error && (
        error.code === "PGRST204" || error.code === "42703" ||
        /image_url|image_source_url/i.test(error.message)
      );
      if (error && !missingImageColumns) throw error;

      if (error) {
        const legacyResult = await supabase.from("leader_quotes")
          .select("id,quote,name,role,company")
          .eq("published", true)
          .order("created_at", { ascending: false })
          .order("id", { ascending: false });
        if (legacyResult.error) throw legacyResult.error;
        return (legacyResult.data ?? []).map((quote) => ({ ...quote }));
      }

      return (data ?? []).map(({ image_url, image_source_url, ...quote }) => ({
        ...quote,
        ...(image_url ? { imageUrl: image_url } : {}),
        ...(image_source_url ? { imageSourceUrl: image_source_url } : {}),
      }));
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