# Push to GitHub - Step-by-Step

This guide will take you through pushing the borrowing calculator test suite to GitHub in **5 minutes**.

## Prerequisites

- ✅ GitHub account created
- ✅ Git installed on your computer
- ✅ Project ready (you have all files)

## Step 1: Create GitHub Repository (2 min)

1. Go to **[GitHub.com](https://github.com)**
2. Click **+** icon (top right corner) → **New repository**
3. Fill in the form:

   ```
   Repository name: borrowing-calculator-tests
   Description: Automated UI tests for borrowing power calculator 
                using Cucumber and Playwright
   Visibility: ● Public (everyone can see)
   Add .gitignore: ✓ Select Node
   Add a license: ✓ Select MIT License
   ```

4. Click **Create repository** (green button)
5. You'll see a page with commands - keep it open!

## Step 2: Configure Local Git (1 min)

Open PowerShell and run:

```powershell
# Configure git with your GitHub username and email
git config --global user.name "Your GitHub Username"
git config --global user.email "your.email@github.com"
```

Replace with your actual GitHub username and email address.

## Step 3: Connect Project to GitHub (2 min)

In PowerShell, run these commands:

```powershell
# Navigate to project folder
cd c:\Users\bikra\anzFrontEndTesting

# Initialize git (if not already done)
git init

# Add remote repository (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/borrowing-calculator-tests.git

# Verify remote was added
git remote -v
```

You should see:
```
origin  https://github.com/USERNAME/borrowing-calculator-tests.git (fetch)
origin  https://github.com/USERNAME/borrowing-calculator-tests.git (push)
```

## Step 4: Commit and Push (1 min)

```powershell
# Change to main branch
git branch -M main

# Add all files
git add .

# Commit
git commit -m "Initial commit: Borrowing calculator test suite with Cucumber and Playwright"

# Push to GitHub
git push -u origin main
```

The `-u` flag sets up tracking, so future `git push` commands are simpler.

You may be prompted for authentication:
- **HTTPS**: Enter GitHub username and personal access token
- **SSH**: If configured, no prompt needed

## Step 5: Verify on GitHub (1 min)

1. Go to **https://github.com/USERNAME/borrowing-calculator-tests**
2. Refresh the page
3. You should see all your files!
4. Click **Actions** tab
5. You should see "Borrowing Calculator Tests" workflow

## Troubleshooting Push Issues

### Issue: "fatal: not a git repository"

**Solution**: Make sure you're in the correct directory
```powershell
cd c:\Users\bikra\anzFrontEndTesting
git status  # Should show success
```

### Issue: "Authentication failed"

**Solutions**:
1. **For HTTPS**: Create personal access token
   - GitHub → Settings → Developer settings → Personal access tokens
   - Use token instead of password

2. **For SSH**: Setup SSH key
   ```powershell
   ssh-keygen -t ed25519 -C "your.email@github.com"
   # Add public key to GitHub Settings → SSH and GPG keys
   ```

### Issue: "Permission denied"

Make sure:
- You own the repository
- Your GitHub account has permissions
- You used correct username

### Issue: "Remote origin already exists"

```powershell
# Check existing remote
git remote -v

# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/USERNAME/borrowing-calculator-tests.git
```

## After Pushing - What Happens

### GitHub Actions Runs Automatically! 🎉

1. **Tests Start**: Within 30 seconds of push
2. **Install Dependencies**: npm install (10-15 seconds)
3. **Install Browser**: Playwright setup (30-60 seconds)
4. **Run Tests**: Execute your test suite (30-45 seconds)
5. **Generate Reports**: Create HTML and XML (5 seconds)
6. **Upload Artifacts**: Save reports (5 seconds)

Total time: **~2-3 minutes**

### View Results

1. Go to your GitHub repository
2. Click **Actions** tab
3. Click latest workflow run
4. Click **test** job
5. View logs and download artifacts

## GitHub Actions Dashboard

The `.github/workflows/test.yml` file automatically:
- ✅ Runs on every push
- ✅ Runs on every pull request
- ✅ Runs daily at 2 AM
- ✅ Tests with Node.js 18.x AND 20.x
- ✅ Uploads test reports
- ✅ Comments on PRs with results

## Optional: Setup Branch Protection

This ensures tests pass before merging:

1. Go to **Settings** → **Branches**
2. Click **Add rule**
3. Branch name: `main`
4. Check these boxes:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
5. Click **Create**

## Optional: Setup Slack Notifications

Get test results in Slack:

1. Install GitHub Slack app
2. In Slack, run: `/github subscribe owner/repo workflow_jobs`
3. You'll get notifications for test results!

## Make Your Repository Public (Optional)

Share on social media:

```
🧪 Just published an automated test suite for a borrowing power calculator!
Built with Cucumber (BDD) and Playwright. Includes GitHub Actions CI/CD 
and professional reporting.

⭐ Check it out: github.com/YOUR_USERNAME/borrowing-calculator-tests
```

## Verify Everything Works

Once pushed, verify:

- [ ] Repository visible on GitHub
- [ ] All files present
- [ ] **Actions** tab shows workflow
- [ ] Tests completed (check status)
- [ ] Reports uploaded to artifacts

## Common Next Steps

### 1. Add Collaborators
```
Settings → Collaborators → Add people
```

### 2. Update README with Badge
Add to top of README:
```markdown
[![Tests](https://github.com/USERNAME/borrowing-calculator-tests/actions/workflows/test.yml/badge.svg)](https://github.com/USERNAME/borrowing-calculator-tests/actions)
```

### 3. Add Topics
```
Repository home → ⚙️ Settings → About
Add: test-automation, cucumber, playwright, bdd
```

### 4. Enable Discussions
```
Settings → Discussions → Enable
```

## Git Commands Reference

```powershell
# See current status
git status

# See commit history
git log --oneline

# Make changes
git add .
git commit -m "description"
git push

# Create new branch
git checkout -b feature/my-feature

# Switch branches
git checkout main
git checkout feature/my-feature

# Delete branch
git branch -d feature/my-feature
```

## Daily Workflow (Once Setup)

After initial push, for future changes:

```powershell
# Make your changes
# ... edit files ...

# Stage and commit
git add .
git commit -m "feat: add new test scenario"

# Push
git push

# Tests run automatically on GitHub! ✅
```

## Success! 🎉

Your project is now:
- ✅ On GitHub for the world to see
- ✅ Running tests automatically
- ✅ Generating professional reports
- ✅ Ready for team collaboration
- ✅ Following CI/CD best practices

## Need Help?

Check these documents:
- `README.md` - Main documentation
- `SETUP.md` - Detailed setup guide
- `DEPLOYMENT.md` - GitHub advanced setup
- `CONTRIBUTING.md` - Contributing guidelines
- `QUICK_REFERENCE.md` - Commands reference

---

**Questions?** Open an issue in your GitHub repository or check GitHub documentation.

**All set!** Your borrowing calculator test suite is now live on GitHub 🚀
