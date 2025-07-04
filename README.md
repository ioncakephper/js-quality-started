# 🚀 JS Quality Starter

`js-quality-starter` is a comprehensive template for jumpstarting new JavaScript projects with a strong emphasis on code quality, maintainability, and modern development practices. It comes pre-configured with essential tools and a handy setup script to personalize your new repository in minutes.

---

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Features](#features)
- [Getting Started](#getting-started)
  - [Using This Template](#using-this-template)
  - [Project Personalization](#project-personalization)
- [Included Tools & Configurations](#included-tools--configurations)
  - [Testing](#testing)
  - [Linting & Formatting](#linting--formatting)
  - [Git Hooks](#git-hooks)
  - [Continuous Integration](#continuous-integration)
- [License](#license)
- [Contact](#contact)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---

## Features

- **Node.js & npm:** Modern JavaScript development environment.
- **Jest:** Powerful testing framework for unit and integration tests, with code coverage configuration.
- **ESLint:** Configured with best practices for identifying and reporting on patterns in JavaScript code.
- **Prettier:** Opinionated code formatter to ensure consistent code style across the project.
- **Husky & lint-staged:** Pre-commit Git hooks to automatically run linting and formatting on staged files.
- **EditorConfig:** Helps maintain consistent coding styles across different editors and IDEs.
- **GitHub Actions:** Basic CI/CD workflow for automated linting, testing, and optional code coverage reporting (e.g., to Codecov).
- **Dynamic Setup Script (`setup.js`):** A command-line utility to quickly personalize your new project based on this template, updating `package.json`, `README.md`, `LICENSE`, and other essential files.

---

## Getting Started

### Using This Template

To create a new project based on `js-quality-starter`, you can clone this repository or use it as a template directly on GitHub:

1. **Create a new repository from this template:**
   - Click the "Use this template" button on the GitHub page.
   - Alternatively, clone this repository and remove the `.git` directory:

     ```bash
     git clone [https://github.com/your-username/js-quality-starter.git](https://github.com/your-username/js-quality-starter.git) my-new-project
     cd my-new-project
     rm -rf .git # On Windows, use `rmdir /s /q .git`
     ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the setup script:** This is the most crucial step for personalizing your new project.

   ```bash
   node setup.js
   # OR if you've added an npm script for it (recommended):
   # npm run setup
   ```

### Project Personalization

The `setup.js` script will guide you through a few questions to customize your new project:

- **Project Name & Description:** Sets these in `package.json` and `README.md`.
- **Author & Contact Info:** Populates author details in `package.json`, `README.md`, `LICENSE`, and other documentation.
- **License Type:** Lets you choose a standard license (e.g., MIT, Apache-2.0, GPL-3.0) which is then set in `package.json` and used to update the `LICENSE` file.
- **Code Coverage:** Optionally configures Jest for coverage and integrates with Codecov (including badge in `README.md` and CI setup details).
- **GitHub Username:** Used for repository links in `README.md`.

After running `setup.js`, your project will be ready with a personalized `package.json`, `README.md`, `LICENSE` file, and more, tailored to your new project's details. You can then remove `setup.js` and `README.template.md` (or move them to a `tools/` directory) as they are no longer needed.

---

## Included Tools & Configurations

### Testing

- **Jest:** A delightful JavaScript testing framework with a focus on simplicity.
  - `npm test`: Runs all tests.
  - `npm test:watch`: Runs tests in interactive watch mode.
  - `npm test:coverage`: Runs tests and generates a code coverage report in the `coverage/` directory.

### Linting & Formatting

- **ESLint:** Statically analyzes your code to quickly find problems.
  - `npm run lint`: Runs ESLint over your codebase.
  - `npm run lint:fix`: Runs ESLint and attempts to fix auto-fixable issues.
- **Prettier:** An opinionated code formatter that ensures consistent code style.
  - `npm run format`: Formats your entire codebase with Prettier.

### Git Hooks

- **Husky:** Simplifies the use of Git hooks.
- **lint-staged:** Runs linters on Git staged files.
  - These are pre-configured to run ESLint and Prettier on staged files before you commit, helping maintain a clean and consistent codebase automatically.

### Continuous Integration

- **.github/workflows/ci.yml:** A basic GitHub Actions workflow is included to automate linting, testing, and (optionally) code coverage upload on every push and pull request. This ensures your project always meets quality standards.

---

## License

This `js-quality-starter` template itself is open-sourced under the **MIT License**. For the license of a project created using this template, please refer to the `LICENSE` file generated by the `setup.js` script within that new project.

---

## Contact

For questions or feedback about the `js-quality-starter` template, please open an issue in this repository or contact the maintainers at [template-maintainer@example.com](mailto:template-maintainer@example.com).
