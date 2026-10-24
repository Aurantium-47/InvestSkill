# InvestSkill — Onboarding to Anthropic's Official Directory

*Written 2026-10-24 at v1.13.0, from Anthropic's docs as of that date. The portal's screens can change — if a step below doesn't match, follow the linked Anthropic page.*

> **Scope.** How to list the `us-stock-analysis` plugin in Anthropic's official directory ([claude.ai/directory](https://claude.ai/directory), also shown in Claude Code's `/plugin > Discover`). Current status and the third-party directories that already list InvestSkill: [DISTRIBUTION-LISTINGS.md](DISTRIBUTION-LISTINGS.md).
>
> Anthropic docs: [Publish to the directory](https://claude.com/docs/directory/publish) · [Pre-submission checklist](https://claude.com/docs/plugins/pre-submission-checklist) · [Submit your plugin](https://claude.com/docs/plugins/submit) · [Track your submission](https://claude.com/docs/directory/submission-status)

---

## 1. Key facts

| | |
|---|---|
| **Where** | Developer portal — <https://claude.ai/directory/manage> |
| **Not** | A PR or issue against [`anthropics/claude-plugins-official`](https://github.com/anthropics/claude-plugins-official). The old Claude Console form is retired. |
| **Repository** | `yennanliu/InvestSkill` |
| **Plugin path** | `plugins/us-stock-analysis` |
| **Branch** | `main` |
| **Submission type** | Plugin bundle |
| **Cost / review time** | Free to submit; review time isn't fixed |

## 2. Prerequisites — who can submit

All three must be true for the person submitting:

1. **A paid claude.ai plan** — Pro, Max, Team, or Enterprise. Free accounts can't submit. On Team / Enterprise, an Owner (or a member given the **Directory** permission) submits.
2. **GitHub connected on claude.ai**, in the same claude.ai organization you submit from.
3. **That GitHub account can push to `yennanliu/InvestSkill`.** The portal checks this before it creates or submits. A read-only account fails with *"The connected GitHub account can't push to this repository"*.

**Ownership is first-come.** The first claude.ai organization to submit `yennanliu/InvestSkill` + `plugins/us-stock-analysis` owns the listing, and the portal refuses anyone else (*"Already submitted by another organization"*). Submit from the account that should own the listing long term — the maintainer's, not a contributor's. If someone else gets there first, email `directory@anthropic.com`.

## 3. Before you open the portal

### 3.1 Validate locally

```bash
claude plugin validate ./plugins/us-stock-analysis
npm test
```

At v1.13.0 this printed `✔ Validation passed` with one warning (no icon); with the icon added after v1.13.0 it passes with no warnings.

### 3.2 Readiness checklist

| Check | Result if missing | Status |
|-------|-------------------|--------|
| `.claude-plugin/plugin.json` with `name`, `description`, `author`, `version` | Blocks / warning | ✅ |
| License — `"license": "MIT"` in `plugin.json` or a `LICENSE` file in the plugin folder | Blocks | ✅ |
| `README.md` of ≥ 40 words (outside code blocks) in the plugin folder — shown as the listing description | Blocks | ✅ |
| No `.DS_Store` / `Thumbs.db` / `__MACOSX` in the plugin folder | Blocks | ✅ |
| No symlinks, submodules, or Git LFS files | Blocks | ✅ |
| ≤ 512 files; each non-image file < 256 KiB; text and images only | Held for reviewer | ✅ 41 files: Markdown, JSON and one PNG icon |
| No hooks, MCP servers, `npx`/`uvx` launchers, or credentials | Blocks / held | ✅ Prompt files only |
| Valid YAML front matter with a text `description` in every `SKILL.md` | Blocks | ✅ Enforced by `npm test` |
| Icon — square PNG/JPEG, 512–2048 px, < 2 MB, at `.claude-plugin/icon.png` | Warning | ✅ 512 × 512 PNG (the site's mark) |
| Distinctive name | Held for reviewer | ⚠️ See §3.3 |

### 3.3 Two decisions to make first

1. **Icon.** Optional, but the portal takes the icon **only on the first save** — adding one later does not change the listing. `plugins/us-stock-analysis/.claude-plugin/icon.png` is now committed (512 × 512, the site's coral chart mark); replace it before step 4.2 if a different icon is wanted.
2. **Name.** `us-stock-analysis` is made of generic words, and other authors publish plugins with the same name in third-party directories, so review may raise *"Name may be confused with an existing listing"*. That is a hold, not a rejection. To reduce the risk, add a `displayName` to `plugin.json`, e.g. `"displayName": "InvestSkill — US Stock Analysis"`. Do **not** change `name`: it is the install slug, and changing it breaks `us-stock-analysis@invest-skill` for existing users.

## 4. Submission steps

### 4.1 Start

1. Open <https://claude.ai/directory/manage> → **Submit new**.
2. Under **What would you like to submit?** choose **Plugin bundle**.

### 4.2 Source

| Field | Value |
|-------|-------|
| Repository | `yennanliu/InvestSkill` |
| Plugin path | `plugins/us-stock-analysis` |
| Branch or tag | `main` |

Select **Validate**. Fix anything marked **Blocking** in the repo, push, then **Re-validate** — a result applies to one commit only. **Policy hold** and **Warning** findings don't stop submission.

### 4.3 Listing details

Read from `plugin.json` and the plugin `README.md` — it can't be edited in the portal. To change it, edit those files on `main` and validate again.

### 4.4 Data handling

| Question | Answer for InvestSkill |
|----------|------------------------|
| Reads or stores personal data? | No |
| Sends data to services other than its declared connectors? | No — there are no connectors, scripts, or network calls |
| How long is data kept? | Not applicable — nothing is stored |
| Intended for people under 18? | No |

The answers must stay true: if a future change adds a hook, script, or MCP server, revisit them and describe the behaviour in the plugin README.

### 4.5 Compliance

Confirm the contact email (Anthropic writes here about the submission) and tick all four acknowledgements — they cover the [Software Directory Terms](https://support.claude.com/en/articles/13145338-anthropic-software-directory-terms) and [Software Directory Policy](https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy).

### 4.6 Review and submit

1. Under **How new versions reach the directory**, keep **GitHub push webhook** (default). Setting up the webhook needs **admin** access to the repo; without it, choose **Scheduled check only** — the directory still polls `main`.
2. Select **Submit for review**.
3. If offered, select **Set up push updates** (or later: plugin page → **Settings** → **Updates** → **Set up**).

## 5. After submitting

1. **Scan.** The directory validates the latest `main` commit again and runs a security scan. Follow it under **Submissions** → the plugin → **Versions**.
2. **Outcome.** *Passes* → go to step 3. *Held for a reviewer* → wait; a person clears it. *Doesn't pass* → fix, push, then **Check for new commits** (or, if rejected, read **Requested changes** on the **Review** tab and **Resubmit for review**).
3. **Publish.** Select **Publish**. For a first listing an Anthropic reviewer publishes it.
4. **Verify.** Once live, the plugin appears at <https://claude.ai/directory> and in Claude Code under `/plugin > Discover`. Update [DISTRIBUTION-LISTINGS.md](DISTRIBUTION-LISTINGS.md) §1 with the listing link.

## 6. Keeping the listing current

- Every merge to `main` becomes a new scanned version — no need to resubmit. The listing keeps serving the last published version until a new one passes.
- Bump `version` in `plugin.json` on every release (already required by the Version Consistency Rule in [CLAUDE.md](../CLAUDE.md)).
- The listing description is the plugin `README.md` — keep its skill list in step when skills are added or renamed.
- To remove the listing: plugin page → menu → **Delist plugin**.
