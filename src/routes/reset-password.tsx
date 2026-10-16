import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — EGenTek" },
      { name: "description", content: "Choose a new password for your EGenTek account." },
      { property: "og:title", content: "Set a new password — EGenTek" },
      { property: "og:description", content: "Choose a new password for your EGenTek account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) toast.error("This reset link has expired. Request a new one.");
  }, [loading, user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !user) return;
    if (password.length < 8) return toast.error("Use at least 8 characters.");
    if (password !== confirm) return toast.error("The two passwords don't match.");

    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated.");
    navigate({ to: "/dashboard", replace: true });
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-glow" />
      <div className="relative mx-auto max-w-md px-5 py-20">
        <div className="card-surface animate-rise p-8">
          <KeyRound className="size-8 text-primary" />
          <h1 className="mt-4 text-2xl font-bold">Choose a new password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {user ? "Pick something you don't use anywhere else." : "Open this page from the link in your reset email."}
          </p>

          {user ? (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm new password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
                Save new password <ArrowRight />
              </Button>
            </form>
          ) : (
            <Button asChild variant="hero" size="lg" className="mt-6 w-full">
              <Link to="/auth">Request a new link</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
