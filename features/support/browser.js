// features/support/browser.js
const { chromium } = require('playwright');

let browser;
let page;

const getBrowser = async () => {
  if (!browser) {
    const launchOptions = {
      headless: process.env.HEADED !== 'true',
    };
    browser = await chromium.launch(launchOptions);
  }
  return browser;
};

const getPage = async () => {
  if (!page) {
    const browserInstance = await getBrowser();
    page = await browserInstance.newPage();
    page.setViewportSize({ width: 1280, height: 720 });
  }
  return page;
};

const closeBrowser = async () => {
  if (page) {
    await page.close();
    page = null;
  }
  if (browser) {
    await browser.close();
    browser = null;
  }
};

module.exports = {
  getBrowser,
  getPage,
  closeBrowser,
};
