// features/support/helpers.js

/**
 * Get selector for application type button
 */
const getApplicationTypeSelector = (type) => {
  const typeMap = {
    'Single': 'button:has-text("Single")',
    'Joint': 'button:has-text("Joint")',
  };
  return typeMap[type];
};

/**
 * Get selector for property type button
 */
const getPropertyTypeSelector = (type) => {
  const typeMap = {
    'Home to live in': 'button:has-text("Home to live in")',
    'Residential investment': 'button:has-text("Residential investment")',
  };
  return typeMap[type];
};

/**
 * Get selector for income input field
 */
const getIncomeFieldSelector = () => {
  return 'input[placeholder="$0"]';
};

/**
 * Get selector for dependants dropdown
 */
const getDependantsDropdownSelector = () => {
  return 'select';
};

/**
 * Wait for element and interact
 */
const waitAndClick = async (page, selector, timeout = 5000) => {
  const element = await page.waitForSelector(selector, { timeout });
  await element.click();
  await page.waitForTimeout(500); // Small delay after click
};

/**
 * Wait for element and fill with value
 */
const waitAndFill = async (page, selector, value, timeout = 5000) => {
  const element = await page.waitForSelector(selector, { timeout });
  await element.fill(String(value));
  await page.waitForTimeout(300); // Small delay after fill
};

/**
 * Get all input fields in order and fill them
 */
const fillFormInputs = async (page, values) => {
  const inputs = await page.$$('input[type="text"]');
  for (let i = 0; i < Math.min(inputs.length, values.length); i++) {
    await inputs[i].fill(String(values[i]));
    await page.waitForTimeout(200);
  }
};

/**
 * Get the calculated borrowing amount
 */
const getBorrowingAmount = async (page) => {
  try {
    const amountText = await page.$eval('text=We estimate you could borrow:', (el) => {
      const parent = el.closest('div');
      const amountElement = parent?.querySelector('div');
      return amountElement?.textContent || null;
    });
    return amountText;
  } catch (error) {
    console.error('Error getting borrowing amount:', error);
    return null;
  }
};

/**
 * Check if form is cleared
 */
const isFormCleared = async (page) => {
  try {
    const inputs = await page.$$('input[type="text"]');
    for (const input of inputs) {
      const value = await input.inputValue();
      if (value && value !== '$0') {
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error('Error checking if form is cleared:', error);
    return false;
  }
};

/**
 * Parse currency string to number
 */
const parseCurrency = (value) => {
  if (!value) return 0;
  const cleaned = value.replace(/[^0-9.-]+/g, '');
  return parseFloat(cleaned) || 0;
};

module.exports = {
  getApplicationTypeSelector,
  getPropertyTypeSelector,
  getIncomeFieldSelector,
  getDependantsDropdownSelector,
  waitAndClick,
  waitAndFill,
  fillFormInputs,
  getBorrowingAmount,
  isFormCleared,
  parseCurrency,
};
