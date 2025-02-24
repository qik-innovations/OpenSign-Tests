const { test, expect } = require('@playwright/test');
const { loginCredentials } = require('./TestData/GlobalVar/global-setup');
const CommonSteps = require('./utils/CommonSteps');
const path = require('path');
import { chromium } from 'playwright';
test('Verify that a new user can create a template and use it to create the document for selfsign', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible();
  await page.locator('input[type="text"]').first().fill('Mathew Wade');
  //here we are creating the random email id
  let x = "pravin+" + Math.random() + "@nxglabs.in"
  await page.locator('#email').fill(x);
  await page.locator('input[type="tel"]').fill('8238988998');
  await page.locator('input[type="text"]').nth(1).fill('qikAi.com');
  await page.locator('input[type="text"]').nth(2).fill('Hr Execative');
  await page.locator('input[name="password"]').fill('Nxglabs@123');
  await page.locator('input[id="termsandcondition"]').click();
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByRole('heading', { name: 'OPENSIGN™ FREE' })).toBeVisible();
await page.locator('li').filter({ hasText: 'OPENSIGN™ FREEFreeBilled' }).getByRole('button').click();
    await page.getByLabel('Close').click();
    // Expects page to have a heading with the name of dashboard.
    const title = await page.title()
       expect(title).toBe('Dashboard - OpenSign™');
  await page.locator('//span[@class="ml-3 lg:ml-4" and text()="Templates"]').click();
  await page.getByRole('menuitem', { name: 'Create template' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '/TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); 
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole('dialog')).toContainText('Clicking \'Add role\' button will allow you to add various signer roles. You can attach users to each role in subsequent steps.');
  await page.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page.getByRole('dialog')).toContainText('Once roles are added, select a role from list to add a place-holder where he is supposed to sign. The placeholder will appear in the same colour as the role name once you drop it on the document.');
  await page.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page.getByRole('dialog')).toContainText('Drag or click on a field to add it to the document.');
  await page.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page.getByRole('dialog')).toContainText('Drag the placeholder for a role anywhere on the document.Remember, it will appear in the same colour as the name of the recipient for easy reference.');
  await page.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page.getByRole('dialog')).toContainText('Clicking \'Next\' will store the current template. After saving, you’ll be prompted to create a new document from this template if you wish.');
  await page.getByLabel('Don\'t show this again').check();
  await page.getByLabel('Close').click();
  await page.getByRole('button', { name: '+ Add role' }).click();
  await page.getByPlaceholder('User').fill('HR');
  await page.locator('//button[@type="submit" and @class="op-btn op-btn-primary" and text()="Add"]').click();
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
   await page.waitForLoadState("networkidle");
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await page.waitForLoadState("networkidle");
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

await page.mouse.move(600, 480)
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
await page.mouse.move(600, 640)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'image\']').hover();
await page.mouse.down();
await page.mouse.move(670, 550)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();

await page.mouse.move(600, 580)
await page.mouse.up();
await page.getByRole('button', { name: 'Next' }).click();
await page.getByRole('button', { name: 'Create document' }).click();
  await page.locator('.css-n9qnu9').first().click();
  await page.locator('#selectSignerModal').getByText('HR').click();
  await page.locator('#selectSignerModal div').filter({ hasText: /^HR$/ }).getByRole('button').click();
  await page.getByLabel('Add yourself').check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: ' Next' }).click();
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
 // await expect(page.locator('#selectSignerModal')).toContainText('You have successfully sent email to Kelvin. Subsequent signers will get email(s) once Kelvin signs the document');
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.locator('//div[@class="flex flex-row items-center"]//input[@type="checkbox" and @data-tut="IsAgree"]').click();
    await page.getByRole('button', { name: 'Agree & Continue' }).click();
    await page.waitForLoadState("networkidle");
    await page.getByLabel('Don\'t show this again').check();
  await page.getByLabel('Close').click();
    await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
    await page.getByText('Mathew Wadesignature(HR)').click();
    await page.mouse.down();
    await page.mouse.move(120, 122)
    await page.mouse.up();
    // Optionally save changes
  await page.locator("//button[normalize-space()='Save']").click();
  await page.getByText('Mathew Wadestamp(HR)').click();
  const fileChooserPromise1 = page.waitForEvent('filechooser');
  await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
  const fileChooser1 = await fileChooserPromise1;
  await fileChooser1.setFiles(path.join(__dirname, '/TestData/Images/stamp.jpg'));
  await page.locator("//button[normalize-space()='Save']").click();
  await page.getByText('Mathew Wadeinitials(HR)').click();
  await page.mouse.move(650, 350)
  await page.mouse.down();
  await page.mouse.move(700, 380)
  await page.mouse.up();
  await page.locator("//button[normalize-space()='Save']").click();
  await page.getByPlaceholder('name').fill('Mathew Wade');
    await page.getByPlaceholder('job title').fill('Hr Execative');
    await page.getByPlaceholder('company').fill('qikAi.com');
    await page.getByPlaceholder('text').fill('120 wood street sanfransisco');
   // await page.locator('#myDropdown').selectOption('option-2');
   //await page.getByRole('radio', { name: 'option-1' }).check();
    await page.getByRole('checkbox', { name: 'option-1' }).check();
    await page.getByText('Mathew Wadeimage(HR)').click();
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
test('Verify that a new user can create a template and use it to generate a document for self-signing.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
 
  await page.locator('//span[@class="ml-3 lg:ml-4" and text()="Templates"]').click();
  await page.getByRole('menuitem', { name: 'Create template' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '/TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); 
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.getByRole('button', { name: '+ Add role' }).click();
  await page.getByPlaceholder('User').fill('HR');
  await page.locator('//button[@type="submit" and @class="op-btn op-btn-primary" and text()="Add"]').click();
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
   await page.waitForLoadState("networkidle");
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()=\'signature\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up()
await page.getByRole('button', { name: '+ Add role' }).click();
await page.getByPlaceholder('User').fill('Manager');
await page.locator('//button[@type="submit" and @class="op-btn op-btn-primary" and text()="Add"]').click();
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
 await page.waitForLoadState("networkidle");
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await page.waitForLoadState("networkidle");
await page.locator('//span[normalize-space()=\'signature\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up()
await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Bulk send' }).click();
  await page.locator('#selectSignerModal div').filter({ hasText: /^hr$/ }).getByPlaceholder('Enter Email...').click();
  await page.locator('#selectSignerModal div').filter({ hasText: /^hr$/ }).getByPlaceholder('Enter Email...').fill('pravin+677@nxglabs.in');
  await page.locator('#selectSignerModal div').filter({ hasText: /^manager$/ }).getByPlaceholder('Enter Email...').click();
  await page.locator('#selectSignerModal div').filter({ hasText: /^manager$/ }).getByPlaceholder('Enter Email...').fill('pravin+689@nxglabs.in');
  await page.getByRole('button', { name: ' Send' }).click();
  await expect(page.locator('#selectSignerModal')).toContainText('Please upgrade to Professional or Team plan to use bulk send.');
  await expect(page.locator('#selectSignerModal')).toContainText('Upgrade now');
  await page.locator('#selectSignerModal').getByRole('button', { name: 'Upgrade now' }).click();
});