import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Google, MailCheck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/site-layout";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — EGenTek" },
      { name: "description", content: "Create your EGenTek account to enroll in an internship and track your progress." },
      { property: "og:title", content: "Sign in — EGenTek" },
      { property: "og:description", content: "Your account for enrollment, lessons, mentor reviews and certificates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Auth,
});

type Mode = "signin" | "signup" | "forgot";

const perks = [
  "Track every lesson, quiz and assignment in one place.",
  "Get written feedback from a mentor on each submission.",
  "Unlock a verifiable certificate when you finish.",
];

function Auth() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<"confirm" | "reset" | null>(null);

  // Signed in (including after a Google round-trip) → into the app.
  useEffect(() => {
    if (user) navigate({ to: "/dashboard", replace: true });
  }, [user, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setNotice(null);

    if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      setNotice("reset");
      return;
    }

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: fullName.trim() },
          emailRedirectTo: window.location.origin,
        },
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      if (!data.session) {
        setNotice("confirm");
        return;
      }
      navigate({ to: "/dashboard", replace: true });
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) {
      return toast.error(error.message === "Invalid login credentials" ? "That email and password don't match." : error.message);
    }
    navigate({ to: "/dashboard", replace: true });
  }

  async function handleGoogle() {
    if (busy) return;
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    setBusy(false);
    if (result.error) return toast.error("Google sign-in didn't go through. Try again or use email.");
    if (result.redirected) return; // the browser is on its way to Google
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-glow" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2 lg:items-center">
        <div className="animate-rise">
          <Logo />
          <h1 className="mt-8 text-4xl font-bold leading-tight md:text-5xl">
            Your desk at <span className="text-gradient">EGenTek</span>.
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            One account for enrollment, lessons, mentor reviews and your certificate.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-surface animate-rise p-6 [animation-delay:150ms] md:p-8">
          {notice === "confirm" ? (
            <div className="py-6 text-center">
              <MailCheck className="mx-auto size-9 text-primary" />
              <h2 className="mt-4 text-xl font-semibold">Check your inbox</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                We sent a confirmation link to <span className="text-foreground">{email.trim()}</span>. Open it to activate
                your account, then come back and sign in.
              </p>
              <Button variant="outline" className="mt-6" onClick={() => { setNotice(null); setMode("signin"); }}>
                Back to sign in
              </Button>
            </div>
          ) : notice === "reset" ? (
            <div className="py-6 text-center">
              <MailCheck className="mx-auto size-9 text-primary" />
              <h2 className="mt-4 text-xl font-semibold">Reset link sent</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                If that email is registered, a password-reset link is on its way. It expires after a while — request a new
                one if it doesn't arrive.
              </p>
              <Button variant="outline" className="mt-6" onClick={() => { setNotice(null); setMode("signin"); }}>
                Back to sign in
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1">
                {(["signin", "signup"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => { setMode(m); setNotice(null); }}
                    className={`rounded-lg py-2 text-sm font-medium transition-colors ${
                      mode === m ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m === "signin" ? "Sign in" : "Create account"}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {mode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ananya Sharma"
                      autoComplete="name"
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@college.edu"
                    autoComplete="email"
                    required
                  />
                </div>

                {mode !== "forgot" && (
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      autoComplete={mode === "signup" ? "new-password" : "current-password"}
                      minLength={8}
                      required
                    />
                  </div>
                )}

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
                  {mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
                  <ArrowRight />
                </Button>
              </form>

              {mode === "forgot" ? (
                <button
                  type="button"
                  onClick={() => { setMode("signin"); setNotice(null); }}
                  className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground"
                >
                  Remembered it? Back to sign in
                </button>
              ) : (
                <>
                  <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
                    <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
                  </div>

                  <Button type="button" variant="outline" size="lg" className="w-full" onClick={handleGoogle} disabled={busy}>
                    <Google /> Continue with Google
                  </Button>

                  <div className="mt-5 text-center text-sm text-muted-foreground">
                    {mode === "signin" ? (
                      <button type="button" onClick={() => { setMode("forgot"); setNotice(null); }} className="hover:text-foreground">
                        Forgot your password?
                      </button>
                    ) : (
                      <span>By creating an account you agree to our <a href="/terms" className="text-primary hover:underline">terms</a>.</span>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
