
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 120000,
  testDir: './tests',

  globalSetup: './tests/TestData/GlobalVar/global-setup.js',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['allure-playwright', {
      resultsDir: 'allure-results',
    }],
  ],

  use: {
    actionTimeout: 120000,
    navigationTimeout: 120000,
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
        permissions: ['clipboard-read'],
        userAgent: 'some custom ua',
      },
    },

    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], headless: true },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],
});
