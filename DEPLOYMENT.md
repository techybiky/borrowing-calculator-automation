# Deployment Guide: GitHub Setup

This guide provides instructions for deploying the borrowing calculator test suite to GitHub and making it publicly available.

## Quick Start (5 minutes)

### 1. Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and log in
2. Click **+** icon (top right) → **New repository**
3. Fill in details:
   - **Repository name**: `borrowing-calculator-tests`
   - **Description**: "Automated UI tests for borrowing power calculator using Cucumber and Playwright"
   - **Visibility**: Select **Public**
   - **Add .gitignore**: Select **Node**
   - **License**: Select **MIT License**
4. Click **Create repository**

### 2. Connect Local Repository to GitHub

```bash
# Navigate to project directory
cd borrowing-calculator-tests

# Initialize git (if not done)
git init

# Add GitHub remote
git remote add origin https://github.com/<YOUR_USERNAME>/borrowing-calculator-tests.git

# Rename branch to main
git branch -M main

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Borrowing calculator test suite with Cucumber and Playwright"

# Push to GitHub
git push -u origin main
```

Replace `<YOUR_USERNAME>` with your actual GitHub username.

### 3. Verify GitHub Actions Setup

1. Go to your repository on GitHub
2. Click **Actions** tab
3. You should see **Borrowing Calculator Tests** workflow
4. Tests will run automatically on:
   - Every push to `main` branch
   - Every pull request to `main` branch
   - Daily at 2 AM UTC

## Repository Structure on GitHub

After pushing, your repository will have:

```
borrowing-calculator-tests/
├── .github/
│   └── workflows/
│       └── test.yml              # GitHub Actions workflow
├── features/
│   ├── calculator.feature        # Gherkin test scenarios
│   ├── step_definitions/
│   │   └── calculator.js         # Step implementations
│   └── support/
│       ├── browser.js            # Browser management
│       └── helpers.js            # Test helpers
├── scripts/
│   └── generate-html-report.js   # Report generator
├── .gitignore
├── CONTRIBUTING.md               # Contribution guidelines
├── cucumber.js                   # Cucumber config
├── LICENSE                       # MIT License
├── package.json                  # Dependencies
├── package-lock.json
├── playwright.config.js          # Playwright config
├── README.md                     # Main documentation
├── SETUP.md                      # Setup instructions
└── DEPLOYMENT.md                 # This file
```

## GitHub Actions Workflow

### What Runs Automatically

The workflow defined in `.github/workflows/test.yml` will:

1. **Trigger on**:
   - Push to `main` or `develop` branches
   - Pull requests to `main` branch
   - Schedule: Daily at 2 AM UTC

2. **Execute**:
   - Run on Ubuntu (latest)
   - Test with Node.js 18.x and 20.x
   - Install dependencies
   - Install Playwright
   - Run test suite
   - Generate HTML report
   - Upload artifacts

3. **Report**:
   - Show test results in workflow
   - Comment on PRs with summary
   - Upload reports as artifacts (30 day retention)
   - Publish JUnit test results

### Viewing Test Results

**In GitHub Actions Dashboard**:
1. Click **Actions** tab in your repository
2. Click the most recent workflow run
3. Click the **test** job
4. View logs and step execution

**Download Test Reports**:
1. Click the workflow run
2. Scroll to **Artifacts**
3. Download `test-results-<version>` (contains JSON, XML, HTML reports)

**View HTML Report**:
1. Download artifacts
2. Extract ZIP
3. Open `report.html` in browser

## Branch Protection Rules (Optional but Recommended)

Enforce tests must pass before merging:

1. Go to Repository **Settings** → **Branches**
2. Click **Add rule**
3. Configure:
   - **Branch name pattern**: `main`
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
   - Select test workflow from status checks
   - ✅ **Require branches to be up to date before merging**
4. Click **Create**

Now PRs must have:
- Tests passing
- Pull request review
- Up-to-date branch

## Adding Collaborators

To allow others to contribute:

1. Go to Repository **Settings** → **Collaborators**
2. Click **Add people**
3. Search for GitHub username
4. Select role:
   - **Pull request reviewers**: Review only
   - **Maintainers**: Full access
   - **Developers**: Push permission
5. Send invitation

## Secrets & Environment Variables

For sensitive data (API keys, tokens):

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add:
   - **Name**: `API_KEY`
   - **Value**: Your actual API key
4. Use in workflow:
   ```yaml
   env:
     API_KEY: ${{ secrets.API_KEY }}
   ```

## Monitoring & Notifications

### Email Notifications

GitHub sends emails for:
- Workflow failures
- @mentions in comments
- PR reviews

Configure in **Settings** → **Notifications**

### Slack Integration

Add Slack notifications:

1. Install [GitHub Slack Integration](https://slack.com/apps/A01BP7V4KJ7-github)
2. In Slack: `/github subscribe owner/repo`
3. Configure notifications:
   ```
   /github subscribe owner/repo workflow_jobs
   ```

### Status Badge

Add to README:

```markdown
[![Tests](https://github.com/<USERNAME>/borrowing-calculator-tests/actions/workflows/test.yml/badge.svg)](https://github.com/<USERNAME>/borrowing-calculator-tests/actions/workflows/test.yml)
```

## Sharing Your Repository

### As a Public Project

Your repository is now publicly visible and can be:

1. **Discovered** on GitHub
2. **Forked** by others
3. **Referenced** in documentation
4. **Integrated** via GitHub API

### Make It More Discoverable

Add to GitHub:
- **Topics** (Settings → About)
  - `test-automation`
  - `cucumber`
  - `playwright`
  - `bdd`
- **GitHub Discussion** (Settings → Features)
- **Releases** (Create tags for versions)

### Social Sharing

Share your repository:
- LinkedIn
- Twitter
- Dev.to
- GitHub Trending

Example post:
```
🧪 Just published: Automated UI tests for a borrowing power calculator
using Cucumber (BDD) and Playwright. Includes full CI/CD setup with 
GitHub Actions, HTML reporting, and more!

📦 github.com/username/borrowing-calculator-tests
⭐ If helpful, please star!
```

## Maintenance

### Regular Updates

1. **Dependencies**: Update monthly
   ```bash
   npm update
   npm audit
   ```

2. **Documentation**: Keep README current

3. **Tests**: Add new scenarios as features evolve

### Sample Update Workflow

```bash
# Create branch
git checkout -b chore/update-dependencies

# Update packages
npm update

# Test locally
npm test

# Commit and push
git add package.json package-lock.json
git commit -m "chore: update dependencies"
git push origin chore/update-dependencies

# Create PR on GitHub
# Wait for tests to pass
# Merge PR
```

## Troubleshooting GitHub Deployment

### Tests Failing in GitHub Actions

1. Check **Actions** → Workflow Run → **test** job
2. Look for error messages in logs
3. Compare to local test run
4. Common issues:
   - Different Node.js version
   - Network differences
   - Missing environment variables

### Files Not Pushing

Check `.gitignore` and ensure you want to push:
```bash
git status  # See what's staged
git add .
git push
```

### Branch Protection Blocking Merges

Ensure:
- ✅ Tests passing
- ✅ PR created and reviewed
- ✅ No unresolved conversations

### Repository Settings Issues

Reset to defaults:
1. **Settings** → **Code and automation** → **Actions** → **General**
2. Ensure **Actions permissions** set to **Allow all actions**
3. Ensure **Workflow permissions** set to **Read and write**

## Next Steps

1. ✅ Repository created and pushed
2. ✅ GitHub Actions running
3. 🎯 **Next**: 
   - Add topics and badges
   - Configure notifications
   - Share with team
   - Set up branch protection
   - Start contributing!

## Resources

- [GitHub Docs](https://docs.github.com)
- [GitHub Actions](https://docs.github.com/en/actions)
- [GitHub CLI](https://cli.github.com/) - Manage from terminal
- [Git Tutorial](https://git-scm.com/book) - Learn Git

---

Your borrowing calculator test suite is now ready for collaboration! 🚀
