# Borrowing Power Calculator - Automated Test Suite

Automated UI testing suite for the borrowing power calculator using **Cucumber (BDD)** and **Playwright**. This project provides comprehensive test coverage with HTML and XML reporting capabilities.

## Overview

This test automation project validates the borrowing power calculator functionality with a focus on:
- **Form validation** - Ensuring all input fields work correctly
- **Calculation accuracy** - Verifying borrowing amount calculations
- **Form reset** - Testing the "Start over" functionality
- **User interactions** - Simulating real user workflows

## Features

✅ **Cucumber/Gherkin BDD Framework** - Human-readable test scenarios  
✅ **Playwright Browser Automation** - Fast, reliable cross-browser testing  
✅ **Multiple Output Formats** - JSON, XML, NDJSON reports  
✅ **HTML Report Generation** - Beautiful, detailed test reports  
✅ **CLI Support** - Run tests from command line for CI/CD integration  
✅ **Headless & Headed Modes** - Run in headless or visual mode  

## Prerequisites

- **Node.js** 16.x or higher
- **npm** 8.x or higher
- **Chrome/Chromium** browser (Playwright manages this automatically)

## Installation

1. **Clone or download this repository**
   ```bash
   git clone <repository-url>
   cd borrowing-calculator-tests
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

   This will install:
   - `@cucumber/cucumber` - BDD testing framework
   - `@playwright/test` - Browser automation library
   - `playwright` - Chromium browser binaries

## Project Structure

```
borrowing-calculator-tests/
├── features/
│   ├── calculator.feature          # Gherkin test scenarios
│   ├── step_definitions/
│   │   └── calculator.js          # Step implementation
│   └── support/
│       ├── browser.js             # Browser management
│       └── helpers.js             # Test helper functions
├── scripts/
│   └── generate-html-report.js    # HTML report generator
├── reports/
│   ├── results.json               # JSON test results
│   ├── results.xml                # XML test results
│   ├── results.ndjson             # NDJSON test results
│   └── report.html                # HTML test report
├── cucumber.js                     # Cucumber configuration
├── playwright.config.js            # Playwright configuration
├── package.json                    # Project dependencies
└── README.md                       # This file
```

## Running Tests

### Standard Test Run
Run all tests and generate reports:
```bash
npm test
```

### Generate HTML Reports Only
```bash
npm run test:html
```

### Run Tests in Headed Mode (with browser visible)
```bash
npm run test:headed
```

### Debug Mode
```bash
npm run test:debug
```

### CI/CD Mode
```bash
npm run test:ci
```

## Test Scenarios

### Scenario 1: Calculate Borrowing Power
Tests the core functionality of the calculator:
- Selects "Single" application type
- Selects "0" dependants
- Selects "Home to live in" property type
- Enters annual income of $120,000
- Enters other income as $0
- Enters monthly living expenses
- Enters loan repayment information
- Enters credit card limits
- Clicks "Work out how much I could borrow"
- Verifies a borrowing amount is calculated and displayed

**Expected Result**: Calculator displays a borrowing amount greater than $0

### Scenario 2: Validate Form Clear on Reset
Tests the "Start over" functionality:
- Fills the entire form with sample data
- Calculates borrowing power
- Clicks "Start over" button
- Verifies all form fields are cleared
- Verifies the form returns to initial state

**Expected Result**: All form fields are cleared and calculator ready for new input

## Output Reports

### JSON Report
Located at: `reports/results.json`

Contains detailed test execution data in JSON format, including:
- Feature names and descriptions
- Scenario details
- Step definitions and execution status
- Timing information
- Error messages (if any)

Example:
```json
[
  {
    "name": "Borrowing Power Calculator",
    "elements": [
      {
        "name": "Calculate borrowing power for a single applicant",
        "steps": [
          {
            "keyword": "Given",
            "name": "I navigate to the borrowing power calculator",
            "result": {
              "status": "passed",
              "duration": 2500000000
            }
          }
        ]
      }
    ]
  }
]
```

### XML Report
Located at: `reports/results.xml`

JUnit-formatted XML report suitable for CI/CD pipeline integration and test dashboards.

### HTML Report
Located at: `reports/report.html`

Beautiful, interactive HTML report with:
- Summary statistics (total, passed, failed scenarios)
- Pass/failure rate visualization
- Detailed scenario and step information
- Error messages and stack traces
- Mobile-friendly responsive design

**To view the HTML report**:
```bash
# Open in default browser
open reports/report.html              # macOS
start reports/report.html             # Windows
xdg-open reports/report.html          # Linux
```

## Configuration Files

### cucumber.js
Configures Cucumber test runner:
- Test file patterns
- Reporter formats
- Formatter options
- Step definitions path

### playwright.config.js
Configures Playwright browser automation:
- Browser type and launch options
- Viewport size
- Screenshot/video capture on failure
- Test timeouts
- Base URL for the calculator

Modify these files to change test behavior, add new reporters, or adjust browser settings.

## Environment Variables

### HEADED
Set to `true` to run tests with visible browser window:
```bash
HEADED=true npm test
```

Default: `false` (headless mode)

## Troubleshooting

### Tests Timeout
If tests time out, increase the timeout in `cucumber.js`:
```javascript
timeout: 60000 // milliseconds
```

### Playwright Binary Issues
If Playwright fails to find Chromium:
```bash
npx playwright install chromium
```

### Memory Issues
Reduce concurrency in `cucumber.js`:
```javascript
workers: 1 // Run tests sequentially
```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Test Calculator
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test:ci
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: reports
          path: reports/
```

### Azure Pipelines Example
```yaml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '18.x'
  
  - script: npm install
    displayName: 'Install dependencies'
  
  - script: npm run test:ci
    displayName: 'Run tests'
  
  - task: PublishBuildArtifacts@1
    condition: always()
    inputs:
      pathToPublish: 'reports'
      artifactName: 'test-reports'
```

## Performance Tips

1. **Use Headless Mode** (default) - Faster execution
2. **Parallel Execution** - Configure workers in cucumber.js
3. **Selective Testing** - Run specific feature files:
   ```bash
   npx cucumber-js features/calculator.feature
   ```
4. **Network Optimization** - Tests wait for network idle; adjust if needed

## Extending the Test Suite

### Add a New Test Scenario

1. **Edit `features/calculator.feature`**
   ```gherkin
   Scenario: New test scenario
     Given I navigate to the borrowing power calculator
     When I do something
     Then something should happen
   ```

2. **Implement Step Definitions in `features/step_definitions/calculator.js`**
   ```javascript
   When('I do something', async function() {
     // Implementation
   });

   Then('something should happen', async function() {
     // Assertion
   });
   ```

3. **Run tests**
   ```bash
   npm test
   ```

### Add Custom Selectors

Update `features/support/helpers.js` with your selectors:
```javascript
const getCustomSelector = (value) => {
  return `[data-testid="custom-${value}"]`;
};
```

## Known Limitations

- Tests run in Chromium only (can be extended to Firefox, Webkit)
- Real-time network lag not simulated
- Mobile viewport testing can be added for responsive testing

## Best Practices

1. **Descriptive Scenario Names** - Clearly state what is being tested
2. **Keep Steps Simple** - Each step should do one thing
3. **Use Data Tables** - For multiple test cases with data
4. **Proper Waits** - Use explicit waits for element availability
5. **Error Handling** - Capture and report errors clearly

## Support & Contribution

For issues, questions, or contributions:
1. Check existing issues in the repository
2. Create detailed bug reports with reproduction steps
3. Submit pull requests with test coverage

## License

MIT License - See LICENSE file for details

## Additional Resources

- [Cucumber.js Documentation](https://github.com/cucumber/cucumber-js)
- [Playwright Documentation](https://playwright.dev)
- [Gherkin Syntax Guide](https://cucumber.io/docs/gherkin/reference/)

---

**Last Updated**: 2026-06-27  
**Test Framework Version**: Cucumber 10.x, Playwright 1.45.x

Front End Testing Scenario

Our developers have finished coding a borrowing calculator and would like to make sure that the calculator continues to work as they make other changes to the page. They have asked you to build automated tests covering various use cases to verify that the calculator is working properly. They intend to run these tests as part of continuous testing.

The current working production page is here: https://www.anz.com.au/personal/home-loans/calculators-tools/borrowing-power-calculator/

Exercise

Develop the following two tests:

A person with the following details:
Single,
0 dependants,
buying a home to live in,
with income of $100,000,
other income $10,000,
living expenses $2000,
current home loan repayments $0,
other loan repayments $100,
other commitments $0
and total credit card limits $10,000
has a borrowing estimate of $494,000.
Clicking the ‘start over’ button clears the form
Implementation Requirements

You will need to create a project in either JavaScript or Java or any programming language you are comfortable with minimal dependencies
The project should use Cucumber (gherkin - BDD) with an open source UI test automation runtime of your choice (e.g. Cypress, Playwright, WebdriverIO)
The tests should target a browser of your choice (e.g. Chrome, Firefox)
The tests should run through Command Line Interface in order to support CI/CD
All tests should pass and produce new results every time they are run
The solution should output results to JSON or XML and be able to generate HTML reports from the output file.
Sharing Instructions

Please complete the solutions and share them via a public repository in GitHub. Please do not use ANZ Bank in any of the references. The repositories should contain clear instructions (README.md) on how to setup, tests and generate report as well as specify where to find results.

 