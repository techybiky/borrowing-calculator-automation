// playwright.config.js
module.exports = {
  testDir: './features/step_definitions',
  timeout: 30000,
  retries: 0,
  workers: 1,
  use: {
    headless: process.env.HEADED !== 'true',
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://www.anz.com.au/personal/home-loans/calculators-tools/borrowing-power-calculator/',
  },
};
