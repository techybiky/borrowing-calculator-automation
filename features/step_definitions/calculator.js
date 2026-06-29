// features/step_definitions/calculator.js
const { Given, When, Then, Before, After, DataTable } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { getPage, closeBrowser } = require('../support/browser');

let page;

Before(async function() {
  page = await getPage();
});

Given('I navigate to the borrowing power calculator', async function() {
  const url = 'https://www.anz.com.au/personal/home-loans/calculators-tools/borrowing-power-calculator/';
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000); // Wait for page to fully load
});

Given('the calculator form is loaded', async function() {
  // Wait for the form to be visible by checking for a key element
  await page.waitForSelector('button:has-text("Single")', { timeout: 10000 });
});

Given('I select {string} as the application type', async function(type) {
  const buttonText = type.trim();
  const selector = `button:has-text("${buttonText}")`;
  try {
    await page.click(selector);
    await page.waitForTimeout(500);
  } catch (error) {
    throw new Error(`Could not find application type button: ${buttonText}`);
  }
});

Given('I select {string} dependants', async function(count) {
  try {
    const selects = await page.$$('select');
    if (selects.length > 0) {
      await selects[0].selectOption(String(count));
      await page.waitForTimeout(300);
    }
  } catch (error) {
    throw new Error(`Could not select dependants: ${count}`);
  }
});

Given('I select {string} as the property type', async function(type) {
  const buttonText = type.trim();
  const selector = `button:has-text("${buttonText}")`;
  try {
    await page.click(selector);
    await page.waitForTimeout(500);
  } catch (error) {
    throw new Error(`Could not find property type button: ${buttonText}`);
  }
});

Given('I enter {string} as annual income', async function(income) {
  try {
    const inputs = await page.$$('input[type="text"], input[inputmode="numeric"]');
    if (inputs.length > 0) {
      await inputs[0].fill(String(income));
      await page.waitForTimeout(300);
    } else {
      throw new Error('No income input field found');
    }
  } catch (error) {
    throw new Error(`Could not enter annual income: ${income}`);
  }
});

Given('I enter {string} as other annual income', async function(income) {
  try {
    const inputs = await page.$$('input[type="text"], input[inputmode="numeric"]');
    if (inputs.length > 1) {
      await inputs[1].fill(String(income));
      await page.waitForTimeout(300);
    }
  } catch (error) {
    throw new Error(`Could not enter other annual income: ${income}`);
  }
});

Given('I enter {string} as monthly living expenses', async function(expenses) {
  try {
    const inputs = await page.$$('input[type="text"], input[inputmode="numeric"]');
    if (inputs.length > 2) {
      await inputs[2].fill(String(expenses));
      await page.waitForTimeout(300);
    }
  } catch (error) {
    throw new Error(`Could not enter monthly living expenses: ${expenses}`);
  }
});

Given('I enter {string} as current home loan monthly repayments', async function(amount) {
  try {
    const inputs = await page.$$('input[type="text"], input[inputmode="numeric"]');
    if (inputs.length > 3) {
      await inputs[3].fill(String(amount));
      await page.waitForTimeout(300);
    }
  } catch (error) {
    throw new Error(`Could not enter home loan repayments: ${amount}`);
  }
});

Given('I enter {string} as other loan monthly repayments', async function(amount) {
  try {
    const inputs = await page.$$('input[type="text"], input[inputmode="numeric"]');
    if (inputs.length > 4) {
      await inputs[4].fill(String(amount));
      await page.waitForTimeout(300);
    }
  } catch (error) {
    throw new Error(`Could not enter other loan repayments: ${amount}`);
  }
});

Given('I enter {string} as other monthly commitments', async function(amount) {
  try {
    const inputs = await page.$$('input[type="text"], input[inputmode="numeric"]');
    if (inputs.length > 5) {
      await inputs[5].fill(String(amount));
      await page.waitForTimeout(300);
    }
  } catch (error) {
    throw new Error(`Could not enter other monthly commitments: ${amount}`);
  }
});

Given('I enter {string} as total credit card limits', async function(amount) {
  try {
    const inputs = await page.$$('input[type="text"], input[inputmode="numeric"]');
    if (inputs.length > 6) {
      await inputs[6].fill(String(amount));
      await page.waitForTimeout(300);
    }
  } catch (error) {
    throw new Error(`Could not enter credit card limits: ${amount}`);
  }
});

Given('I have filled the form with sample data:', async function(dataTable) {
  const data = dataTable.rowsHash();

  try {
    // Set Application Type
    if (data['Application Type']) {
      const selector = `button:has-text("${data['Application Type'].trim()}")`;
      await page.click(selector);
      await page.waitForTimeout(500);
    }

    // Set Number of Dependants
    if (data['Number of Dependants']) {
      const selects = await page.$$('select');
      if (selects.length > 0) {
        await selects[0].selectOption(String(data['Number of Dependants']));
        await page.waitForTimeout(300);
      }
    }

    // Set Property Type
    if (data['Property Type']) {
      const selector = `button:has-text("${data['Property Type'].trim()}")`;
      await page.click(selector);
      await page.waitForTimeout(500);
    }

    // Fill numeric inputs
    const inputs = await page.$$('input[type="text"], input[inputmode="numeric"]');
    const fieldOrder = [
      'Annual Income',
      'Other Annual Income',
      'Monthly Living Expenses',
      'Home Loan Monthly Payments',
      'Other Loan Monthly Payments',
      'Other Monthly Commitments',
      'Total Credit Card Limits',
    ];

    for (let i = 0; i < fieldOrder.length && i < inputs.length; i++) {
      const fieldKey = fieldOrder[i];
      if (data[fieldKey]) {
        await inputs[i].fill(String(data[fieldKey]));
        await page.waitForTimeout(200);
      }
    }
  } catch (error) {
    throw new Error(`Error filling form: ${error.message}`);
  }
});

When('I click the {string} button', async function(buttonText) {
  try {
    // Try multiple selectors for flexibility
    const selectors = [
      `button:has-text("${buttonText}")`,
      `a:has-text("${buttonText}")`,
      `text=/.*${buttonText}.*/i`,
    ];

    let clicked = false;
    for (const selector of selectors) {
      try {
        await page.click(selector);
        clicked = true;
        break;
      } catch (e) {
        // Try next selector
      }
    }

    if (!clicked) {
      throw new Error(`Could not find button: ${buttonText}`);
    }

    // Wait for action to complete
    if (buttonText.includes('Work out')) {
      await page.waitForTimeout(3000); // Allow time for calculation
    } else if (buttonText.includes('Start over')) {
      await page.waitForTimeout(1500);
    } else {
      await page.waitForTimeout(1000);
    }
  } catch (error) {
    throw new Error(`Error clicking button "${buttonText}": ${error.message}`);
  }
});

Then('the borrowing amount should be displayed', async function() {
  try {
    // Wait for the result section to appear
    await page.waitForSelector('text=We estimate you could borrow:', { timeout: 5000 });
    const visible = await page.isVisible('text=We estimate you could borrow:');
    expect(visible).toBe(true);
  } catch (error) {
    throw new Error(`Borrowing amount not displayed: ${error.message}`);
  }
});

Then('the borrowing amount should be greater than {string}', async function(minAmount) {
  try {
    // Get the amount text
    const resultElement = await page.$('text=We estimate you could borrow:');
    if (!resultElement) {
      throw new Error('Could not find result element');
    }

    // Get the parent and find the amount value
    const amountText = await page.evaluate(() => {
      const element = Array.from(document.querySelectorAll('*'))
        .find(el => el.textContent.includes('We estimate you could borrow:'));
      
      if (element) {
        const siblings = element.parentElement.children;
        for (let sibling of siblings) {
          const text = sibling.textContent;
          if (text.match(/\$[\d,]+/)) {
            return text;
          }
        }
      }
      return '$0';
    });

    const parsedAmount = parseFloat(amountText.replace(/[^0-9.-]/g, '')) || 0;
    const minNum = parseFloat(minAmount);
    
    expect(parsedAmount).toBeGreaterThan(minNum);
  } catch (error) {
    throw new Error(`Error checking borrowing amount: ${error.message}`);
  }
});

Then('the form should be cleared', async function() {
  try {
    const inputs = await page.$$('input[type="text"], input[inputmode="numeric"]');
    for (const input of inputs) {
      const value = await input.inputValue();
      expect(value === '' || value === '$0').toBe(true);
    }
  } catch (error) {
    throw new Error(`Error checking if form is cleared: ${error.message}`);
  }
});

Then('the annual income field should be empty', async function() {
  try {
    const inputs = await page.$$('input[type="text"], input[inputmode="numeric"]');
    if (inputs.length > 0) {
      const value = await inputs[0].inputValue();
      expect(value === '' || value === '$0').toBe(true);
    }
  } catch (error) {
    throw new Error(`Error checking annual income field: ${error.message}`);
  }
});

Then('the borrowing amount should display {string}', async function(text) {
  try {
    const visible = await page.isVisible(`text=${text}`);
    expect(visible).toBe(true);
  } catch (error) {
    throw new Error(`Text "${text}" not displayed: ${error.message}`);
  }
});

After(async function() {
  // Close browser after all scenarios
  await closeBrowser();
});
