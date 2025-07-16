## ESLint Commands

- Execute all:
  `npx eslint .`
- Execute path:
  `npx eslint "tests/"`
- Fix issues path:
  `npx eslint "path/" --fix`
- Fix all:
  `npx eslint --fix`

## Run Different Configurations

- **Execute regression tests:**
 `npx playwright test --grep "@regression" --headed --project=chromium`