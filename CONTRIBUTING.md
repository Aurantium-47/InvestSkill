# Contributing to InvestSkill

Thank you for your interest in contributing! We welcome contributions of all kinds—bug reports, feature requests, documentation, and code improvements.

## Code of Conduct

Be respectful, inclusive, and professional. We're building a community for investment research enthusiasts and professionals.

---

## Ways to Contribute

### 1. 🐛 Report Bugs

Found an issue? Help us fix it.

**[Open a Bug Report →](https://github.com/yennanliu/InvestSkill/issues/new)**

Include:
- Platform (Claude Code, Cursor, Gemini CLI, etc.)
- Your version: `/plugin list` in Claude Code, or `jq '.version' plugins/us-stock-analysis/.claude-plugin/plugin.json`
- Steps to reproduce
- Expected vs. actual behavior
- Error messages (full output)

### 2. 💡 Suggest Features

Have an idea for a new skill or improvement?

**[Start a Discussion →](https://github.com/yennanliu/InvestSkill/discussions)**

Describe:
- Feature overview
- Use case example
- Why it helps users
- Implementation ideas (optional)

### 3. 📚 Improve Documentation

Documentation improvements are always welcome:
- Typo fixes
- Clearer examples
- Better organization
- Updated screenshots

Improvements to:
- README files
- Inline code comments
- Guides and tutorials
- FAQs

### 4. 🎯 Add a New Skill

Want to create a new analysis framework?

Start with `node scripts/new-skill.js <name> --category … --title … --desc …` — it scaffolds the skill with the full output contract and wires it into the site, READMEs, cross-AI configs and CHANGELOG. **See [ADDING-NEW-SKILLS.md](ADDING-NEW-SKILLS.md)** for what is left to do by hand, testing, and the PR checklist.

### 5. 🧪 Fix Bugs

Found and fixed a bug? We'd love your PR!

### 6. ✨ Enhance Existing Skills

Improvements to existing frameworks:
- Better methodology or thresholds
- More comprehensive analysis
- Clearer output
- Better documentation

Edit `plugins/us-stock-analysis/skills/<name>/SKILL.md`, then run `node scripts/sync-prompts.js <name>` — the universal `prompts/<name>.md` is generated from it and must never be edited by hand (`npm test` fails on drift). If the prompt grows on purpose, run `npm run prompt:budgets` and commit `tests/prompt-budgets.json`.

---

## Development Setup

### Prerequisites

- Node.js 18.0.0+
- git
- GitHub account

### Local Setup

```bash
# Clone repository
git clone https://github.com/yennanliu/InvestSkill.git
cd InvestSkill

# Install dev dependencies (the plugin itself has none)
npm ci

# Run test suite
npm test

# Run validation
npm run pre-release

# Verify setup
npm run verify
```

### Test Before Submitting

```bash
# All checks
npm run pre-release

# Or individually
npm test                          # Every offline suite: structure + counts, skill contract, prompt sync, LLM I/O, EDGAR helpers, install script
npm run test:install              # install.sh only (static checks + sandboxed runs)
npm run validate                  # Prompt quality
npm run prompt:diff               # What your branch changed in the prompts
npm run build:site                # Site builds; npm run check:links checks its links
npm run verify                    # Setup verification
```

All tests must pass before submitting a PR.

---

## Submitting Changes

### Before You Start

1. Check if your idea is already discussed in [Issues](https://github.com/yennanliu/InvestSkill/issues) or [Discussions](https://github.com/yennanliu/InvestSkill/discussions)
2. For new skills: read [ADDING-NEW-SKILLS.md](ADDING-NEW-SKILLS.md)
3. For bugs: confirm it's reproducible locally

### Creating a Pull Request

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/InvestSkill.git
   cd InvestSkill
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or: git checkout -b fix/issue-name
   ```

3. **Make your changes**
   - Keep commits focused (one feature/fix per commit)
   - Write clear commit messages
   - Reference issues: `fixes #123`

4. **Test your changes**
   ```bash
   npm test                    # All offline suites
   npm run build:site          # Site still builds
   npm run pre-release         # Full validation
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Reference the issue being fixed: `fixes #123`
   - Describe what your change does
   - Explain why it's needed
   - Include test results (screenshots, output, etc.)

### PR Checklist

- [ ] Tests pass: `npm test` reports 0 failed
- [ ] Prompts regenerated with `sync-prompts.js` if a `SKILL.md` changed
- [ ] Documentation updated
- [ ] Commit messages are clear
- [ ] Changes follow project conventions
- [ ] Added new tests if needed

---

## Code Standards

### Naming Conventions

- **Files**: kebab-case (`stock-eval.md`)
- **Functions**: camelCase (`getStockMetrics()`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`)
- **Classes**: PascalCase (`StockAnalyzer`)

### JavaScript Style

- Use `'use strict'` at top of files
- 2-space indentation
- Semicolons required
- No trailing commas in objects

### Markdown Style

- 80-character line limit
- Clear section headers (# Main, ## Sub, ### Detail)
- Code blocks with language tags
- Tables for structured data
- Links in markdown: `[text](url)`

### Comments

- **Code comments**: Why, not what
  ```javascript
  // Filter out delisted tickers (removed from exchanges)
  const activeTickers = tickers.filter(t => !delistedSet.has(t));
  ```

- **Documentation**: Clear, concise, complete
  ```markdown
  ### Feature Name
  Brief description. Key benefits. Use case.
  ```

---

## Adding a New Skill

**See [ADDING-NEW-SKILLS.md](ADDING-NEW-SKILLS.md)** for the comprehensive guide.

Quick summary:

1. `node scripts/new-skill.js skill-name --category <core|reports|monitoring|advanced|meta> --title "…" --desc "…"` — scaffolds `SKILL.md` and wires the skill into every file (skills are auto-discovered; no `plugin.json` change)
2. Write the analysis in `plugins/us-stock-analysis/skills/skill-name/SKILL.md`
3. `node scripts/sync-prompts.js skill-name` — generates `prompts/skill-name.md`
4. Update the framework / skill counts `npm test` reports, and `npm run prompt:budgets -- --add-missing`
5. `npm test` and `npm run build:site`
6. Submit the PR — no version bump; the release does that

---

## Review Process

### What We Look For

✅ **Good PRs have:**
- Clear purpose & description
- Tests passing (`npm test`, and CI on the PR)
- Updated documentation
- Focused, logical commits
- Follows project conventions

❌ **Issues that delay approval:**
- Tests failing
- Documentation not updated
- Unclear commit messages
- Style inconsistencies
- Too many unrelated changes

### Timeline

- **Small fixes**: 1-3 days
- **New skills**: 3-7 days
- **Major changes**: 1-2 weeks

Reviewers will provide feedback, or approve and merge.

---

## Questions?

- **How do I add a new skill?** → [ADDING-NEW-SKILLS.md](ADDING-NEW-SKILLS.md)
- **I'm stuck.** → [GitHub Discussions](https://github.com/yennanliu/InvestSkill/discussions)
- **Found a bug.** → [GitHub Issues](https://github.com/yennanliu/InvestSkill/issues)
- **Need help?** → [FAQ.md](FAQ.md)

---

## Resources

| Resource | Purpose |
|----------|---------|
| **[README.md](README.md)** | Project overview |
| **[ADDING-NEW-SKILLS.md](ADDING-NEW-SKILLS.md)** | Complete contributor guide |
| **[FAQ.md](FAQ.md)** | Common questions & answers |
| **[CHANGELOG.md](CHANGELOG.md)** | Version history |
| **[RELEASE-QUICK-REFERENCE.md](RELEASE-QUICK-REFERENCE.md)** | How releases are cut |
| **[CI-CD-GUIDE.md](CI-CD-GUIDE.md)** | What each workflow checks |
| **[doc/archive/DEPLOYMENT-STATUS.md](doc/archive/DEPLOYMENT-STATUS.md)** | Historical platform status (archived) |

---

<div align="center">

### Thank you for making InvestSkill better! 🙌

Your contributions help build professional investment analysis tools for everyone.

</div>
