const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');
test.describe('Console app', () => {
test('Verify that a free user cannot access the Mail page in the console application and is prompted to upgrade.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    await page.getByRole('button', { name: '' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
//verify the profile name on the profile
  await expect(page1.locator('#root')).toContainText('Mathew Wade');
  await expect(page1.locator('#root')).toContainText('qikAi.com');
  await page1.getByRole('menuitem', { name: 'Mail' }).click();
    const title = await page1.title();
    if (title === 'OpenSign™ Email Settings - OpenSign™') {
      console.log('Page title is correct: OpenSign™ Email Settings - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "OpenSign™ Email Settings - OpenSign™", Got: "${title}"`);
    }
    await expect(page1.locator('#renderList')).toContainText('Upgrade now');
    await expect(page1.locator('#renderList')).toMatchAriaSnapshot(`- button "Upgrade now"`);
});

test('Verify that Profession plan User can access the Email page in the console application.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.ProfessionPlanUserlogin();
    await page.getByRole('button', { name: '' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
  //verify the profile name on the profile
  await expect(page1.locator('#root')).toContainText('Mathew Steven');
  await expect(page1.locator('#root')).toContainText('OpenSign Lab');
  await page1.getByRole('menuitem', { name: 'Mail' }).click();
    const title = await page1.title();
    if (title === 'OpenSign™ Email Settings - OpenSign™') {
      console.log('Page title is correct: OpenSign™ Email Settings - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "OpenSign™ Email Settings - OpenSign™", Got: "${title}"`);
    }
  
    await expect(page1.locator('#root')).toContainText('PRO');
    /*
  await page1.getByRole('button', { name: 'G Connect to Gmail' }).click();
  const page2Promise = page1.waitForEvent('popup');
  const page2 = await page2Promise;
  await page2.getByText('Sign in', { exact: true }).click();
  await expect(page2.locator('#headingText')).toContainText('Sign in');
  await page1.getByRole('button', { name: ' Custom SMTP' }).click();
  await page1.getByRole('heading', { name: 'SMTP Credentials' }).click();
  await expect(page1.locator('h3')).toContainText('SMTP Credentials');
  await page1.getByRole('button', { name: '✕' }).click();*/
  await expect(page1.getByRole('heading')).toContainText('OpenSign™ Email Settings');
  await expect(page1.locator('#renderList')).toContainText('OpenSign™ default SMTP');
  });

  test('Verify that Team plan User can access the Email page in the console application.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await page.getByRole('button', { name: '' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
  //verify the profile name on the profile
  await expect(page1.locator('#root')).toContainText('Pravin Testing account');
  await expect(page1.locator('#root')).toContainText('OpenSign pvt ltd');
  await page1.getByRole('menuitem', { name: 'Mail' }).click();
    const title = await page1.title();
    if (title === 'OpenSign™ Email Settings - OpenSign™') {
      console.log('Page title is correct: OpenSign™ Email Settings - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "OpenSign™ Email Settings - OpenSign™", Got: "${title}"`);
    }
    await expect(page1.locator('#root')).toContainText('Pravin Testing account');
    await expect(page1.locator('#root')).toContainText('TEAM');
  /*await page1.getByRole('button', { name: 'G Connect to Gmail' }).click();
  const page2Promise = page1.waitForEvent('popup');
  const page2 = await page2Promise;
  await page2.getByText('Sign in', { exact: true }).click();
  await expect(page2.locator('#headingText')).toContainText('Sign in');
  await page1.getByRole('button', { name: ' Custom SMTP' }).click();
  await page1.getByRole('heading', { name: 'SMTP Credentials' }).click();
  await expect(page1.locator('h3')).toContainText('SMTP Credentials');
  await page1.getByRole('button', { name: '✕' }).click();*/
  await expect(page1.getByRole('heading')).toContainText('OpenSign™ Email Settings');
  await expect(page1.locator('#renderList')).toContainText('OpenSign™ default SMTP');
 
  });
});
