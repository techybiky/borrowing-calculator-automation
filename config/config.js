module.exports = {
    baseURL: "https://www.anz.com.au/personal/home-loans/calculators-tools/borrowing-power-calculator/",
    timeout: 60000,
    browser: "chromium",
    headless: process.env.CI || process.env.GITHUB_ACTIONS ? true : false
};