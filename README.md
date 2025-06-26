# js-quality-starter

A template repository for modern JavaScript projects with pre-configured linting, formatting, testing, and CI/CD using GitHub Actions.

This template provides a solid foundation for any new JavaScript project, ensuring code quality and consistency from the start.

## What's Inside?

This template comes pre-configured with a suite of modern, industry-standard tools to ensure your project maintains high code quality.

| Tool                                                      | Purpose                                                                                                                                  |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **[ESLint](https://eslint.org/)**                         | Statically analyzes your code to quickly find and fix problems. It's configured with recommended rules to enforce best practices.        |
| **[Prettier](https://prettier.io/)**                      | An opinionated code formatter that enforces a consistent style across your entire codebase, eliminating arguments over code style.       |
| **[Jest](https://jestjs.io/)**                            | A delightful JavaScript Testing Framework with a focus on simplicity. It's set up and ready for you to write unit and integration tests. |
| **[Husky](https://typicode.github.io/husky/)**            | Manages Git hooks to make it easy to run scripts at specific stages, like before a commit.                                               |
| **[lint-staged](https://github.com/okonet/lint-staged)**  | Works with Husky to run linters and formatters on your staged files _before_ they are committed, ensuring no bad code gets in.           |
| **[GitHub Actions](https://github.com/features/actions)** | Automates your workflow with two pre-configured CI pipelines for validating code on `main` and all other feature branches.               |

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

   This will install all dependencies and also run the `prepare` script, which sets up the Husky pre-commit hooks automatically.

2. Start coding!

### Post-Template Setup

After creating your repository from this template, be sure to:

1. **Update `package.json`**: Change the `name`, `description`, and `author` fields.
2. **Update `LICENSE`**: Modify the `[year]` and `[fullname]` to reflect your project's ownership.
3. **Update `CODE_OF_CONDUCT.md` and `CONTRIBUTING.md`**: Replace the `[INSERT CONTACT EMAIL ADDRESS]` placeholder with a valid project contact email.

## Available Scripts

In the project directory, you can run:

- `npm test`: Runs the tests using Jest.
- `npm run lint`: Lints all `.js` files in the project.
- `npm run lint:fix`: Lints and automatically fixes fixable issues.
- `npm run format`: Checks for formatting issues with Prettier.
- `npm run format:fix`: Formats all supported files with Prettier.

## How It Works

### Pre-commit Hooks

This project uses `Husky` and `lint-staged` to run `eslint --fix` and `prettier --write` on staged `.js` files every time you make a commit. This automated quality gate ensures that no code that violates the style guide ever gets into the codebase.

If a file has linting or formatting errors, the tools will attempt to fix them automatically. If they can, the fixed code is what gets committed. If they can't, the commit is aborted so you can fix the issues manually.

### CI/CD Pipelines

This template includes two GitHub Actions workflows located in the `.github/workflows` directory:

1. **`ci.yml`**: This workflow runs on every push and pull request to the `main` branch. It acts as a final validation gate, ensuring that all tests, linting, and formatting checks pass before code is merged.
2. **`feature-branch-ci.yml`**: This workflow runs on all branches _except_ `main`. It provides early feedback on feature branches, running the same set of checks to ensure quality throughout the development process.

Both workflows perform the following steps across multiple Node.js versions (18.x, 20.x):

1. **Install dependencies** using `npm ci` for fast, reliable installs.
2. **Lint code** with `npm run lint`.
3. **Check formatting** with `npm run format`.
4. **Run tests** with `npm test`.

## Customization

This template is a starting point. You can easily customize it to fit your project's needs:

- **Linting Rules**: Modify the `.eslintrc.js` file to add or change ESLint rules.
- **Formatting Options**: Adjust the `.prettierrc` file to change Prettier's formatting options.
- **Testing**: The `jest.config.js` file can be configured for more advanced testing scenarios.
- **CI/CD**: Edit the workflow files in `.github/workflows` to add new steps, such as deployment or notifications.

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on how to contribute, report bugs, and suggest enhancements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
