const { test, expect } = require('@playwright/test');
const { loginCredentials } = require('./TestData/GlobalVar/global-setup');
const CommonSteps = require('./utils/CommonSteps');
const path = require('path');

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
  await fileChooser.setFiles(path.join(__dirname, '/TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
  await page.getByRole('option', { name: 'Pravin Testing account<pravin' }).click();
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
await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();
await page.mouse.move(600, 500)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(600, 520)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'date\']').hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'text input\']').hover();
await page.mouse.down();
await page.mouse.move(600, 570)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'checkbox\']').hover();
await page.mouse.down();
await page.mouse.move(600, 600)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('span').filter({ hasText: 'dropdown' }).hover();
await page.mouse.down();
await page.mouse.move(800, 300)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'radio button\']').hover();
await page.mouse.down();
await page.mouse.move(800, 350)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'image\']').hover();
await page.mouse.down();
await page.mouse.move(800, 400)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(800, 400)
await page.mouse.up();
await page.getByRole('button', { name: 'Next' }).click();
//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();
await expect(page.locator('//h3[text()=\'Mails Sent\']')).toContainText('Mails Sent');
await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
await expect(page.locator('#selectSignerModal')).toContainText('You have successfully sent email to Pravin Testing account. Subsequent signers will get email(s) once Pravin Testing account signs the document');
  await page.getByRole('button', { name: 'No' }).click();
  await page.getByRole('button', { name: ' Documents' }).click();
  await page.getByRole('menuitem', { name: 'Need your sign' }).click();
 // Wait up to 90 seconds for the text to appear
await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
// Now assert the text
await expect(page.locator('#renderList')).toContainText('Need your sign');
  await page.locator('.op-btn-primary').first().click();
  await page.locator('//input[@type="checkbox" and @data-tut="IsAgree"]').click();
  await page.getByRole('button', { name: 'Agree & Continue' }).click();
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.getByText('Pravin Testing accountsignature').click();
  await page.mouse.down();
  await page.mouse.move(120, 122)
  await page.mouse.up();
  // Optionally save changes
await page.locator("//button[normalize-space()='Save']").click();
await page.getByText('Pravin Testing accountstamp').click();
const fileChooserPromise1 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '/TestData/Images/stamp.jpg'));
await page.locator("//button[normalize-space()='Save']").click();
await page.getByText('Pravin Testing accountinitials').click();
await page.mouse.move(650, 350)
await page.mouse.down();
await page.mouse.move(700, 380)
await page.mouse.up();
await page.locator("//button[normalize-space()='Save']").click();
await page.getByPlaceholder('name').fill('Mark Anderson');
  await page.getByPlaceholder('job title').click();
  await page.getByPlaceholder('job title').fill('Quality analyst');
  await page.getByPlaceholder('company').click();
  await page.getByPlaceholder('company').fill('Oepnsign labs pvt. ltd');
  await page.getByPlaceholder('text').fill('120 wood street sanfransisco');
  await page.locator('#myDropdown').selectOption('option-2');
 await page.getByRole('radio', { name: 'option-1' }).check();
  await page.getByRole('checkbox', { name: 'option-1' }).check();
  await page.getByText('Pravin Testing accountimage').click();
  const fileChooserPromise2 = page.waitForEvent('filechooser');
  await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
  const fileChooser2 = await fileChooserPromise2;
  await fileChooser2.setFiles(path.join(__dirname, '/TestData/Images/DesignerImage.png'));
  await page.locator("//button[normalize-space()='Save']").click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.locator('#selectSignerModal')).toContainText('Congratulations! 🎉 This document has been successfully signed by all participants!',{ timeout: 90000 });
  await expect(page.locator('#selectSignerModal').getByRole('button', { name: 'Print' })).toBeVisible();
  await expect(page.locator('#selectSignerModal').getByRole('button', { name: 'Certificate' })).toBeVisible();
  await expect(page.locator('#selectSignerModal').getByRole('button', { name: 'Download' })).toBeVisible();
  await page.getByRole('button', { name: '✕' }).click();
});

test('Verify the column names and the document details on the need your signature report.', async ({ page }) => {
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
await fileChooser.setFiles(path.join(__dirname, '/TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Pravin Testing account<pravin' }).click();
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
await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();
await page.mouse.move(600, 500)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(600, 520)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'date\']').hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'text input\']').hover();
await page.mouse.down();
await page.mouse.move(600, 570)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'checkbox\']').hover();
await page.mouse.down();
await page.mouse.move(600, 600)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('span').filter({ hasText: 'dropdown' }).hover();
await page.mouse.down();
await page.mouse.move(800, 300)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'radio button\']').hover();
await page.mouse.down();
await page.mouse.move(800, 350)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'image\']').hover();
await page.mouse.down();
await page.mouse.move(800, 400)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(800, 400)
await page.mouse.up();
await page.getByRole('button', { name: 'Next' }).click();
//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();
await expect(page.locator('//h3[text()=\'Mails Sent\']')).toContainText('Mails Sent');
await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
await expect(page.locator('#selectSignerModal')).toContainText('You have successfully sent email to Pravin Testing account. Subsequent signers will get email(s) once Pravin Testing account signs the document');
await page.getByRole('button', { name: 'No' }).click();
await page.getByRole('button', { name: ' Documents' }).click();
await page.getByRole('menuitem', { name: 'Need your sign' }).click();
// Wait up to 90 seconds for the text to appear
await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
// Now assert the text
await expect(page.locator('#renderList')).toContainText('Need your sign');
await expect(page.locator('thead')).toContainText('Title');
  await expect(page.locator('thead')).toContainText('Note');
  await expect(page.locator('thead')).toContainText('Folder');
  await expect(page.locator('thead')).toContainText('File');
  await expect(page.locator('thead')).toContainText('Owner');
  await expect(page.locator('thead')).toContainText('Signers');
  await expect(page.locator('.p-2 > .font-semibold').first()).toContainText('Sample-joining-letter');
 await expect(page.locator('td:nth-child(2)').first()).toContainText('Please review and sign this document');
 await expect(page.locator('td:nth-child(3)').first()).toContainText('OpenSign™ drive'); 
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
  await page.locator('#renderList').waitFor({ state: 'visible', timeout: 90000 });
  // Now assert the text
  await expect(page.locator('#renderList')).toContainText('Need your sign');
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

});