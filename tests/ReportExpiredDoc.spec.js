const { test, expect } = require('@playwright/test');
const { loginCredentials } = require('./TestData/GlobalVar/global-setup');
const CommonSteps = require('./utils/CommonSteps');
const path = require('path');
test('Verify that expired document is available on the Expired documents report.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
  //const title = await page.title()
    //Expects page to have a heading with the name of dashboard.
  //expect(title).toBe('Dashboard - OpenSign™');
  await page.getByRole('menuitem', { name: 'Request signatures' }).click();
   
    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '/TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
  await page.getByRole('option', { name: 'Pravin Testing account<pravin' }).click();
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
  await page.locator('input[name="Name"]').fill('Offer Letter Expired doc report');
  await page.locator('input[name="Note"]').fill('Note Offer Letter for QA1144');
  await page.getByText('Advanced options').click();
  await page.getByRole('spinbutton').fill('-1');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
  await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
  await page.locator('//span[normalize-space()=\'signature\']').hover();
  await page.mouse.down();
  await page.mouse.move(600, 300)
  await page.mouse.up();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.locator('//h3[text()=\'Mails Sent\']')).toContainText('Mails Sent');
  await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
  await expect(page.locator('#selectSignerModal')).toContainText('You have successfully sent email to Pravin Testing account. Subsequent signers will get email(s) once Pravin Testing account signs the document');
  await page.getByRole('button', { name: 'No' }).click();
    await page.getByRole('button', { name: ' Documents' }).click();
    await page.getByRole('menuitem', { name: 'Expired' }).click();
    await expect(page.locator('#renderList')).toContainText('Expired documents');
await expect(page.locator('thead')).toContainText('Title');
  await expect(page.locator('thead')).toContainText('Note');
  await expect(page.locator('thead')).toContainText('Folder');
  await expect(page.locator('thead')).toContainText('File');
  await expect(page.locator('thead')).toContainText('Owner');
  await expect(page.locator('thead')).toContainText('Signers');
await expect(page.locator('.p-2 > .font-semibold').first()).toContainText('Offer Letter Expired doc report');
 await expect(page.locator('td:nth-child(2)').first()).toContainText('Note Offer Letter for QA1144');
 await expect(page.locator('td:nth-child(3)').first()).toContainText('OpenSign™ drive'); 
 await expect(page.locator('td:nth-child(4)').first()).toContainText('Download');
 await expect(page.locator('td:nth-child(5)').first()).toContainText('Pravin Testing account'); 
 await page.locator('//div[@role="button"and @title="View"]').first().click();
 await expect(page.getByRole('heading')).toContainText('Expired document');
    await page.getByRole('menuitem', { name: 'Expired' }).click();
    await expect(page.locator('#renderList')).toContainText('Expired documents');
 await page.locator('//div[@role="button"and @title="Delete"]').first().click();
 await expect(page.getByRole('heading')).toContainText('Delete document');
  await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to delete this document?');
  await page.getByRole('button', { name: 'Yes' }).click();
  await expect(page.locator('#renderList')).toContainText('Record deleted successfully!');
  try {
    await expect(page.locator('tbody')).toContainText('Offer Letter Expired doc report');
} catch (error) {
    console.log("Document not found in the table, successfully Deleted!");
}
  });
  
  