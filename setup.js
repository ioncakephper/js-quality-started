// setup.js (modified to keep existing LICENSE file and update its placeholders)

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

// Current known license types commonly used (for package.json and LICENSE file placeholder)
const standardLicenseTypes = [
  'MIT',
  'Apache-2.0',
  'GPL-3.0',
  'BSD-3-Clause',
  'Unlicense',
  'ISC',
  // Add more common SPDX identifiers as needed
].sort(); // Keep them sorted alphabetically

// List of files that need to be modified by the script
// LICENSE file is now modified, not generated
const filesToModify = [
  'package.json',
  'CONTRIBUTING.md',
  'LICENSE', // Re-added LICENSE to the modification list
  'CODE_OF_CONDUCT.md',
];

// Path to the README template file
const readmeTemplatePath = path.join(process.cwd(), 'README.template.md');
const readmeOutputPath = path.join(process.cwd(), 'README.md');

/**
 * Collects all necessary inputs from the user using Inquirer, including conditional Code Coverage and License Type.
 * @returns {Promise<Object>} An object containing all user inputs.
 */
async function getUserInputs() {
  console.log('\n--- Project Setup ---');
  console.log("Let's personalize your new repository.");
  console.log('Please provide the following information:');

  const currentYear = new Date().getFullYear().toString();

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: '1. Enter the name for your new project:',
      default: 'my-awesome-app',
      validate: (input) =>
        input.trim().length > 0 || 'Project name cannot be empty.',
    },
    {
      type: 'input',
      name: 'projectDescription',
      message: '2. Enter a short description for your project:',
      default: 'A modern JavaScript project.',
    },
    {
      type: 'input',
      name: 'projectKeywords',
      message:
        '3. Enter keywords for your project, separated by commas (e.g., javascript, web, utility):',
      default: 'javascript, template, quality',
    },
    {
      type: 'input',
      name: 'authorName',
      message:
        "4. Enter the author's name (e.g., John Doe or My Company Inc.):",
      validate: (input) =>
        input.trim().length > 0 || 'Author name cannot be empty.',
    },
    {
      type: 'input',
      name: 'contactEmail',
      message: '5. Enter a contact email for your project:',
      validate: (input) => {
        return (
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input) ||
          'Please enter a valid email address.'
        );
      },
    },
    {
      type: 'list',
      name: 'licenseType',
      message:
        '6. Choose the license type for your project (sets package.json license field):',
      choices: standardLicenseTypes,
      default: 'MIT', // Set MIT as the default choice
    },
    {
      type: 'input',
      name: 'licenseYear',
      message: '7. Enter the copyright year for the license:',
      default: currentYear,
      validate: (input) => {
        const year = parseInt(input);
        return (
          (!isNaN(year) &&
            year > 1900 &&
            year <= new Date().getFullYear() + 10) ||
          'Please enter a valid year.'
        );
      },
    },
    {
      type: 'input',
      name: 'githubUsername',
      message:
        '8. Enter your GitHub username or organization name (e.g., octocat):',
      validate: (input) =>
        input.trim().length > 0 || 'GitHub username cannot be empty.',
    },
    {
      type: 'confirm',
      name: 'useCodeCoverage',
      message:
        '9. Do you want to enable Code Coverage (Jest + Codecov integration)?',
      default: true,
    },
    {
      type: 'input',
      name: 'codecovToken',
      message:
        '10. Enter your Codecov token (optional, leave blank if not using Codecov badge):',
      when: (answers) => answers.useCodeCoverage, // Only ask if useCodeCoverage is true
    },
  ]);

  // Build the dynamic code coverage section content for README.md
  if (answers.useCodeCoverage) {
    answers.codecovBadge = `[![codecov](https://codecov.io/gh/${answers.githubUsername}/${answers.projectName}/graph/badge.svg?token=${answers.codecovToken || ''})](https://codecov.io/gh/${answers.githubUsername}/${answers.projectName})`;
    answers.codeCoverageSectionContent = `## Code Coverage

This project is configured to generate code coverage reports using Jest. The reports are output to the \`coverage/\` directory in various formats, including \`lcov\`, which is compatible with popular code coverage services.

To get a dynamic code coverage badge like the one at the top of this \`README.md\`, you can integrate with a service like Codecov or Coveralls.

**Steps to set up Codecov (example):**

1.  Sign up for Codecov with your GitHub account.
2.  Add your repository to Codecov.
3.  Codecov will provide you with a \`CODECOV_TOKEN\`. Add this token as a **secret** in your GitHub repository settings (e.g., named \`CODECOV_TOKEN\`).
4.  Add a step to your CI workflow (\`.github/workflows/ci.yml\`) to upload the coverage report to Codecov. This typically involves adding a step like:

    \`\`\`yaml
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v4
      with:
        token: \${{ secrets.CODECOV_TOKEN }}
    \`\`\`
`;
    answers.codeCoverageSectionToc = `- [Code Coverage](#code-coverage)`;
  } else {
    answers.codecovBadge = ''; // Empty string if no code coverage
    answers.codeCoverageSectionContent = ''; // Empty section
    answers.codeCoverageSectionToc = ''; // Empty TOC entry
  }

  return answers;
}

/**
 * Processes each file, replacing placeholders with user inputs.
 * @param {Object} inputs An object containing all user inputs.
 */
async function processFiles(inputs) {
  // --- Process core files (CONTRIBUTING.md, CODE_OF_CONDUCT.md, package.json, LICENSE) ---
  for (const file of filesToModify) {
    const filePath = path.join(process.cwd(), file);
    console.log(`\nProcessing ${file}...`);

    try {
      if (!fs.existsSync(filePath)) {
        console.warn(`Warning: File not found at ${filePath}. Skipping.`);
        continue;
      }

      let content = fs.readFileSync(filePath, 'utf8');

      // Apply generic replacements (relevant for all files listed in filesToModify)
      content = content.replace(
        new RegExp('{{PROJECT_NAME}}', 'g'),
        inputs.projectName
      );
      content = content.replace(
        new RegExp('{{PROJECT_DESCRIPTION}}', 'g'),
        inputs.projectDescription
      );
      content = content.replace(
        new RegExp('{{AUTHOR_NAME}}', 'g'),
        inputs.authorName
      );
      content = content.replace(
        new RegExp('{{CONTACT_EMAIL}}', 'g'),
        inputs.contactEmail
      );
      content = content.replace(
        new RegExp('{{LICENSE_YEAR}}', 'g'),
        inputs.licenseYear
      );
      content = content.replace(
        new RegExp('{{GITHUB_USERNAME}}', 'g'),
        inputs.githubUsername
      );
      content = content.replace(
        new RegExp('{{LICENSE_TYPE}}', 'g'),
        inputs.licenseType
      ); // New: Replace license type placeholder

      // Specific handling for package.json
      if (file === 'package.json') {
        let packageJson = JSON.parse(content);

        packageJson.name = inputs.projectName;
        packageJson.description = inputs.projectDescription;
        packageJson.author = inputs.authorName;
        packageJson.license = inputs.licenseType; // Set chosen license type in package.json

        if (inputs.projectKeywords) {
          packageJson.keywords = inputs.projectKeywords
            .split(',')
            .map((kw) => kw.trim())
            .filter((kw) => kw.length > 0);
        } else {
          packageJson.keywords = [];
        }

        content = JSON.stringify(packageJson, null, 2);
      }

      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Successfully updated ${file}.`);
    } catch (error) {
      console.error(`Error processing ${file}: ${error.message}`);
      if (file === 'package.json' && error instanceof SyntaxError) {
        console.error(
          'Make sure package.json is valid JSON before running the script.'
        );
      }
    }
  }

  // --- Process README.template.md to create README.md ---
  console.log(`\nProcessing README.template.md to create README.md...`);
  try {
    if (!fs.existsSync(readmeTemplatePath)) {
      console.error(
        `Error: README template file not found at ${readmeTemplatePath}.`
      );
      process.exit(1);
    }

    let readmeContent = fs.readFileSync(readmeTemplatePath, 'utf8');

    // Apply all generic replacements
    readmeContent = readmeContent.replace(
      new RegExp('{{PROJECT_NAME}}', 'g'),
      inputs.projectName
    );
    readmeContent = readmeContent.replace(
      new RegExp('{{PROJECT_DESCRIPTION}}', 'g'),
      inputs.projectDescription
    );
    readmeContent = readmeContent.replace(
      new RegExp('{{AUTHOR_NAME}}', 'g'),
      inputs.authorName
    );
    readmeContent = readmeContent.replace(
      new RegExp('{{CONTACT_EMAIL}}', 'g'),
      inputs.contactEmail
    );
    readmeContent = readmeContent.replace(
      new RegExp('{{LICENSE_YEAR}}', 'g'),
      inputs.licenseYear
    );
    readmeContent = readmeContent.replace(
      new RegExp('{{GITHUB_USERNAME}}', 'g'),
      inputs.githubUsername
    );
    readmeContent = readmeContent.replace(
      new RegExp('{{LICENSE_TYPE}}', 'g'),
      inputs.licenseType
    ); // Replace license type in README

    // Apply conditional Codecov badge and section
    readmeContent = readmeContent.replace(
      new RegExp('{{CODECOV_BADGE}}', 'g'),
      inputs.codecovBadge
    );
    readmeContent = readmeContent.replace(
      new RegExp('{{CODE_COVERAGE_SECTION}}', 'g'),
      inputs.codeCoverageSectionContent
    );
    readmeContent = readmeContent.replace(
      new RegExp('{{CODE_COVERAGE_SECTION_TOC}}', 'g'),
      inputs.codeCoverageSectionToc
    );

    // Update the 'Personalization Complete' section in the generated README.md
    const postTemplateSetupRegex =
      /(### 2\. Running The Setup Script[\s\S]*?)(?=###|$)/;
    const newPostTemplateSetupContent = `### 2. Personalization Complete!

Your project has been successfully personalized with the details you provided. This \`README.md\` file, \`package.json\`, \`LICENSE\`, and other configuration files have been updated.

You are now ready to start building your project!
`;

    if (readmeContent.match(postTemplateSetupRegex)) {
      readmeContent = readmeContent.replace(
        postTemplateSetupRegex,
        newPostTemplateSetupContent
      );
    } else {
      console.warn(
        'Warning: "2. Running The Setup Script" section not found in README.template.md. This section was not updated. Please ensure README.template.md contains "### 2. Running The Setup Script".'
      );
    }

    fs.writeFileSync(readmeOutputPath, readmeContent, 'utf8');
    console.log(`Successfully created personalized README.md.`);
  } catch (error) {
    console.error(`Error processing README.template.md: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Main function to run the setup script.
 */
async function runSetup() {
  try {
    const inputs = await getUserInputs();
    await processFiles(inputs);

    console.log('\n--- Setup Complete! ---');
    console.log('Your repository has been successfully personalized.');
    console.log('Here are some quick reminders:');
    console.log(`- Project Name: ${inputs.projectName}`);
    console.log(`- Author: ${inputs.authorName}`);
    console.log(
      `- License Declared: ${inputs.licenseType} (in package.json and LICENSE file)`
    );
    console.log(
      `- GitHub Repository: https://github.com/${inputs.githubUsername}/${inputs.projectName}`
    );
    if (inputs.useCodeCoverage) {
      console.log(
        `- Remember to add your Codecov token as a secret named 'CODECOV_TOKEN' in your GitHub repository settings for CI integration.`
      );
    }
    console.log(
      '\n- Please review the modified files to ensure everything looks correct and fine-tune as needed.'
    );
    console.log(
      "- Don't forget to initialize your Git repository if you haven't already!"
    );
    console.log('\nHappy coding!');
  } catch (error) {
    console.error('\nAn unexpected error occurred during setup:', error);
    process.exit(1);
  }
}

// Execute the setup script
runSetup();
