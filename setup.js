// setup.js

const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Configure readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// List of files that need to be modified by the script
const filesToModify = [
    'project.json',
    'CONTRIBUTING.md',
    'LICENSE',
    'CODE_OF_CONDUCT.md',
    'README.md'
];

/**
 * Prompts the user with a question and returns their answer.
 * @param {string} query The question to ask the user.
 * @returns {Promise<string>} A promise that resolves with the user's answer.
 */
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

/**
 * Collects all necessary inputs from the user.
 * @returns {Promise<Object>} An object containing all user inputs.
 */
async function getUserInputs() {
    console.log('\n--- Project Setup ---');
    console.log('Let\'s personalize your new repository.');
    console.log('Please provide the following information:');

    const inputs = {};

    inputs.projectName = await askQuestion('1. Enter the name for your new project (e.g., my-awesome-app): ');
    inputs.projectDescription = await askQuestion('2. Enter a short description for your project: ');
    inputs.projectKeywords = await askQuestion('3. Enter keywords for your project, separated by commas (e.g., javascript, web, utility): ');
    inputs.authorName = await askQuestion('4. Enter the author\'s name (e.g., John Doe or My Company Inc.): ');
    inputs.contactEmail = await askQuestion('5. Enter a contact email for your project (e.g., contact@yourproject.com): ');

    const currentYear = new Date().getFullYear();
    inputs.licenseYear = (await askQuestion(`6. Enter the copyright year (default: ${currentYear}): `)) || currentYear.toString(); // Ensure string for replacement

    inputs.githubUsername = await askQuestion('7. Enter your GitHub username or organization name (e.g., octocat): ');
    inputs.codecovToken = await askQuestion('8. Enter your Codecov token (optional, leave blank if not using): ');

    rl.close(); // Close the readline interface after all questions are asked
    return inputs;
}

/**
 * Processes each file, replacing placeholders with user inputs.
 * @param {Object} inputs An object containing all user inputs.
 */
async function processFiles(inputs) {
    for (const file of filesToModify) {
        const filePath = path.join(process.cwd(), file); // Assumes script is run from repo root
        console.log(`\nProcessing ${file}...`);

        try {
            let content = fs.readFileSync(filePath, 'utf8');

            // --- Generic Replacements (order matters if placeholders overlap) ---
            content = content.replace(new RegExp('{{PROJECT_NAME}}', 'g'), inputs.projectName);
            content = content.replace(new RegExp('{{PROJECT_DESCRIPTION}}', 'g'), inputs.projectDescription);
            content = content.replace(new RegExp('{{AUTHOR_NAME}}', 'g'), inputs.authorName);
            content = content.replace(new RegExp('{{CONTACT_EMAIL}}', 'g'), inputs.contactEmail);
            content = content.replace(new RegExp('{{LICENSE_YEAR}}', 'g'), inputs.licenseYear);
            content = content.replace(new RegExp('{{GITHUB_USERNAME}}', 'g'), inputs.githubUsername);
            // Handle optional Codecov token
            content = content.replace(new RegExp('{{CODECOV_TOKEN}}', 'g'), inputs.codecovToken || '');


            // --- Specific handling for project.json ---
            if (file === 'project.json') {
                let projectJson = JSON.parse(content);

                // Update specific fields that might have been generically replaced but need JSON structure
                projectJson.name = inputs.projectName;
                projectJson.description = inputs.projectDescription;
                projectJson.author = inputs.authorName;

                // Handle keywords array: convert comma-separated string to array
                if (inputs.projectKeywords) {
                    projectJson.keywords = inputs.projectKeywords.split(',').map(kw => kw.trim()).filter(kw => kw.length > 0);
                } else {
                    projectJson.keywords = []; // Set to empty array if no keywords provided
                }

                content = JSON.stringify(projectJson, null, 2); // Pretty print JSON with 2 spaces
            }

            // --- Specific handling for README.md ---
            if (file === 'README.md') {
                // Correct the LICENSE link from LICENSE.md to LICENSE
                content = content.replace(/\[LICENSE\]\(LICENSE\.md\)/g, '[LICENSE](LICENSE)');

                // Update the 'Post-Template Setup' section
                // This regex captures the section content up to the next '##' heading or end of file
                const postTemplateSetupRegex = /(## Post-Template Setup[\s\S]*?)(?=##|$)/;
                const newPostTemplateSetupContent = `## Post-Template Setup\n\nAfter creating your repository from this template, you've successfully run this setup script to personalize your project. You're ready to start building!\n\n*(This section was updated by the setup script.)*`;

                if (content.match(postTemplateSetupRegex)) {
                    content = content.replace(postTemplateSetupRegex, newPostTemplateSetupContent);
                } else {
                    // If the section isn't found (e.g., file was heavily modified), append it
                    console.warn('Warning: "Post-Template Setup" section not found in README.md. Appending new content.');
                    content += `\n${newPostTemplateSetupContent}`;
                }
            }

            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Successfully updated ${file}.`);

        } catch (error) {
            console.error(`Error processing ${file}: ${error.message}`);
            if (file === 'project.json' && error instanceof SyntaxError) {
                console.error('Make sure project.json is valid JSON before running the script.');
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
        process.exit(1); // Exit with an error code
    } finally {
        if (!rl.closed) {
            rl.close(); // Ensure readline interface is closed even on error
        }
    }
}

// Execute the setup script
runSetup();
