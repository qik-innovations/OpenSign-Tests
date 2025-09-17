const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');
test.describe('Console app', () => {
test('Verify that a free user cannot access the Storage page in the console application and is prompted to upgrade.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
    await page.locator('//div[@class ="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
//verify the profile name on the profile
  await expect(page1.locator('#root')).toContainText('Mathew Wade', { timeout: 120000 });
  await expect(page1.locator('#root')).toContainText('qikAi.com');
  await page1.getByRole('menuitem', { name: 'Storage' }).click();
    const title = await page1.title();
    if (title === 'Storage - OpenSign™') {
      console.log('Page title is correct: Storage - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Storage - OpenSign™", Got: "${title}"`);
    }
  await expect(page1.getByRole('heading')).toContainText('Setup file storage');
  await expect(page1.locator('#renderList')).toContainText('Enabling BYOC lets you connect your own S3 storage so your files remain entirely under your control—no external copies retained. If data autonomy matters to you, consider upgrading to Teams to unlock this feature.');
  await expect(page1.locator('#renderList')).toContainText('Upgrade to team plan');
  await expect(page1.locator('#renderList')).toMatchAriaSnapshot(`
    - paragraph: Enabling BYOC lets you connect your own S3 storage so your files remain entirely under your control—no external copies retained. If data autonomy matters to you, consider upgrading to Teams to unlock this feature.
    - button "Upgrade to team plan"
    `);
});

test('Verify that Professional plan user cannot access the Storage page in the console application and is prompted to upgrade Team plan.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.ProfessionPlanUserlogin();
    await page.locator('//div[@class ="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
//verify the profile name on the profile
await expect(page1.locator('#root')).toContainText('Pro plan User', { timeout: 120000 });
await expect(page1.locator('#root')).toContainText('OpenSign');
  await page1.getByRole('menuitem', { name: 'Storage' }).click();
    const title = await page1.title();
    if (title === 'Storage - OpenSign™') {
      console.log('Page title is correct: Storage - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Storage - OpenSign™", Got: "${title}"`);
    }
    await expect(page1.locator('#root')).toContainText('PRO');
  await expect(page1.getByRole('heading')).toContainText('Setup file storage');
  await expect(page1.locator('#renderList')).toContainText('Enabling BYOC lets you connect your own S3 storage so your files remain entirely under your control—no external copies retained. If data autonomy matters to you, consider upgrading to Teams to unlock this feature.');
  await expect(page1.locator('#renderList')).toContainText('Upgrade to team plan');
  await expect(page1.locator('#renderList')).toMatchAriaSnapshot(`
    - paragraph: Enabling BYOC lets you connect your own S3 storage so your files remain entirely under your control—no external copies retained. If data autonomy matters to you, consider upgrading to Teams to unlock this feature.
    - button "Upgrade to team plan"
    `);
});
test('Verify that Team plan user set the custom file storage AWSS3', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.loginForCustomStorgeUser();
    await page.locator('//div[@class ="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
//verify the profile name on the profile
await expect(page1.locator('#root')).toContainText('Peter Mark', { timeout: 120000 });
await expect(page1.locator('#root')).toContainText('OpenSign pvt ltd');
  await page1.getByRole('menuitem', { name: 'Storage' }).click();
    const title = await page1.title();
    if (title === 'Storage - OpenSign™') {
      console.log('Page title is correct: Storage - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Storage - OpenSign™", Got: "${title}"`);
    }
  await expect(page1.getByRole('heading')).toContainText('Setup file storage');

  await page1.locator('#renderList i').nth(1).click();
//write the code to generate random string for bucket name
  const randomString = "Demo FileAdaptertname" + Math.random().toString(36).substring(2, 10);
  console.log('Generated random string for File adapter name:', randomString);
  await page1.locator('//input[@name="fileAdapterName"]').fill(randomString);
  await page1.selectOption('select[name="fileAdapter"]', 'aws');
  await page1.locator('//input[@name="region"]').fill('us-east-1');
  await page1.locator('//input[@name="bucketName"]').fill('Demo AWS S3 -bucket-name');
  await page1.locator('//input[@name="endpoint"]').fill('https://s3.us-east-1.amazonaws.com');
  await page1.locator('//input[@name="baseUrl"]').fill('https://demo.s3.us-east-1.amazonaws.com');
  await page1.locator('//input[@name="accessKeyId"]').fill('AKIATWWDFDFFSEXAMPLE');
  await page1.locator('//input[@name="secretAccessKey"]').fill('wJalrXUtnFEMI/K7MDENG/bWADDADAadsda');
  await page1.getByRole('button', { name: 'Save & activate' }).click();
  await page1.locator('#root div').filter({ hasText: 'Welcome back!Login to your' }).nth(3).click();
 const commonStepsPage1 = new CommonSteps(page1);
    await commonStepsPage1.loginForCustomStorgeUser();
     await page1.locator('//div[@class ="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]').click();
    const page2Promise = page1.waitForEvent('popup');
    await page1.getByText('Console').click();
    const page2 = await page2Promise;
//verify the profile name on the profile
await expect(page2.locator('#root')).toContainText('Peter Mark', { timeout: 120000 });
 await page2.getByRole('menuitem', { name: 'Storage' }).click();
    const title2 = await page2.title();
    if (title2 === 'Storage - OpenSign™') {
      console.log('Page title is correct: Storage - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Storage - OpenSign™", Got: "${title2}"`);
    }
  await expect(page2.getByRole('heading')).toContainText('Setup file storage');
  //wriet the code to verify the newly added file adapter name is visible on the storage page
  await expect(page2.locator('select[name="fileAdapterName"]')).toContainText(randomString);
  await expect(page2.locator('select[name="fileAdapter"]')).toHaveValue('aws');
  await expect(page2.locator('//input[@name="region"]')).toHaveValue('us-east-1');
  await expect(page2.locator('//input[@name="bucketName"]')).toHaveValue('Demo AWS S3 -bucket-name');
  await expect(page2.locator('//input[@name="endpoint"]')).toHaveValue('https://s3.us-east-1.amazonaws.com');
  await expect(page2.locator('//input[@name="baseUrl"]')).toHaveValue('https://demo.s3.us-east-1.amazonaws.com');
  await expect(page2.locator('//input[@name="accessKeyId"]')).toHaveValue('AKIATWWDFDFFSEXAMPLE');
  await page2.locator('//span[contains(@class,"cursor-pointer")]//i[contains(@class,"fa-eye")]').click();
  await expect(page2.locator('//input[@name="secretAccessKey"]')).toHaveValue('wJalrXUtnFEMI/K7MDENG/bWADDADAadsda');
await page2.locator('//button[contains(text(),"Reconnect to OpenSign")]').click();
await page2.locator('#root div').filter({ hasText: 'Welcome back!Login to your' }).nth(3).click();
const commonStepsPage2 = new CommonSteps(page2);
    await commonStepsPage2.loginForCustomStorgeUser();
     await page2.locator('//div[@class ="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]').click();
    const page3Promise = page2.waitForEvent('popup');
    await page1.getByText('Console').click();
    const page3= await page3Promise;

 await page3.getByRole('menuitem', { name: 'Storage' }).click();
  await expect(page3.getByRole('heading')).toContainText('Setup file storage');
  //verify the Save and actiavte button is visible and enabled
  await page3.locator('//button[contains(text(),"Save & activate")]').isEnabled();

});
test('Verify that a Team Plan user can configure custom file storage using DigitalOcean and is able to update the storage settings.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.loginForCustomStorgeUser();
    await page.locator('//div[@class ="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByText('Console').click();
    const page1 = await page1Promise;
//verify the profile name on the profile
await expect(page1.locator('#root')).toContainText('Peter Mark', { timeout: 120000 });
await expect(page1.locator('#root')).toContainText('OpenSign pvt ltd');
  await page1.getByRole('menuitem', { name: 'Storage' }).click();
    const title = await page1.title();
    if (title === 'Storage - OpenSign™') {
      console.log('Page title is correct: Storage - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Storage - OpenSign™", Got: "${title}"`);
    }
  await expect(page1.getByRole('heading')).toContainText('Setup file storage');

  await page1.locator('#renderList i').nth(1).click();
//write the code to generate random string for bucket name
  const randomString = "FileAdapterDigitalOcean" + Math.random().toString(36).substring(2, 10);
  console.log('Generated random string for File adapter name:', randomString);
  await page1.locator('//input[@name="fileAdapterName"]').fill(randomString);
  await page1.selectOption('select[name="fileAdapter"]', 'digitalocean');
  await page1.locator('//input[@name="region"]').fill('us-west');
  await page1.locator('//input[@name="bucketName"]').fill('Demo digital ocean Space-name');
  await page1.locator('//input[@name="endpoint"]').fill('https://nyc34.digitaloceanspaces.com');
  await page1.locator('//input[@name="baseUrl"]').fill('https://demo.nyc3.digitaloceanspaces.com');
  await page1.locator('//input[@name="accessKeyId"]').fill('AKIATWWDFDFFSEXAMPLE');
  await page1.locator('//input[@name="secretAccessKey"]').fill('wJalrXUtnFEMI/K7MDENG/bWADDADAadsda');
  await page1.getByRole('button', { name: 'Save & activate' }).click();
  await page1.locator('#root div').filter({ hasText: 'Welcome back!Login to your' }).nth(3).click();
 const commonStepsPage1 = new CommonSteps(page1);
    await commonStepsPage1.loginForCustomStorgeUser();
     await page1.locator('//div[@class ="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]').click();
    const page2Promise = page1.waitForEvent('popup');
    await page1.getByText('Console').click();
    const page2 = await page2Promise;
//verify the profile name on the profile
await expect(page2.locator('#root')).toContainText('Peter Mark', { timeout: 120000 });
 await page2.getByRole('menuitem', { name: 'Storage' }).click();
    const title2 = await page2.title();
    if (title2 === 'Storage - OpenSign™') {
      console.log('Page title is correct: Storage - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Storage - OpenSign™", Got: "${title2}"`);
    }
  await expect(page2.getByRole('heading')).toContainText('Setup file storage');
  //wriet the code to verify the newly added file adapter name is visible on the storage page
  await expect(page2.locator('select[name="fileAdapterName"]')).toContainText(randomString);
  await expect(page2.locator('select[name="fileAdapter"]')).toHaveValue('digitalocean');
  await expect(page2.locator('//input[@name="region"]')).toHaveValue('us-west');
  await expect(page2.locator('//input[@name="bucketName"]')).toHaveValue('Demo digital ocean Space-name');
  await expect(page2.locator('//input[@name="endpoint"]')).toHaveValue('https://nyc34.digitaloceanspaces.com');
  await expect(page2.locator('//input[@name="baseUrl"]')).toHaveValue('https://demo.nyc3.digitaloceanspaces.com');
  await expect(page2.locator('//input[@name="accessKeyId"]')).toHaveValue('AKIATWWDFDFFSEXAMPLE');
  await page2.locator('//span[contains(@class,"cursor-pointer")]//i[contains(@class,"fa-eye")]').click();
  await expect(page2.locator('//input[@name="secretAccessKey"]')).toHaveValue('wJalrXUtnFEMI/K7MDENG/bWADDADAadsda');
await page2.locator('//button[contains(text(),"Update")]').click();
await page2.locator('#root div').filter({ hasText: 'Welcome back!Login to your' }).nth(3).click();
const commonStepsPage2 = new CommonSteps(page2);
    await commonStepsPage2.loginForCustomStorgeUser();
     await page2.locator('//div[@class ="op-dropdown op-dropdown-open op-dropdown-end" and @id="profile-menu"]').click();
    const page3Promise = page2.waitForEvent('popup');
    await page2.getByText('Console').click();
    const page3= await page3Promise;
 await page3.getByRole('menuitem', { name: 'Storage' }).click();
  await expect(page3.getByRole('heading')).toContainText('Setup file storage');
  //verify the Save and actiavte button is visible and enabled
  await page3.locator('//button[contains(text(),"Update")]').isEnabled();

});
});

 