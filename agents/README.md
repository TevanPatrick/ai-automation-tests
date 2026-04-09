# Self-healing agents

This repo includes prompt templates for a self-healing Playwright workflow.

- `planner.prompt.md` → creates test and repair plans
- `generator.prompt.md` → writes Playwright test code
- `healer.prompt.md` → fixes broken tests dynamically

## Workflow

1. `planner.prompt.md` analyzes the repo and failure context, then generates prioritized test scenarios.
2. `generator.prompt.md` converts those scenarios into Playwright spec files.
3. `healer.prompt.md` inspects failed tests and applies minimal fixes.

## GitHub Actions

The workflow file is located at `.github/workflows/self-healing.yml`.

It runs on:

- `push` to `main`
- `pull_request` targeting `main`

Jobs:

- `planner`: prepares the planning output
- `generator`: placeholder for AI-based test generation
- `executor`: installs dependencies and runs `npx playwright test tests/saucedemo-ui`
- `healer`: runs only if tests fail and applies healing logic

## Usage

- Open and edit prompt files in `agents/` as needed.
- Use your AI tool or CLI to run the prompts against the repo.
- Run Playwright tests locally with:
  ```bash
  npx playwright test tests/saucedemo-ui
  ```

## Secrets

If you want the generator or healer jobs to call an AI CLI, add a repository secret named `AI_CLI_COMMAND`.

Example secret value:

```bash
openai api chat.completions.create --model gpt-4o --messages file=@agents/generator.prompt.md
```

## Notes

- The prompt files are templates, not executable scripts.
- The GitHub Actions workflow uses placeholders for your AI integration.
- Modify the workflow to connect your actual AI runner or CLI.
