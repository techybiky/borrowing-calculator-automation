# Contributing Guide

Thank you for interest in contributing to the Borrowing Calculator Tests project! This document outlines guidelines for contributions.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a feature branch (`git checkout -b feature/your-feature`)
4. Follow the development guidelines below
5. Submit a pull request

## Development Guidelines

### Code Style

- Use consistent formatting (see `.editorconfig` if present)
- Comment complex logic
- Use descriptive variable names
- Keep functions focused and single-purpose

### Writing Tests

Follow BDD principles:

1. **Feature Files** (`features/*.feature`)
   - Use Gherkin syntax
   - Write from user perspective
   - Include both happy path and edge cases
   - Example:
     ```gherkin
     Scenario: User can calculate borrowing power
       Given I navigate to the calculator
       When I enter valid data
       Then the result should be displayed
     ```

2. **Step Definitions** (`features/step_definitions/*.js`)
   - Implement steps matching feature files
   - Use meaningful error messages
   - Handle edge cases
   - Example:
     ```javascript
     Given('I navigate to the calculator', async function() {
       await page.goto(calculatorUrl);
     });
     ```

3. **Helper Functions** (`features/support/*.js`)
   - Extract reusable logic
   - Document parameters and return values
   - Keep helpers focused

### Adding New Scenarios

1. Edit `features/calculator.feature` or create new `.feature` file
2. Write scenario in Gherkin:
   ```gherkin
   Scenario: New test case
     Given prerequisite
     When action
     Then assertion
   ```
3. Implement step definitions in `features/step_definitions/calculator.js`
4. Run tests: `npm test`
5. Verify reports: Check `reports/report.html`

### Adding New Test Files

Create new feature file:
```bash
touch features/new-feature.feature
```

Create corresponding steps:
```bash
touch features/step_definitions/new-feature.js
```

Example structure:
```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const { getPage } = require('../support/browser');

let page;

Given('my precondition', async function() {
  page = await getPage();
  // Setup code
});
```

## Testing Locally

### Run All Tests
```bash
npm test
```

### Run Specific Feature
```bash
npx cucumber-js features/calculator.feature
```

### Run with Debugging
```bash
npm run test:debug
```

### Run with Visible Browser
```bash
npm run test:headed
```

### Generate Reports
```bash
npm run test:html
```

## Commit Messages

Follow conventional commits:

```
type(scope): subject

body

footer
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `test`: Test additions/changes
- `refactor`: Code refactoring
- `style`: Formatting changes
- `chore`: Build, dependencies, etc.

Examples:
```
feat(calculator): add income validation test
fix(steps): correct selector for start over button
docs(readme): add installation instructions
test(calculator): add edge case for negative values
```

## Pull Request Process

1. **Before Submitting**:
   - Run all tests: `npm test`
   - Check reports: `npm run test:html`
   - Ensure no console errors
   - Update README if needed

2. **Create Pull Request**:
   - Clear title describing changes
   - Reference related issues (#123)
   - Include summary of changes
   - Link to test results if relevant

3. **PR Template Example**:
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] New feature
   - [ ] Bug fix
   - [ ] Test improvement
   - [ ] Documentation

   ## Testing
   - [ ] Tests pass locally
   - [ ] HTML report generated
   - [ ] No new warnings

   ## Changes Made
   - List specific changes
   - References to related code

   Fixes #123
   ```

4. **Review Process**:
   - Wait for automated tests to pass
   - Respond to reviewer comments
   - Make requested changes
   - Request re-review if needed

## Reporting Issues

When reporting issues:

1. **Title**: Clear, descriptive title
2. **Description**: What happened, what expected
3. **Steps to Reproduce**: Exact steps to recreate
4. **Environment**: 
   - Node.js version
   - OS (Windows/macOS/Linux)
   - Browser version
5. **Logs**: Include error messages, screenshots, etc.

### Issue Template
```markdown
**Describe the bug**
Clear description of the issue

**To Reproduce**
Steps to reproduce the behavior:
1. ...
2. ...

**Expected behavior**
What should happen

**Environment**
- Node.js: 18.x
- OS: Windows 10
- Browser: Chromium

**Screenshots**
If applicable, add screenshots

**Additional context**
Any other context
```

## Code Review Checklist

When reviewing code, check:

- [ ] Tests are clear and follow BDD
- [ ] Code is readable and well-commented
- [ ] No console errors or warnings
- [ ] All tests pass
- [ ] Reports are generated successfully
- [ ] Commits messages are clear
- [ ] Documentation is updated

## Best Practices

### Selectors
- Prefer data attributes: `[data-testid="element"]`
- Fallback to stable selectors
- Avoid brittle selectors that might break

### Waits
- Use explicit waits for elements
- Wait for meaningful state, not just time
- Reasonable timeout values (5-10 seconds)

### Error Handling
- Provide descriptive error messages
- Include context in error logs
- Fail gracefully

### Test Isolation
- Each test should be independent
- Setup and teardown properly
- Clean up state after tests

## Performance

- Keep tests focused and fast
- Avoid unnecessary waits
- Parallel execution where possible
- Monitor test execution time

## Documentation

Update documentation when:
- Adding new features
- Changing existing behavior
- Adding new configuration options
- Updating dependencies

Files to update:
- `README.md` - Main documentation
- `SETUP.md` - Setup and deployment
- Feature files - Clear scenario descriptions
- Code comments - Explain complex logic

## Questions?

- Check existing issues/discussions
- Read project documentation
- Ask in pull request comments
- Create a discussion for questions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
