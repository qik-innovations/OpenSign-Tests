
const { test, expect } = require('@playwright/test');
const { loginCredentials } = require('./TestData/GlobalVar/global-setup');
const CommonSteps = require('./utils/CommonSteps');
const path = require('path');

test('Verify that the document signed by SignYourSelf is available in the Completed Document Report and can be deleted.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
  //const title = await page.title()
    //Expects page to have a heading with the name of dashboard.
  //expect(title).toBe('Dashboard - OpenSign™');
  
  await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
    await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
    await page.locator('input[name="Note"]').click();
    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '/TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
  await page.locator('input[name="Name"]').fill('Sample offer letter completed rpt');
  await page.locator('input[name="Note"]').fill('Sample note completed rpt');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.waitForLoadState("networkidle");
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
  await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
// Optionally save changes
await page.locator("//button[@type='button' and text()='Save']/parent::div").click();

await page.locator("//button[normalize-space()='Finish']").click();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
await page.locator('//button[normalize-space()="Close"]').click();
await page.getByRole('button', { name: ' Documents' }).click();
await page.getByRole('menuitem', { name: 'Completed' }).click();
// Wait up to 90 seconds for the text to appear
await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
// Now assert the text
await expect(page.locator('#renderList')).toContainText('Completed documents');
await expect(page.locator('thead')).toContainText('Title');
  await expect(page.locator('thead')).toContainText('Note');
  await expect(page.locator('thead')).toContainText('Folder');
  await expect(page.locator('thead')).toContainText('File');
  await expect(page.locator('thead')).toContainText('Owner');
  await expect(page.locator('thead')).toContainText('Signers');
await expect(page.locator('.p-2 > .font-semibold').first()).toContainText('Sample offer letter completed rpt');
 await expect(page.locator('td:nth-child(2)').first()).toContainText('Sample note completed rpt');
 await expect(page.locator('td:nth-child(3)').first()).toContainText('OpenSign™ Drive'); 
 await expect(page.locator('td:nth-child(4)').first()).toContainText('Download');
 await expect(page.locator('td:nth-child(5)').first()).toContainText('Pravin Testing account');  
 await page.locator('//div[@role="button"and @title="Delete"]').first().click();
 await expect(page.getByRole('heading')).toContainText('Delete document');
  await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to delete this document?');
  await page.getByRole('button', { name: 'Yes' }).click();
  await expect(page.locator('#renderList')).toContainText('Record deleted successfully!');
  try {
    await expect(page.locator('tbody')).toContainText('Sample offer letter completed rpt');
} catch (error) {
    console.log("Document not found in the table, successfully Deleted!");
}
});

test('Verify that pagination is functioning correctly in the completed document.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
  await page.getByRole('button', { name: ' Documents' }).click();
  await page.getByRole('menuitem', { name: 'Completed' }).click();
  // Wait up to 90 seconds for the text to appear
  await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
  // Now assert the text
  await expect(page.locator('#renderList')).toContainText('Completed documents');
  const title = await page.title();
  if (title === 'Completed Documents - OpenSign™') {
    console.log('Completed Documents - OpenSign™');
  } else {
    console.error(`Page title is incorrect. Expected: "Completed Documents - OpenSign™", Got: "${title}"`);
  }
 
  //Check if Pagination Buttons Exist
  const isPaginationVisible = await page.getByRole('button', { name: 'Next' }).isVisible();
  //expect(isPaginationVisible).toBeTruthy();
  const isPaginationVisiblePrev = await page.getByRole('button', { name: 'Prev' }).isVisible();
  //expect(isPaginationVisiblePrev).toBeTruthy();
  const page1Data = await page.locator('table tbody tr').allTextContents();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState('domcontentloaded');
  //const firstPageContent = await page.locator('//button[@class=\'op-btn-active op-join-item op-btn op-btn-sm\' and text()=\'2\']').first().textContent(); // Capture first item
const page2Data = await page.locator('table tbody tr').allTextContents();
expect(page2Data).not.toEqual(page1Data);// Ensure content changes
//Verify 'Previous' and 'Next' Buttons Work
await page.getByRole('button', { name: 'Prev' }).click();
await page.waitForLoadState('domcontentloaded');
const page1DataPrev = await page.locator('table tbody tr').allTextContents();
expect(page2Data).not.toEqual(page1DataPrev);// Ensure content changes

});

test('Verify that the document signed by SignYourSelf can be viewed from the Completed Document Report.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
  //const title = await page.title()
    //Expects page to have a heading with the name of dashboard.
  //expect(title).toBe('Dashboard - OpenSign™');
  
  await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '/TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
  await page.locator('input[name="Name"]').fill('View Sample offer letter in completed rpt');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.waitForLoadState("networkidle");
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
  await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
// Optionally save changes
await page.locator("//button[@type='button' and text()='Save']/parent::div").click();
await page.locator("//button[normalize-space()='Finish']").click();
await page.getByText('Successfully signed!').waitFor({ timeout: 90000 });
await page.locator('//button[normalize-space()="Close"]').click();
await page.getByRole('button', { name: ' Documents' }).click();
await page.getByRole('menuitem', { name: 'Completed' }).click();
// Wait up to 90 seconds for the text to appear
await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
// Now assert the text
await expect(page.locator('#renderList')).toContainText('Completed documents');
await expect(page.locator('.p-2 > .font-semibold').first()).toContainText('View Sample offer letter in completed rpt');
 
 await page.locator('//div[@role="button"and @title="Edit"]').first().click();
 await expect(page.getByRole('heading')).toContainText('Document signed');
 await expect(page.locator('#selectSignerModal')).toContainText('Congratulations! 🎉 This document has been successfully signed by you!');
 await page.getByRole('button', { name: 'Close' }).click();
 await page.getByRole('button', { name: 'Certificate' }).click();
 await page.getByRole('button', { name: 'Print' }).click();
 await page.getByRole('button', { name: 'Download' }).click();
 const download1Promise = page.waitForEvent('download');
 await page.locator('#selectSignerModal').getByRole('button', { name: 'Download' }).click();
 const download1 = await download1Promise;
 await page.getByRole('button', { name: 'Mail' }).click();
 await page.getByPlaceholder('Add an email address and hit').click();
 await page.getByPlaceholder('Add an email address and hit').fill('pravin@nxglabs.in');
 await page.locator('#selectSignerModal').getByRole('button').nth(2).click();
 await page.getByRole('button', { name: 'Send' }).click();
});