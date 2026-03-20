const { test, expect } = require('@playwright/test');
const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const CommonSteps = require('../utils/CommonSteps');
const path = require('path');
test.describe('Expired documents', () => {
  /*
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
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
  await page.getByRole('option', { name: 'Pravin Testing account<pravin' }).click();
  await page.locator('input[name="Name"]').click();
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
  await page.locator('input[name="Name"]').fill('Offer Letter Expired doc report');
  await page.locator('input[name="Note"]').fill('Note Offer Letter for QA1144');
  await page.getByText('Advanced options').click();
  await page.getByRole('spinbutton').fill('10');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
  await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
  await page.locator('//span[normalize-space()=\'signature\']').hover();
  await page.mouse.down();
  await page.mouse.move(600, 300)
  await page.mouse.up();
  try {
    const rowLocator = page.locator('//div[contains(@class,"signYourselfBlock")]//div[contains(@class,"font-medium") and normalize-space(.)="signature-1"]');
  
    for (let i = 0; i < 5; i++) { // Retry up to 5 times
        if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        
            console.log("signature widget dragged and dropped");
            break; // Exit the loop if successfully clicked
        } else {
            console.log(`Attempt ${i + 1}: signature widget not visible on the document, performing actions...`);
    
            await page.locator('//span[normalize-space()="signature"]').hover();
            await page.mouse.down();
            await page.mouse.move(800, 300);
            await page.mouse.up();
            
            // Wait a bit before checking again
            await page.waitForTimeout(1000);
        }
    
        if (i === 5) {
            console.log("signature widget did not become visible on the document after multiple attempts.");
        }
    }
  } catch (error) {
    console.log("Element not found or not interactable, continuing execution.");
   
  }
  await page.getByRole('button', { name: 'Next' }).click();
   await page.locator("//div[i[contains(@class,'fa-envelope')] and .//span[text()='Send to Email']]").click();
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
  await expect(page.locator('#selectSignerModal')).toContainText('Subsequent signers will get email(s) once you sign the document.');
  await page.locator("//dialog[@id='selectSignerModal']//button[normalize-space()='No']").click();
  await page.locator('//div[contains(@class, "font-light") and contains(., "In-progress documents")]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//div[contains(@class, "font-light") and contains(., "In-progress documents")]')).toContainText('In-progress documents');
  //await page.locator("//div[contains(@class,'flex-none')]//button[i[contains(@class,'fa-bars')]]").click();
    await page.getByRole('button', { name: ' Documents' }).click();
    await page.getByRole('menuitem', { name: 'Expired' }).click();
    await expect(page.locator('//div[contains(@class, "font-light") and contains(., "Expired documents")]')).toContainText('Expired documents');
await expect(page.locator('thead')).toContainText('Title');
  await expect(page.locator('thead')).toContainText('Note');
  await expect(page.locator('thead')).toContainText('Folder');
  await expect(page.locator('thead')).toContainText('File');
  await expect(page.locator('thead')).toContainText('Owner');
  await expect(page.locator('thead')).toContainText('Signers');
await expect(page.locator('.p-2 > .font-semibold').first()).toContainText('Offer Letter Expired doc report');
 await expect(page.locator('td:nth-child(2)').first()).toContainText('Note Offer Letter for QA1144');
 await expect(page.locator('td:nth-child(3)').first()).toContainText('OpenSign™ Drive'); 
 await expect(page.locator('td:nth-child(4)').first()).toContainText('Download');
 await expect(page.locator('td:nth-child(5)').first()).toContainText('Pravin Testing account'); 
 await page.locator('//div[@role="button"and @title="View"]').first().click();
 await expect(page.getByRole('heading')).toContainText('Expired document');
    await page.getByRole('menuitem', { name: 'Expired' }).click();
    await expect(page.locator('//div[contains(@class, "font-light") and contains(., "Expired documents")]')).toContainText('Expired documents');
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
  /});*/
  
  test('Verify that pagination is functioning correctly in the Expired documents.', async ({ page }) => {
      const commonSteps = new CommonSteps(page);
      // Step 1: Navigate to Base URL and log in
      await commonSteps.navigateToBaseUrl();
      await commonSteps.login();
       await page.getByRole('button', { name: ' Documents' }).click();
    await page.getByRole('menuitem', { name: 'Expired' }).click();
await expect(page.locator('thead')).toContainText('Title');
      // Wait up to 90 seconds for the text to appear
      await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
      // Now assert the text
 await expect(page.locator('//div[contains(@class, "font-light") and contains(., "Expired documents")]')).toContainText('Expired documents');
      const title = await page.title();
      if (title === 'Expired Documents - OpenSign™') {
        console.log('Expired Documents - OpenSign™');
      } else {
        console.error(`Page title is incorrect. Expected: "Expired Documents - OpenSign™", Got: "${title}"`);
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
});
  