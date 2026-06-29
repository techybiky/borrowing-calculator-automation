const { chromium, firefox, webkit } = require("playwright");
const config = require("../config/config");

let browser;
let page;

async function getPage() {

    if (!browser) {

        switch (config.browser) {

            case "firefox":
                browser = await firefox.launch({ headless: config.headless });
                break;

            case "webkit":
                browser = await webkit.launch({ headless: config.headless });
                break;

            default:
                browser = await chromium.launch({ headless: config.headless });
        }

        const context = await browser.newContext();
        page = await context.newPage();

        page.setDefaultTimeout(config.timeout);

        await page.goto(config.baseURL);
    }

    return page;
}

async function closeBrowser() {
    if (browser) {
        await browser.close();
        browser = null;
        page = null;
    }
}

module.exports = {
    getPage,
    closeBrowser
};