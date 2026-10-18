<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Leader quotes
- Keep published leader quotes in the public read-only `leader_quotes` table; publishing is managed through Lovable Cloud, not visitor submissions, to prevent unverified endorsements.
- The homepage live widget uses a client query with Realtime invalidation and periodic reconciliation; preserve the active quote by ID so inserted quotes do not interrupt reading.
- Show explicitly labeled sample perspectives only when there are no published quotes; never represent preview content as real testimonials.
