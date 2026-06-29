const { baseURL, timeout } = require("../config/config");

class BorrowingCalculatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToCalculator() {
    await this.page.goto(baseURL, {
      waitUntil: "domcontentloaded",
    });

    await this.page.waitForLoadState("networkidle", {
      timeout,
    });
  }

  async selectApplicationType(type) {
    await this.clickButtonByText(type);
  }

  async selectDependants(count) {
    const selects = await this.page.$$("select");
    if (selects.length > 0) {
      await selects[0].selectOption(String(count));
      await this.page.waitForTimeout(300);
    }
  }

  async selectPropertyType(type) {
    await this.clickButtonByText(type);
  }

  async fillAnnualIncome(value) {
    await this.fillInputByLabel("Your annual income (before tax)", value);
  }

  async fillOtherAnnualIncome(value) {
    await this.fillInputByLabel("Your annual other income (optional)", value);
  }

  async fillMonthlyLivingExpenses(value) {
    await this.fillInputByLabel("Monthly living expenses", value);
  }

  async fillCurrentHomeLoanRepayments(value) {
    await this.fillInputByLabel("Current home loan monthly repayments", value);
  }

  async fillOtherLoanRepayments(value) {
    await this.fillInputByLabel("Other loan monthly repayments", value);
  }

  async fillOtherMonthlyCommitments(value) {
    await this.fillInputByLabel("Other monthly commitments", value);
  }

  async fillCreditCardLimits(value) {
    await this.fillInputByLabel("Total credit card limits", value);
  }

  async clickButton(buttonText) {
    const locator = this.page
      .locator("button, a")
      .filter({ hasText: new RegExp(this.escapeRegExp(buttonText), "i") })
      .first();

    try {
      await locator.waitFor({ state: "visible", timeout: 15000 });
      await locator.click();
    } catch (error) {
      throw new Error(`Could not find button: ${buttonText}`);
    }

    if (buttonText.includes("Work out")) {
      await this.page.waitForTimeout(3000);
    } else if (buttonText.includes("Start over")) {
      await this.page.waitForTimeout(1500);
    } else {
      await this.page.waitForTimeout(1000);
    }
  }

  async assertBorrowingEstimateValue() {
    await this.page.waitForSelector("#borrowResultTextAmount");

    return (
      await this.page.locator("#borrowResultTextAmount").textContent()
    ).trim();
  }

  async fillInputByLabel(label, value) {
    const field = this.page.locator(
      `//label[contains(normalize-space(), "${label}")]/following::input[1]`,
    );
    await field.waitFor({ state: "visible" });
    await field.fill(String(value));
  }

  async clickButtonByText(text) {
    const locator = this.page.locator(`text=${text}`);
    await locator.waitFor({ state: "visible", timeout: 15000 });
    await locator.click();
    await this.page.waitForTimeout(500);
  }

  escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  async getInputValueByLabel(label) {
    const input = this.page.locator(
      `//label[contains(normalize-space(), "${label}")]/following::input[1]`,
    );

    return await input.inputValue();
  }
  async assertFieldReset(label) {
    const value = await this.getInputValueByLabel(label);

    if (value !== "" && value !== "0") {
      throw new Error(`${label} was not reset. Actual value: ${value}`);
    }
  }
}

module.exports = BorrowingCalculatorPage;
