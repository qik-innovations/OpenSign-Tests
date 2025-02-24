const { test, expect } = require('@playwright/test');
const { loginCredentials } = require('./TestData/GlobalVar/global-setup');
const CommonSteps = require('./utils/CommonSteps');
const path = require('path');
import { chromium } from 'playwright';
test('Verify that new user can create and send the document for request signature.', async ({ page }) => {
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
  await page.locator('input[type="text"]').nth(2).fill('HrExecative');
  await page.locator('input[name="password"]').fill('Nxglabs@123');
  await page.locator('input[id="termsandcondition"]').click();
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByRole('heading', { name: 'OPENSIGN™ FREE' })).toBeVisible();
await page.locator('li').filter({ hasText: 'OPENSIGN™ FREEFreeBilled' }).getByRole('button').click();
    await page.getByLabel('Close').click();
    // Expects page to have a heading with the name of dashboard.
    const title = await page.title()
       expect(title).toBe('Dashboard - OpenSign™');
  await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  await page.locator('input[name="Name"]').press('Tab');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '/TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await page.locator('form i').nth(2).click();
  await page.getByLabel('Name *').fill('Karl Mark');
  await page.getByLabel('Email *').fill('karlmark1954@gmail.com');
  await page.getByPlaceholder('optional').fill('768768768766');
  await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.locator('svg > rect:nth-child(3)').click();
  await page.getByLabel('Close').click();
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
await page.mouse.move(600, 550)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();

await page.mouse.move(600, 580)
await page.mouse.up();
await page.getByRole('button', { name: 'Next' }).click();

//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();

await expect(page.locator('//h3[text()=\'Mails Sent\']')).toContainText('Mails Sent');
await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
await page.getByRole('button', { name: 'Close' }).click();
await expect(page.locator('#renderList')).toContainText('In-progress documents');

});

  test('Verify that existing user can create the document and send it for request signature', async ({ page }) => {
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
    await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.waitForLoadState("networkidle");
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
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
await page.mouse.move(600, 550)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();

await page.mouse.move(600, 580)
await page.mouse.up();
await page.getByRole('button', { name: 'Next' }).click();

//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();

await expect(page.locator('//h3[text()=\'Mails Sent\']')).toContainText('Mails Sent');
await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
await page.getByRole('button', { name: 'Close' }).click();
await expect(page.locator('#renderList')).toContainText('In-progress documents');

});
test('Verify that user can create a document of type image and send it for a signature request.', async ({ page }) => {
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
  await fileChooser.setFiles(path.join(__dirname, '/TestData/Samplepdfs/1Sample-Offer_letter.png'));
  await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
  await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
  await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.waitForLoadState("networkidle");
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
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
await page.mouse.move(600, 550)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(600, 580)
await page.mouse.up();
await page.getByRole('button', { name: 'Next' }).click();
//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();
await expect(page.locator('//h3[text()=\'Mails Sent\']')).toContainText('Mails Sent');
await expect(page.locator('#selectSignerModal canvas')).toBeVisible();
await page.getByRole('button', { name: 'Close' }).click();
await expect(page.locator('#renderList')).toContainText('In-progress documents');

});

test('Verify that an existing user can create a document and sign it when added as a self-signer.', async ({ page }) => {
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
  await page.waitForLoadState("networkidle");
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
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
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.locator('//div[@class="flex flex-row items-center"]//input[@type="checkbox" and @data-tut="IsAgree"]').click();
  await page.getByRole('button', { name: 'Agree & Continue' }).click();
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.locator('//div[contains(text(),"signature")]').click();
  await page.mouse.down();
  await page.mouse.move(120, 122)
  await page.mouse.up();
  // Optionally save changes
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//div[contains(text(),"stamp")]').click();
const fileChooserPromise1 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '/TestData/Images/stamp.jpg'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//div[contains(text(),"itials")]').click();
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
  await page.locator('//div[contains(text(),"image")]').click();
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
test('Verify that a user can create a document, send it for a signature request, and signer can successfully sign the document.', async ({ page }) => {
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
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
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
//on the click of this loactor the url get copy in the urlcopy variable
await page.locator('//span[@class=\' hidden md:block ml-1 \' and text()=\'Copy link\']').click();
const copiedUrl = await page.locator('//span[@class=" hidden md:block ml-1 " and text()="Copy link"]').getAttribute('data-url');
console.log("Extracted URL:", copiedUrl);
await page.getByRole('button', { name: '✕' }).click();
  await page.getByRole('button', { name: 'View' }).click();
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').click();
await page.context().browser().close();
//relaunch the browser
let browser = await chromium.launch({ headless: true });
let context = await browser.newContext();
let page1 = await context.newPage();
await page1.goto(copiedUrl);
await page1.locator('//input[@type="checkbox" and @data-tut="IsAgree"]').click();
await page1.getByRole('button', { name: 'Agree & Continue' }).click();
await page1.waitForLoadState("networkidle");
await page1.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//div[contains(text(),"signature")]').click();
await page1.mouse.down();
await page1.mouse.move(120, 122)
await page1.mouse.up();
// Optionally save changes
await page1.locator("//button[normalize-space()='Save']").click();
await page.locator('//div[contains(text(),"stamp")]').click();
const fileChooserPromise1 = page1.waitForEvent('filechooser');
await page1.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '/TestData/Images/stamp.jpg'));
await page1.locator("//button[normalize-space()='Save']").click();
await page.locator('//div[contains(text(),"initials")]').click();
await page1.mouse.move(650, 350)
await page1.mouse.down();
await page1.mouse.move(700, 380)
await page1.mouse.up();
await page1.locator("//button[normalize-space()='Save']").click();
await page1.getByPlaceholder('name').fill('Mark Anderson');
await page1.getByPlaceholder('job title').click();
await page1.getByPlaceholder('job title').fill('Quality analyst');
await page1.getByPlaceholder('company').click();
await page1.getByPlaceholder('company').fill('Oepnsign labs pvt. ltd');
await page1.getByPlaceholder('text').fill('120 wood street sanfransisco');
await page1.locator('#myDropdown').selectOption('option-2');
await page1.getByRole('radio', { name: 'option-1' }).check();
await page1.getByRole('checkbox', { name: 'option-1' }).check();
await page.locator('//div[contains(text(),"image")]').click();
const fileChooserPromise2 = page1.waitForEvent('filechooser');
await page1.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '/TestData/Images/DesignerImage.png'));
await page1.locator("//button[normalize-space()='Save']").click();
await page1.getByPlaceholder('email').fill('anderson@oepnsignlabs.com');
await page1.getByRole('button', { name: 'Finish' }).click();

await expect(page1.getByRole('paragraph')).toContainText('Congratulations! 🎉 This document has been successfully signed by all participants!',{ timeout: 90000 });
/*await page1.getByRole('button', { name: 'Print' }).click();
//const downloadPromise = page1.waitForEvent('download');
await page1.getByRole('button', { name: 'Certificate' }).click();
const download = await downloadPromise;
await page1.getByRole('button', { name: 'Download' }).click();
  const download1Promise = page1.waitForEvent('download');
  await page1.locator('#selectSignerModal').getByRole('button', { name: 'Download' }).click();
  const download1 = await download1Promise;
  await page1.getByRole('button', { name: 'Download' }).click();
  await page1.getByText('Download pdf + Certificate').click();
  const download2Promise = page1.waitForEvent('download');
  await page1.locator('#selectSignerModal').getByRole('button', { name: 'Download' }).click();
  const download2 = await download2Promise;
  const download3Promise = page1.waitForEvent('download');
await page1.getByRole('button', { name: '✕' }).click();*/
});

test('Verify that a new free user cannot access the paid features on the request signature page.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
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
  await page.locator('.text-xs > div > .cursor-pointer').first().click();
  await page.getByLabel('Add yourself').check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Advanced options').click();
  const checkbox = page.locator('//input[@type="checkbox" and @class="op-toggle transition-all checked:[--tglbg:#3368ff] checked:bg-white"]');
const isDisabled = await checkbox.isDisabled();
console.log("Checkbox disabled:", isDisabled);
const radioButton = page.locator('//input[@type="radio" and @name="IsEnableOTP" and @value="true"]');
const EnableotpisDisabled = await radioButton.isDisabled();
console.log("Radio button disabled:", EnableotpisDisabled);
const radioButtonNo = page.locator('//input[@type="radio" and @name="IsEnableOTP" and @value="false"]');
const EnableotpisDisabled_No = await radioButtonNo.isDisabled();
console.log("Radio button disabled:", EnableotpisDisabled_No);

const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.locator('span').filter({ hasText: 'Auto reminder Upgrade now' }).locator('span').click()
]);

await popup.waitForLoadState();
await popup.goto('https://staging-app.opensignlabs.com/subscription');
await expect(popup.locator('#root')).toContainText('OPENSIGN™ FREE');
await page.bringToFront();
  
  await page.locator('span').filter({ hasText: 'Enable OTP verification' }).locator('span').click();
  const page2Promise = page.waitForEvent('popup');
  const page2 = await page2Promise;
  await expect(page2.locator('#root')).toContainText('OPENSIGN™ FREE');
  await page.bringToFront();
/*
  await page.locator('label').filter({ hasText: 'Notify on signaturesUpgrade' }).locator('span').click();
  const page3Promise = page.waitForEvent('popup');
  const page3 = await page3Promise;
  await expect(page3.locator('#root')).toContainText('OPENSIGN™ PROFESSIONAL');
  await page.bringToFront();
  await page.locator('label').filter({ hasText: 'Allow modificationsUpgrade now' }).locator('span').click();
  const page4Promise = page.waitForEvent('popup');
  const page4 = await page4Promise;
  await page4.goto('https://staging-app.opensignlabs.com/subscription');
  await expect(page4.locator('#root')).toContainText('OPENSIGN™ FREE');
  // Switch back to the default page
await page.bringToFront();  // Brings the default page to the foreground
console.log("Switched back to the main page");*/
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); 
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.getByLabel('Close').click();
});