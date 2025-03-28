 // @ts-check
 const { defineConfig, devices } = require('@playwright/test');
 module.exports = defineConfig({
   reporter: "allure-playwright",
   
 });
 
 export default defineConfig({
   globalSetup: './GlobalVar/global-setup.js',
 });
 /**
  * Read environment variables from file.
  * https://github.com/motdotla/dotenv
  */
 // require('dotenv').config();
 
 /**
  * @see https://playwright.dev/docs/test-configuration
  */
 module.exports = defineConfig({
   timeout: 120000,
   testDir: './tests',
   
   /* Run tests in files in parallel */
   fullyParallel: true,
   /* Fail the build on CI if you accidentally left test.only in the source code. */
   forbidOnly: !!process.env.CI,
   /* Retry on CI only */
   retries: process.env.CI ? 2 : 0,
   /* Opt out of parallel tests on CI. */
   workers: process.env.CI ? 1 : undefined,
   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
   reporter: 'allure-playwright',
   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
   use: {
     timeout: 120000, // Set global timeout for each test (in ms)
   use: {
     actionTimeout: 120000, // Set global timeout for Playwright actions
     navigationTimeout: 120000, // Set global timeout for page navigation
   },
 
     /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
     trace: 'retain-on-failure',
   },
 
   /* Configure projects for major browsers */
   projects: [
     {
       name: 'chromium',
       use: { ...devices['Desktop Chrome'],
             headless: true,
             permissions: ["clipboard-read"],
             userAgent: "some custom ua",
           },
             
     },
 /*
     {
       name: 'firefox',
       use: { ...devices['Desktop Firefox'],
       headless: true },
     },
 
     {
       name: 'webkit',
       use: { ...devices['Desktop Safari'] },
     },
 */
     /* Test against mobile viewports. */
     // {
     //   name: 'Mobile Chrome',
     //   use: { ...devices['Pixel 5'] },
     // },
     // {
     //   name: 'Mobile Safari',
     //   use: { ...devices['iPhone 12'] },
     // },
 
     /* Test against branded browsers. */
     // {
     //   name: 'Microsoft Edge',
     //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
     // },
     // {
     //   name: 'Google Chrome',
     //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
     // },
   ],
 
   /* Run your local dev server before starting the tests */
   // webServer: {
   //   command: 'npm run start',
   //   url: 'http://127.0.0.1:3000',
   //   reuseExistingServer: !process.env.CI,
   // },
 
   
 });