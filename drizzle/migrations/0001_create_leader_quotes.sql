CREATE TABLE public.leader_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL,
  name text NOT NULL,
  role text NOT NULL DEFAULT '',
  company text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.leader_quotes TO anon, authenticated;
GRANT ALL ON public.leader_quotes TO service_role;
ALTER TABLE public.leader_quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published leader quotes" ON public.leader_quotes FOR SELECT TO anon, authenticated USING (published = true);
ALTER PUBLICATION supabase_realtime ADD TABLE public.leader_quotes;