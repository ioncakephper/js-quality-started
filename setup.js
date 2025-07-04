// setup.js (using Inquirer.js)

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer'); // Import Inquirer

// List of files that need to be modified by the script
const filesToModify = [
  'project.json',
  'CONTRIBUTING.md',
  'LICENSE',
  'CODE_OF_CONDUCT.md',
  'README.md',
];

/**
 * Collects all necessary inputs from the user using Inquirer.
 * @returns {Promise<Object>} An object containing all user inputs.
 */
async function getUserInputs() {
    console.log('\n--- Project Setup ---');
    console.log('Let\'s personalize your new repository.');
    console.log('Please provide the following information:');

    const currentYear = new Date().getFullYear().toString(); // Ensure year is a string for direct replacement

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: '1. Enter the name for your new project:',
            default: 'my-awesome-app',
            validate: input => input.trim().length > 0 || 'Project name cannot be empty.'
        },
        {
            type: 'input',
            name: 'projectDescription',
            message: '2. Enter a short description for your project:',
            default: 'A modern JavaScript project.'
        },
        {
            type: 'input',
            name: 'projectKeywords',
            message: '3. Enter keywords for your project, separated by commas (e.g., javascript, web, utility):',
            default: 'javascript, template, quality'
        },
        {
            type: 'input',
            name: 'authorName',
            message: '4. Enter the author\'s name (e.g., John Doe or My Company Inc.):',
            validate: input => input.trim().length > 0 || 'Author name cannot be empty.'
        },
        {
            type: 'input',
            name: 'contactEmail',
            message: '5. Enter a contact email for your project:',
            validate: input => {
                // Basic email regex validation
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input) || 'Please enter a valid email address.';
            }
        },
        {
            type: 'input',
            name: 'licenseYear',
            message: '6. Enter the copyright year:',
            default: currentYear,
            validate: input => {
                const year = parseInt(input);
                return (!isNaN(year) && year > 1900 && year <= new Date().getFullYear() + 10) || 'Please enter a valid year.';
            }
        },
        {
            type: 'input',
            name: 'githubUsername',
            message: '7. Enter your GitHub username or organization name (e.g., octocat):',
            validate: input => input.trim().length > 0 || 'GitHub username cannot be empty.'
        },
        {
            type: 'input',
            name: 'codecovToken',
            message: '8. Enter your Codecov token (optional, leave blank if not using Codecov badge):'
        }
    ]);

    return answers;
}

/**
 * Processes each file, replacing placeholders with user inputs.
 * @param {Object} inputs An object containing all user inputs.
 */
async function processFiles(inputs) {
    for (const file of filesToModify) {
        const filePath = path.join(process.cwd(), file);
        console.log(`\nProcessing ${file}...`);

        try {
            if (!fs.existsSync(filePath)) {
                console.warn(`Warning: File not found at ${filePath}. Skipping.`);
                continue;
            }

            let content = fs.readFileSync(filePath, 'utf8');

            // --- Generic Replacements (order matters if placeholders overlap) ---
            content = content.replace(new RegExp('{{PROJECT_NAME}}', 'g'), inputs.projectName);
            content = content.replace(new RegExp('{{PROJECT_DESCRIPTION}}', 'g'), inputs.projectDescription);
            content = content.replace(new RegExp('{{AUTHOR_NAME}}', 'g'), inputs.authorName);
            content = content.replace(new RegExp('{{CONTACT_EMAIL}}', 'g'), inputs.contactEmail);
            content = content.replace(new RegExp('{{LICENSE_YEAR}}', 'g'), inputs.licenseYear);
            content = content.replace(new RegExp('{{GITHUB_USERNAME}}', 'g'), inputs.githubUsername);
            content = content.replace(new RegExp('{{CODECOV_TOKEN}}', 'g'), inputs.codecovToken || '');

            // --- Specific handling for package.json ---
            if (file === 'package.json') {
                let packageJson = JSON.parse(content);

                packageJson.name = inputs.projectName;
                packageJson.description = inputs.projectDescription;
                packageJson.author = inputs.authorName;

                if (inputs.projectKeywords) {
                    packageJson.keywords = inputs.projectKeywords.split(',').map(kw => kw.trim()).filter(kw => kw.length > 0);
                } else {
                    packageJson.keywords = [];
                }

                content = JSON.stringify(packageJson, null, 2);
            }

            // --- Specific handling for README.md ---
            if (file === 'README.md') {
                content = content.replace(/\[LICENSE\]\(LICENSE\.md\)/g, '[LICENSE](LICENSE)');

                const postTemplateSetupRegex = /(## Post-Template Setup[\s\S]*?)(?=##|$)/;
                const newPostTemplateSetupContent = `## Post-Template Setup\n\nAfter creating your repository from this template, you've successfully run this setup script to personalize your project. You're ready to start building!\n\n*(This section was updated by the setup script.)*`;

                if (content.match(postTemplateSetupRegex)) {
                    content = content.replace(postTemplateSetupRegex, newPostTemplateSetupContent);
                } else {
                    console.warn('Warning: "Post-Template Setup" section not found in README.md. Appending new content.');
                    content += `\n${newPostTemplateSetupContent}`;
                }
            }

            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Successfully updated ${file}.`);

        } catch (error) {
            console.error(`Error processing ${file}: ${error.message}`);
            if (file === 'package.json' && error instanceof SyntaxError) {
                console.error('Make sure package.json is valid JSON before running the script.');
            }
        }
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
        console.log(`- GitHub Repository: https://github.com/${inputs.githubUsername}/${inputs.projectName}`);
        if (inputs.codecovToken) {
            console.log(`- Remember to add your Codecov token as a secret named 'CODECOV_TOKEN' in your GitHub repository settings for CI integration.`);
        }
        console.log('\n- Please review the modified files to ensure everything looks correct and fine-tune as needed.');
        console.log('- Don\'t forget to initialize your Git repository if you haven\'t already!');
        console.log('\nHappy coding!');
    } catch (error) {
        console.error('\nAn unexpected error occurred during setup:', error);
        process.exit(1);
    }
}

// Execute the setup script
runSetup();