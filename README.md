# js-quality-starter

[![Codecov](https://codecov.io/gh/ioncakephper/js-quality-starter/branch/main/graph/badge.svg?token=12d4bb6f-21c2-4f8b-8adf-ca4e74ff1232)](https://codecov.io/gh/ioncakephper/js-quality-starter)

A template repository for modern JavaScript projects with pre-configured linting, formatting, testing, and CI/CD using GitHub Actions.

This template provides a solid foundation for any new JavaScript project, ensuring code quality and consistency from the start.

## What's Inside?

This template comes pre-configured with a suite of modern, industry-standard tools to ensure your project maintains high code quality.

| Tool               | Purpose                                                                                                                                  |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **ESLint**         | Statically analyzes your code to quickly find and fix problems. It's configured with recommended rules to enforce best practices.        |
| **Prettier**       | An opinionated code formatter that enforces a consistent style across your entire codebase, eliminating arguments over code style.       |
| **Jest**           | A delightful JavaScript Testing Framework with a focus on simplicity. It's set up and ready for you to write unit and integration tests. |
| **markdownlint**   | A linter for Markdown files to enforce consistent style and catch common errors in documentation.                                        |
| **Husky**          | Manages Git hooks to make it easy to run scripts at specific stages, like before a commit.                                               |
| **lint-staged**    | Works with Husky to run linters and formatters on your staged files _before_ they are committed, ensuring no bad code gets in.           |
| **GitHub Actions** | Automates your workflow with two pre-configured CI pipelines for validating code on `main` and all other feature branches.               |

## Getting Started

### Using as a Template

1. Click the **"Use this template"** button on the GitHub repository page.
2. Select **"Create a new repository"**.
3. Give your new repository a name and description.
4. Clone your new repository to your local machine.

### Manual Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-new-repo.git # Replace with your actual repository URL
   cd your-new-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   This will install all dependencies and also run the `prepare` script, which sets up the Husky pre-commit hooks automatically.

3. Start coding!

### Post-Template Setup

After creating your repository from this template, be sure to:

1. **Update `package.json`**: Change the `name`, `description`, and `author` fields.
2. **Update `LICENSE`**: Modify the `[year]` and `[fullname]` to reflect your project's ownership.
3. **Update `CODE_OF_CONDUCT.md` and `CONTRIBUTING.md`**: Replace the `[YOUR_PROJECT_CONTACT_EMAIL]` placeholder with a valid project contact email.

## Available Scripts

In the project directory, you can run:

- `npm test`: Runs the tests using Jest.
- `npm run lint`: Lints all `.js` files in the project.
- `npm run lint:fix`: Lints and automatically fixes fixable issues.
- `npm run format`: Checks for formatting issues with Prettier.
- `npm run format:fix`: Formats all supported files with Prettier.
- `npm run lint:md`: Lints all Markdown files.
- `npm run lint:md:fix`: Lints and automatically fixes fixable issues in Markdown files.
- `npm run format:md`: Checks for formatting issues with Prettier for Markdown files.
- `npm run format:md:fix`: Formats all Markdown files with Prettier.

## How It Works

### Pre-commit Hooks

This project uses `Husky` and `lint-staged` to run `eslint --fix`, `prettier --write` (for both code and Markdown), and `markdownlint --fix` on staged files every time you make a commit. This automated quality gate ensures that no code or documentation that violates the style guide ever gets into the codebase.

If a file has linting or formatting errors, the tools will attempt to fix them automatically. If they can, the fixed code is what gets committed. If they can't, the commit is aborted so you can fix the issues manually.

### CI/CD Pipelines

This template includes one GitHub Action workflows located in the `.github/workflows` directory:

- **`ci.yml`**: This workflow runs on every push and pull request to the `main` branch. It acts as a final validation gate, ensuring that all tests, linting, and formatting checks pass before code is merged.

The workflow performs the following steps across multiple Node.js versions (18.x, 20.x):

1. **Install dependencies** using `npm ci` for fast, reliable installs.
2. **Lint code** with `npm run lint`.
3. **Lint Markdown files** with `npm run lint:md`.
4. **Check code formatting** with `npm run format`.
5. **Check Markdown formatting** with `npm run format:md`.
6. **Audit for vulnerabilities** with `npm audit --production`.
7. **Run tests** with `npm test`.

## Customization

This template is a starting point. You can easily customize it to fit your project's needs:

- **Linting Rules**: Modify the `.eslintrc.js` file to add or change ESLint rules.
- **Formatting Options**: Adjust the `.prettierrc` file to change Prettier's formatting options.
- **Markdown Linting**: Customize `markdownlint` rules by editing the `.markdownlint.json` file.
- **Testing**: The `jest.config.js` file can be configured for more advanced testing scenarios.
- **CI/CD**: Edit the workflow files in `.github/workflows` to add new steps, such as deployment or notifications.

## Code Coverage

This template is configured to generate code coverage reports using Jest. The reports are output to the `coverage/` directory in various formats, including `lcov`, which is compatible with popular code coverage services.

To get a dynamic code coverage badge like the one at the top of this `README.md`, you can integrate with a service like Codecov or Coveralls.

**Steps to set up Codecov (example):**

1. Sign up for Codecov with your GitHub account.
2. Add your repository to Codecov.
3. Codecov will provide you with a `CODECOV_TOKEN`. Add this token as a secret in your GitHub repository settings (e.g., `CODECOV_TOKEN`).
4. Add a step to your CI workflow (`.github/workflows/ci.yml`) to upload the coverage report to Codecov. This typically involves adding a step like:

   ```yaml
   - name: Upload coverage to Codecov
     uses: codecov/codecov-action@v4
     with:
       token: ${{ secrets.CODECOV_TOKEN }}
   ```

5. Update the badge URL in `README.md` with your specific repository details and token (if required by Codecov for public repos, though often not for public repos).

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on how to contribute, report bugs, and suggest enhancements.

## License

This project is licensed under the [LICENSE](LICENSE.md) file for details.
