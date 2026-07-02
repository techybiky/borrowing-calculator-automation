const { Before, After } = require("@cucumber/cucumber");
const { getPage, closeBrowser } = require("./browser");
const BorrowingCalculatorPage = require("../pages/borrowingCalculatorPage");

Before({ timeout: 120000 }, async function () {
    this.page = await getPage();
    this.calculatorPage = new BorrowingCalculatorPage(this.page);
});

After({ timeout: 60000 }, async function () {
    await closeBrowser();
});