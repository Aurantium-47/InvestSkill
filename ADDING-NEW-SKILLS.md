# Adding a New Skill to InvestSkill

How to contribute a new analysis skill. One script does the wiring; you write the analysis.

---

## Quick Start

```bash
node scripts/new-skill.js my-analysis --category advanced \
  --title "My Analysis" --desc "One-line description" \
  --zh-title "中文名" --desc-zh "一句話中文摘要" --goal "I want to …" --goal-zh "我想要…"
```

`--category` is one of `core`, `reports`, `monitoring`, `advanced`, `meta`. Run `node scripts/new-skill.js --help` for every option (`--example`, `--no-test`).

The script:

1. Creates `plugins/us-stock-analysis/skills/my-analysis/SKILL.md` from a template that already carries the full output contract — the Data Verification gate, the `Data & Sources` header, the `--lang zh-TW` output section, Thesis Invalidation, the Investment Signal block with its JSON footer, and the disclaimer — so the contract check passes from the start.
2. Generates `prompts/my-analysis.md` with `scripts/sync-prompts.js`.
3. Adds the skill to `SKILL_CATEGORIES` in `site/build/build-site.js` (otherwise the site files it under "Other").
4. Adds a "goal → skill" row to `site/content/CHOOSE-A-SKILL.md` and `CHOOSE-A-SKILL-zh-TW.md`.
5. Adds the framework-table row to `README.md` and the category cell in `README-zh-TW.md`.
6. Adds a table row and a directory-tree line to `GEMINI.md`, `.cursor/rules/invest-skill.mdc` and `.github/copilot-instructions.md`.
7. Writes a line under `## [Unreleased]` › `### Added` in `CHANGELOG.md`.
8. Adds the Chinese title (`--zh-title`) and summary (`--desc-zh`, or a TODO) to `site/content/SKILL-SUMMARIES-zh-TW.json` for the zh Skill Reference page.
9. Runs the contract check and the structure tests (unless `--no-test`), and prints what is left to do.

Then finish by hand:

1. **Write the analysis** — replace every `TODO` in `SKILL.md`.
2. **Regenerate the prompt** — `node scripts/sync-prompts.js my-analysis`.
3. **Update the counts the script leaves alone** — the framework counts ("N frameworks" / "N 個框架") in the README pair, `CHOOSE-A-SKILL`, `COOKBOOK`, `FAQ.md`, `PLATFORM-COMPATIBILITY.md`, the cross-AI configs and the two manifest descriptions; and the skill counts ("N available skills" / "共 N 個技能") in both Cookbooks. `npm test` names every file that is out of date.
4. **Record the prompt budget** — `npm run prompt:budgets -- --add-missing` adds the new prompt to `tests/prompt-budgets.json` without resetting the others.
5. **Add usage** — a recipe in `site/content/COOKBOOK.md` and `COOKBOOK-zh-TW.md` if the skill warrants one, and a line in the platform guides (`README-claude-code.md`, `README-cursor.md`, `README-gemini.md`).
6. **Run the checks** — `npm test` and `npm run build:site` (confirm `skill-my-analysis.html` is generated and the skill is in the right category, not "Other").

Don't bump the version: that happens at release time (`npm run release`), in all three manifests at once. See [RELEASE-QUICK-REFERENCE.md](RELEASE-QUICK-REFERENCE.md).

---

## Rules to Know

**The prompt is generated, never hand-edited.** `prompts/<name>.md` is produced from `SKILL.md` by `scripts/sync-prompts.js`: frontmatter stripped, `/us-stock-analysis:x` → `x`, `/x` → `x`, "Claude analyzes" → "The assistant analyzes". `npm test` runs `sync-prompts.js --check` and fails on drift. Write anything platform-specific platform-neutrally in `SKILL.md` itself.

**The output contract is enforced.** `scripts/check-skill-contract.js` (in `npm test`) fails if an analysis skill lacks the Data Verification gate, the `Data & Sources` header, a Thesis Invalidation section, the signal block or the disclaimer. Output tools, aliases and meta skills are classified in `scripts/lib/skill-registry.js`.

**The skill closes with the signal block.** The box-drawn Investment Signal block, then only the Score Guide / Confidence / Horizon lines, at most one mapping-note paragraph, and the `**Disclaimer:**` line. Nothing after it. `scripts/test-llm-io.js` checks this.

**Skills are auto-discovered.** There is no `skills[]` list in `plugin.json` — a directory under `plugins/us-stock-analysis/skills/` with a `SKILL.md` is a skill.

**Counts are derived, never hardcoded in code.** The advertised framework count = skill directories − output tools − aliases (`scripts/lib/skill-registry.js`). Docs state it, and `npm test` checks every doc that does.

**The skill fetches nothing.** InvestSkill has no runtime. A skill can describe the primary sources a tool-enabled assistant should read (as `10k-digest`, `financial-report-analyst` and `fact-check` do), but never adds a data-fetching dependency.

---

## Skill Categories

| `--category` | Site category | Purpose | Examples |
|--------------|---------------|---------|----------|
| `core` | Core Stock Analysis | Evaluation and valuation | stock-eval, stock-valuation, technical-analysis, compare |
| `reports` | Financial Reports | Document analysis | financial-report-analyst, 10k-digest, forensic-accounting |
| `monitoring` | Market Monitoring | Activity tracking | insider-trading, dividend-analysis, short-interest |
| `advanced` | Advanced Research | Specialised angles | bear-case, thesis-tracker, industry-map, trade-postmortem |
| `meta` | Meta & Output | Orchestration, validation, output | full-report, result-validator, fact-check, report-generator |
| — | Aliases | Redirect stubs — installed, **not counted** | fundamental-analysis, dcf-valuation, research-bundle |

---

## What a Good SKILL.md Contains

The template gives you the skeleton. Fill in:

- **Frontmatter `description`** — one sentence, ≤ 1024 characters; it is what Claude Code uses to decide when to load the skill, so lead with what the skill produces.
- **When to use it** — and which neighbouring skill to use instead (see `site/content/CHOOSE-A-SKILL.md` for the overlaps people ask about).
- **Inputs** — ticker, pasted documents, holdings, flags such as `--depth` or `--lang zh-TW`.
- **The framework** — phases, formulas, thresholds, and how each metric moves the score.
- **Thesis Invalidation** — what would prove the call wrong.
- **The signal block** — with a Score that matches the Score Guide, and Confidence that drops to LOW when the data is from model memory.

Patterns that work well:

- **Valuation skills** — fair-value range, methodology, bull / base / bear scenarios, a sensitivity table, margin of safety.
- **Quality skills** — a points-based scoring framework with a letter grade, plus the top risks to the thesis.
- **Monitoring skills** — key indicators with how to read each, then green flags / red flags / neutral.

---

## Testing Your Skill

```bash
npm test                 # structure + counts, skill contract, prompt sync, LLM I/O, EDGAR helpers, install script
npm run build:site       # the skill page is generated and filed in the right category
npm run prompt:diff      # what your branch changed in the prompts (tokens, description, contract)
```

To check that the skill *behaves* — not only that it is shaped right — run the behavioural eval against the fictional ZEPH fixture:

```bash
EVAL_CMD='claude -p' node scripts/eval-skills.js --skills my-analysis
npm run eval:claude -- --skills my-analysis      # through the Claude API (needs ANTHROPIC_API_KEY + the SDK)
```

On a PR, `.github/workflows/llm-eval.yml` runs the live eval for changed single-ticker skills when the repository secret is available.

Manual smoke test on each platform:

```bash
# Claude Code (repo checkout loaded as a plugin, or after install.sh -a claude)
/my-analysis AAPL

# Cursor / Gemini CLI, inside the repo
@prompts/my-analysis.md Analyze AAPL
```

---

## PR Checklist

- [ ] `plugins/us-stock-analysis/skills/my-analysis/SKILL.md` — every `TODO` replaced
- [ ] `prompts/my-analysis.md` regenerated with `sync-prompts.js` (not hand-edited)
- [ ] Site: `SKILL_CATEGORIES`, both `CHOOSE-A-SKILL` pages, both Cookbooks (counts, optional recipe)
- [ ] README pair, cross-AI configs and platform guides list the skill
- [ ] `tests/prompt-budgets.json` has the new entry
- [ ] `CHANGELOG.md` line under `[Unreleased]`
- [ ] `npm test` and `npm run build:site` pass
- [ ] No version bump (the release does it)

---

## Troubleshooting

**`npm test` reports stale counts.** It names each file and the claim it found ("N frameworks", "N available skills"). Update those numbers to the totals it expects.

**`sync-prompts.js --check` fails.** You edited `prompts/<name>.md` by hand or forgot to regenerate it. Make the change in `SKILL.md` and run `node scripts/sync-prompts.js <name>`.

**The contract check fails.** Compare your `SKILL.md` with the template sections new-skill.js wrote — usually the `Data & Sources` header or Thesis Invalidation was deleted while editing.

**The skill shows up under "Other" on the site.** It is missing from `SKILL_CATEGORIES` in `site/build/build-site.js`.

**The signal block looks broken.** Keep it the last section, use the UTF-8 box-drawing characters from the template, and check it in a plain-text editor rather than a markdown preview.

---

## Support

- [PLATFORM-COMPATIBILITY.md](PLATFORM-COMPATIBILITY.md) — how each platform loads skills
- [CONTRIBUTING.md](CONTRIBUTING.md) — general contribution guidelines
- [GitHub Discussions](https://github.com/yennanliu/InvestSkill/discussions) · [Issues](https://github.com/yennanliu/InvestSkill/issues)
