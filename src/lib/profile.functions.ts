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

export type ProfileInput = {
  fullName: string;
  phone: string;
  college: string;
  degree: string;
  graduationYear: number | null;
  bio: string;
  skills: string[];
};

export const updateMyProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: ProfileInput) => input)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const year = data.graduationYear;
    const safeYear = typeof year === "number" && year >= 1950 && year <= 2100 ? year : null;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: data.fullName.trim().slice(0, 120),
        phone: data.phone.trim().slice(0, 20) || null,
        college: data.college.trim().slice(0, 160) || null,
        degree: data.degree.trim().slice(0, 120) || null,
        graduation_year: safeYear,
        bio: data.bio.trim().slice(0, 600) || null,
        skills: data.skills.map((s) => s.trim()).filter(Boolean).slice(0, 20),
      })
      .eq("id", userId);

    if (error) throw new Error("Couldn't save your profile. Please try again.");
    return { ok: true };
  });
