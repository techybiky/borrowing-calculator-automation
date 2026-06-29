# Setup Instructions

This document provides step-by-step instructions for setting up this project locally and on GitHub.

## Local Setup

### Prerequisites

Ensure you have the following installed:

- **Git** - [Download](https://git-scm.com/)
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

Verify installation:
```bash
node --version
npm --version
git --version
```

### Step 1: Clone the Repository

```bash
git clone <your-github-repository-url>
cd borrowing-calculator-tests
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Install Browser

```bash
npx playwright install chromium
```

This downloads the Chromium browser required for tests. You can also install Firefox or WebKit:

```bash
# Install all browsers
npx playwright install

# Or install specific browsers
npx playwright install firefox webkit
```

### Step 4: Run Tests

Basic test run:
```bash
npm test
```

Run with HTML report:
```bash
npm run test:html
```

Run in headed mode (see browser):
```bash
npm run test:headed
```

### Step 5: View Reports

After running tests, view the reports:

**HTML Report**:
```bash
# Windows
start reports/report.html

# macOS
open reports/report.html

# Linux
xdg-open reports/report.html
```

**JSON Report**: Open `reports/results.json`

**XML Report**: Open `reports/results.xml`

## GitHub Setup

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click **New Repository** (top right corner)
3. Repository name: `borrowing-calculator-tests` (or your preferred name)
4. Description: "Automated UI tests for borrowing calculator using Cucumber and Playwright"
5. Choose visibility: **Public** (recommended for sharing)
6. Click **Create Repository**

### Step 2: Initialize Local Repository

If you don't have the code locally yet:

```bash
# Create a new directory
mkdir borrowing-calculator-tests
cd borrowing-calculator-tests

# Initialize git
git init

# Add GitHub remote
git remote add origin https://github.com/<your-username>/borrowing-calculator-tests.git
```

If you already cloned:
```bash
cd borrowing-calculator-tests
```

### Step 3: Commit and Push Code

```bash
# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Add Cucumber and Playwright test suite"

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Setup GitHub Actions

GitHub Actions is already configured in `.github/workflows/test.yml`. 

To verify it's set up:

1. Go to your GitHub repository
2. Click on **Actions** tab
3. You should see the "Borrowing Calculator Tests" workflow
4. Tests will run automatically on:
   - Push to `main` or `develop` branches
   - Pull requests to `main` branch
   - Daily at 2 AM UTC

### Step 5: Configure Branch Protection (Optional)

Add protection to ensure tests pass before merging:

1. Go to Repository **Settings** → **Branches**
2. Click **Add rule**
3. Branch name pattern: `main`
4. Check **Require a pull request before merging**
5. Check **Require status checks to pass before merging**
6. Select the test workflow under "Status checks"
7. Click **Create**

## Continuous Integration & Deployment

### GitHub Actions

The workflow runs tests on every push and PR. View results:

1. Go to **Actions** tab in GitHub
2. Click on a workflow run
3. Click on the **test** job to see logs
4. Artifacts (reports) are available for download

### Manual Workflow Trigger

To manually trigger tests:

1. Go to **Actions** tab
2. Click **Borrowing Calculator Tests**
3. Click **Run workflow**
4. Select branch and click **Run workflow**

### Using Test Reports

GitHub Actions automatically:
- Uploads test reports to artifacts
- Comments on PRs with test summary (if configured)
- Fails the workflow if tests fail

## Environment-Specific Setup

### GitHub Actions Environment Variables

To add environment variables for different environments:

1. Go to Repository **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add any required secrets (API keys, credentials, etc.)

Example:
```bash
# In your workflow or test code
const apiKey = process.env.API_KEY;
```

### Local Environment Variables

Create a `.env` file in the project root:

```bash
# .env
HEADED=false
TIMEOUT=30000
```

Load in Node.js:
```javascript
require('dotenv').config();
const headed = process.env.HEADED === 'true';
```

## Testing Different Environments

### Test Against Different URLs

Edit `features/support/browser.js` or use environment variables:

```javascript
const baseUrl = process.env.TEST_URL || 'https://www.anz.com.au/...';
await page.goto(baseUrl);
```

Run with custom URL:
```bash
TEST_URL=http://localhost:3000 npm test
```

### Parallel Execution

Configure in `cucumber.js`:

```javascript
module.exports = {
  // ... other config
  parallel: 2  // Run 2 scenarios in parallel
};
```

## Troubleshooting

### npm install fails

Try clearing cache:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Playwright browser issues

Reinstall browsers:
```bash
npx playwright install --with-deps
```

### Tests timeout

Increase timeout in `cucumber.js`:
```javascript
timeout: 60000  // 60 seconds
```

### Permission denied when pushing

Configure Git credentials:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

For HTTPS:
```bash
git config --global credential.helper store
```

For SSH:
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
# Add public key to GitHub Settings → SSH Keys
```

## Next Steps

1. **Extend tests** - Add more scenarios in `features/calculator.feature`
2. **Add more test files** - Create new `.feature` files in `features/`
3. **Setup monitoring** - Configure email/Slack notifications
4. **Document results** - Add test reports to README
5. **Team collaboration** - Invite collaborators to GitHub repository

## Additional Resources

- [GitHub Documentation](https://docs.github.com)
- [GitHub Actions Guide](https://docs.github.com/en/actions)
- [Git Basics](https://git-scm.com/book/en/v2)
- [Cucumber.js Docs](https://github.com/cucumber/cucumber-js)
- [Playwright Docs](https://playwright.dev)

---

For questions or issues, create an issue in the GitHub repository.
