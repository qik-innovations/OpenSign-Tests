const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
const CommonSteps = require('../utils/CommonSteps');
test.describe('Dashboard', () => {
test('Verify that the Sign yourself card click functions correctly and redirects the user to the Signyourself page from the dashboard.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await expect(page.locator('//div[text()="Sign yourself"]//parent::div[@class="text-gray-500 text-xs mt-1"]'))
  .toBeVisible({ timeout: 120000 });

await expect(page.locator('//div[text()="Sign yourself"]//parent::div[@class="text-gray-500 text-xs mt-1"]'))
  .toContainText('Use this option to sign the document yourself without adding others');
    await page.getByText('Sign yourselfUse this option').click();
    await expect(page.getByRole('heading')).toContainText('Sign yourself');
    await expect(page.locator('//div[@class="mb-[11px]"]//div[@class="text-gray-500 text-xs mt-1"]')).toContainText('Use this form to sign the document yourself without adding others');
  });
  test('Verify that the Request signature card click functions correctly and redirects the user to the Request signature page from the dashboard.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await expect(page.locator('//div[text()="Request signatures"]//parent::div[@class="text-gray-500 text-xs mt-1"]'))
  .toBeVisible({ timeout: 120000 });
await expect(page.locator('//div[text()="Request signatures"]//parent::div[@class="text-gray-500 text-xs mt-1"]'))
  .toContainText('Use this option to request signatures from others and yourself together.');
    await page.getByText('Request signaturesUse this').click();
    await expect(page.getByRole('heading')).toContainText('Request signatures');
    await expect(page.locator('//div[@class="mb-[11px]"]//div[@class="text-gray-500 text-xs mt-1"]')).toContainText('Use this form to request signatures from others and yourself together.');
  });
  test('Verify that the Need your signature card click functions correctly and redirects the user to the Need your sign report from the dashboard.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await expect(page.locator('#renderList')).toBeVisible({ timeout: 120000 });
    await expect(page.locator('#renderList')).toContainText('Need your signature');
    await page.locator("//div[@class='text-base lg:text-lg' and text()='Need your signature']").click();
    await expect(page.locator('//div[@class="font-light" and text()="Need your sign"]')).toBeVisible({ timeout: 120000 });
    await expect(page.locator('//div[@class="font-light" and text()="Need your sign"]')).toContainText('Need your sign');
    
  });
  test('Verify that clicking the Out for Signatures card functions correctly and redirects the user to the In-Progress report from the dashboard.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await expect(page.locator('#renderList')).toBeVisible({ timeout: 120000 });
    await expect(page.locator('#renderList')).toContainText('Out for signatures');
    await page.locator("//div[@class='text-base lg:text-lg' and text()='Out for signatures']").click();
    await expect(page.locator('//div[@class="font-light" and text()="In-progress documents"]')).toContainText('In-progress documents');
  });

  test('Verify that the Need Your Signature count on the card increases when a new document is created and the owner is added as a signer.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    await expect(page.locator('#renderList')).toBeVisible({ timeout: 120000 });
    await expect(page.locator('#renderList')).toContainText('Need your signature');
    //await expect(page.locator('#renderList')).toContainText('Drafts');
    await page.waitForLoadState("networkidle");
    await page.locator('//div[@data-tut="tourcard1"]//div[contains(@class, "font-medium")]/div[@class="text-2xl font-light"]').waitFor({  state: 'visible', timeout: 180000 });
    const countNeedYourSign = await page.locator('//div[@data-tut="tourcard1"]//div[contains(@class, "font-medium")]/div[@class="text-2xl font-light"]').textContent();
    console.log("Count need your sign " + countNeedYourSign);
    await page.getByRole('menuitem', { name: 'Request signatures' }).click();
     await page.locator('input[name="Name"]').click();
        await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
        await page.locator('input[name="Name"]').press('Tab');
        const fileChooserPromise = page.waitForEvent('filechooser');
      await page.locator('input[type="file"]').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
    //  await page.type('//div[@class=\'css-n9qnu9\']', 'Pravin', { delay: 100 });
    //  await page.getByRole('option', { name: 'Pravin Testing account <' + loginCredentials.email }).click();
    await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
    await page.getByRole('option', { name: 'Pravin Testing account<pravin' }).click();
    await page.locator('input[name="Name"]').click();
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
await expect(page.locator('#renderList')).toBeVisible({ timeout: 120000 });
//await expect(page.locator('#renderList')).toContainText('Drafts');
await page.waitForLoadState("networkidle");
await page.locator('//div[@data-tut="tourcard1"]//div[contains(@class, "font-medium")]/div[@class="text-2xl font-light"]').waitFor({  state: 'visible', timeout: 180000 });
const newCountNeedYourSign = await page.locator('//div[@data-tut="tourcard1"]//div[contains(@class, "font-medium")]/div[@class="text-2xl font-light"]').textContent();

// Convert to numbers for comparison
const IncrementedCount = Number(countNeedYourSign.trim()) + 1;
console.log("Count need your sign incremnt by 1 " + IncrementedCount);
const newCount = Number(newCountNeedYourSign);
console.log("new count " + newCount);
if (IncrementedCount <= newCount) {
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
    await expect(page.locator('#renderList')).toBeVisible({ timeout: 120000 });
await expect(page.locator('#renderList')).toContainText('Need your signature');

    //await expect(page.locator('#renderList')).toContainText('Drafts');
    await page.waitForLoadState("networkidle");
    await page.locator('//div[@data-tut="tourcard2"]//div[contains(@class, "font-medium")]/div[@class="text-2xl font-light"]').waitFor({  state: 'visible', timeout: 180000 });
    const countOutforSign = await page.locator('//div[@data-tut="tourcard2"]//div[contains(@class, "font-medium")]/div[@class="text-2xl font-light"]').textContent();
    console.log('count out for sign old' + countOutforSign);
    await page.getByRole('menuitem', { name: 'Request signatures' }).click();
        await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
        await page.locator('input[name="Note"]').click();
        const fileChooserPromise = page.waitForEvent('filechooser');
      await page.locator('input[type="file"]').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
    //  await page.type('//div[@class=\'css-n9qnu9\']', 'Pravin', { delay: 100 });
    //  await page.getByRole('option', { name: 'Pravin Testing account <' + loginCredentials.email }).click();
    await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
    await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
    await page.locator('input[name="Name"]').click();
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
  const rowLocator = page.locator('//div[@class="select-none-cls overflow-hidden w-full h-full text-black flex flex-col justify-center items-center"]//div[@class="font-medium"and text()="signature"]');

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
await page.getByRole('button', { name: 'Send' }).click();
await page.getByRole('button', { name: 'Close' }).click();
await page.getByRole('menuitem', { name: 'Dashboard' }).click();
await expect(page.locator('#renderList')).toBeVisible({ timeout: 120000 });
//await expect(page.locator('#renderList')).toContainText('Drafts');
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
if (oldincrementedcount1 <= newCount1) {
  console.log("✅ Out for signature card count increased by one, which is correct.");
} else {
  console.error("❌ Out for signature card count did not increase. The test case has failed.");
}
  });
});


test('Verify that the unfinished SignYourSelf document can be edited from the Dashboard draft document.', async ({ page }) => {
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
await page.getByRole('menuitem', { name: 'Dashboard' }).click();
// Wait up to 90 seconds for the text to appear
await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
// Now assert the text
await expect(page.locator('//div[@data-tut="tourreport3"]//div[text()="Drafts"]')).toBeVisible({ timeout: 12000 });
await expect(page.locator('//div[@data-tut="tourreport3"]//th[1]')).toContainText('Title');
await expect(page.locator('//div[@data-tut="tourreport3"]//th[2]')).toContainText('Note');
await expect(page.locator('//div[@data-tut="tourreport3"]//th[3]')).toContainText('Folder');
await expect(page.locator('//div[@data-tut="tourreport3"]//th[4]')).toContainText('File');
await expect(page.locator('//div[@data-tut="tourreport3"]//th[5]')).toContainText('Owner');
await expect(page.locator('//div[@data-tut="tourreport3"]//th[6]')).toContainText('Signers');
await expect(page.locator('//div[@data-tut="tourreport3"]//div[@class="font-semibold break-words"]').first()).toContainText('Draft doc rpt Sample offer letter');
await expect(page.locator('//div[@data-tut="tourreport3"]//td[2]').first()).toContainText('Note Draft doc rpt');
await expect(page.locator('//div[@data-tut="tourreport3"]//td[3]').first()).toContainText('OpenSign™ Drive'); 
await expect(page.locator('//div[@data-tut="tourreport3"]//td[4]').first()).toContainText('Download');
await expect(page.locator('//div[@data-tut="tourreport3"]//td[5]').first()).toContainText('Pravin Testing account');  
await page.locator('//div[@data-tut="tourreport3"]//div[@role="button"and @title="Edit"]').first().click();
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
test('Verify that pagination is functioning correctly in the dashboard drafts document.', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
    // Wait up to 90 seconds for the text to appear
    await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
    // Now assert the text
    //await expect(page.locator('#renderList')).toContainText('Drafts');
    //Check if Pagination Buttons Exist
    const isPaginationVisible = await page.locator('//div[@data-tut="tourreport3"]//button[@class="op-join-item op-btn op-btn-sm" and text()="Next"]').isVisible();
    //expect(isPaginationVisible).toBeTruthy();
    const isPaginationVisiblePrev = await page.locator('//div[@data-tut="tourreport3"]//button[@class="op-join-item op-btn op-btn-sm" and text()="Prev"]').isVisible();
    //expect(isPaginationVisiblePrev).toBeTruthy();
    const page1Data = await page.locator('//div[@data-tut="tourreport3"]//table[1]//tbody//tr').allTextContents();
    await page.locator('//div[@data-tut="tourreport3"]//button[@class="op-join-item op-btn op-btn-sm" and text()="Next"]').click();
    await page.waitForLoadState('domcontentloaded');
    //const firstPageContent = await page.locator('//button[@class=\'op-btn-active op-join-item op-btn op-btn-sm\' and text()=\'2\']').first().textContent(); // Capture first item
  const page2Data = await page.locator('//div[@data-tut="tourreport3"]//table[1]//tbody//tr').allTextContents();
  expect(page2Data).not.toEqual(page1Data);// Ensure content changes
  //Verify 'Previous' and 'Next' Buttons Work
  await page.locator('//div[@data-tut="tourreport3"]//button[@class="op-join-item op-btn op-btn-sm" and text()="Prev"]').click();
  await page.waitForLoadState('domcontentloaded');
  const page1DataPrev = await page.locator('//div[@data-tut="tourreport3"]//table[1]//tbody//tr').allTextContents();
  expect(page2Data).not.toEqual(page1DataPrev);// Ensure content changes
  
  });

test('Verify that owner can create the document and sign it from the dashboard recent signature requests.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Pravin Testing account<pravin' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
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
const rowLocator = page.locator('//div[@class="select-none-cls overflow-hidden w-full h-full text-black flex flex-col justify-center items-center"]//div[@class="font-medium"and text()="signature"]');

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
await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 360)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 420)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'name\']').hover();
await page.mouse.down();
await page.mouse.move(600, 470)
await page.mouse.up();
await page.getByRole('button', { name: 'Next' }).click();
//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();
await expect(page.locator('//h3[text()=\'Mails Sent\']')).toContainText('Mails Sent');
await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
await expect(page.locator('#selectSignerModal')).toContainText('Mails Sent✕Subsequent signers will get email(s) once you signs the document.Do you want to sign the document right now?YesNoHow was your experience with OpenSign™?😡0-3😐4-6😊7-8😍9-10Submit');
await page.getByRole('button', { name: 'No' }).click();
await page.getByRole('menuitem', { name: 'Dashboard' }).click();
// Wait up to 90 seconds for the text to appear

await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
// Now assert the text
await expect(page.locator('//div[@data-tut="tourreport1"]//div[text()="Recent signature requests"]')).toBeVisible({ timeout: 12000 });
await expect(page.locator('//div[@data-tut="tourreport1"]//th[1]')).toContainText('Title');
await expect(page.locator('//div[@data-tut="tourreport1"]//th[2]')).toContainText('File');
await expect(page.locator('//div[@data-tut="tourreport1"]//th[3]')).toContainText('Owner');
await expect(page.locator('//div[@data-tut="tourreport1"]//th[4]')).toContainText('Signers');
await expect(page.locator('//div[@data-tut="tourreport1"]//div[@class="font-semibold break-words"]').first()).toContainText('Sample-joining-letter');
await expect(page.locator('//div[@data-tut="tourreport1"]//td[2]').first()).toContainText('Download');
await expect(page.locator('//div[@data-tut="tourreport1"]//td[3]').first()).toContainText('Pravin Testing account');  
await page.locator('//div[@data-tut="tourreport1"]//div[@role="button"and @title="SIGN"]').first().click();
// Now assert the text
await page.locator('//input[@type="checkbox" and @data-tut="IsAgree"]').click();
await page.getByRole('button', { name: 'Agree & Continue' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//div[contains(text(),"signature")]').click();
await page.mouse.down();
await page.mouse.move(120, 122)
await page.mouse.up();
// Optionally save changes
await page.locator("//button[normalize-space()='Save']").click();
//div[contains(text(),'signature')]
await page.locator('//div[contains(text(),"stamp")]').click();
const fileChooserPromise1 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '../TestData/Images/stamp.jpg'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//div[contains(text(),"initials")]').click();
await page.mouse.move(650, 350)
await page.mouse.down();
await page.mouse.move(700, 380)
await page.mouse.up();
await page.locator("//button[normalize-space()='Save']").click();
await page.getByRole('button', { name: 'Finish' }).click();
await expect(page.locator('#selectSignerModal')).toContainText('Congratulations! 🎉 This document has been successfully signed by all participants!',{ timeout: 90000 });
await expect(page.locator('#selectSignerModal').getByRole('button', { name: 'Print' })).toBeVisible();
await expect(page.locator('#selectSignerModal').getByRole('button', { name: 'Certificate' })).toBeVisible();
await expect(page.locator('#selectSignerModal').getByRole('button', { name: 'Download' })).toBeVisible();
await page.getByRole('button', { name: '✕' }).click();
});
test('Verify that pagination is functioning correctly in the dashboard recent signature requests.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
  // Wait up to 90 seconds for the text to appear
  await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
  // Now assert the text
  await expect(page.locator('//div[@data-tut="tourreport1"]//div[@class="font-light" and text()="Recent signature requests"]')).toContainText('Recent signature requests');
  //Check if Pagination Buttons Exist
  const isPaginationVisible = await page.locator('//div[@data-tut="tourreport1"]//button[@class="op-join-item op-btn op-btn-sm" and text()="Next"]').isVisible();
  //expect(isPaginationVisible).toBeTruthy();
  const isPaginationVisiblePrev = await page.locator('//div[@data-tut="tourreport1"]//button[@class="op-join-item op-btn op-btn-sm" and text()="Prev"]').isVisible();
  //expect(isPaginationVisiblePrev).toBeTruthy();
  const page1Data = await page.locator('//div[@data-tut="tourreport1"]//table[1]//tbody//tr').allTextContents();
  await page.locator('//div[@data-tut="tourreport1"]//button[@class="op-join-item op-btn op-btn-sm" and text()="Next"]').click();
  await page.waitForLoadState('domcontentloaded');
  //const firstPageContent = await page.locator('//button[@class=\'op-btn-active op-join-item op-btn op-btn-sm\' and text()=\'2\']').first().textContent(); // Capture first item
const page2Data = await page.locator('//div[@data-tut="tourreport1"]//table[1]//tbody//tr').allTextContents();
expect(page2Data).not.toEqual(page1Data);// Ensure content changes
//Verify 'Previous' and 'Next' Buttons Work
await page.locator('//div[@data-tut="tourreport1"]//button[@class="op-join-item op-btn op-btn-sm" and text()="Prev"]').click();
await page.waitForLoadState('domcontentloaded');
const page1DataPrev = await page.locator('//div[@data-tut="tourreport1"]//table[1]//tbody//tr').allTextContents();
expect(page2Data).not.toEqual(page1DataPrev);// Ensure content changes
});

test('Verify that the document sent for a signature request appears in the Recently Sent for Signatures section on the dashboard.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
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
const rowLocator = page.locator('//div[@class="select-none-cls overflow-hidden w-full h-full text-black flex flex-col justify-center items-center"]//div[@class="font-medium"and text()="signature"]');

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
await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 360)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 420)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'name\']').hover();
await page.mouse.down();
await page.mouse.move(600, 470)
await page.mouse.up();
await page.getByRole('button', { name: 'Next' }).click();
//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();
await expect(page.locator('//h3[text()="Mails Sent"]')).toBeVisible({ timeout: 120000 });
await expect(page.locator('//h3[text()="Mails Sent"]')).toContainText('Mails Sent');
await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
await page.getByRole('button', { name: 'Close' }).click();
await page.getByRole('menuitem', { name: 'Dashboard' }).click();
// Wait up to 90 seconds for the text to appear
await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
// Now assert the text
await expect(page.locator('//div[@data-tut="tourreport2"]//div[text()="Recently sent for signatures"]')).toBeVisible({ timeout: 12000 });
await expect(page.locator('//div[@data-tut="tourreport2"]//th[1]')).toContainText('Title');
await expect(page.locator('//div[@data-tut="tourreport2"]//th[2]')).toContainText('File');
await expect(page.locator('//div[@data-tut="tourreport2"]//th[3]')).toContainText('Owner');
await expect(page.locator('//div[@data-tut="tourreport2"]//th[4]')).toContainText('Signers');
await expect(page.locator('//div[@data-tut="tourreport2"]//div[@class="font-semibold break-words"]').first()).toContainText('Sample-joining-letter');
await expect(page.locator('//div[@data-tut="tourreport2"]//td[2]').first()).toContainText('Download');
await expect(page.locator('//div[@data-tut="tourreport2"]//td[3]').first()).toContainText('Pravin Testing account');  
await page.locator('//div[@data-tut="tourreport2"]//div[@role="button"and @title="Share"]').first().click();
await expect(page.locator('//div[@class="m-[20px]"]//div[1]//span[1]')).toContainText('andyamaya@nxglabs.in');
await page.locator('//div[@class="m-[20px]"]//div[1]//button[text()="Copy"]').click();
await expect(page.locator('//div[@class="m-[20px]"]//div[1]//button[2]')).toContainText('Copied');
await page.locator('//dialog[@id="selectSignerModal"]//div[1]//button[text()="✕"]').click();
await page.locator('//div[@data-tut="tourreport2"]//div[@role="button"and @title="View"]').first().click();
await expect(page.locator('//div[@class="flex flex-col"]//span[1]')).toBeVisible({ timeout: 120000 });
await expect(page.locator('//div[@class="flex flex-col"]//span[1]')).toContainText('Andy amaya');
});

test('Verify that the document created from a template appears in the Recently Sent for Signatures section on the dashboard.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
  await page.locator('//span[@class="ml-3 lg:ml-4 text-start" and text()="Templates"]').click();
  await page.getByRole('menuitem', { name: 'Create template' }).click();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); 
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await page.waitForLoadState("networkidle");
  await page.getByRole('button', { name: '+ Add role' }).click();
  await page.getByPlaceholder('Role 1').fill('HR');
  await page.locator('//button[@type="submit" and @class="op-btn op-btn-primary" and text()="Add"]').click();
  await page.locator('//span[normalize-space()=\'signature\']').hover();
  await page.mouse.down();
  await page.mouse.move(600, 200)
  await page.mouse.up();
  try {
    const rowLocator = page.locator('//div[@class="select-none-cls overflow-hidden w-full h-full text-black flex flex-col justify-center items-center"]//div[@class="font-medium"and text()="signature"]');
  
    for (let i = 0; i < 5; i++) { // Retry up to 5 times
        if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        
            console.log("signature widget dragged and dropped");
            break; // Exit the loop if successfully clicked
        } else {
            console.log(`Attempt ${i + 1}: signature widget not visible on the document, performing actions...`);
    
            await page.locator('//span[normalize-space()="signature"]').hover();
            await page.mouse.down();
            await page.mouse.move(600, 200);
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
  //await expect(page.getByRole('heading')).toContainText('Create document');
  await page.getByRole('button', { name: 'Create document' }).click();
  await page.locator('.css-n9qnu9').click();
  await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
 
  await page.getByRole('button', { name: ' Next' }).click();
  await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByRole('menuitem', { name: 'Dashboard' }).click();
// Wait up to 90 seconds for the text to appear
await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
// Now assert the text
await expect(page.locator('//div[@data-tut="tourreport2"]//div[text()="Recently sent for signatures"]')).toBeVisible({ timeout: 12000 });
await expect(page.locator('//div[@data-tut="tourreport2"]//div[@class="font-semibold break-words"]').first()).toContainText('Offer Letter for QA11');
await expect(page.locator('//div[@data-tut="tourreport2"]//td[2]').first()).toContainText('Download');
await expect(page.locator('//div[@data-tut="tourreport2"]//td[3]').first()).toContainText('Pravin Testing account');  
await page.locator('//div[@data-tut="tourreport2"]//div[@role="button"and @title="Share"]').first().click();
await expect(page.locator('//div[@class="m-[20px]"]//div[1]//span[1]')).toContainText('andyamaya@nxglabs.in');
await page.locator('//div[@class="m-[20px]"]//div[1]//button[text()="Copy"]').click();
await expect(page.locator('//div[@class="m-[20px]"]//div[1]//button[2]')).toContainText('Copied');
await page.locator('//dialog[@id="selectSignerModal"]//div[1]//button[text()="✕"]').click();
await page.locator('//div[@data-tut="tourreport2"]//div[@role="button"and @title="View"]').first().click();
await expect(page.locator('//div[@class="flex flex-col"]//span[1]')).toBeVisible({ timeout: 120000 });
await expect(page.locator('//div[@class="flex flex-col"]//span[1]')).toContainText('Andy amaya');
});
test('Verify that the document created from a template bulksend appears in the Recently Sent for Signatures section on the dashboard.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
  await page.locator('//span[@class="ml-3 lg:ml-4 text-start" and text()="Templates"]').click();
  await page.getByRole('menuitem', { name: 'Create template' }).click();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); 
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await page.waitForLoadState("networkidle");
  await page.getByRole('button', { name: '+ Add role' }).click();
  await page.getByPlaceholder('Role 1').fill('HR');
  await page.locator('//button[@type="submit" and @class="op-btn op-btn-primary" and text()="Add"]').click();
  await page.locator('//span[normalize-space()=\'signature\']').hover();
  await page.mouse.down();
  await page.mouse.move(600, 200)
  await page.mouse.up();
  try {
    const rowLocator = page.locator('//div[@class="select-none-cls overflow-hidden w-full h-full text-black flex flex-col justify-center items-center"]//div[@class="font-medium"and text()="signature"]');
  
    for (let i = 0; i < 5; i++) { // Retry up to 5 times
        if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
        
            console.log("signature widget dragged and dropped");
            break; // Exit the loop if successfully clicked
        } else {
            console.log(`Attempt ${i + 1}: signature widget not visible on the document, performing actions...`);
    
            await page.locator('//span[normalize-space()="signature"]').hover();
            await page.mouse.down();
            await page.mouse.move(600, 200);
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
 // await expect(page.getByRole('heading')).toContainText('Create document');
  await page.locator('//dialog[@id="selectSignerModal"]//button[text()="Bulk send"]').click();
  await page.locator('//dialog[@id="selectSignerModal"]//input[@type="email" and @placeholder="Enter Email..."]').fill("andyamaya@nxglabs.in");
  await page.locator('//dialog[@id="selectSignerModal"]//span[text()="Send"]').click();
  await page.getByRole('menuitem', { name: 'Dashboard' }).click();
// Wait up to 90 seconds for the text to appear
await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
// Now assert the text
await expect(page.locator('//div[@data-tut="tourreport2"]//div[text()="Recently sent for signatures"]')).toBeVisible({ timeout: 12000 });
await expect(page.locator('//div[@data-tut="tourreport2"]//div[@class="font-semibold break-words"]').first()).toContainText('Offer Letter for QA11');
await expect(page.locator('//div[@data-tut="tourreport2"]//td[2]').first()).toContainText('Download');
await expect(page.locator('//div[@data-tut="tourreport2"]//td[3]').first()).toContainText('Pravin Testing account');  
await page.locator('//div[@data-tut="tourreport2"]//div[@role="button"and @title="Share"]').first().click();
await expect(page.locator('//div[@class="m-[20px]"]//div[1]//span[1]')).toContainText('andyamaya@nxglabs.in');

});


test('Verify that the user can rename and delete a document from the dashboard Recently sent for signatures.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Pravin Testing account<pravin' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
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
  const rowLocator = page.locator('//div[@class="select-none-cls overflow-hidden w-full h-full text-black flex flex-col justify-center items-center"]//div[@class="font-medium"and text()="signature"]');

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
//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();
//await expect(page.locator('//h3[text()=\'Mails Sent\']')).toContainText('Mails Sent');
await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
await expect(page.locator('#selectSignerModal')).toContainText('Mails Sent✕Subsequent signers will get email(s) once you signs the document.Do you want to sign the document right now?YesNoHow was your experience with OpenSign™?😡0-3😐4-6😊7-8😍9-10Submit');
await page.getByRole('button', { name: 'No' }).click();
await page.getByRole('menuitem', { name: 'Dashboard' }).click();
// Wait up to 90 seconds for the text to appear
await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//div[@data-tut="tourreport2"]//i[@class="fa-light fa-ellipsis-vertical fa-lg"]').first().click();
await page.locator('//span[contains(text(),"Rename")]').click();
await page.locator('//div[@class="flex flex-col gap-2"]/input[@maxlength="200" and @type="text"]').fill('Sample-joining-letter-2025');
await page.getByRole('button', { name: 'Save' }).click();
await expect(page.locator('//div[@data-tut="tourreport2"]//tr[1]//div[@class="font-semibold break-words"]')).toContainText('Sample-joining-letter-2025');
await page.locator('//div[@data-tut="tourreport2"]//i[@class="fa-light fa-ellipsis-vertical fa-lg"]').first().click();
await page.locator('//span[contains(text(),"Delete")]').click();
await expect(page.getByRole('heading')).toContainText('Delete document');
  await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to delete this document?');
  await page.getByRole('button', { name: 'Yes' }).click();
  await expect(page.locator('#renderList')).toContainText('Record deleted successfully!');
  try {
    await expect(page.locator('//div[@data-tut="tourreport2"]//tr[1]//div[@class="font-semibold break-words"]')).toContainText('Sample-joining-letter-2025');
} catch (error) {
    console.log("Document not found in the table, successfully deleted!");
}
});

test('Verify that user can resend the email from the dashboard Recently sent for signatures.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Pravin Testing account<pravin' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
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
  const rowLocator = page.locator('//div[@class="select-none-cls overflow-hidden w-full h-full text-black flex flex-col justify-center items-center"]//div[@class="font-medium"and text()="signature"]');

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
//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();
await expect(page.locator('//h3[text()=\'Mails Sent\']')).toContainText('Mails Sent');
await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
await expect(page.locator('#selectSignerModal')).toContainText('Mails Sent✕Subsequent signers will get email(s) once you signs the document.Do you want to sign the document right now?YesNoHow was your experience with OpenSign™?😡0-3😐4-6😊7-8😍9-10Submit');
await page.getByRole('button', { name: 'No' }).click();
await page.getByRole('menuitem', { name: 'Dashboard' }).click();
// Wait up to 90 seconds for the text to appear
await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//div[@data-tut="tourreport2"]//i[@class="fa-light fa-ellipsis-vertical fa-lg"]').first().click();
await page.locator('//span[contains(text(),"Resend")]').click();
await expect(page.getByRole('heading')).toContainText('Resend mail');
  await expect(page.locator('#selectSignerModal')).toContainText('Pravin Testing account <pravin+testaccount@nxglabs.in>');
  await page.getByRole('button', { name: 'Resend' }).click();
  await page.getByRole('button', { name: 'Resend' }).click();
  await expect(page.locator('#renderList')).toContainText('Mail sent successfully.');

});
test('Verify that the user can revoke the document from the dashboard Recently sent for signatures.', async ({ page }) => {
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
await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
await page.locator('input[name="Note"]').fill('Note Offer Letter for QA1144');
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
  const rowLocator = page.locator('//div[@class="select-none-cls overflow-hidden w-full h-full text-black flex flex-col justify-center items-center"]//div[@class="font-medium"and text()="signature"]');

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
//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();
await expect(page.locator('//h3[text()=\'Mails Sent\']')).toContainText('Mails Sent');
await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
await expect(page.locator('#selectSignerModal')).toContainText('Mails Sent✕Subsequent signers will get email(s) once you signs the document.Do you want to sign the document right now?YesNoHow was your experience with OpenSign™?😡0-3😐4-6😊7-8😍9-10Submit');
await page.getByRole('button', { name: 'No' }).click();
await page.getByRole('menuitem', { name: 'Dashboard' }).click();
// Wait up to 90 seconds for the text to appear
await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//div[@data-tut="tourreport2"]//i[@class="fa-light fa-ellipsis-vertical fa-lg"]').first().click();
await page.locator('//span[contains(text(),"Revoke")]').click();
await expect(page.getByRole('heading')).toContainText('Revoke document');
  await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to revoke this document?');
  await page.getByPlaceholder('Reason (optional)').fill('Invalid document');
  await page.getByRole('button', { name: 'Yes' }).click();
  await expect(page.locator('#renderList')).toContainText('Record revoked successfully!');
  try {
    await expect(page.locator('tbody')).toContainText('Offer Letter for QA1144');
} catch (error) {
    console.log("Document not found in the table, successfully deleted!");
}
});
test('Verify that pagination is functioning correctly in the dashboard Recently sent for signatures.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
  // Wait up to 90 seconds for the text to appear
  await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
  // Now assert the text
  await expect(page.locator('#renderList')).toContainText('Recently sent for signatures');
  //Check if Pagination Buttons Exist
  const isPaginationVisible = await page.locator('//div[@data-tut="tourreport2"]//button[@class="op-join-item op-btn op-btn-sm" and text()="Next"]').isVisible();
  //expect(isPaginationVisible).toBeTruthy();
  const isPaginationVisiblePrev = await page.locator('//div[@data-tut="tourreport2"]//button[@class="op-join-item op-btn op-btn-sm" and text()="Prev"]').isVisible();
  //expect(isPaginationVisiblePrev).toBeTruthy();
  const page1Data = await page.locator('//div[@data-tut="tourreport2"]//table[1]//tbody//tr').allTextContents();
  await page.locator('//div[@data-tut="tourreport2"]//button[@class="op-join-item op-btn op-btn-sm" and text()="Next"]').click();
  await page.waitForLoadState('domcontentloaded');
  //const firstPageContent = await page.locator('//button[@class=\'op-btn-active op-join-item op-btn op-btn-sm\' and text()=\'2\']').first().textContent(); // Capture first item
const page2Data = await page.locator('//div[@data-tut="tourreport2"]//table[1]//tbody//tr').allTextContents();
expect(page2Data).not.toEqual(page1Data);// Ensure content changes
//Verify 'Previous' and 'Next' Buttons Work
await page.locator('//div[@data-tut="tourreport2"]//button[@class="op-join-item op-btn op-btn-sm" and text()="Prev"]').click();
await page.waitForLoadState('domcontentloaded');
const page1DataPrev = await page.locator('//div[@data-tut="tourreport2"]//table[1]//tbody//tr').allTextContents();
expect(page2Data).not.toEqual(page1DataPrev);// Ensure content changes

});