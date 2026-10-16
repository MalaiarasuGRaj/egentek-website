import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { useSuspenseQuery } from "@tanstack/react-query";
import { profileQueryOptions } from "@/lib/profile.queries";
import { updateMyProfile } from "@/lib/profile.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — EGenTek" },
      { name: "description", content: "Keep your education, skills and contact details up to date for your mentors." },
      { property: "og:title", content: "Your profile — EGenTek" },
      { property: "og:description", content: "Education, skills and contact details your mentors can see." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(profileQueryOptions),
  component: Profile,
});

function Profile() {
  const { data: profile } = useSuspenseQuery(profileQueryOptions);
  const queryClient = useQueryClient();
  const save = useServerFn(updateMyProfile);

  const [fullName, setFullName] = useState(profile.fullName);
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [college, setCollege] = useState(profile.college ?? "");
  const [degree, setDegree] = useState(profile.degree ?? "");
  const [graduationYear, setGraduationYear] = useState(profile.graduationYear ? String(profile.graduationYear) : "");
  const [bio, setBio] = useState(profile.bio ?? "");
  const [skills, setSkills] = useState(profile.skills.join(", "));
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setFullName(profile.fullName);
    setPhone(profile.phone ?? "");
    setCollege(profile.college ?? "");
    setDegree(profile.degree ?? "");
    setGraduationYear(profile.graduationYear ? String(profile.graduationYear) : "");
    setBio(profile.bio ?? "");
    setSkills(profile.skills.join(", "));
  }, [profile]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);

    const year = graduationYear.trim();
    const result = await save({
      data: {
        fullName,
        phone,
        college,
        degree,
        bio,
        graduationYear: year ? Number(year) : null,
        skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
      },
    });

    setBusy(false);
    if (result?.ok) {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile saved.");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <header className="animate-rise">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Your profile</p>
        <h1 className="mt-3 text-4xl font-bold">Tell your mentors what you know</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Only you and your assigned mentors see this. It helps them pitch feedback at the right level.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="card-surface mt-10 space-y-5 p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="college">College or university</Label>
          <Input id="college" value={college} onChange={(e) => setCollege(e.target.value)} placeholder="e.g. PSG College of Technology" />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="degree">Degree and branch</Label>
            <Input id="degree" value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="B.E. Computer Science" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="graduationYear">Graduation year</Label>
            <Input
              id="graduationYear"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              inputMode="numeric"
              placeholder="2027"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Skills you already have</Label>
          <Input id="skills" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="HTML, CSS, Python, SQL" />
          <p className="text-xs text-muted-foreground">Separate with commas. List what you've actually used, not what you've heard of.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">What do you want to build?</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="A sentence or two about your goal — a job, a startup idea, a stronger portfolio."
          />
        </div>

        <div className="flex items-center justify-between gap-4 pt-2">
          <p className="text-xs text-muted-foreground">Saved to your account. You can change it any time.</p>
          <Button type="submit" variant="hero" disabled={busy}>
            <Save /> {busy ? "Saving…" : "Save profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}
