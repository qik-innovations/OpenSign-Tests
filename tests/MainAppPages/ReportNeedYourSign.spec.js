const { test, expect } = require('@playwright/test');
const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const CommonSteps = require('../utils/CommonSteps');
const path = require('path');
test.describe('Need your signature', () => {
test('Verify that owner can create the document and sign it from the need your signature report.', async ({ page }) => {
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
await commonSteps.dragAndDropSignatureWidget('signature', 600, 200);
await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 250)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'name\']').hover();
await page.mouse.down();
await page.mouse.move(600, 360)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();
await page.mouse.move(600, 400)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(600, 430)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'date\']').hover();
await page.mouse.down();
await page.mouse.move(600, 460)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'text input\']').hover();
await page.mouse.down();
await page.mouse.move(600, 490)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'checkbox\']').hover();
await page.mouse.down();
await page.mouse.move(600, 520)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('span').filter({ hasText: 'dropdown' }).hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'radio button\']').hover();
await page.mouse.down();
await page.mouse.move(600, 590)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'image\']').hover();
await page.mouse.down();
await page.mouse.move(600, 640)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(600, 700)
await page.mouse.up();
await page.getByRole('button', { name: 'Next' }).click();
   await page.locator("//div[i[contains(@class,'fa-envelope')] and .//span[text()='Send to Email']]").click();
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
  await expect(page.locator('#selectSignerModal')).toContainText('Subsequent signers will get email(s) once you sign the document.');
  await page.locator("//dialog[@id='selectSignerModal']//button[normalize-space()='No']").click();
  await page.getByRole('button', { name: ' Documents' }).click();
  await page.getByRole('menuitem', { name: 'Need your sign' }).click();
 // Wait up to 90 seconds for the text to appear
await page.locator('//div[contains(@class, "font-light") and contains(., "Need your sign")]').waitFor({ state: 'visible', timeout: 90000 });
// Now assert the text
await expect(page.locator('//div[contains(@class, "font-light") and contains(., "Need your sign")]')).toContainText('Need your sign');
  await page.locator('.op-btn-primary').first().click();
  await commonSteps.validateAndAcceptTerms();
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.locator('//div[contains(text(),"signature")]').click();
  await page.mouse.down();
  await page.mouse.move(120, 122)
  await page.mouse.up();
  // Optionally save changes
await commonSteps.clickNextButtonInSignerModal();
//div[contains(text(),'signature')]
await commonSteps.uploadStamp();
await commonSteps.clickNextButtonInSignerModal();
await commonSteps.clickNextButtonInSignerModal();
await commonSteps.fillTextField('name','Mark Anderson');
await commonSteps.clickNextButtonInSignerModal();
await commonSteps.fillTextField('job title','Quality analyst');
await commonSteps.clickNextButtonInSignerModal();
await commonSteps.fillTextField('company','Opensign labs pvt. ltd');
    await commonSteps.clickNextButtonInSignerModal();
   const today = new Date();
// Format the date as MM/DD/YYYY
const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/` +
                      `${today.getDate().toString().padStart(2, '0')}/` + 
                      `${today.getFullYear()}`;
console.log('Today\'s date:', formattedDate);  // Extract day number as text
//await commonSteps.clickDateFieldOnTheSignerPad(formattedDate);
await commonSteps.clickDateFieldOnTheSignerPad_Without_date();
// Function to get the day with the appropriate suffix
function getDayWithSuffix(day) {
  if (day >= 11 && day <= 13) return `${day}th`;
  switch (day % 10) {
    case 1: return `${day}st`;

    case 2: return `${day}nd`;  
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }   
}
// Calculate the target date (today + 2 days)
today.setDate(today.getDate() + 2);
const dayOfWeek = today.toLocaleString('default', { weekday: 'long' }); // e.g., "Friday" 
const month = today.toLocaleString('default', { month: 'long' });       // e.g., "May"
const day = today.getDate();                                            // e.g., 2
const year = today.getFullYear();                                       // e.g., 2025
const dayWithSuffix = getDayWithSuffix(day);
const ariaLabelValue = `Choose ${dayOfWeek}, ${month} ${dayWithSuffix}, ${year}`;
await commonSteps.selectCalendarDateByLabel(ariaLabelValue);
    await commonSteps.clickNextButtonInSignerModal();
  await commonSteps.fillTextField('text','120 wood street Sanfransisco');
    await commonSteps.clickNextButtonInSignerModal();
    await commonSteps.selectCheckbox('Option-1');
 await commonSteps.clickNextButtonInSignerModal();
 await commonSteps.selectRadioButton('Option-1');
    await commonSteps.clickNextButtonInSignerModal();
  await commonSteps.uploadImage();
   await commonSteps.clickNextButtonInSignerModal();
   await commonSteps.fillTextField('demo@gmail.com','pravin@opensign.me');
    await commonSteps.clickNextButtonInSignerModal();
    await commonSteps.selectFromDropdown('myDropdown','Option-1');
    await commonSteps.clickNextButtonInSignerModal();
  await commonSteps.clickDoneButtonInSignerModal();
await commonSteps.clickFinishButtonInSignerModal();
  await expect(page.locator('#selectSignerModal')).toContainText('Congratulations! 🎉 This document has been successfully signed by all participants!',{ timeout: 90000 });
  await expect(page.locator('#selectSignerModal').getByRole('button', { name: 'Print' })).toBeVisible();
  await expect(page.locator('#selectSignerModal').getByRole('button', { name: 'Certificate' })).toBeVisible();
  await expect(page.locator('#selectSignerModal').getByRole('button', { name: 'Download' })).toBeVisible();
  await page.getByRole('button', { name: '✕' }).click();
});

test('Verify the column name and the document details on the need your signature report.', async ({ page }) => {
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
await page.mouse.move(600, 250)
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
          await page.mouse.move(600, 250);
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
await page.getByRole('button', { name: ' Documents' }).click();
await page.getByRole('menuitem', { name: 'Need your sign' }).click();
// Wait up to 90 seconds for the text to appear
await page.locator('//div[contains(@class, "font-light") and contains(., "Need your sign")]').waitFor({ state: 'visible', timeout: 90000 });
// Now assert the text
await expect(page.locator('//div[contains(@class, "font-light") and contains(., "Need your sign")]')).toContainText('Need your sign');
await expect(page.locator('thead')).toContainText('Title');
  await expect(page.locator('thead')).toContainText('Note');
  await expect(page.locator('thead')).toContainText('Folder');
  await expect(page.locator('thead')).toContainText('File');
  await expect(page.locator('thead')).toContainText('Owner');
  await expect(page.locator('thead')).toContainText('Signers');
  await expect(page.locator('.p-2 > .font-semibold').first()).toContainText('Sample-joining-letter');
 await expect(page.locator('td:nth-child(2)').first()).toContainText('Please review and sign this document');
 await expect(page.locator('td:nth-child(3)').first()).toContainText('OpenSign™ Drive'); 
 await expect(page.locator('td:nth-child(4)').first()).toContainText('Download');
 await expect(page.locator('td:nth-child(5)').first()).toContainText('Pravin Testing account');  
 await expect(page.locator('td:nth-child(6)').first()).toContainText('SENT'); 
 await expect(page.locator('td:nth-child(6)').first()).toContainText('pravin+testaccount@nxglabs.in'); 

});

test('Verify that pagination is functioning correctly in the need your signature table.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
  await page.getByRole('button', { name: ' Documents' }).click();
  await page.getByRole('menuitem', { name: 'Need your sign' }).click();
  // Wait up to 90 seconds for the text to appear
  await page.locator('//div[contains(@class, "font-light") and contains(., "Need your sign")]').waitFor({ state: 'visible', timeout: 90000 });
  // Now assert the text
  await expect(page.locator('//div[contains(@class, "font-light") and contains(., "Need your sign")]')).toContainText('Need your sign');
  const title = await page.title();
  if (title === 'Need your sign - OpenSign™') {
    console.log('Need your sign - OpenSign™');
  } else {
    console.error(`Page title is incorrect. Expected: "Need your sign - OpenSign™", Got: "${title}"`);
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

});});