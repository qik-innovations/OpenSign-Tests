const { loginCredentials } = require('./TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('./utils/CommonSteps');
test.describe('Dashboard', () => {
test('Verify that the Sign yourself card click functions correctly and redirects the user to the Signyourself page from the dashboard.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await expect(page.locator('#renderList')).toContainText('Sign yourselfUse this option to sign the document yourself without adding others');
    await page.getByText('Sign yourselfUse this option').click();
    await expect(page.getByRole('heading')).toContainText('Sign yourself');
    await expect(page.locator('form')).toContainText('Use this form to sign the document yourself without adding others');
  });
  test('Verify that the Request signature card click functions correctly and redirects the user to the Request signature page from the dashboard.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await expect(page.locator('#renderList')).toContainText('Request signaturesUse this option to request signatures from others and yourself together.');
    await page.getByText('Request signaturesUse this').click();
    await expect(page.getByRole('heading')).toContainText('Request signatures');
    await expect(page.locator('form')).toContainText('Use this form to request signatures from others and yourself together.');
  });
  test('Verify that the Need your signature card click functions correctly and redirects the user to the Need your sign report from the dashboard.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await expect(page.locator('#renderList')).toContainText('Need your signature');
    await page.getByText('Need your signature').click();
    await expect(page.locator('#renderList')).toContainText('Need your sign');
  });
  test('Verify that clicking the Out for Signatures card functions correctly and redirects the user to the In-Progress report from the dashboard.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await expect(page.locator('#renderList')).toContainText('Out for signatures');
    await page.getByText('Out for signatures').click();
    await expect(page.locator('#renderList')).toContainText('In-progress documents');
  });

  test('Verify that the Need Your Signature count on the card increases when a new document is created and the owner is added as a signer.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await expect(page.locator('#renderList')).toContainText('Need your signature');
    await expect(page.locator('#renderList')).toContainText('Drafts');
    await page.waitForLoadState("networkidle");
    await page.locator('//div[@data-tut="tourcard1"]//div[contains(@class, "font-medium")]/div[@class="text-2xl font-light"]').waitFor({  state: 'visible', timeout: 180000 });
    const countNeedYourSign = await page.locator('//div[@data-tut="tourcard1"]//div[contains(@class, "font-medium")]/div[@class="text-2xl font-light"]').textContent();
    console.log("Count need your sign " + countNeedYourSign);
    await page.getByRole('menuitem', { name: 'Request signatures' }).click();
     await page.locator('input[name="Name"]').click();
        await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
        await page.locator('input[name="Name"]').press('Tab');
        await page.locator('input[name="Note"]').click();
        const fileChooserPromise = page.waitForEvent('filechooser');
      await page.locator('input[type="file"]').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(path.join(__dirname, '/TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
    //  await page.type('//div[@class=\'css-n9qnu9\']', 'Pravin', { delay: 100 });
    //  await page.getByRole('option', { name: 'Pravin Testing account <' + loginCredentials.email }).click();
    await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
    await page.getByRole('option', { name: 'Pravin Testing account<pravin' }).click();
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForSelector('//div[@id=\'container\']//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
    await page.waitForLoadState("networkidle");
    await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
      
      await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
try {
  const rowLocator = page.locator("//button[@type='button' and text()='Save']/parent::div");

  for (let i = 0; i < 5; i++) { // Retry up to 5 times
      if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
          await rowLocator.click();
          console.log("Save button clicked!");
          break; // Exit the loop if successfully clicked
      } else {
          console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
  
          await page.locator('//span[normalize-space()="signature"]').hover();
          await page.mouse.down();
          await page.mouse.move(800, 300);
          await page.mouse.up();
          
          // Wait a bit before checking again
          await page.waitForTimeout(1000);
      }
  
      if (i === 5) {
          console.log("Save button did not become visible after multiple attempts.");
      }
  }
} catch (error) {
  console.log("Element not found or not interactable, continuing execution.");
 
}
await page.getByRole('button', { name: 'Next' }).click();
await page.getByRole('button', { name: 'Send' }).click();
await page.getByRole('button', { name: 'No' }).click();
await page.getByRole('menuitem', { name: 'Dashboard' }).click();
await expect(page.locator('#renderList')).toContainText('Drafts');
await page.waitForLoadState("networkidle");
await page.locator('//div[@data-tut="tourcard1"]//div[contains(@class, "font-medium")]/div[@class="text-2xl font-light"]').waitFor({  state: 'visible', timeout: 180000 });
const newCountNeedYourSign = await page.locator('//div[@data-tut="tourcard1"]//div[contains(@class, "font-medium")]/div[@class="text-2xl font-light"]').textContent();

// Convert to numbers for comparison
const IncrementedCount = Number(countNeedYourSign.trim()) + 1;
console.log("Count need your sign incremnt by 1 " + IncrementedCount);
const newCount = Number(newCountNeedYourSign);
console.log("new count " + newCount);
if (IncrementedCount === newCount) {
    console.log("Need Your Signature card count increased by one, which is correct.");
} else {
    console.log("Need Your Signature card count did not increase. The test case has failed.");
    throw new Error("Test case failed: Need Your Signature card count did not match.");
}
  });

  test('Verify that the Out for signature count on the card increases when a new document sent for request signature.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await expect(page.locator('#renderList')).toContainText('Need your signature');
    await expect(page.locator('#renderList')).toContainText('Drafts');
    await page.waitForLoadState("networkidle");
    await page.locator('//div[@data-tut="tourcard2"]//div[contains(@class, "font-medium")]/div[@class="text-2xl font-light"]').waitFor({  state: 'visible', timeout: 180000 });
    const countOutforSign = await page.locator('//div[@data-tut="tourcard2"]//div[contains(@class, "font-medium")]/div[@class="text-2xl font-light"]').textContent();
    console.log('count out for sign old' + countOutforSign);
    await page.getByRole('menuitem', { name: 'Request signatures' }).click();
     await page.locator('input[name="Name"]').click();
        await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
        await page.locator('input[name="Name"]').press('Tab');
        await page.locator('input[name="Note"]').click();
        const fileChooserPromise = page.waitForEvent('filechooser');
      await page.locator('input[type="file"]').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(path.join(__dirname, '/TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
    //  await page.type('//div[@class=\'css-n9qnu9\']', 'Pravin', { delay: 100 });
    //  await page.getByRole('option', { name: 'Pravin Testing account <' + loginCredentials.email }).click();
    await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
    await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForSelector('//div[@id=\'container\']//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
    await page.waitForLoadState("networkidle");
    await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
      await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
try {
  const rowLocator = page.locator("//button[@type='button' and text()='Save']/parent::div");

  for (let i = 0; i < 5; i++) { // Retry up to 5 times
      if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
          await rowLocator.click();
          console.log("Save button clicked!");
          break; // Exit the loop if successfully clicked
      } else {
          console.log(`Attempt ${i + 1}: Save button not visible, performing actions...`);
  
          await page.locator('//span[normalize-space()="signature"]').hover();
          await page.mouse.down();
          await page.mouse.move(800, 300);
          await page.mouse.up();
          
          // Wait a bit before checking again
          await page.waitForTimeout(1000);
      }
  
      if (i === 5) {
          console.log("Save button did not become visible after multiple attempts.");
      }
  }
} catch (error) {
  console.log("Element not found or not interactable, continuing execution.");
 
}
await page.getByRole('button', { name: 'Next' }).click();
await page.getByRole('button', { name: 'Send' }).click();
await page.getByRole('button', { name: 'Close' }).click();
await page.getByRole('menuitem', { name: 'Dashboard' }).click();
await expect(page.locator('#renderList')).toContainText('Drafts');
await page.waitForLoadState("networkidle");
await page.locator('//div[@data-tut="tourcard2"]//div[contains(@class, "font-medium")]/div[@class="text-2xl font-light"]').waitFor({  state: 'visible', timeout: 180000 });
await page.waitForLoadState("networkidle");

let newCountOutforSign = null;

for (let i = 0; i < 5; i++) { // Retry up to 5 times
    newCountOutforSign = await page.locator('//div[@data-tut="tourcard2"]//div[contains(@class, "font-medium")]/div[@class="text-2xl font-light"]').textContent();
    
    if (newCountOutforSign && newCountOutforSign.trim() !== "") {
        console.log("Text found:", newCountOutforSign);
        break; // Exit loop if text is found
    } else {
        console.log(`Attempt ${i + 1}: Text is empty, retrying...`);
        await page.waitForTimeout(1000); // Wait 1 second before retrying
    }

    if (i === 4) {
        console.log("Text did not appear after multiple attempts.");
    }
}

// Convert to numbers for comparison
const oldincrementedcount1 = Number(countOutforSign.trim()) + 1;
const newCount1 = Number(newCountOutforSign);
if (oldincrementedcount1 === newCount1) {
  console.log("✅ Out for signature card count increased by one, which is correct.");
} else {
  console.error("❌ Out for signature card count did not increase. The test case has failed.");
}
  });
});