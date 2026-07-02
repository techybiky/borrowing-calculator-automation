const { chromium, firefox, webkit } = require("playwright");
const config = require("../config/config");

let browser;
let page;

function getLaunchOptions() {
    const isCI = Boolean(process.env.CI || process.env.GITHUB_ACTIONS);
    const headless = config.headless ?? isCI;

    return {
        headless,
        ...(isCI ? { args: ["--no-sandbox", "--disable-dev-shm-usage"] } : {})
    };
}

async function getPage() {

    if (!browser) {

        switch (config.browser) {

            case "firefox":
                browser = await firefox.launch(getLaunchOptions());
                break;

            case "webkit":
                browser = await webkit.launch(getLaunchOptions());
                break;

            default:
                browser = await chromium.launch(getLaunchOptions());
        }

        const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
        page = await context.newPage();

        page.setDefaultTimeout(config.timeout);

        await page.goto(config.baseURL, { waitUntil: "domcontentloaded", timeout: config.timeout });
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