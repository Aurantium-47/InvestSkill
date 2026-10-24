#!/usr/bin/env node
/**
 * validate-prompts.js
 * Validates all prompt files for quality and consistency
 *
 * Usage: node scripts/validate-prompts.js
 *
 * Checks:
 * - Signal block template exists
 * - No platform-specific syntax
 * - Token count estimates
 * - Formatting consistency
 * - Required sections
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PROMPTS_DIR = path.join(ROOT, 'prompts');

let errors = 0;
let warnings = 0;
const results = [];

console.log('🎯 Validating prompt files...\n');

/**
 * Estimate token count (rough approximation)
 * ~1 token per 4 characters + 1 token per word
 */
function estimateTokens(content) {
  const words = content.split(/\s+/).length;
  const chars = content.length;
  return Math.ceil((chars / 4) + (words / 2));
}

/**
 * Check if prompt has a signal block template
 */
function checkSignalBlock(content, filename) {
  const hasSignalBlock = content.includes('INVESTMENT SIGNAL') ||
                        content.includes('Signal:') ||
                        content.includes('SIGNAL BLOCK');

  if (!hasSignalBlock) {
    console.log(`   ✗ ${filename}: Missing signal block template`);
    errors++;
    return false;
  }

  // Check signal block has required fields
  if (!content.includes('BULLISH') && !content.includes('NEUTRAL') && !content.includes('BEARISH')) {
    console.log(`   ⚠️  ${filename}: Signal block missing BULLISH/NEUTRAL/BEARISH options`);
    warnings++;
  }

  return true;
}

/**
 * Check for platform-specific syntax
 */
function checkPlatformSpecific(content, filename) {
  const issues = [];

  // Check for slash commands (Claude Code specific)
  if (content.match(/^\s*\/[\w-]+/m)) {
    issues.push('Slash commands (Claude Code specific)');
  }

  // Check for @ references (Cursor/Gemini specific in wrong context)
  if (content.match(/^\s*@\w+\/\w+/m)) {
    issues.push('@-references in prompt body (should only be in instructions)');
  }

  // Gemini CLI prompt lines ("> @prompts/x.md …"). A markdown blockquote is not one.
  if (content.match(/^\s*>\s+@/m)) {
    issues.push('Interactive prompts `> ` (Gemini CLI specific)');
  }

  if (issues.length > 0) {
    console.log(`   ⚠️  ${filename}: Contains platform-specific syntax:`);
    issues.forEach(issue => console.log(`      - ${issue}`));
    warnings++;
  }
}

/**
 * Check the document shape every generated prompt shares: one H1 title at the
 * top, at least three ## sections, and an output section or the signal block.
 * (The output contract itself — Data & Sources, Data Verification, Thesis
 * Invalidation, signal block, JSON footer, disclaimer — is check-skill-contract.js.)
 */
function checkSections(content, filename) {
  const missing = [];
  const h1 = content.match(/^# .+$/gm) || [];
  if (!/^# /.test(content.trimStart())) missing.push('H1 title on the first line');
  if (h1.length > 1 && !/```/.test(content)) missing.push('a single H1');
  if ((content.match(/^## /gm) || []).length < 3) missing.push('at least three ## sections');
  if (!/^#{2,3} .*(Output|Signal|Report|Deliverable)/mi.test(content) && !content.includes('INVESTMENT SIGNAL')) missing.push('an output section');
  if (missing.length > 0) {
    console.log(`   ⚠️  ${filename}: Missing ${missing.join(', ')}`);
    warnings++;
  }
}

/**
 * Check formatting consistency
 */
function checkFormatting(content, filename) {
  const issues = [];

  // Check heading hierarchy
  if (!content.includes('# ')) {
    issues.push('Missing H1 heading');
  }

  // Check for code blocks
  if (content.includes('```') && !content.includes('```bash') && !content.includes('```json')) {
    if (!content.match(/```\w+/)) {
      issues.push('Code blocks missing language specification');
    }
  }

  // Check for consistent list formatting
  const bulletPoints = content.match(/^\s*[-*]\s/gm);
  const numberedLists = content.match(/^\s*\d+\.\s/gm);

  if (issues.length > 0) {
    console.log(`   ⚠️  ${filename}: Formatting issues:`);
    issues.forEach(issue => console.log(`      - ${issue}`));
    warnings++;
  }
}

/**
 * Check token count
 */
function checkTokenCount(content, filename) {
  const tokens = estimateTokens(content);

  // Per-file size budgets live in tests/prompt-budgets.json (test-llm-io.js);
  // this only flags a prompt big enough to crowd a small model's context.
  if (tokens > 16000) {
    console.log(`   ⚠️  ${filename}: Large prompt (${tokens} estimated tokens)`);
    console.log(`      Consider breaking into sub-prompts if >6000 tokens`);
    warnings++;
  } else if (tokens < 200) {
    console.log(`   ⚠️  ${filename}: Very short prompt (${tokens} tokens) - may be incomplete`);
    warnings++;
  }

  return tokens;
}

/**
 * Check for consistency with SKILL.md equivalent
 */
function compareWithSkill(content, filename) {
  const skillName = filename.replace('.md', '');
  const skillPath = path.join(ROOT, 'plugins/us-stock-analysis/skills', skillName, 'SKILL.md');

  if (!fs.existsSync(skillPath)) {
    console.log(`   ℹ️  ${filename}: No corresponding SKILL.md found`);
    return;
  }

  const skillContent = fs.readFileSync(skillPath, 'utf8');

  // Check if skill has description frontmatter
  const skillMatch = skillContent.match(/description:\s*(.+)/);
  if (!skillMatch) {
    console.log(`   ✗ ${filename}: Corresponding SKILL.md missing description`);
    errors++;
  }

  // Check if both have similar length (rough sync check)
  const skillTokens = estimateTokens(skillContent);
  const promptTokens = estimateTokens(content);
  const ratio = promptTokens / skillTokens;

  if (ratio < 0.3 || ratio > 2) {
    console.log(`   ⚠️  ${filename}: Token ratio with SKILL.md is ${ratio.toFixed(1)}x`);
    console.log(`      May indicate sync issues (Skill: ${skillTokens}, Prompt: ${promptTokens} tokens)`);
    warnings++;
  }
}

/**
 * Validate a single prompt file
 */
function validatePrompt(filename) {
  const filepath = path.join(PROMPTS_DIR, filename);
  const content = fs.readFileSync(filepath, 'utf8');

  console.log(`\n📄 ${filename}`);

  const tokens = checkTokenCount(content, filename);
  checkSignalBlock(content, filename);
  checkPlatformSpecific(content, filename);
  checkSections(content, filename);
  checkFormatting(content, filename);
  compareWithSkill(content, filename);

  results.push({
    filename,
    tokens,
    passed: errors === 0
  });
}

/**
 * Main function
 */
function main() {
  try {
    if (!fs.existsSync(PROMPTS_DIR)) {
      console.error('❌ prompts/ directory not found');
      process.exit(1);
    }

    const promptFiles = fs.readdirSync(PROMPTS_DIR)
      .filter(f => f.endsWith('.md'))
      .sort();

    console.log(`Found ${promptFiles.length} prompt files\n`);
    console.log('═'.repeat(50));

    promptFiles.forEach(file => {
      validatePrompt(file);
    });

    // Summary
    console.log('\n═'.repeat(50));
    console.log('\n📊 Summary\n');

    const totalTokens = results.reduce((sum, r) => sum + r.tokens, 0);
    const avgTokens = Math.round(totalTokens / results.length);

    console.log(`Total prompts: ${results.length}`);
    console.log(`Total tokens: ${totalTokens.toLocaleString()}`);
    console.log(`Average tokens: ${avgTokens}`);
    console.log('');

    // Token distribution
    console.log('Token Distribution:');
    const large = results.filter(r => r.tokens > 5000).length;
    const medium = results.filter(r => r.tokens >= 2000 && r.tokens <= 5000).length;
    const small = results.filter(r => r.tokens < 2000).length;
    console.log(`  Large (>5k):   ${large} prompts`);
    console.log(`  Medium (2-5k): ${medium} prompts`);
    console.log(`  Small (<2k):   ${small} prompts`);
    console.log('');

    if (errors === 0 && warnings === 0) {
      console.log('✅ All prompts validated successfully!');
      console.log('═'.repeat(50));
      process.exit(0);
    } else {
      console.log(`⚠️  Validation completed with issues:`);
      if (errors > 0) console.log(`   ❌ ${errors} error(s) - fix before release`);
      if (warnings > 0) console.log(`   ⚠️  ${warnings} warning(s) - review recommended`);
      console.log('═'.repeat(50));
      process.exit(errors > 0 ? 1 : 0);
    }
  } catch (err) {
    console.error('❌ Error validating prompts:', err.message);
    process.exit(1);
  }
}

main();
