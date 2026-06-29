# Quick Reference Guide

## Essential Commands

### Installation
```bash
npm install                    # Install dependencies
npx playwright install chromium # Install browser
```

### Running Tests
```bash
npm test                       # Run all tests (headless)
npm run test:html             # Run tests + generate HTML report
npm run test:headed           # Run tests with visible browser
npm run test:debug            # Run with progress indicator
npm run test:ci               # CI/CD mode (all formats)
```

### Development
```bash
git status                    # Check git status
git add .                     # Stage changes
git commit -m "message"       # Commit changes
git push origin main          # Push to GitHub
```

## Directory Structure

```
borrowing-calculator-tests/
├── .github/
│   └── workflows/test.yml           # GitHub Actions automation
│
├── features/
│   ├── calculator.feature           # Test scenarios (Gherkin)
│   ├── step_definitions/
│   │   └── calculator.js            # Test code (JavaScript)
│   └── support/
│       ├── browser.js               # Browser management
│       └── helpers.js               # Utility functions
│
├── scripts/
│   └── generate-html-report.js      # Report generator
│
├── reports/                         # Generated test reports
│   ├── results.json                 # Raw results
│   ├── results.xml                  # JUnit format
│   └── report.html                  # Beautiful HTML report
│
├── node_modules/                    # Dependencies (auto-installed)
├── .gitignore                       # Git ignore rules
├── CONTRIBUTING.md                  # Contribution guide
├── cucumber.js                      # Cucumber config
├── LICENSE                          # MIT License
├── package.json                     # Project metadata + scripts
├── playwright.config.js             # Browser config
├── README.md                        # Main documentation
├── SETUP.md                         # Setup instructions
├── DEPLOYMENT.md                    # GitHub deployment guide
└── DEPLOYMENT.md                    # This reference guide
```

## Configuration Files

### `package.json`
- Dependencies: Cucumber, Playwright
- Scripts: test commands
- Metadata: name, version, etc.

### `cucumber.js`
- Test file patterns
- Reporting formats (JSON, XML, JUnit)
- Step definition locations

### `playwright.config.js`
- Browser settings (headless mode)
- Viewport size (1280×720)
- Screenshots/videos on failure
- Timeouts and base URL

## Test Scenarios

### Scenario 1: Calculate Borrowing Power
**File**: `features/calculator.feature` (lines 7-29)
**What it tests**: Core calculation functionality
**Expected result**: Borrowing amount > $0

### Scenario 2: Form Reset ("Start Over")
**File**: `features/calculator.feature` (lines 31-51)
**What it tests**: Form clearing functionality
**Expected result**: All fields empty, calculator reset

## Key Files for Extension

### Adding New Tests
1. Edit `features/calculator.feature` - Write scenario in Gherkin
2. Implement steps in `features/step_definitions/calculator.js`
3. Run tests: `npm test`

### Adding Helper Functions
1. Edit `features/support/helpers.js`
2. Add new utility function
3. Import in `calculator.js`

### Changing Selectors
1. Edit `features/support/helpers.js`
2. Update CSS selectors or XPath
3. Update corresponding steps if needed

## Typical Workflow

```bash
# 1. Start feature development
git checkout -b feature/new-test

# 2. Add test scenario
# Edit: features/calculator.feature

# 3. Implement steps
# Edit: features/step_definitions/calculator.js

# 4. Test locally
npm test

# 5. Generate report
npm run test:html

# 6. View report
start reports/report.html      # Windows
open reports/report.html       # macOS
xdg-open reports/report.html   # Linux

# 7. Commit and push
git add .
git commit -m "feat: add new test for X"
git push origin feature/new-test

# 8. Create PR on GitHub
# Wait for CI/CD to pass
# Request review
# Merge!
```

## Debugging Tips

| Issue | Solution |
|-------|----------|
| Tests timeout | ↑ timeout in `cucumber.js` |
| Selector not found | Inspect element, update selector |
| Browser not found | Run `npx playwright install` |
| Memory issues | Set `workers: 1` in `cucumber.js` |
| Network timeouts | Increase wait times in steps |

## Environment Variables

```bash
HEADED=true npm test          # Run with visible browser
TEST_URL=http://localhost npm test  # Custom URL
```

## CI/CD Pipeline Status

Check GitHub Actions:
1. Go to GitHub repository
2. Click **Actions** tab
3. View latest workflow run
4. Check logs for failures

## Report Files

| File | Format | Use |
|------|--------|-----|
| `results.json` | JSON | Machine-readable results |
| `results.xml` | JUnit XML | CI/CD integration |
| `results.ndjson` | NDJSON | Streaming format |
| `report.html` | HTML | Human-readable report |

## Common Commands by Role

### Developer
```bash
npm test
npm run test:headed
npm run test:debug
git push origin feature-branch
```

### QA/Tester
```bash
npm run test:html
# Open reports/report.html
npm run test:ci
```

### CI/CD Pipeline
```bash
npm install
npx playwright install chromium
npm run test:ci
# Reports uploaded to artifacts
```

### DevOps
```bash
# View GitHub Actions: github.com/org/repo/actions
# Configure secrets: Settings → Secrets
# Setup notifications: Settings → Notifications
# Review branch protection: Settings → Branches
```

## Helpful Links

- **Cucumber.js**: https://github.com/cucumber/cucumber-js
- **Playwright**: https://playwright.dev
- **Gherkin**: https://cucumber.io/docs/gherkin/
- **GitHub Actions**: https://docs.github.com/en/actions
- **Git**: https://git-scm.com/doc

## Performance Benchmarks

Typical execution times (full suite):

| Mode | Time | Notes |
|------|------|-------|
| Headless (default) | ~30-45s | Fastest |
| Headed (visible) | ~45-60s | Visual debugging |
| CI/CD (with overhead) | ~2-3m | Includes setup |

## License & Attribution

- **License**: MIT (see `LICENSE` file)
- **Framework**: Cucumber.js + Playwright
- **Node.js**: 16.x or higher
- **Browsers**: Chromium, Firefox, WebKit (Playwright)

## Need Help?

1. Check `README.md` for overview
2. Read `SETUP.md` for installation issues
3. See `CONTRIBUTING.md` for development
4. Review `DEPLOYMENT.md` for GitHub setup
5. Check GitHub Issues for reported problems

---

Last updated: 2026-06-27
