# AI Automation Tests

This repository contains a Playwright test suite for the Sauce Demo web app, with an AI-assisted self-healing automation workflow.

## Repo structure

- `package.json` — project dependencies
- `playwright.config.ts` — Playwright configuration
- `tests/saucedemo-ui/` — Playwright test specs
- `tests/saucedemo-ui/pages/` — page object model classes
- `test-results/` — test result artifacts
- `playwright-report/` — Playwright HTML report output
- `agents/` — AI prompt templates and workflow guidance
- `.github/workflows/self-healing.yml` — GitHub Actions self-healing pipeline

## What this repo does

- Implements UI automation for Sauce Demo with Playwright
- Uses page objects to keep tests maintainable
- Includes test coverage for login, inventory, cart, product details, checkout, menu actions, and negative scenarios
- Supports a self-healing agent workflow via AI prompts

## AI automation flow

The repo is built around these agent roles:

1. **Planner Agent**
   - Defines test scenarios and repair tasks
   - Uses `agents/planner.prompt.md`

2. **Generator Agent**
   - Writes Playwright test code based on planner scenarios
   - Uses `agents/generator.prompt.md`

3. **Healer Agent**
   - Fixes broken tests dynamically using failure output
   - Uses `agents/healer.prompt.md`

4. **Executor**
   - Runs the Playwright tests and generates artifacts

## GitHub Actions

A self-healing workflow is configured in `.github/workflows/self-healing.yml`.

- `planner` job prepares the test plan
- `generator` job is the placeholder for AI-based test generation
- `executor` job runs `npx playwright test tests/saucedemo-ui`
- `healer` job runs if the tests fail and applies fixes

## Running locally

Install dependencies:

```bash
npm install
```

Run the Saucedemo tests:

```bash
npx playwright test tests/saucedemo-ui
```

## Notes

- The prompt files in `agents/` are designed for AI-driven workflow automation.
- The GitHub Actions workflow uses placeholders for AI CLI integration.
- You can adapt the prompts and workflow to your own AI tooling.
