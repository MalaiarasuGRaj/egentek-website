import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type ProfileDto = {
  id: string;
  fullName: string;
  phone: string | null;
  college: string | null;
  degree: string | null;
  graduationYear: number | null;
  bio: string | null;
  skills: string[];
  roles: string[];
};

export const getMyProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ProfileDto> => {
    const { supabase, userId } = context;

    const [{ data: profile }, { data: roles }] = await Promise.all([
      supabase
        .from("profiles")
        .select("id, full_name, phone, college, degree, graduation_year, bio, skills")
        .eq("id", userId)
        .maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", userId),
    ]);

    return {
      id: userId,
      fullName: profile?.full_name ?? "",
      phone: profile?.phone ?? null,
      college: profile?.college ?? null,
      degree: profile?.degree ?? null,
      graduationYear: profile?.graduation_year ?? null,
      bio: profile?.bio ?? null,
      skills: profile?.skills ?? [],
      roles: (roles ?? []).map((r: { role: string }) => r.role),
    };
  });
