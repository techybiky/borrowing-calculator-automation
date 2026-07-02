const {
  Given,
  When,
  Then,
  setDefaultTimeout,
  expect,
} = require("@cucumber/cucumber");
const BorrowingCalculatorPage = require("../pages/borrowingCalculatorPage");
const { getPage } = require("../support/browser");
const assert = require("assert");

setDefaultTimeout(60000);

const getCalculatorPage = async () => {
  return new BorrowingCalculatorPage(await getPage());
};

Given("I navigate to the borrowing power calculator", async function () {
  await this.calculatorPage.navigateToCalculator();
});

Given("I select {string} as the application type", async function (type) {
  await this.calculatorPage.selectApplicationType(type);
});

Given("I select {string} dependants", async function (count) {
  await this.calculatorPage.selectDependants(count);
});

Given("I select {string} as the property type", async function (type) {
  await this.calculatorPage.selectPropertyType(type);
});

Given("I enter {string} as annual income", async function (income) {
  await this.calculatorPage.fillAnnualIncome(income);
});

Given("I enter {string} as other annual income", async function (income) {
  await this.calculatorPage.fillOtherAnnualIncome(income);
});

Given("I enter {string} as monthly living expenses", async function (expenses) {
  await this.calculatorPage.fillMonthlyLivingExpenses(expenses);
});

Given(
  "I enter {string} as current home loan monthly repayments",
  async function (amount) {
    await this.calculatorPage.fillCurrentHomeLoanRepayments(amount);
  },
);

Given(
  "I enter {string} as other loan monthly repayments",
  async function (amount) {
    await this.calculatorPage.fillOtherLoanRepayments(amount);
  },
);

Given("I enter {string} as other monthly commitments", async function (amount) {
  await this.calculatorPage.fillOtherMonthlyCommitments(amount);
});

Given("I enter {string} as total credit card limits", async function (amount) {
  await this.calculatorPage.fillCreditCardLimits(amount);
});

When("I click the {string} button", async function (buttonText) {
  await this.calculatorPage.clickButton(buttonText);
});


Then("the borrowing estimate should be {string}", async function (expected) {
  const actual = await this.calculatorPage.assertBorrowingEstimateValue();

  assert.strictEqual(actual.trim(), expected);
});

Then("all calculator fields should be reset", async function () {
  await this.calculatorPage.assertFieldReset("Your annual income (before tax)");
  await this.calculatorPage.assertFieldReset(
    "Your annual other income (optional)",
  );
  await this.calculatorPage.assertFieldReset("Monthly living expenses");
  await this.calculatorPage.assertFieldReset("Other loan monthly repayments");
  await this.calculatorPage.assertFieldReset("Total credit card limits");
});
