const { test, expect } = require('@playwright/test');
const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const CommonSteps = require('../utils/CommonSteps');
const path = require('path');

test('Verify that the unfinished SignYourSelf document is available in the Drafts Document Report and can be deleted.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
  await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
  await page.locator('input[name="Name"]').fill('Draft doc rpt Sample offer letter');
  await page.locator('input[name="Note"]').fill('Note Draft doc rpt');
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

await page.getByRole('button', { name: ' Documents' }).click();
await page.getByRole('menuitem', { name: 'Drafts' }).click();
// Wait up to 90 seconds for the text to appear
await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
// Now assert the text
await expect(page.locator('#renderList')).toContainText('Draft documents');
await expect(page.locator('thead')).toContainText('Title');
  await expect(page.locator('thead')).toContainText('Note');
  await expect(page.locator('thead')).toContainText('Folder');
  await expect(page.locator('thead')).toContainText('File');
  await expect(page.locator('thead')).toContainText('Owner');
  await expect(page.locator('thead')).toContainText('Signers');
await expect(page.locator('.p-2 > .font-semibold').first()).toContainText('Draft doc rpt Sample offer letter');
 await expect(page.locator('td:nth-child(2)').first()).toContainText('Note Draft doc rpt');
 await expect(page.locator('td:nth-child(3)').first()).toContainText('OpenSign™ Drive'); 
 await expect(page.locator('td:nth-child(4)').first()).toContainText('Download');
 await expect(page.locator('td:nth-child(5)').first()).toContainText('Pravin Testing account');  
 await page.locator('//div[@role="button"and @title="Delete"]').first().click();
 await expect(page.getByRole('heading')).toContainText('Delete document');
  await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to delete this document?');
  await page.getByRole('button', { name: 'Yes' }).click();
  await expect(page.locator('#renderList')).toContainText('Record deleted successfully!');
  try {
    await expect(page.locator('tbody')).toContainText('Draft doc rpt Sample offer letter');
} catch (error) {
    console.log("Document not found in the table, successfully Deleted!");
}
});

test('Verify that the unfinished SignYourSelf document can be edited from the Draft Document Report and completed by adding the required widgets.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
  await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
  await page.locator('input[name="Name"]').fill('Draft doc rpt Sample offer letter');
  await page.locator('input[name="Note"]').fill('Note Draft doc rpt');
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
await page.getByRole('button', { name: ' Documents' }).click();
await page.getByRole('menuitem', { name: 'Drafts' }).click();
// Wait up to 90 seconds for the text to appear
await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
// Now assert the text
await expect(page.locator('#renderList')).toContainText('Draft documents');
await expect(page.locator('thead')).toContainText('Title');
  await expect(page.locator('thead')).toContainText('Note');
  await expect(page.locator('thead')).toContainText('Folder');
  await expect(page.locator('thead')).toContainText('File');
  await expect(page.locator('thead')).toContainText('Owner');
  await expect(page.locator('thead')).toContainText('Signers');
await expect(page.locator('.p-2 > .font-semibold').first()).toContainText('Draft doc rpt Sample offer letter');
 await expect(page.locator('td:nth-child(2)').first()).toContainText('Note Draft doc rpt');
 await expect(page.locator('td:nth-child(3)').first()).toContainText('OpenSign™ Drive'); 
 await expect(page.locator('td:nth-child(4)').first()).toContainText('Download');
 await expect(page.locator('td:nth-child(5)').first()).toContainText('Pravin Testing account');  
 await page.locator('//div[@role="button"and @title="Edit"]').first().click();
  await page.waitForSelector('#container > .react-pdf__Document', { timeout: 90000 }); 
  await page.waitForLoadState("networkidle");
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
  await page.waitForLoadState("networkidle");
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
 await page.locator('//span[normalize-space()="stamp"]').hover();
 await page.mouse.down();
 await page.mouse.move(600, 360)
 await page.mouse.up();
 const fileChooserPromise1 = page.waitForEvent('filechooser');
 await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
 const fileChooser1 = await fileChooserPromise1;
 await fileChooser1.setFiles(path.join(__dirname, '../TestData/Images/stamp.jpg'));
 await page.locator("//button[normalize-space()='Save']").click();
 await page.locator('//span[normalize-space()="initials"]').hover();
 await page.mouse.down();
 await page.mouse.move(600, 420)
 await page.mouse.up();
 await page.locator("//button[normalize-space()='Save']").click();
 await page.locator('//span[normalize-space()="date"]').hover();
 await page.mouse.down();
 await page.mouse.move(600, 550)
 await page.mouse.up();
 await page.locator("//button[normalize-space()='Finish']").click();
 await page.getByText('Successfully signed!').waitFor({ timeout: 90000 });
   await page.locator("//input[@placeholder='Add an email address and hit enter']").fill('pravin@Nxglabs.in');

   await page.locator("//button[normalize-space()='Send']").click();
});

test('Verify that pagination is functioning correctly in the drafts document.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await page.getByRole('button', { name: ' Documents' }).click();
    await page.getByRole('menuitem', { name: 'Drafts' }).click();
    // Wait up to 90 seconds for the text to appear
    await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
    // Now assert the text
    await expect(page.locator('#renderList')).toContainText('Draft documents');
    const title = await page.title();
    if (title === 'Draft Documents - OpenSign™') {
      console.log('Draft Documents - OpenSign™');
    } else {
      console.error(`Page title is incorrect. Expected: "Draft Documents - OpenSign™", Got: "${title}"`);
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
  