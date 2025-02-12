// @ts-check
import { default as axios } from 'axios'
const { test, expect } = require('@playwright/test');
const { loginCredentials } = require('./TestData/GlobalVar/global-setup');
const CommonSteps = require('./utils/CommonSteps');
const path = require('path');

test('Verify that new user can perform the sign yourself', async ({ page }) => {
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
  await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  await page.locator('input[name="Name"]').press('Tab');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '/TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.locator('svg > rect:nth-child(3)').click();
  await page.getByLabel('Close').click();
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await page.locator('//span[normalize-space()=\'signature\']').hover();

await page.mouse.down();

await page.mouse.move(600, 300)
await page.mouse.up();

await page.locator('canvas').nth(1).click({
  position: {
    x: 150,
    y: 56
  }
});
await page.mouse.move(670, 300)
await page.mouse.down();
await page.mouse.move(670, 350)
await page.mouse.up();

// Optionally save changes
await page.locator("//button[normalize-space()='Save']").click();

await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 360)
await page.mouse.up();
const fileChooserPromise1 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '/TestData/Images/stamp.jpg'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 420)
await page.mouse.up();

await page.mouse.move(700, 350)
await page.mouse.down();
await page.mouse.move(700, 380)
await page.mouse.up();
await page.locator("//button[normalize-space()='Save']").click();
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
/*
await page.locator('//span[normalize-space()="text"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 590)//textarea[@placeholder='text']
await page.mouse.up();
await page.locator('//textarea[@placeholder=\'text\']').fill('20 wood street sanfransisco');
*/
await page.locator('//span[normalize-space()=\'checkbox\']').hover();
await page.mouse.down();
await page.mouse.move(600, 640)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'image\']').hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();
const fileChooserPromise2 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '/TestData/Images/DesignerImage.png'));

await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();

await page.mouse.move(600, 580)
await page.mouse.up();
await page.locator("//button[normalize-space()='Finish']").click();
await page.getByText('Successfully signed!').waitFor({ timeout: 90000 });
  await page.locator("//input[@placeholder='Add an email address and hit enter']").fill('pravin@Nxglabs.in');
  await page.locator("//i[@class='fa-light fa-plus']").first().click();
  await page.locator("//button[normalize-space()='Send']").click();

});

  test('Verify that existing user can perform the sign yourself', async ({ page }) => {
    const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base URL and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.login();
  //const title = await page.title()
    //Expects page to have a heading with the name of dashboard.
  //expect(title).toBe('Dashboard - OpenSign™');
  
  await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
    await page.locator('input[name="Name"]').click();
    await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
    await page.locator('input[name="Name"]').press('Tab');
    await page.locator('input[name="Note"]').click();
    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '/TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
// Optionally save changes
await page.locator("//button[@type='button' and text()='Save']/parent::div").click();

await page.locator('//span[normalize-space()="stamp"]').hover();
await page.mouse.down();
await page.mouse.move(600, 360)
await page.mouse.up();
const fileChooserPromise1 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '/TestData/Images/stamp.jpg'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()="initials"]').hover();
await page.mouse.down();
await page.mouse.move(600, 420)
await page.mouse.up();
await page.locator("//button[@type='button' and text()='Save']/parent::div").click();
await page.locator('//span[normalize-space()="name"]').hover();
await page.mouse.down();

await page.mouse.move(600, 470)
await page.mouse.up();
await page.locator('//span[normalize-space()="job title"]').hover();
await page.mouse.down();

await page.mouse.move(600, 480)
await page.mouse.up();
await page.locator('//span[normalize-space()="company"]').hover();
await page.mouse.down();

await page.mouse.move(600, 520)
await page.mouse.up();

await page.locator('//span[normalize-space()="date"]').hover();
await page.mouse.down();

await page.mouse.move(600, 550)
await page.mouse.up();
/*
await page.locator('//span[normalize-space()="text"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 590)//textarea[@placeholder='text']
await page.mouse.up();
await page.locator('//textarea[@placeholder=\'text\']').fill('20 wood street sanfransisco');
*/
await page.locator('//span[normalize-space()="checkbox"]').hover();
await page.mouse.down();

await page.mouse.move(600, 640)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()="image"]').hover();
await page.mouse.down();

await page.mouse.move(600, 550)
await page.mouse.up();
const fileChooserPromise2 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '/TestData/Images/DesignerImage.png'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()="email"]').hover();
await page.mouse.down();
await page.mouse.move(600, 580)
await page.mouse.up();
await page.locator("//button[normalize-space()='Finish']").click();
await page.getByText('Successfully signed!').waitFor({ timeout: 90000 });
  await page.locator("//input[@placeholder='Add an email address and hit enter']").fill('pravin@Nxglabs.in');
  await page.locator("//i[@class='fa-light fa-plus']").first().click();
  await page.locator("//button[normalize-space()='Send']").click();

});
test('Verify that the user can sign a document of type Image.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await page.locator('input[name="Name"]').press('Tab');
  await page.locator('input[name="Note"]').click();
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '/TestData/Samplepdfs/1Sample-Offer_letter.png'));
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
// Optionally save changes
await page.locator("//button[@type='button' and text()='Save']/parent::div").click();

await page.locator('//span[normalize-space()="stamp"]').hover();
await page.mouse.down();
await page.mouse.move(600, 360)
await page.mouse.up();
const fileChooserPromise1 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '/TestData/Images/stamp.jpg'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()="initials"]').hover();
await page.mouse.down();
await page.mouse.move(600, 420)
await page.mouse.up();
await page.locator("//button[@type='button' and text()='Save']/parent::div").click();
await page.locator('//span[normalize-space()="name"]').hover();
await page.mouse.down();

await page.mouse.move(600, 470)
await page.mouse.up();
await page.locator('//span[normalize-space()="job title"]').hover();
await page.mouse.down();

await page.mouse.move(600, 480)
await page.mouse.up();
await page.locator('//span[normalize-space()="company"]').hover();
await page.mouse.down();

await page.mouse.move(600, 520)
await page.mouse.up();

await page.locator('//span[normalize-space()="date"]').hover();
await page.mouse.down();

await page.mouse.move(600, 550)
await page.mouse.up();
/*
await page.locator('//span[normalize-space()="text"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 590)//textarea[@placeholder='text']
await page.mouse.up();
await page.locator('//textarea[@placeholder=\'text\']').fill('20 wood street sanfransisco');
*/
await page.locator('//span[normalize-space()="checkbox"]').hover();
await page.mouse.down();

await page.mouse.move(600, 640)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()="image"]').hover();
await page.mouse.down();

await page.mouse.move(600, 550)
await page.mouse.up();
const fileChooserPromise2 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '/TestData/Images/DesignerImage.png'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()="email"]').hover();
await page.mouse.down();
await page.mouse.move(600, 580)
await page.mouse.up();
await page.locator("//button[normalize-space()='Finish']").click();
await page.getByText('Successfully signed!').waitFor({ timeout: 90000 });
await page.locator("//input[@placeholder='Add an email address and hit enter']").fill('pravin@Nxglabs.in');
await page.locator("//i[@class='fa-light fa-plus']").first().click();
await page.locator("//button[normalize-space()='Send']").click();

});
  
