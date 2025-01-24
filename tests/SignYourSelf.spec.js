// @ts-check
import { default as axios } from 'axios'
const { test, expect } = require('@playwright/test');
const path = require('path');

//const axios = require('axios');
const playwright = require('playwright');

test('Verify that new user can perform the sign yourself', async ({ page }) => {
  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext();
  await page.goto('https://staging-app.opensignlabs.com/');
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
  //await page.locator('input[name="password"]').click();
  await page.locator('input[id="termsandcondition"]').click();
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByRole('heading', { name: 'OPENSIGN™ FREE' })).toBeVisible();
  //await page.getByRole('button', { name: 'Subscribe' }).click();
await page.locator('li').filter({ hasText: 'OPENSIGN™ FREEFreeBilled' }).getByRole('button').click();
    test.setTimeout(60 * 1000);
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
  test.setTimeout(60 *1000);
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
  //await page.locator('#renderList').getByText('OpenSign™ Drive').click();
  //await page.getByTitle('Select Folder').click();
  //await page.locator('form div').filter({ hasText: 'Select FolderOpenSign™' }).locator('i').nth(3).click();
  //await page.locator('#createFolder').getByRole('textbox').click();
 // await page.locator('#createFolder').getByRole('textbox').fill('My Document');
  //await page.getByRole('button', { name: '+ Create' }).click();
  //await page.locator('.text-\\[30px\\] > .fas').click();

  await page.getByRole('button', { name: 'Next' }).click();
 /* await page.getByLabel('Close').click();

  await page.locator('div').filter({ hasText: /^text$/ }).nth(2).click();
  await page.locator('div:nth-child(8) > div > .signatureBtn > div:nth-child(2) > .fa-solid').click();
  await page.getByText('checkbox').click();
  await page.getByText('PagesPrev1 of').click();
  await page.locator('div').filter({ hasText: /^text$/ }).nth(2).click();
  await page.getByText('email').click();
  await page.locator('div').filter({ hasText: /^image$/ }).nth(2).click();
  await page.getByText('checkbox').click();
  await page.locator('div').filter({ hasText: /^date$/ }).nth(3).click();
  await page.locator('div:nth-child(6) > div > .signatureBtn > .flex > .fa-sharp').click();
  await page.locator('div').filter({ hasText: /^initials$/ }).nth(2).click();
  await page.locator('div').filter({ hasText: /^job title$/ }).nth(2).click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await page.getByRole('button', { name: 'Send OTP' }).click();
  //await page.getByPlaceholder('Enter OTP received over email').click();
  

    // Using MailSlurp to check the OTP email
    const apiKey = 'AIzaSyBBZus3-QoZCemV1TNBU95Hu1eYqiBVSrU';
    const inboxId = 'FMfcgzGxTPChnMPjWvZTPWGdLsWGTrhR';
  
    // Fetch emails from the inbox
    const response = await axios.get(`https://api.mailslurp.com/inboxes/${inboxId}/emails`, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });
  
    // Extract the OTP from the email body
    const emails = response.data;
    const otpEmail = emails.find(email => email.subject.includes('Your OTP Code'));
    const otpCode = otpEmail.body.match(/(\d{4})/)[0]; // Assuming OTP is a 6-digit number
  
    console.log('OTP Code:', otpCode);
    test.setTimeout(60 * 1000);
    await page.locator("//input[@placeholder='Enter OTP received over email']").fill(otpCode);
    test.setTimeout(60 * 1000);
    await page.getByText('email').click();
    await browser.close();
  

    test.setTimeout(60 * 1000);
  await page.locator("//button[@type='submit' and text()='Verify']").click();*/

});

  test('Verify that existing user can perform the sign yourself', async ({ page }) => {
    const browser = await playwright.chromium.launch({ headless: true });
    const context = await browser.newContext();
      await page.goto('https://staging-app.opensignlabs.com/');
      await page.locator("//input[@id='email']").fill('pravin@nxglabs.in');
  await page.locator("//input[@id='password']").fill('Nxglabs@123');
  await page.getByRole('button', { name: 'Login' }).click();
  test.setTimeout(60 * 1000);
  //const title = await page.title()
    // Expects page to have a heading with the name of dashboard.
  //   expect(title).toBe('Dashboard - OpenSign™');
  //  await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
    await page.locator('input[name="Name"]').click();
    await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
    await page.locator('input[name="Name"]').press('Tab');
    await page.locator('input[name="Note"]').click();
    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '/TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await page.waitForTimeout(5000);
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(5000);
await expect(page.locator('//span[normalize-space()="signature"]')).toBeVisible();
await page.locator('//span[normalize-space()="signature"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 300)
await page.mouse.up();
// Optionally save changes
await page.locator("//button[@type='button' and text()='Save']/parent::div").click();

await page.locator('//span[normalize-space()="stamp"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 360)
await page.mouse.up();
const fileChooserPromise1 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '/TestData/Images/stamp.jpg'));
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()="initials"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 420)
await page.mouse.up();
await page.locator("//button[@type='button' and text()='Save']/parent::div").click();
await page.locator('//span[normalize-space()="name"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 470)
await page.mouse.up();
await page.locator('//span[normalize-space()="job title"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 480)
await page.mouse.up();
await page.locator('//span[normalize-space()="company"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 520)
await page.mouse.up();

await page.locator('//span[normalize-space()="date"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
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
await page.waitForTimeout(1000);
await page.mouse.move(600, 640)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
test.setTimeout(60 * 1000);
await page.locator('//span[normalize-space()="image"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 550)
await page.mouse.up();
const fileChooserPromise2 = page.waitForEvent('filechooser');
test.setTimeout(90 * 1000);
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '/TestData/Images/DesignerImage.png'));
test.setTimeout(120 * 1000);
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//span[normalize-space()="email"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 580)
await page.mouse.up();
await page.locator("//button[normalize-space()='Finish']").click();
await page.getByText('Successfully signed!').click();
  await page.locator("//input[@placeholder='Add an email address and hit enter']").fill('pravin@Nxglabs.in');
  await page.locator("//i[@class='fa-light fa-plus']").first().click();
  await page.locator("//button[normalize-space()='Send']").click();

});
  
