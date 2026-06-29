const { Before, After } = require("@cucumber/cucumber");
const { getPage, closeBrowser } = require("./browser");
const BorrowingCalculatorPage = require("../pages/borrowingCalculatorPage");

Before(async function () {
    this.page = await getPage();
    this.calculatorPage = new BorrowingCalculatorPage(this.page);
});

After(async function () {
    await closeBrowser();
});