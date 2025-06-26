# js-quality-starter

A starter repository for JavaScript projects with pre-configured linting, formatting, testing, and CI using GitHub Actions.

This template provides a solid foundation for any new JavaScript project, ensuring code quality and consistency from the start.

## Features

-   **Linting** with [ESLint](https://eslint.org/) to find and fix problems in your JavaScript code.
-   **Formatting** with [Prettier](https://prettier.io/) for a consistent code style.
-   **Testing** with [Jest](https://jestjs.io/) as the testing framework.
-   **CI/CD** with [GitHub Actions](https://github.com/features/actions) to automate linting, formatting checks, and testing on every push and pull request.
-   **Pre-commit Hooks** with [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged) to lint and format your code before you even commit it.

## Getting Started

### Using as a Template

Click the "Use this template" button on the GitHub repository page to create a new repository with the same directory structure and files.

### Manual Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/js-quality-starter.git
    cd js-quality-starter
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Available Scripts

In the project directory, you can run:

-   `npm test`: Runs the tests using Jest.
-   `npm run lint`: Lints all `.js` files in the project.
-   `npm run lint:fix`: Lints and automatically fixes fixable issues.
-   `npm run format`: Checks for formatting issues with Prettier.
-   `npm run format:fix`: Formats all supported files with Prettier.

## How It Works

### Pre-commit Hook

This project uses `husky` and `lint-staged` to run `eslint --fix` and `prettier --write` on staged `.js` files every time you make a commit. This ensures that no code that violates the style guide gets into the codebase.

After running `npm install`, the `prepare` script sets up the husky hooks.

### CI Pipeline

The `.github/workflows/ci.yml` file defines a GitHub Actions workflow that runs on every push and pull request to the `main` branch. It performs the following checks on Node.js 18.x and 20.x:

1.  Installs dependencies.
2.  Runs `npm run lint` to check for linting errors.
3.  Runs `npm run format` to check for formatting errors.
4.  Runs `npm test` to execute the test suite.

This ensures that all code in the `main` branch is high quality and passes all checks.