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

  test('Verify that user can perform the sign yourself', async ({ page }) => {
    const browser = await playwright.chromium.launch({ headless: true });
    const context = await browser.newContext();
      await page.goto('https://staging-app.opensignlabs.com/');
      await page.locator("//input[@id='email']").fill('pravin@nxglabs.in');
  await page.locator("//input[@id='password']").fill('Nxglabs@123');
  await page.getByRole('button', { name: 'Login' }).click();
  test.setTimeout(60 * 1000);
  //const title = await page.title()
  //   expect(title).toBe('Dashboard - OpenSign™');
  //  await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
  await page.getByRole('menuitem', { name: 'Sign yourself' }).click();
      // Expects page to have a heading with the name of dashboard.
    
    await page.locator('input[name="Name"]').click();
    await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
    await page.locator('input[name="Name"]').press('Tab');
    await page.locator('input[name="Note"]').click();
    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '/TestData/Samplepdfs/demoOfferLetter.pdf'));
  await page.waitForTimeout(5000);
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(10000);
  await expect(page.locator('div', { hasText: /^name$/ }).nth(3)).toBeVisible();
/*await page.waitForSelector("//span[text()='stamp']");
await page.locator("//span[text()='stamp']").hover();
await page.mouse.down();
await page.locator("div[id='container'] canvas[class='react-pdf__Page__canvas']").hover();
await page.mouse.up();
//await page.locator("//div[@class='uploadImg'and text()='Upload']").click();
await page.locator("xpath=//input[@type='file']").setInputFiles(path.join(__dirname, '/TestData/Images/image002.png'));
await page.locator("//button[text()='Save']").click();*/
  // Wait for the element with text 'name' to appear
await page.waitForSelector("//span[text()='name']");
test.setTimeout(60 * 1000);
await page.locator("//span[text()='name']").dragTo(page.locator('#container > .react-pdf__Document'));
// Wait for the element with text 'job title' to appear
await page.waitForSelector("//span[text()='job title']");
await page.locator("//span[text()='job title']").dragTo(page.locator('#container > .react-pdf__Document'));
/* await page.waitForSelector("//div[@class='flex items-center mr-1']//child::span[text()='date']",{ timeout: 90000 });
 await page.locator("//div[@class='flex items-center mr-1']//child::span[text()='date']").dragTo(page.locator('#container > .react-pdf__Document'));
 await page.waitForSelector("//span[text()='text']",{ timeout: 90000 });*/
 // await page.locator("//span[text()='text']").dragTo(page.locator('#container > .react-pdf__Document'));
//  await page.locator("//*[@placeholder ='Enter text' and @class='labelTextArea labelWidthDesktop']").fill("Sunil Patil");
  /*await page.locator("//div[@class='signLayoutContainer1']").click();
   await page.waitForSelector("//div[@class='flex items-center mr-1']//child::span[text()='signature']", { timeout: 90000 });
   await page.locator("//div[@class='flex items-center mr-1']//child::span[text()='signature']").hover();
   await page.mouse.down();
   await page.locator("page.locator('div.react-pdf__Page canvas').nth(0)']").hover();
   await page.mouse.up();
   await page.waitForSelector('.signatureCanvas', { timeout: 5000 });
   await page.locator(".signatureCanvas").dblclick();
   await page.waitForSelector("//button[normalize-space()='Save']");
   await page.locator("//button[normalize-space()='Save']").click();
   await page.locator("//div[@class='signLayoutContainer1']").click();
await page.locator("//body//div[@id='root']//div[@class='showPages']//div//div//div//div[2]//div[1]//div[1]//canvas[1]").click();
await page.locator("//div[@class='flex items-center mr-1']//child::span[text()='initials']").hover();
 await page.mouse.down();
 await page.locator("page.locator('div.react-pdf__Page canvas').nth(0)").hover();
 await page.mouse.up();
  await page.locator("//canvas[@class='intialSignatureCanvas']").dblclick();
  await page.waitForSelector("//button[normalize-space()='Save']");
  await page.locator("//button[normalize-space()='Save']").click();
  await page.locator("//div[@class='signLayoutContainer1']").click();
  await page.waitForSelector("//div[@class='flex items-center mr-1']//child::span[text()='company']");
   await page.locator("//span[text()='company']").hover();
   await page.mouse.down();
   await page.locator("div[id='container'] canvas[class='react-pdf__Page__canvas']").hover();
   await page.mouse.up();
   await page.locator("//div[@class='signLayoutContainer1']").click();
   await page.waitForSelector("//span[text()='email']");
   await page.locator("//span[text()='email']").hover();
   await page.mouse.down();
   await page.locator("div[id='container'] canvas[class='react-pdf__Page__canvas']").hover();
   await page.mouse.up();
   await page.locator("//div[@class='signLayoutContainer1']").click();
  await page.waitForSelector("//span[text()='checkbox']",{ timeout: 5000 });
  await page.locator("//span[text()='checkbox']").dragTo(page.locator('canvas.react-pdf__Page__canvas'));
  await page.locator("//button[@type='submit']").click();
  await page.locator("//div[3]//div[1]//div[1]//canvas[1]").click();
  await page.locator("//div[@class='signLayoutContainer1']").click();
  await page.waitForSelector("//span[text()='image']");
   await page.locator("//span[text()='image']").hover();
   await page.mouse.down();
   await page.locator("div[id='container'] canvas[class='react-pdf__Page__canvas']").hover();
   await page.mouse.up();
   //await page.locator("//div[@class='uploadImg'and text()='Upload']").click();
   await page.locator("xpath=//input[@type='file']").setInputFiles(path.join(__dirname, '/TestData/Images/image002.png'));
  await page.locator("//button[text()='Save']").click();
    //await page.getByText('Next').click();
    //await page.getByLabel('Close').click();
    await page.getByRole('button', { name: 'Finish' }).click();
    await page.getByText('Successfully signed!').click();
    //await page.getByRole('button', { name: 'Print' }).first().click();
 // const page1Promise = page.waitForEvent('popup');
  //await page.getByRole('button', { name: 'Download' }).first().click();
 // const page1 = await page1Promise;
  await page.getByPlaceholder('Add the email addresses').fill('pravin@nxglabs.in');
  await page.locator("//i[@class='fa fa-plus']").first().click();
  await page.locator("//button[text()='Send']").click();*/

});
  
