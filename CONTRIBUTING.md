# Contributing to js-quality-starter

We welcome contributions to the `js-quality-starter` template! By contributing, you help improve this foundation for JavaScript projects for everyone.

Please take a moment to review this document to understand our contribution guidelines.

## Table of Contents

- Code of Conduct
- How to Contribute
  - Reporting Bugs
  - Suggesting Enhancements
  - Your First Code Contribution
  - Pull Request Guidelines
- Development Setup
- Code Style
- Testing
- Commit Messages
- License

## Code of Conduct

This project and everyone participating in it is governed by the [js-quality-starter Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to shytiger@yahoo.com.

## How to Contribute

### Reporting Bugs

If you find a bug in the template or its configurations, please open an issue using the Bug Report template.

Before opening a new bug report, please check if a similar issue already exists. When reporting, provide:

- A clear and concise description of the bug.
- Steps to reproduce the behavior.
- Expected behavior.
- Screenshots or code snippets if applicable.
- Any additional context (e.g., Node.js version, OS).

### Suggesting Enhancements

We're always looking for ways to improve this template! If you have an idea for a new feature or an improvement, please open an issue.

Describe the enhancement, why it would be useful, and provide any relevant examples or mockups.

### Your First Code Contribution

If you're new to contributing to open source or this project, here's a general workflow:

1. **Fork** this repository to your own GitHub account.
2. **Clone** your forked repository to your local machine:

   ```bash
   git clone https://github.com/your-username/your-forked-repo.git # Replace with your forked repository URL
   cd js-quality-starter
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Create a new branch** for your changes:

   ```bash
   git checkout -b feature/your-feature-name
   # or bugfix/your-bug-fix-name
   ```

5. Make your changes.
6. **Test** your changes (see Testing).
7. **Commit** your changes (see Commit Messages).
8. **Push** your branch to your forked repository:

   ```bash
   git push origin feature/your-feature-name
   ```

9. Open a **Pull Request** to the `main` branch of the original `js-quality-starter` repository.

### Pull Request Guidelines

When submitting a pull request, please ensure:

- You have read and followed the Pull Request Template.
- Your branch is up-to-date with the `main` branch of this repository.
- Your code adheres to the project's Code Style.
- All existing tests pass, and new tests are added for new features or bug fixes.
- Your commit messages are clear and follow the Commit Messages guidelines.
- The PR description clearly explains the problem your PR solves and how it solves it.

## Development Setup

After cloning the repository and running `npm install`, the pre-commit hooks (managed by Husky and lint-staged) will be automatically set up. This ensures that your code is linted and formatted before every commit.

## Code Style

This project enforces code style using ESLint and Prettier.

- `npm run lint`: Checks for linting errors.
- `npm run lint:fix`: Automatically fixes fixable linting errors.
- `npm run format`: Checks for formatting issues.
- `npm run format:fix`: Automatically formats files.

Pre-commit hooks will automatically run `eslint --fix` and `prettier --write` on staged files.

## Testing

Tests are written using Jest.

- `npm test`: Runs all tests.

Please ensure all existing tests pass before submitting a pull request. If you are adding new features or fixing bugs, please include new tests to cover your changes.

## Commit Messages

We encourage the use of Conventional Commits for clear and consistent commit history. Examples:

- `feat: Add new feature for X`
- `fix: Resolve bug in Y component`
- `docs: Update README with Z section`
- `chore: Update dependencies`

## License

By contributing to `js-quality-starter`, you agree that your contributions will be licensed under its MIT License.
