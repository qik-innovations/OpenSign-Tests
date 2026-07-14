const { test, expect } = require('@playwright/test');
const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const CommonSteps = require('../utils/CommonSteps');
const PageActions = require('../utils/PageActions');
const path = require('path');
const exp = require('constants');
const { fetchOTP } = require('../utils/otpHelper');
const { gmailConfig } = require('../utils/mailConfigs');
test.describe('Request signature', () => {
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
  await page.locator('input[name="Name"]').fill('Offer Letter for QA11');
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
  await page.locator('form i').nth(2).click();
  await page.getByLabel('Name *').fill('Karl Mark');
  await page.getByLabel('Email *').fill('karlmark1954@gmail.com');
  await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.locator('svg > rect:nth-child(3)').click();
  await page.getByLabel('Close').click();
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
 await commonSteps.dragAndDropSignatureWidget('signature', 600, 200);
await commonSteps.dragAndDrop('stamp', 600, 250);
await commonSteps.dragAndDrop('initials', 600, 300);
await commonSteps.dragAndDrop('name', 600, 350);
await commonSteps.dragAndDrop('job title', 600, 370);
await commonSteps.dragAndDrop('company', 600, 400);
await commonSteps.dragAndDrop('date', 600, 430);
await commonSteps.dragAndDrop('text input', 600, 450);
await commonSteps.dragAndDrop('checkbox', 600, 500);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('dropdown', 600, 550);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('radio button', 600, 600);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('image', 600, 650);
await commonSteps.dragAndDrop('email', 600, 700);
await page.getByRole('button', { name: 'Next' }).click();
//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();
await expect(page.locator('#selectSignerModal')).toContainText('Email not verified', { timeout: 90000 });
await expect(page.locator('#selectSignerModal')).toContainText('Please verify your email address before sending emails');

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
    await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
    await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/1Sample-Offer_letter.png'));
  await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
  await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
  await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
  await page.locator('input[name="Name"]').click();
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await commonSteps.dragAndDropSignatureWidget('signature', 600, 200);
await commonSteps.dragAndDrop('stamp', 600, 250);
await commonSteps.dragAndDrop('initials', 600, 300);
await commonSteps.dragAndDrop('name', 600, 350);
await commonSteps.dragAndDrop('job title', 600, 370);
await commonSteps.dragAndDrop('company', 600, 400);
await commonSteps.dragAndDrop('date', 600, 430);
await commonSteps.dragAndDrop('text input', 600, 450);
await commonSteps.dragAndDrop('checkbox', 600, 500);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('dropdown', 600, 550);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('radio button', 600, 600);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('image', 600, 650);
await commonSteps.dragAndDrop('email', 600, 700);
await page.getByRole('button', { name: 'Next' }).click();
//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();
await expect(page.locator('//h3[text()=\'Mails Sent\']')).toContainText('Mails Sent', { timeout: 90000 });
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
    await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
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
await commonSteps.dragAndDrop('stamp', 600, 250);
await commonSteps.dragAndDrop('initials', 600, 300);
await commonSteps.dragAndDrop('name', 600, 350);
await commonSteps.dragAndDrop('job title', 600, 370);
await commonSteps.dragAndDrop('company', 600, 390);
await commonSteps.dragAndDrop('date', 600, 410);
await commonSteps.dragAndDrop('text input', 600, 440);
await commonSteps.dragAndDrop('checkbox', 600, 480);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('dropdown', 600, 530);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('radio button', 600, 560);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('image', 600, 590);
await commonSteps.dragAndDrop('email', 600, 650);
await commonSteps.dragAndDrop('cells', 600, 670);
await page.getByRole('button', { name: 'Next' }).click();
//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await expect(page.locator('//h3[text()=\'Next step: Sign your document ?\']')).toContainText('Next step: Sign your document ?', { timeout: 90000 });
await page.getByRole('button', { name: 'Sign now' }).click();
  await commonSteps.validateAndAcceptTerms();
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
  await commonSteps.clickSignatureWidgetAndDraw();
  // Optionally save changes
await commonSteps.clickNextButtonInSignerModal();
await commonSteps.uploadStamp();
await commonSteps.clickNextButtonInSignerModal();
await commonSteps.drawInitials();
await commonSteps.clickNextButtonInSignerModal();
await commonSteps.fillTextField('name', 'Mark Anderson');
await commonSteps.clickNextButtonInSignerModal();
await commonSteps.fillTextField('job title', 'Quality analyst');
await commonSteps.clickNextButtonInSignerModal();
await commonSteps.fillTextField('company', 'Oepnsign labs pvt. ltd');
await commonSteps.clickNextButtonInSignerModal();
const today = new Date();
// Format the date as MM/DD/YYYY
const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/` +
                      `${today.getDate().toString().padStart(2, '0')}/` + 
                      `${today.getFullYear()}`;
console.log('Today\'s date:', formattedDate);  // Extract day number as text
await commonSteps.clickDateFieldOnTheSignerPad_Without_date();
//await commonSteps.clickDateFieldOnTheSignerPad(formattedDate);
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
await commonSteps.fillTextField('text', '120 wood street sanfransisco');
  await commonSteps.clickNextButtonInSignerModal();
  await commonSteps.selectCheckbox('Option-1');
  await commonSteps.clickNextButtonInSignerModal();
  await commonSteps.selectFromDropdown('myDropdown', 'Option-2');
  await commonSteps.clickNextButtonInSignerModal();
  await commonSteps.selectRadioButton('Option-2');
  await commonSteps.clickNextButtonInSignerModal();
 await commonSteps.uploadImage();
 await commonSteps.clickNextButtonInSignerModal();
  await commonSteps.fillEmailField('demo@gmail.com', 'anderson.k@opensignlabs.com');
     await commonSteps.clickNextButtonInSignerModal();
    await commonSteps.fillCellWidgetsInModal("8909901");
await commonSteps.clickDoneButtonInSignerModal();
await commonSteps.clickFinishButtonInSignerModal();
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
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
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
await commonSteps.dragAndDropSignatureWidget('signature', 600, 200);
await commonSteps.dragAndDrop('stamp', 600, 250);
await commonSteps.dragAndDrop('initials', 600, 300);
await commonSteps.dragAndDrop('name', 600, 330);
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
  // Call the method with widget name 'name'
  const VariablenameID = await commonSteps.getElementIdByWidgetName('name');
  console.log('Widget element ID:', VariablenameID);
await commonSteps.dragAndDrop('job title', 600, 350);
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariablejobtitleID = await commonSteps.getElementIdByWidgetName('job title');
  console.log('Widget element ID:', VariablejobtitleID);
await commonSteps.dragAndDrop('company', 600, 370);
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariablecompanyID = await commonSteps.getElementIdByWidgetName('company');
  console.log('Widget element ID:', VariablecompanyID);
await commonSteps.dragAndDrop('date', 600, 390);
//const VariabledateID = await commonSteps.getElementIdByWidgetName('date');
  //console.log('Widget element ID:', VariabledateID);
await commonSteps.dragAndDrop('text input', 600, 410);
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariabletextinputID = await commonSteps.getElementIdByWidgetName('text input');
  console.log('Widget element ID:', VariabletextinputID);
  //const VariableCellsID = await commonSteps.getElementIdByWidgetName('cells');
 // console.log('Widget element ID:', VariableCellsID);
await commonSteps.dragAndDrop('checkbox', 600, 430);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('dropdown', 600, 460);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('radio button', 600, 490);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('image', 600, 530);
await commonSteps.dragAndDrop('email', 600, 570);
  await commonSteps.dragAndDrop('cells', 600, 600);
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariableemailID = await commonSteps.getElementIdByWidgetName('demo@gmail.com');
  console.log('Widget element ID:', VariableemailID);
await page.getByRole('button', { name: 'Next' }).click();
await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
 await page.locator('//span[text()="Copy link"]').click();
const copiedUrl = await page.locator('//p[@id="copyUrl"]').evaluate(el => el.textContent.trim());
const page1 = await page.context().newPage();
await page1.goto(copiedUrl);
const commonStepsPage1 = new CommonSteps(page1);
await commonStepsPage1.validateAndAcceptTerms();
await page1.waitForLoadState("networkidle");
await page1.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await commonStepsPage1.clickSignatureWidgetAndDraw();
// Optionally save changes
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.uploadStamp()
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.drawInitials();
await commonStepsPage1.clickNextButtonInSignerModal();
//await commonStepsPage1.clickCloseButtonInSignerModal()
//await page1.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${VariablenameID}']//textarea[1]`).click({ force: true });
await commonStepsPage1.fillTextField('name', 'Mark Anderson');
await commonStepsPage1.clickNextButtonInSignerModal();
//await commonStepsPage1.clickCloseButtonInSignerModal();
//await page1.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${VariablejobtitleID}']//textarea[1]`).click({ force: true });
await commonStepsPage1.fillTextField('job title', 'Quality analyst');
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.fillTextField('company', 'Oepnsign labs pvt. ltd');
await commonStepsPage1.clickNextButtonInSignerModal();
const today = new Date();
// Format the date as MM/DD/YYYY
const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/` +
                      `${today.getDate().toString().padStart(2, '0')}/` + 
                      `${today.getFullYear()}`;
console.log('Today\'s date:', formattedDate);  // Extract day number as text
await commonStepsPage1.clickDateFieldOnTheSignerPad_Without_date();
//await commonSteps.clickDateFieldOnTheSignerPad(formattedDate);
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
await commonStepsPage1.selectCalendarDateByLabel(ariaLabelValue);
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.fillTextField('text', '120 wood street sanfransisco');
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.selectCheckbox('Option-1');
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.selectFromDropdown('myDropdown', 'Option-2');
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.selectRadioButton('Option-1');
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.uploadImage();
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.fillEmailField('demo@gmail.com', 'anderson.k@opensignlabs.com')
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.fillCellWidgetsInModal("78231");
await commonStepsPage1.clickDoneButtonInSignerModal();
await commonStepsPage1.clickFinishButtonInSignerModal();
await expect(page1.locator('//h1[text()="The document has been signed successfully!"]')).toContainText('The document has been signed successfully!',{ timeout: 90000 });
/*await page1.getByRole('button', { name: 'Print' }).click();
const downloadPromise = page1.waitForEvent('download');
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
  const download3Promise = page1.waitForEvent('download');*/
});
test('Verify that a user can create a document with enable otp true and send it for a signature request, and signer can sign the document.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'kelvin Johnson req1<kelvinsjohnson24+req1@gmail.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'kelvin Johnson req1<kelvinsjohnson24+req1@gmail.' }).click();
await page.locator('input[name="Name"]').click();
 await page.getByText('Advanced options').click();
await page.locator('input[name="IsEnableOTP"]').first().click();
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await commonSteps.dragAndDropSignatureWidget('signature', 600, 200);
await commonSteps.dragAndDrop('stamp', 600, 250);
await commonSteps.dragAndDrop('initials', 600, 300);
await commonSteps.dragAndDrop('name', 600, 330);
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
  // Call the method with widget name 'name'
  const VariablenameID = await commonSteps.getElementIdByWidgetName('name');
  console.log('Widget element ID:', VariablenameID);
await commonSteps.dragAndDrop('job title', 600, 350);
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariablejobtitleID = await commonSteps.getElementIdByWidgetName('job title');
  console.log('Widget element ID:', VariablejobtitleID);
await commonSteps.dragAndDrop('company', 600, 370);
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariablecompanyID = await commonSteps.getElementIdByWidgetName('company');
  console.log('Widget element ID:', VariablecompanyID);
await commonSteps.dragAndDrop('date', 600, 390);
//const VariabledateID = await commonSteps.getElementIdByWidgetName('date');
  //console.log('Widget element ID:', VariabledateID);
await commonSteps.dragAndDrop('text input', 600, 410);
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariabletextinputID = await commonSteps.getElementIdByWidgetName('text input');
  console.log('Widget element ID:', VariabletextinputID);
  //const VariableCellsID = await commonSteps.getElementIdByWidgetName('cells');
 // console.log('Widget element ID:', VariableCellsID);
await commonSteps.dragAndDrop('checkbox', 600, 440);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('dropdown', 600, 470);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('radio button', 600, 490);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('image', 600, 530);
await commonSteps.dragAndDrop('email', 600, 570);
 await commonSteps.dragAndDrop('cells', 600, 600);
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
await page.getByRole('button', { name: 'Next' }).click();
await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
    await page.locator('//span[text()="Copy link"]').click();
   const copiedUrl = await page.locator('//p[@id="copyUrl"]').evaluate(el => el.textContent?.trim() || '');
const page1 = await page.context().newPage();
await page1.goto(copiedUrl);
const commonStepsPage1 = new CommonSteps(page1);
 // ---------- Step 3: OTP Verification ----------
// Verify Heading
  const heading = page1.locator("//h1[normalize-space()='Welcome back!']");
  await expect(heading).toBeVisible();

  // Verify Paragraph / Legend
  const legendText = page1.locator("//legend[contains(normalize-space(),'verification code via Email')]");
  await expect(legendText).toBeVisible();

  // Verify Email Input Field
  const emailInput = page1.locator("//input[@type='email' and @name='email']");
  await expect(emailInput).toHaveValue('kelvinsjohnson24+req1@gmail.com');
const emailValue = await emailInput.inputValue(); 
console.log('Email input value:', emailValue); // Debug log to check the email value
  // Click Get Verification Code button
  const getCodeBtn = page1.locator("//button[.//text()[normalize-space()='Get verification code']]");
  await getCodeBtn.click();
  console.log('Waiting for OTP...');
  const otp = await fetchOTP({
    ...gmailConfig,
     otpRegex: /\b(\d{4})\b/, // Assuming OTP is a 4-digit code
    expectedTo: emailValue // Ensure we only process OTP emails sent to our generated address
  });
  console.log('OTP Received:', otp);
    await page1.locator(`//input[@placeholder="Enter verification code received over email"]`).fill(otp);
    await page1.locator('//button[text()="Verify" and @type="submit"]').click();
await commonStepsPage1.validateAndAcceptTerms();
await page1.waitForLoadState("networkidle");
await page1.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await commonStepsPage1.clickSignatureWidgetAndDraw();
// Optionally save changes
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.uploadStamp()
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.drawInitials();
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.fillTextField('name', 'Mark Anderson');
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.fillTextField('job title', 'Quality analyst');
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.fillTextField('company', 'Oepnsign labs pvt. ltd');
await commonStepsPage1.clickNextButtonInSignerModal();
const today = new Date();
// Format the date as MM/DD/YYYY
const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/` +
                      `${today.getDate().toString().padStart(2, '0')}/` + 
                      `${today.getFullYear()}`;
console.log('Today\'s date:', formattedDate);  // Extract day number as text
await commonStepsPage1.clickDateFieldOnTheSignerPad_Without_date();
//await commonSteps.clickDateFieldOnTheSignerPad(formattedDate);
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
await commonStepsPage1.selectCalendarDateByLabel(ariaLabelValue);
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.fillTextField('text', '120 wood street sanfransisco');
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.selectCheckbox('Option-1');
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.selectFromDropdown('myDropdown', 'Option-2');
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.selectRadioButton('Option-1');
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.uploadImage();
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.fillEmailField('demo@gmail.com', 'anderson.k@opensignlabs.com');
await commonStepsPage1.clickNextButtonInSignerModal();
await commonStepsPage1.fillCellWidgetsInModal('78231');
await commonStepsPage1.clickDoneButtonInSignerModal();
await commonStepsPage1.clickFinishButtonInSignerModal();
await expect(page1.locator('//h1[text()="The document has been signed successfully!"]')).toContainText('The document has been signed successfully!',{ timeout: 90000 });
/*await page1.getByRole('button', { name: 'Print' }).click();
const downloadPromise = page1.waitForEvent('download');
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
  const download3Promise = page1.waitForEvent('download');*/
});
test('Verify that a user can create a document with two signers, send it for a signature request, and signer can successfully sign the document.', async ({ page }) => {
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
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
  await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
  await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await commonSteps.dragAndDropSignatureWidget('signature', 600, 200);
await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 250);
await page.mouse.up();
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300);
await page.mouse.up();
await page.locator('//span[normalize-space()=\'name\']').hover();
await page.mouse.down();
await page.mouse.move(600, 350);
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariablenameID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='name']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();
await page.mouse.move(600, 370);
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariablejobtitleID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='job title']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(600, 400);
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariablecompanyID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='company']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'date\']').hover();
await page.mouse.down();
await page.mouse.move(600, 430);
await page.mouse.up();
await page.locator('//span[normalize-space()=\'text input\']').hover();
await page.mouse.down();
await page.mouse.move(600, 470);
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariabletextinputID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='text input']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'checkbox\']').hover();
await page.mouse.down();
await page.mouse.move(600, 490);
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('span').filter({ hasText: 'dropdown' }).hover();
await page.mouse.down();
await page.mouse.move(600, 530);
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'radio button\']').hover();
await page.mouse.down();
await page.mouse.move(600, 570);
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'image\']').hover();
await page.mouse.down();
await page.mouse.move(600, 610);
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(600, 670);
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const VariableemailID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='email']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});

await page.getByRole('button', { name: '+ Add recipients' }).click();
await page.locator('//div[@class="css-b62m3t-container"]').click();
await page.locator('//div[@class="css-b62m3t-container"]//input').fill('tr');
await page.getByRole('option', { name: 'Travis Mathew<pravin+travis@' }).click();
await page.getByRole('button', { name: 'Submit' }).click();
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
 await page.locator(`//div[contains(@class,'react-pdf__Document')][1]//div[@class='react-pdf__Page' and @data-page-number='2']`).first().click();
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
commonSteps.dragAndDropSignatureWidget('signature', 600, 350);
await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 400);
await page.mouse.up();
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 450);
await page.mouse.up();
await page.locator('//span[normalize-space()=\'name\']').hover();
await page.mouse.down();
await page.mouse.move(600, 320);
await page.mouse.up();
//here we are copying the widget id to use while signing the document through the guest signatrue flow
const Signer1VariablenameID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='name']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();
await page.mouse.move(600, 350);
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const Signer1VariablejobtitleID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='job title']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(600, 370);
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const Signer1VariablecompanyID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='company']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'date\']').hover();
await page.mouse.down();
await page.mouse.move(600, 410);
await page.mouse.up();
await page.locator('//span[normalize-space()=\'text input\']').hover();
await page.mouse.down();
await page.mouse.move(600, 440);
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const Signer1VariabletextinputID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='text input']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.locator('//span[normalize-space()=\'checkbox\']').hover();
await page.mouse.down();
await page.mouse.move(600, 470)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('span').filter({ hasText: 'dropdown' }).hover();
await page.mouse.down();
await page.mouse.move(600, 510)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'radio button\']').hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'image\']').hover();
await page.mouse.down();
await page.mouse.move(600, 590)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(600, 650)
await page.mouse.up();
//here we are copying the widget id to use while signing teh document through the guest signatrue flow
const Signer1VariableemailID = await page.evaluate(() => {
  const element = document.evaluate(
      "//div[span[text()='email']]/ancestor::div[contains(@class, 'signYourselfBlock')]",document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  ).singleNodeValue;
  
  return element ? element.id : null;
});
await page.getByRole('button', { name: 'Next' }).click();
await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
//await page.locator('//span[@class=" hidden md:block ml-1 " and text()="Copy link"]').click();
await page.locator('div').filter({ hasText: /^andyamaya@nxglabs\.inCopy link$/ }).getByRole('button').first().click();
const copiedUrl1 = await page.locator('//p[@id="copyUrl"]').evaluate(el => el.textContent.trim());
//await page.locator('//span[@class=" hidden md:block ml-1 " and text()="Copy link"]').click();
await page.locator('div').filter({ hasText: /^pravin\+travis@nxglabs\.inCopy link$/ }).getByRole('button').first().click();
const copiedUrl2 = await page.locator('//p[@id="copyUrl"]').evaluate(el => el.textContent.trim());
const page1 = await page.context().newPage();
await page1.goto(copiedUrl1);
  const commonStepspage1 = new CommonSteps(page1);
await commonStepspage1.validateAndAcceptTerms();
await page1.waitForLoadState("networkidle");
await page1.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page1.locator('//div[@id="container"]//div[text()="signature-1"]').click();
await commonStepspage1.drawSignature();
await commonStepspage1.clickNextButtonInSignerModal();
await commonStepspage1.clickCloseButtonInSignerModal();
await page1.locator('//div[@id="container"]//div[text()="stamp-1"]').click();
await commonStepspage1.uploadStamp();
await commonStepspage1.clickNextButtonInSignerModal();
await commonStepspage1.clickCloseButtonInSignerModal();
await page1.locator('//div[@id="container"]//div[text()="initials-1"]').click();
await commonStepspage1.drawInitials();
await commonStepspage1.clickNextButtonInSignerModal();
await commonStepspage1.clickCloseButtonInSignerModal();
await page1.locator(`//div[contains(@class,'signYourselfBlock') and contains(@class,'react-draggable') and @id='${VariablenameID}']//textarea[1]`).click({ force: true });
await commonStepspage1.fillTextField('name','Mark Andrews');
await commonStepspage1.clickNextButtonInSignerModal();
await commonStepspage1.clickCloseButtonInSignerModal();
await page1.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${VariablejobtitleID}']//textarea[1]`).click({ force: true });
await commonStepspage1.fillTextField('job title','Quality Analyst');
await commonStepspage1.clickNextButtonInSignerModal();
await commonStepspage1.clickCloseButtonInSignerModal();
await page1.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${VariablecompanyID}']//textarea[1]`).click({ force: true });
await commonStepspage1.fillTextField('company','OpenSignlabs pvt ltd');
await commonStepspage1.clickNextButtonInSignerModal();
await commonStepspage1.clickCloseButtonInSignerModal();
await page1.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${VariabletextinputID}']//textarea[1]`).click({ force: true });
await commonStepspage1.fillTextField('text input','120 wood street sanfransisco');
await commonStepspage1.clickNextButtonInSignerModal();
await commonStepspage1.selectCheckbox('Option-1');
await commonStepspage1.clickNextButtonInSignerModal();
await commonStepspage1.selectFromDropdown('myDropdown','Option-2')
await commonStepspage1.clickNextButtonInSignerModal();
await commonStepspage1.selectRadioButton('Option-2');
await commonStepspage1.clickNextButtonInSignerModal();
await commonStepspage1.clickCloseButtonInSignerModal();
await page1.locator('//div[contains(text(),"image-1")]').click();
await commonStepspage1.uploadImage();
await commonStepspage1.clickNextButtonInSignerModal();
await commonStepspage1.fillEmailField('demo@gmail.com','andrew@nxglabs.in')
await commonStepspage1.clickDoneButtonInSignerModal();
await commonStepspage1.clickFinishButtonInSignerModal();
await page1.getByText('The document has been successfully signed by you!').click();
const page2 = await page.context().newPage();
  const commonStepspage2 = new CommonSteps(page2);
await page2.goto(copiedUrl2);
await page2.waitForLoadState("networkidle");
await commonStepspage2.validateAndAcceptTerms();
await page2.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page2.locator(`//div[contains(@class,'react-pdf__Document')][1]//div[@class='react-pdf__Page' and @data-page-number='2']`).first().click();
await page2.locator('//div[@id="container"]//div[text()="signature-1"]').click();
await commonStepspage2.drawSignature();
// Optionally save changes
await commonStepspage2.clickNextButtonInSignerModal();
await commonStepspage2.uploadStamp();
await commonStepspage2.clickNextButtonInSignerModal();
await commonStepspage2.drawInitials();
await commonStepspage2.clickNextButtonInSignerModal();
await commonStepspage2.clickCloseButtonInSignerModal();
await page2.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${Signer1VariablenameID}']//textarea[1]`).click({ force: true });
await commonStepspage2.fillTextField('name','Mark Anderson');
await commonStepspage2.clickNextButtonInSignerModal();
await commonStepspage2.clickCloseButtonInSignerModal();
await page2.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${Signer1VariablejobtitleID}']//textarea[1]`).click({ force: true });
await commonStepspage2.fillTextField('job title','Manager');
await commonStepspage2.clickNextButtonInSignerModal();
await commonStepspage2.clickCloseButtonInSignerModal();
await page2.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${Signer1VariablecompanyID}']//textarea[1]`).click({ force: true });
await commonStepspage2.fillTextField('company','OpenSign pvt. ltd');
await commonStepspage2.clickNextButtonInSignerModal();
await commonStepspage2.clickCloseButtonInSignerModal();
await page2.locator(`//div[@class="signYourselfBlock react-draggable" and @id='${Signer1VariabletextinputID}']//textarea[1]`).click({ force: true });
await commonStepspage2.fillTextField('text input','120 wood street sanfransisco');
await commonStepspage2.clickNextButtonInSignerModal();
await commonStepspage2.selectCheckbox('Option-1');
await commonStepspage2.clickNextButtonInSignerModal();
await commonStepspage2.selectFromDropdown('myDropdown','Option-2')
await commonStepspage2.clickNextButtonInSignerModal();
await commonStepspage2.selectRadioButton('Option-2');
await commonStepspage2.clickNextButtonInSignerModal();
await commonStepspage2.clickCloseButtonInSignerModal();
await page2.locator('//div[contains(text(),"image-1")]').click();
await commonStepspage2.uploadImage();
await commonStepspage2.clickNextButtonInSignerModal();
await commonStepspage2.fillEmailField('demo@gmail.com','karlmark@opensignlabs.com')
await commonStepspage2.clickDoneButtonInSignerModal();
await commonStepspage2.clickFinishButtonInSignerModal();
await expect(page2.locator('//h1[text()="The document has been signed successfully!"]')).toContainText('The document has been signed successfully!',{ timeout: 180000 });

});
test('Verify that a new free user cannot access the paid features on the request signature page.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
    // Step 1: Navigate to Base UR
    // L and log in
    await commonSteps.navigateToBaseUrl();
    await commonSteps.NewUserlogin();
  //const title = await page.title()
    //Expects page to have a heading with the name of dashboard.
  //expect(title).toBe('Dashboard - OpenSign™');
  
  await page.getByRole('menuitem', { name: 'Request signatures' }).click();
    await page.locator('input[name="Name"]').click();
    await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
    await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
    const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
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
  await page.locator('svg > rect:nth-child(3)').click();
  await page.getByLabel('Close').click();
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
commonSteps.dragAndDropSignatureWidget('signature', 600, 200);
await page.getByRole('button', { name: 'Next' }).click();
//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();
});
/*
test('Verify that the tour guide messages function correctly for an existing signer when the tour guide is set to enabled.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
const actions = new PageActions(page);
await actions.click("Request Signatures", "//a[@role='menuitem']//span[text()='Request signatures']");
  await actions.typeText('Document Name','input[name="Name"]', 'Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Travis Mathew<pravin+travis@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Travis Mathew<pravin+travis@nxglabs.' }).click();
await page.locator('//input[@name="Name"]').click();
await page.getByText('Advanced options').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
 await commonSteps.dragAndDropSignatureWidget('signature', 600, 300);
await page.getByRole('button', { name: 'Next' }).click();
await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');

await page.locator('//button[.//i[contains(@class,"fa-copy")] and .//span[normalize-space()="Copy link"]]').click();
const copiedUrl = await page.locator('//p[@id="copyUrl"]').evaluate(el => el.textContent.trim());
const page1 = await page.context().newPage();
await page1.goto(copiedUrl);
await page1.locator('//input[@type="checkbox" and @data-tut="IsAgree"]').click();
await page1.getByRole('button', { name: 'Agree & Continue' }).click();
await page1.waitForLoadState("networkidle");
await expect(page1.getByRole('paragraph')).toContainText('Please complete the fields on page number 1, all highlighted in the same color for easy identification.');
  await page1.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page1.getByRole('paragraph')).toContainText('List of signers who still need to sign the document .');
  await page1.getByRole('dialog').locator('div').nth(1).click();
  await page1.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page1.getByRole('paragraph')).toContainText('Click any of the placeholders appearing on the document to sign. You will then see options to draw your signature, type it, or upload an image .');
  await page1.locator('.sc-gsFSXq > button:nth-child(3)').click();
  await expect(page1.getByRole('paragraph')).toContainText('Click Decline, or Finish buttons to navigate your document. Use the ellipsis menu for additional options, including the Download button .');
  await expect(page1.locator('label')).toContainText('Don\'t show this again');
  await page1.getByRole('checkbox', { name: 'Don\'t show this again' }).check();
  await page1.getByRole('button', { name: 'Close' }).click();
await page1.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page1.locator('//div[@id="container"]//div[text()="signature"]').click();
await page1.mouse.down();
await page1.mouse.move(150, 128)
await page1.mouse.move(160, 138)
await page1.mouse.up();
// Optionally save changes
await page1.locator("//button[normalize-space()='Save']").click();
await page1.getByRole('button', { name: 'Finish' }).click();
});*/

test('Verify that the tour guide messages not displayed for an existing signer when the tour guide is set to disabled.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await page.getByText('Advanced options').click();
await page.locator('input[name="IsTourEnabled"]').nth(1).check();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await commonSteps.dragAndDropSignatureWidget('signature', 600, 200);
await page.getByRole('button', { name: 'Next' }).click();
await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.locator('//span[@class="hidden md:block ml-1 " and text()="Copy link"]').click();
const copiedUrl = await page.locator('//p[@id="copyUrl"]').evaluate(el => el.textContent.trim());
const page1 = await page.context().newPage();
const commonStepspage1 = new CommonSteps(page1);
await page1.goto(copiedUrl);
await commonStepspage1.validateAndAcceptTerms();
await page1.waitForLoadState("networkidle");
await expect(page1.getByRole('paragraph')).not.toBeVisible();
await page1.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await commonStepspage1.clickSignatureWidgetAndDraw();
await commonStepspage1.clickDoneButtonInSignerModal();
await commonStepspage1.clickFinishButtonInSignerModal();
});
test('Verify that the signer redireced to the url if redirect url is set.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();

  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await page.getByText('Advanced options').click();
await page.locator('input[name="RedirectUrl"]').fill('https://docs.opensignlabs.com/');
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await commonSteps.dragAndDropSignatureWidget('signature', 600, 200);
await page.getByRole('button', { name: 'Next' }).click();
await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');

await page.locator('//span[@class="hidden md:block ml-1 " and text()="Copy link"]').click();
const copiedUrl = await page.locator('//p[@id="copyUrl"]').evaluate(el => el.textContent.trim());
const page1 = await page.context().newPage();
  const commonStepspage1 = new CommonSteps(page1);
await page1.goto(copiedUrl);
await commonStepspage1.validateAndAcceptTerms();
await page1.waitForLoadState("networkidle");
await expect(page1.getByRole('paragraph')).not.toBeVisible();
await page1.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await commonStepspage1.clickSignatureWidgetAndDraw();
// Optionally save changes
await commonStepspage1.clickDoneButtonInSignerModal();
await commonStepspage1.clickFinishButtonInSignerModal();
//validate that the page is redirected to the specified URL after signing the document
await expect(page1).toHaveURL('https://docs.opensignlabs.com/', { timeout: 90000 });
});
test('Verify that the signer can add the widget if the allowed modification set to enabled.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample-Joining-Letter.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await page.getByText('Advanced options').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await commonSteps.dragAndDropSignatureWidget('signature', 600, 200);
await page.getByRole('button', { name: 'Next' }).click();
await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');

await page.locator('//span[@class="hidden md:block ml-1 " and text()="Copy link"]').click();
const copiedUrl = await page.locator('//p[@id="copyUrl"]').evaluate(el => el.textContent.trim());
const page1 = await page.context().newPage();
  const commonStepspage1 = new CommonSteps(page1);
await page1.goto(copiedUrl);
await commonStepspage1.validateAndAcceptTerms();
await page1.waitForLoadState("networkidle");
await expect(page1.getByRole('paragraph')).not.toBeVisible();
await page1.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await commonStepspage1.clickSignatureWidgetAndDraw();
// Optionally save changes
await commonStepspage1.clickDoneButtonInSignerModal();
await commonStepspage1.clickFinishButtonInSignerModal();

});
test('Verify that the signature settings function correctly for the signature widget on the request signature page.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
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
await commonSteps.dragAndDropSignatureWidget('signature', 600, 200);
await page.locator('//i[contains(@class, "fa-gear") and contains(@class, "icon")]').click();
await page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').first().uncheck();
  await page.getByRole('textbox').fill('Signature Draw removed');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator("//div[@class='flex items-stretch justify-center']//div[text()='Signature Draw removed']").click();
  await page.locator('//i[contains(@class, "fa-gear") and contains(@class, "icon")]').click();
  await expect(page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').first()).not.toBeChecked();
  await expect(page.getByRole('textbox')).toHaveValue('Signature Draw removed');
  await page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').nth(1).uncheck();
    await page.getByRole('textbox').fill('Signature type removed');
  await page.getByRole('button', { name: 'Save' }).click();
    await page.locator("//div[@class='flex items-stretch justify-center']//div[text()='Signature type removed']").click();
await page.locator('//i[contains(@class, "fa-gear") and contains(@class, "icon")]').click();
  await expect(page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').nth(1)).not.toBeChecked();
  await page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').nth(2).uncheck();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').nth(2).check();
  await page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').nth(3).uncheck();
  await page.getByRole('textbox').fill('only upload type enabled');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator("//div[@class='flex items-stretch justify-center']//div[text()='only upload type enabled']").click();
 await page.locator('//i[contains(@class, "fa-gear") and contains(@class, "icon")]').click();
  await expect(page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').first()).not.toBeChecked();
  await expect(page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').nth(1)).not.toBeChecked();
  await expect(page.locator('//input[@class="mr-[2px] op-checkbox op-checkbox-xs" and @type="checkbox"]').nth(3)).not.toBeChecked();
  await expect(page.getByRole('textbox')).toHaveValue('only upload type enabled');
}); 
test('Verify that the merge page functions correctly and the user can sign the merged document in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
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
await page.waitForLoadState("networkidle");
await expect(page.locator('#renderList')).toContainText('1 of 1');
  const fileChooserPromise2 = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: '+ Add pages' }).click();
  const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await expect(
  page.locator('//div[@class="flex py-[5px]"]//span[@class="text-xs text-base-content font-medium mx-2 2xl:text-[20px]"]')).toHaveText('1 of 4');
   await page.locator('div').filter({ hasText: /^Add pages$/ }).locator('canvas').nth(1).click({
    position: {
      x: 107,
      y: 89
    }
  });
 
  await expect(
  page.locator('//div[@class="flex py-[5px]"]//span[@class="text-xs text-base-content font-medium mx-2 2xl:text-[20px]"]')).toHaveText('2 of 4');
 await page.locator('div').filter({ hasText: /^Add pages$/ }).locator('canvas').nth(2).click({
    position: {
      x: 106,
      y: 104
    }
  });
  await expect(
  page.locator('//div[@class="flex py-[5px]"]//span[@class="text-xs text-base-content font-medium mx-2 2xl:text-[20px]"]')).toHaveText('3 of 4');
await page.locator('div').filter({ hasText: /^Add pages$/ }).locator('canvas').nth(3).click({
    position: {
      x: 102,
      y: 84
    }
  });
await commonSteps.dragAndDropSignatureWidget('signature', 600, 170);
await commonSteps.dragAndDrop('stamp',600, 230);
await commonSteps.dragAndDrop('initials',600, 260);
await commonSteps.dragAndDrop('name',600, 300);
await commonSteps.dragAndDrop('job title',600, 330);
await commonSteps.dragAndDrop('company',600, 360);
await commonSteps.dragAndDrop('date',600, 380);
await commonSteps.dragAndDrop('text input',600, 400);
await commonSteps.dragAndDrop('checkbox',600, 420);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('dropdown',600, 450);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('radio button',600, 500);
await commonSteps.ClickSavebuttonSignerModal();
await commonSteps.dragAndDrop('image',800, 450);
await commonSteps.dragAndDrop('email',800, 500);
await page.getByRole('button', { name: 'Next' }).click();
//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that the delete page functions correctly in request signature.', async ({ page }) => {
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
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
await page.waitForLoadState("networkidle");
await expect( page.locator('//div[@class="flex py-[5px]"]//span[@class="text-xs text-base-content font-medium mx-2 2xl:text-[20px]"]')).toHaveText('1 of 3');
  await page.getByTitle('Delete page').locator('i').click();
  await expect(page.getByRole('heading')).toContainText('Delete page');
  await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to delete this page?');
  await expect(page.locator('#selectSignerModal')).toContainText('Note: Once you delete this page, you cannot undo.');
  await page.getByRole('button', { name: 'Yes' }).click();
 await expect(page.locator('//div[@class="flex py-[5px]"]//span[@class="text-xs text-base-content font-medium mx-2 2xl:text-[20px]"]')).toHaveText('1 of 2');

});
test('Verify that the rotate page functions correctly in request signature.', async ({ page }) => {
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
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
await page.waitForLoadState("networkidle");
await expect(page.locator('#renderList')).toContainText('1 of 3');
  await page.locator('canvas').nth(1).click({
    position: {
      x: 80,
      y: 133
    }
  });
  await expect(page.locator('#renderList')).toContainText('2 of 3');
  await page.getByTitle('Rotate right').locator('i').click();
await expect(page.locator('#renderList')).toMatchAriaSnapshot(`
     - button "+ Add pages"
     - text: +      
     - button
     - text: 2 of 3
     - button
     - button ""
     - button "Back"
     - button "Next"
     - text: Recipients
     - superscript: "?"
     - text:  Prefill by owner A Andy amaya andyamaya@nxglabs.in
     - combobox "Signer must sign. Approver approves without signing. Viewer only views.":
       - option "Signer" [selected]
       - option "Viewer"
       - option "Approver"
     - text:  
     - separator
     - button "+ Add recipients"
     - text: Widgets
     - list "Add widgets": " signature   stamp   initials   text input   number #  name   job title   company   email   date   cells   checkbox   dropdown   radio button   image   attachments "
     `);
  await page.getByTitle('Rotate right').locator('i').click();
  await page.locator('div').filter({ hasText: /^Add pages$/ }).locator('canvas').nth(1).click({
    position: {
      x: 138,
      y: 143
    }
  });
 await expect(page.locator('#renderList')).toMatchAriaSnapshot(`
     - button "+ Add pages"
     - text: +      
     - button
     - text: 2 of 3
     - button
     - button ""
     - button "Back"
     - button "Next"
     - text: Recipients
     - superscript: "?"
     - text:  Prefill by owner A Andy amaya andyamaya@nxglabs.in
     - combobox "Signer must sign. Approver approves without signing. Viewer only views.":
       - option "Signer" [selected]
       - option "Viewer"
       - option "Approver"
     - text:  
     - separator
     - button "+ Add recipients"
     - text: Widgets
     - list "Add widgets": " signature   stamp   initials   text input   number #  name   job title   company   email   date   cells   checkbox   dropdown   radio button   image   attachments "
     `);
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

await page.mouse.move(600, 320)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();

await page.mouse.move(600, 340)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(600, 370)
await page.mouse.up();

await page.locator('//span[normalize-space()=\'date\']').hover();
await page.mouse.down();
await page.mouse.move(600, 390)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'text input\']').hover();
await page.mouse.down();
await page.mouse.move(600, 420)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'checkbox\']').hover();
await page.mouse.down();
await page.mouse.move(600, 450)
await page.mouse.up();
page.locator("//button[@type='submit' and text()='Save']").click();
await page.locator('//span[normalize-space()=\'image\']').hover();
await page.mouse.down();
await page.mouse.move(600, 470)
await page.mouse.up();
await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();

await page.mouse.move(600, 520)
await page.mouse.up();
await page.getByRole('button', { name: 'Next' }).click();

//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that signature widget Copy widget to all pages function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
await commonSteps.dragAndDropSignatureWidget('signature', 600, 200);
while (true) {
  await page.locator("//i[contains(concat(' ', normalize-space(@class), ' '), ' fa-light ') and contains(concat(' ', normalize-space(@class), ' '), ' fa-copy ')]").click();
  
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByRole('button', { name: 'Apply' }).click();
await expect(
  page.locator(
    '//div[@data-page-number="1"]//div[contains(@class,"signYourselfBlock")]//div[contains(@class,"font-medium") and normalize-space()="signature-1"]'
  )
).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@data-page-number="2" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"signature")]')).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('//div[@data-page-number="3" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"signature")]')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  //await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
  await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that signature widgets Copy widget to all pages but last function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();

  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
await commonSteps.dragAndDropSignatureWidget('signature', 600, 200);
while (true) {
 await page.locator("//i[contains(concat(' ', normalize-space(@class), ' '), ' fa-light ') and contains(concat(' ', normalize-space(@class), ' '), ' fa-copy ')]").click();
  
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('All pages but last').click();
await page.getByRole('button', { name: 'Apply' }).click();
   await expect(
  page.locator(
    '//div[@data-page-number="1"]//div[contains(@class,"signYourselfBlock")]//div[contains(@class,"font-medium") and normalize-space()="signature-1"]'
  )
).toBeVisible();

  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@data-page-number="2" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"signature")]')).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
   await expect(page.locator('//div[@data-page-number="2" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"signature")]')).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
  //await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
  await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that signature widgets Copy widget to all pages but first function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('canvas').nth(2).click({
  position: {
    x: 49,
    y: 71
  }
});
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await commonSteps.dragAndDropSignatureWidget('signature', 600, 300);
while (true) {
  await page.locator("//i[contains(concat(' ', normalize-space(@class), ' '), ' fa-light ') and contains(concat(' ', normalize-space(@class), ' '), ' fa-copy ')]").click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }
  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('All pages but first').click();
await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.locator('//div[@data-page-number="3"]//div[contains(@class,"signYourselfBlock")]//div[contains(@class,"font-medium") and normalize-space()="signature-1"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@data-page-number="2" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"signature")]')).toBeVisible();
  await page.locator('canvas').nth(0).click({
    position: {
      x: 65,
      y: 59
    }
  });
   await expect(page.locator('//div[@data-page-number="1" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"signature")]')).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  //await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
  await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that signature widgets Copy widget next to current function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
await commonSteps.dragAndDropSignatureWidget('signature', 600, 300);
while (true) {
 await page.locator("//i[contains(concat(' ', normalize-space(@class), ' '), ' fa-light ') and contains(concat(' ', normalize-space(@class), ' '), ' fa-copy ')]").click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }
  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
// XPath that targets every “signature” block inside a draggable widget
const signatureLocator = page.locator('//div[@data-page-number="1" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"signature")]');
// Count the matches
const count = await signatureLocator.count();
// ✅ Test passes if count > 1, fails otherwise
expect(count).toBeGreaterThan(1);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that stamp widget Copy widget to all pages function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
await commonSteps.dragAndDropSignatureWidget('signature', 600, 300);
await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 370)
await page.mouse.up();
while (true) {
 await page.locator("//i[contains(concat(' ', normalize-space(@class), ' '), ' fa-light ') and contains(concat(' ', normalize-space(@class), ' '), ' fa-copy ')]").click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByRole('button', { name: 'Apply' }).click();
await expect(
  page.locator(
    '//div[@data-page-number="1"]//div[contains(@class,"signYourselfBlock")]//div[contains(@class,"font-medium") and normalize-space()="stamp-1"]'
  )
).toBeVisible();

  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@data-page-number="2" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"stamp")]')).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('//div[@data-page-number="3" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"stamp")]')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
  //await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
  await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that stamp widgets Copy widget to all pages but last function correctly in request signature.', async ({ page }) => {
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
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
await commonSteps.dragAndDropSignatureWidget('signature', 600, 300);
await page.locator('//span[normalize-space()=\'stamp\']').hover();
await page.mouse.down();
await page.mouse.move(600, 400)
await page.mouse.up();
while (true) {
 await page.locator("//i[contains(concat(' ', normalize-space(@class), ' '), ' fa-light ') and contains(concat(' ', normalize-space(@class), ' '), ' fa-copy ')]").click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('All pages but last').click();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('//div[@data-page-number="1"]//div[contains(@class,"signYourselfBlock")]//div[contains(@class,"font-medium") and normalize-space()="stamp-1"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@data-page-number="2" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"stamp")]')).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('//div[@data-page-number="3" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"stamp")]')).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
});
test('Verify that stamp widgets Copy widget to all pages but first function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
await commonSteps.dragAndDropSignatureWidget('signature', 600, 300);
await page.locator('canvas').nth(2).click({
  position: {
    x: 65,
    y: 59
  }
});
await page.locator('//span[normalize-space()="stamp"]').hover();
          await page.mouse.down();
          await page.mouse.move(600, 360);
          await page.mouse.up();
while (true) {
  await page.locator("//i[contains(concat(' ', normalize-space(@class), ' '), ' fa-light ') and contains(concat(' ', normalize-space(@class), ' '), ' fa-copy ')]").click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }
  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('All pages but first').click();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('//div[@data-page-number="3"]//div[contains(@class,"signYourselfBlock")]//div[contains(@class,"font-medium") and normalize-space()="stamp-1"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@data-page-number="2" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"stamp")]')).toBeVisible();
  await page.locator('canvas').nth(0).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('//div[@data-page-number="1" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"stamp")]')).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
});
test('Verify that stamp widgets Copy widget next to current function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
await commonSteps.dragAndDropSignatureWidget('signature', 600, 300);
await page.locator('//span[normalize-space()="stamp"]').hover();
await page.mouse.down();
await page.mouse.move(600, 370);
await page.mouse.up();

while (true) {
 await page.locator("//i[contains(concat(' ', normalize-space(@class), ' '), ' fa-light ') and contains(concat(' ', normalize-space(@class), ' '), ' fa-copy ')]").click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }
  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
  const signatureLocator = page.locator('//div[@data-page-number="1" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"stamp")]');
// Count the matches
const count = await signatureLocator.count();
// ✅ Test passes if count > 1, fails otherwise
expect(count).toBeGreaterThan(1);
await page.getByRole('button', { name: 'Next' }).click();
  //await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
  await page.getByRole('button', { name: 'Send' }).click();
});
/*
test('Verify that initials widgets all types function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
await page.locator('//span[normalize-space()="initials"]').hover();
await page.mouse.down();
await page.mouse.move(600, 420)
await page.mouse.up();
await page.locator('//i[@class="fa-light fa-gear icon"]').dblclick();
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()="Draw"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()="Draw"]').click();
//draw the signature
await page.mouse.move(700, 350)
await page.mouse.down();
await page.mouse.move(700, 380)
await page.mouse.up();
await page.locator("//button[@type='button' and @class=' op-btn op-btn-primary shadow-lg' and text()='Save']").click();

await page.locator('//span[normalize-space()="initials"]').hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();
await page.locator('//i[@class="fa-light fa-gear icon"]').dblclick();
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()=" Upload image"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()=" Upload image"]').click();
const fileChooserPromise1 = page.waitForEvent('filechooser');
await page.locator('//i[@class=\'fa-light fa-cloud-upload-alt uploadImgLogo\']').click();
const fileChooser1 = await fileChooserPromise1;
await fileChooser1.setFiles(path.join(__dirname, '../TestData/Images/initial.png'));
await page.locator("//button[normalize-space()='Save']").click();

await page.locator('//span[normalize-space()="initials"]').hover();
await page.mouse.down();
await page.mouse.move(600, 580)
await page.mouse.up();
await page.locator('//i[@class="fa-light fa-gear icon"]').dblclick();
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()="Type"]').waitFor({ state: 'visible', timeout: 90000 });
await page.locator('//span[@class="no-underline op-link underline-offset-8 ml-[2px]" and text()="Type"]').click();
await page.locator('//div[@class="flex justify-between items-center"]//input[@placeholder="Your initials"]').fill('Ma');
await page.getByText('Ma').nth(3).click();
await page.getByRole('button', { name: 'Save' }).click();
await page.locator("//button[normalize-space()='Finish']").click();
await page.getByText('Successfully signed!').waitFor({ timeout: 120000 });
});*/

test('Verify that initials widget Copy widget to all pages function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
await commonSteps.dragAndDropSignatureWidget('signature', 600, 300);
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 370)
await page.mouse.up();
while (true) {
  await page.locator("//i[contains(concat(' ', normalize-space(@class), ' '), ' fa-light ') and contains(concat(' ', normalize-space(@class), ' '), ' fa-copy ')]").click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('//div[@data-page-number="1"]//div[contains(@class,"signYourselfBlock")]//div[contains(@class,"font-medium") and normalize-space()="initials-1"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@data-page-number="2" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"initials")]')).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('//div[@data-page-number="3" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"initials")]')).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
  //await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
  await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that initials widgets Copy widget to all pages but last function correctly in request signature.', async ({ page }) => {
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
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
await commonSteps.dragAndDropSignatureWidget('signature', 600, 300);
await page.locator('//span[normalize-space()=\'initials\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
while (true) {
 await page.locator("//i[contains(concat(' ', normalize-space(@class), ' '), ' fa-light ') and contains(concat(' ', normalize-space(@class), ' '), ' fa-copy ')]").click();
  
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('All pages but last').click();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('//div[@data-page-number="1"]//div[contains(@class,"signYourselfBlock")]//div[contains(@class,"font-medium") and normalize-space()="initials-1"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@data-page-number="2" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"initials")]')).toBeVisible();
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('//div[@data-page-number="2" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"initials")]')).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
});
test('Verify that initials widgets Copy widget to all pages but first function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
await commonSteps.dragAndDropSignatureWidget('signature', 600, 300);
await page.locator('canvas').nth(2).click({
  position: {
    x: 65,
    y: 59
  }
});
await page.locator('//span[normalize-space()="initials"]').hover();
          await page.mouse.down();
          await page.mouse.move(600, 360);
          await page.mouse.up();
while (true) {
  await page.locator("//i[contains(concat(' ', normalize-space(@class), ' '), ' fa-light ') and contains(concat(' ', normalize-space(@class), ' '), ' fa-copy ')]").click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }
  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('All pages but first').click();
await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('//div[@data-page-number="3"]//div[contains(@class,"signYourselfBlock")]//div[contains(@class,"font-medium") and normalize-space()="initials-1"]')).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  await expect(page.locator('//div[@data-page-number="2" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"initials")]')).toBeVisible();
  await page.locator('canvas').nth(0).click({
    position: {
      x: 65,
      y: 59
    }
  });
  await expect(page.locator('//div[@data-page-number="1" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"initials")]')).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
});
test('Verify that initials widgets Copy widget next to current function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');

await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
await commonSteps.dragAndDropSignatureWidget('signature', 600, 300);
await page.locator('//span[normalize-space()="initials"]').hover();
await page.mouse.down();
await page.mouse.move(800, 370);
await page.mouse.up();

while (true) {
  await page.locator("//i[contains(concat(' ', normalize-space(@class), ' '), ' fa-light ') and contains(concat(' ', normalize-space(@class), ' '), ' fa-copy ')]").click();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }
  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
const locator = page.locator('//div[@data-page-number="1" and @id="container"]//div[contains(@class,"font-medium") and starts-with(normalize-space(),"initials")]');
const count = await locator.count();
expect(count).toBe(2);
await page.getByRole('button', { name: 'Next' }).click();

  //await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
  await page.getByRole('button', { name: 'Send' }).click();
});
test('Verify that text widgets settings for Name, Job Title, Company, Text, and Email function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
await commonSteps.dragAndDropSignatureWidget('signature', 600, 300);
await page.locator('//span[normalize-space()=\'name\']').hover();
await page.mouse.down();
await page.mouse.move(600, 400)
await page.mouse.up();
while (true) {
  await page.locator('//div[contains(@class,"signYourselfBlock")][.//span[normalize-space()="name-1"]]//i[contains(@class,"fa-gear")]').dblclick();
  const isVisible = await page.locator('//h3[text()="Widget info"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[7px] w-[60%] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('18');
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
  await page.getByRole('button', { name: 'Save' }).click();
  const widget = page.locator(
  "//div[contains(@class,'signYourselfBlock')]//div[contains(@class,'select-none-cls')][.//span[normalize-space()='name-1']]"
);

const fontSize = await widget.evaluate(el => getComputedStyle(el).fontSize);
const color = await widget.evaluate(el => getComputedStyle(el).color);

console.log(`Font Size: ${fontSize}, Color: ${color}`);

if (fontSize === '19.8649px' && color === 'rgb(0, 0, 255)') {
  console.log('Test Passed: Font size and color are correct.');
} else {
  throw new Error(`Test Failed: Expected Font Size: 15.6924px, Color: blue but got Font Size: ${fontSize}, Color: ${color}`);
}
await page.locator('//span[normalize-space()=\'job title\']').hover();
await page.mouse.down();
await page.mouse.move(600, 480)
await page.mouse.up();
await page.locator('//div[contains(@class,"signYourselfBlock")][.//span[normalize-space()="job title-1"]]//i[contains(@class,"fa-gear")]').dblclick();
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[7px] w-[60%] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('18');
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
  await page.getByRole('button', { name: 'Save' }).click();
 
   const widgetJobtitle = page.locator(
  "//div[contains(@class,'signYourselfBlock')]//div[contains(@class,'select-none-cls')][.//span[normalize-space()='job title-1']]"
);

const fontSizeJobTitle = await widgetJobtitle.evaluate(el => getComputedStyle(el).fontSize);
const colorJobTitle = await widgetJobtitle.evaluate(el => getComputedStyle(el).color);

console.log(`Font Size: ${fontSizeJobTitle}, Color: ${colorJobTitle}`);

if (fontSizeJobTitle === '19.8649px' && colorJobTitle === 'rgb(0, 0, 255)') {
  console.log('Test Passed: Font size and color are correct.');
} else {
  throw new Error(`Test Failed: Expected Font Size: 19.8649px, Color: blue but got Font Size: ${fontSizeJobTitle}, Color: ${colorJobTitle}`);
}

await page.locator('//span[normalize-space()=\'company\']').hover();
await page.mouse.down();
await page.mouse.move(600, 520)
await page.mouse.up();
await page.locator('//div[contains(@class,"signYourselfBlock")][.//span[normalize-space()="company-1"]]//i[contains(@class,"fa-gear")]').dblclick();
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[7px] w-[60%] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('18');
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
  await page.getByRole('button', { name: 'Save' }).click();
 
 const widgetCompany = page.locator(
  "//div[contains(@class,'signYourselfBlock')]//div[contains(@class,'select-none-cls')][.//span[normalize-space()='job title-1']]"
);
const fontSizecompany = await widgetCompany.evaluate(el => getComputedStyle(el).fontSize);
const colorcompany = await widgetCompany.evaluate(el => getComputedStyle(el).color);

console.log(`Font Size: ${fontSizecompany}, Color: ${colorcompany}`);

if (fontSizecompany === '19.8649px' && colorcompany === 'rgb(0, 0, 255)') {
  console.log('Test Passed: Font size and color are correct.');
} else {
  throw new Error(`Test Failed: Expected Font Size: 15.6924px, Color: blue but got Font Size: ${fontSizecompany}, Color: ${colorcompany}`);
}

await page.locator('//span[normalize-space()=\'text input\']').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 590)
await page.mouse.up();
await page.locator('//div[contains(@class,"signYourselfBlock")][.//span[normalize-space()="text input-1"]]//i[contains(@class,"fa-gear")]').dblclick();
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[7px] w-[60%] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('18');
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
  await page.getByRole('button', { name: 'Save' }).click();
 
  const widgetTextinput = page.locator(
  "//div[contains(@class,'signYourselfBlock')]//div[contains(@class,'select-none-cls')][.//span[normalize-space()='job title-1']]"
);
const fontSizeTextInput = await widgetTextinput.evaluate(el => getComputedStyle(el).fontSize);
const colorTextInput = await widgetTextinput.evaluate(el => getComputedStyle(el).color);

console.log(`Font Size: ${fontSizeTextInput }, Color: ${colorTextInput}`);

if (fontSizeTextInput === '19.8649px' && colorTextInput  === 'rgb(0, 0, 255)') {
  console.log('Test Passed: Font size and color are correct.');
} else {
  throw new Error(`Test Failed: Expected Font Size: 19.8649px, Color: blue but got Font Size: ${fontSizetext }, Color: ${colortext }`);
}

await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(600, 630)
await page.mouse.up();
await page.locator('//div[contains(@class,"signYourselfBlock")][.//span[normalize-space()="email-1"]]//i[contains(@class,"fa-gear")]').dblclick();
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[7px] w-[60%] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('18');
await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
  await page.getByRole('button', { name: 'Save' }).click();
  const widgetEmail = page.locator(
  "//div[contains(@class,'signYourselfBlock')]//div[contains(@class,'select-none-cls')][.//span[normalize-space()='job title-1']]"
);
const fontSizeemail = await widgetEmail.evaluate(el => getComputedStyle(el).fontSize);
const coloremail = await widgetEmail.evaluate(el => getComputedStyle(el).color);
console.log(`Font Size: ${fontSizeemail}, Color: ${coloremail}`);

if (fontSizeemail=== '19.8649px' && coloremail  === 'rgb(0, 0, 255)') {
  console.log('Test Passed: Font size and color are correct.');
} else {
  throw new Error(`Test Failed: Expected Font Size: 19.8649px, Color: blue but got Font Size: ${fontSizeemail }, Color: ${coloremail }`);
}
await page.getByRole('button', { name: 'Next' }).click();
//await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
await page.getByRole('button', { name: 'Send' }).click();

});
test('Verify that name,job title, company, checkbox, image and email widgets Copy function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
  const rowLocator = page.locator("//div[contains(@class,'signYourselfBlock')]//div[contains(@class,'font-medium') and normalize-space()='signature-1']");

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
// Copy and verify "name"
await page.locator('//span[normalize-space()="name"]').hover();
await page.mouse.down();
await page.mouse.move(600, 300);
await page.mouse.up();
await expect(page.locator("//div[@class='signYourselfBlock react-draggable']//span[text()='name-1']")).toBeVisible();

while (true) {
    await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
    const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
    if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break;
  }
  await page.waitForTimeout(500);
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
  const nameCount = await page.locator('//div[contains(@class,"flex") and contains(@class,"justify-center")]//div[contains(@class,"select-none-cls")]//span[starts-with(normalize-space(),"name")]').count();
expect(nameCount).toBeGreaterThan(1);
// Copy and verify "job title"
await page.locator('//span[normalize-space()="job title"]').hover();
await page.mouse.down();
await page.mouse.move(600, 350);
await page.mouse.up();
await expect(page.locator("//div[@class='signYourselfBlock react-draggable']//span[text()='job title-1']")).toBeVisible();
while (true) {
    await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
    const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
    if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break;
  }
  await page.waitForTimeout(500);
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
const JobtitleCount = await page.locator('//div[contains(@class,"flex") and contains(@class,"justify-center")]//div[contains(@class,"select-none-cls")]//span[starts-with(normalize-space(),"job title")]').count();
expect(JobtitleCount).toBeGreaterThan(1);

// Copy and verify "company"
await page.locator('//span[normalize-space()="company"]').hover();
await page.mouse.down();
await page.mouse.move(600, 400);
await page.mouse.up();
await expect(page.locator("//div[@class='signYourselfBlock react-draggable']//span[text()='company-1']")).toBeVisible();
while (true) {
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
    const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break;
  }
  await page.waitForTimeout(500);
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
const companynameCount = await page.locator('//div[contains(@class,"flex") and contains(@class,"justify-center")]//div[contains(@class,"select-none-cls")]//span[starts-with(normalize-space(),"company")]').count();
expect(companynameCount).toBeGreaterThan(1);

// Copy and verify "checkbox"
await page.locator('//span[normalize-space()="checkbox"]').hover();
await page.mouse.down();
await page.mouse.move(600, 450);
await page.mouse.up();
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//label[.//span[text()="Option-1"]]').click({ force: true });
while (true) {
   await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
    const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
   if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break;
  }
  await page.waitForTimeout(500);
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
const checkboxCount = await page.locator('//label[.//span[text()="Option-1"]]').count();
expect(checkboxCount).toBeGreaterThan(1);

// Copy and verify "radio button"
await page.locator('//span[normalize-space()="radio button"]').hover();
await page.mouse.down();
await page.mouse.move(680, 450);
await page.mouse.up();
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//input[@type="radio" and contains(@id, "radio-")]/following-sibling::span[text()="Option-1"]/parent::label').click({ force: true });
while (true) {
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
    const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break;
  }
  await page.waitForTimeout(500);
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
const radioCount = await page.locator('//input[@type="radio" and contains(@id, "radio-")]/following-sibling::span[text()="Option-1"]/parent::label').count();
expect(radioCount).toBeGreaterThan(1);

// Copy and verify "dropdown"
await page.locator('//span[normalize-space()="dropdown"]').hover();
await page.mouse.down();
await page.mouse.move(750, 550);
await page.mouse.up();
await page.locator("//button[normalize-space()='Save']").click();
await page.locator('//div[contains(@class, "select-none-cls") and contains(., "Choose One")]').click({ force: true });
while (true) {
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
   const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break;
  }
  await page.waitForTimeout(500);
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
const dropdownCount = await page.locator('//div[contains(@class, "select-none-cls") and contains(., "Choose One")]').count();
expect(dropdownCount).toBeGreaterThan(1);
// Copy and verify "image"
await page.locator('//span[normalize-space()="image"]').hover();
await page.mouse.down();
await page.mouse.move(600, 500);
await page.mouse.up();
while (true) {
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
    const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break;
  }
  await page.waitForTimeout(500);
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
const ImageCount = await page.locator('//div[contains(@class,"signYourselfBlock")]//div[starts-with(normalize-space(),"image")]').count();
expect(ImageCount).toBeGreaterThan(1);
  await page.locator('//span[normalize-space()=\'email\']').hover();
await page.mouse.down();
await page.mouse.move(600, 550)
await page.mouse.up();
await expect(page.locator("//div[@class='signYourselfBlock react-draggable']//span[text()='email-1']")).toBeVisible();

while (true) {
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
    const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break;
  }
  await page.waitForTimeout(500);
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
const EmailCount = await page.locator('//div[contains(@class,"signYourselfBlock")]//div[starts-with(normalize-space(),"email")]').count();
expect(EmailCount).toBeGreaterThan(1);
    await page.getByRole('button', { name: 'Next' }).click();
    //await expect(page.locator('#selectSignerModal')).toContainText('Are you sure you want to send out this document for signatures?');
    await page.getByRole('button', { name: 'Send' }).click();

});
test('Verify that checkbox widget settings options function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
  const rowLocator = page.locator("//div[contains(@class,'signYourselfBlock')]//div[contains(@class,'font-medium') and normalize-space()='signature-1']");

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
await page.locator('//span[normalize-space()=\'checkbox\']').hover();
    await page.mouse.down();
    await page.mouse.move(600, 450)
    await page.mouse.up();
    await page.locator("//button[normalize-space()='Save']").click(); 
    await page.locator('//label[.//span[text()="Option-1"]]').click({ force: true });
while (true) {
 await page.locator('//div[contains(@class,"signYourselfBlock") and contains(@class,"react-draggable-dragged")]//i[contains(@class,"fa-gear")]').click({ force: true });
  const isVisible = await page.locator('//h3[text()="Checkbox"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
 await expect(page.locator('form')).toContainText('Name *');
  await expect(page.getByRole('textbox').first()).toHaveValue(/checkbox-/);
  await expect(page.locator('form')).toContainText('Options');
  await expect(page.getByRole('textbox').nth(1)).toHaveValue('Option-1');
  await expect(page.getByRole('textbox').nth(2)).toHaveValue('Option-2');
  await page.locator('#selectSignerModal i').nth(2).click();
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('Option-3');
  await page.locator("(//select[contains(@class, 'op-select')])[1]").selectOption('18');
  await page.locator("(//select[contains(@class, 'op-select')])[2]").selectOption('blue');
//await page.locator('//dialog[@id="selectSignerModal"]//div[@class="flex items-center mt-3 mb-3"]').selectOption('18');
//await page.locator('//dialog[@id="selectSignerModal"]//select[@class="ml-[33px] md:ml-4 w-[65%] md:w-[full] op-select op-select-bordered op-select-sm focus:outline-none hover:border-base-content text-xs"]').selectOption('blue');
 await page.getByRole('button', { name: 'Save' }).click();
 const locator = page.locator('(//div[contains(@class, "signYourselfBlock react-draggable")]//input[@type="checkbox"])[1]');

const fontSize = await locator.evaluate(el => window.getComputedStyle(el).fontSize);
const color = await locator.evaluate(el => window.getComputedStyle(el).color);

console.log(`Font Size: ${fontSize}, Color: ${color}`);

const fontSizeValue = parseFloat(fontSize);
const expectedColor = 'rgb(0, 0, 255)'; // Equivalent to "blue"

if (fontSizeValue > 19.5 && color === expectedColor) {
  console.log('Test Passed: Font size and color are within expected range.');
} else {
  throw new Error(`Test Failed: Expected Font Size > 19.5px and Color: ${expectedColor} but got Font Size: ${fontSize}, Color: ${color}`);
}

});
test('Verify that prefill text widgets Copy widget to all pages function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
await commonSteps.dragAndDropSignatureWidget('signature', 600, 300);
await page.locator('div').filter({ hasText: /^Prefill by owner$/ }).click();
await page.getByTitle('text').locator('div').first().hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 590)
await page.mouse.up();
await page.locator('//div[@data-tut="pdfArea"]//textarea[@placeholder="text"]').click();
await page.locator('//dialog[@id="selectSignerModal"]//input[@placeholder="text"]').fill('20 wood street sanfransisco');
await page.getByRole('button', { name: 'Save' }).click();
while (true) {
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
  
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('All pages', { exact: true }).click();
await page.getByRole('button', { name: 'Apply' }).click();
await expect(page.locator("//textarea[text()='20 wood street sanfransisco']")).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  const locator = page.locator('textarea').nth(0);
await expect(locator).toHaveValue('20 wood street sanfransisco');
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
await expect(locator).toHaveValue('20 wood street sanfransisco');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator("//dialog[@id='selectSignerModal']//h3[text()='Send Mail']")).toBeVisible({ timeout: 120000 });
});
test('Verify that prefill text widget Copy widget to all pages but last function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
  const rowLocator = page.locator("//div[contains(@class,'signYourselfBlock')]//div[contains(@class,'font-medium') and normalize-space()='signature-1']");

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
await page.locator('div').filter({ hasText: /^Prefill by owner$/ }).click();
await page.getByTitle('text').locator('div').first().hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 590)
await page.mouse.up();
await page.locator('//div[@data-tut="pdfArea"]//textarea[@placeholder="text"]').click();
await page.locator('//dialog[@id="selectSignerModal"]//input[@placeholder="text"]').fill('20 wood street sanfransisco');
await page.getByRole('button', { name: 'Save' }).click();
while (true) {
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
  
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByRole('radio', { name: 'All pages but last' }).check();
await page.getByRole('button', { name: 'Apply' }).click();
await expect(page.locator("//textarea[text()='20 wood street sanfransisco']")).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
  const locator = page.locator('textarea').nth(0);
await expect(locator).toHaveValue('20 wood street sanfransisco');
  await page.locator('canvas').nth(2).click({
    position: {
      x: 65,
      y: 59
    }
  });
 const locator1 = page.locator('textarea', { hasText: '20 wood' });
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator("//dialog[@id='selectSignerModal']//h3[text()='Send Mail']")).toBeVisible({ timeout: 120000 });
});
test('Verify that prefill text widget Copy widget to all pages but first function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
await commonSteps.dragAndDropSignatureWidget('signature', 600, 300);
await page.locator('canvas').nth(2).click({
  position: {
    x: 65,
    y: 59
  }
});
await page.locator('div').filter({ hasText: /^Prefill by owner$/ }).click();
await page.locator('//div[@title ="text"]//span[text()="text"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 400)
await page.mouse.up();
await page.locator('//div[@data-tut="pdfArea"]//textarea[@placeholder="text"]').click();
await page.locator('//dialog[@id="selectSignerModal"]//input[@placeholder="text"]').fill('20 wood street sanfransisco');
await page.getByRole('button', { name: 'Save' }).click();
  while (true) {
    await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
    
    const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
    
    if (isVisible) {
        console.log('"Copy widget to" is visible. Stopping the loop.');
        break; // Exit loop once the element is visible
    }
  
    await page.waitForTimeout(500); // Small delay to prevent rapid clicking
  }
  await page.getByText('All pages but first').click();
await page.getByRole('button', { name: 'Apply' }).click();
 await expect(page.locator("//textarea[text()='20 wood street sanfransisco']")).toBeVisible();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 49,
      y: 71
    }
  });
await expect(page.locator('//div[@data-page-number="2"]//span[text()="20 wood street sanfransisco"]')).toBeVisible();
  await page.locator('canvas').nth(0).click({
    position: {
      x: 65,
      y: 59
    }
  });
await expect(page.locator('//div[@data-page-number="1"]//span[text()="20 wood street sanfransisco"]')).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator("//dialog[@id='selectSignerModal']//h3[text()='Send Mail']")).toBeVisible({ timeout: 120000 });
});
test('Verify that Prefill text widget Copy widget next to current widget function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
  const rowLocator = page.locator("//div[contains(@class,'signYourselfBlock')]//div[contains(@class,'font-medium') and normalize-space()='signature-1']");

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
await page.locator('div').filter({ hasText: /^Prefill by owner$/ }).click();
await page.locator('//div[@title ="text"]//span[text()="text"]').hover();
await page.mouse.down();
await page.waitForTimeout(1000);
await page.mouse.move(600, 590)
await page.mouse.up();
await page.locator('//div[@data-tut="pdfArea"]//textarea[@placeholder="text"]').click();
await page.locator('//dialog[@id="selectSignerModal"]//input[@placeholder="text"]').fill('20 wood street sanfransisco');
await page.getByRole('button', { name: 'Save' }).click();
while (true) {
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
  
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }

  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
await expect(page.locator("//textarea[text()='20 wood street sanfransisco']")).toBeVisible();
const textwidgetCount = await page.locator("//textarea[text()='20 wood street sanfransisco']").count();
expect(textwidgetCount).toBe(1);
await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator("//dialog[@id='selectSignerModal']//h3[text()='Send Mail']")).toBeVisible({ timeout: 120000 });
});
test('Verify that textinput field widget Copy widget to all pages function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();

  await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');

  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));

  await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
  await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
  await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();

  await page.locator('input[name="Name"]').click();
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 });
  await page.getByRole('button', { name: 'Next' }).click();

  await page.waitForLoadState('networkidle');
  await page.waitForSelector("//div[@class='react-pdf__Document']", { timeout: 90000 });

  const pageThumbnails = page.locator('div').filter({ hasText: /^Add pages$/ }).locator('canvas');

  await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await commonSteps.dragAndDropSignatureWidget('signature', 600, 200);
  await page.locator('//span[normalize-space()="text input"]').hover();
  await page.mouse.down();
  await page.mouse.move(800, 360);
  await page.mouse.up();

  const countTextInputsOnPage = async (pageNumber) =>
    page.evaluate((targetPageNumber) => {
      const pageElement = Array.from(
        document.querySelectorAll(`.react-pdf__Page[data-page-number="${targetPageNumber}"]`)
      ).sort(
        (firstPage, secondPage) =>
          secondPage.getBoundingClientRect().width - firstPage.getBoundingClientRect().width
      )[0];

      if (!pageElement) return 0;

      const pageRect = pageElement.getBoundingClientRect();

      const textInputs = Array.from(document.querySelectorAll('.select-none-cls')).filter((widget) =>
        widget.textContent.trim().startsWith('text input')
      );

      let count = 0;

      for (const widget of textInputs) {
        const widgetRect = widget.getBoundingClientRect();
        const widgetCenterX = widgetRect.left + widgetRect.width / 2;
        const widgetCenterY = widgetRect.top + widgetRect.height / 2;

        if (
          widgetCenterX >= pageRect.left &&
          widgetCenterX <= pageRect.right &&
          widgetCenterY >= pageRect.top &&
          widgetCenterY <= pageRect.bottom
        ) {
          count += 1;
        }
      }

      return count;
    }, pageNumber);

  await expect.poll(() => countTextInputsOnPage(1), { timeout: 10000 }).toBe(1);

  while (true) {
    await page
      .locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]')
      .filter({ visible: true })
      .first()
      .dblclick();

    if (await page.locator('//h3[text()="Copy widget to"]').isVisible()) {
      break;
    }

    await page.waitForTimeout(500);
  }

  await page.getByRole('button', { name: 'Apply' }).click();

  // Page 1 should have text input
  await expect.poll(() => countTextInputsOnPage(1), { timeout: 10000 }).toBe(1);

  // Page 2 should have text input
  await pageThumbnails.nth(1).click({
    position: { x: 49, y: 71 },
  });
  await expect.poll(() => countTextInputsOnPage(2), { timeout: 10000 }).toBe(1);

  // Page 3 should have text input
  await pageThumbnails.nth(2).click({
    position: { x: 65, y: 59 },
  });
  await expect.poll(() => countTextInputsOnPage(3), { timeout: 10000 }).toBe(1);

  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator("//dialog[@id='selectSignerModal']//h3[text()='Send Mail']")).toBeVisible({ timeout: 120000 });
});
test('Verify that textinput field widget Copy widget to all pages but last function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();
await page.locator('input[name="Name"]').click();
await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 }); // Wait up to 90s
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState("networkidle");
await page.waitForSelector('//div[@class=\'react-pdf__Document\']', { timeout: 90000 }); 
const pageThumbnails = page.locator('div').filter({ hasText: /^Add pages$/ }).locator('canvas');
await page.locator('//span[normalize-space()="signature"]').waitFor({ state: 'visible', timeout: 90000 });
await expect(page.locator('//span[normalize-space()=\'signature\']')).toBeVisible();
await page.locator('//span[normalize-space()=\'signature\']').hover();
await page.mouse.down();
await page.mouse.move(600, 300)
await page.mouse.up();
try {
  const rowLocator = page.locator("//div[contains(@class,'signYourselfBlock')]//div[contains(@class,'font-medium') and normalize-space()='signature-1']");

  for (let i = 0; i < 5; i++) { // Retry up to 5 times
      if (await rowLocator.isVisible() && await rowLocator.isEnabled()) {
      
          console.log("signature widget dragged and dropped");
          break; // Exit the loop if successfully clicked
      } else {
          console.log(`Attempt ${i + 1}: signature widget not visible on the document, performing actions...`);
          await page.locator('//span[normalize-space()="signature"]').hover();
          await page.mouse.down();
          await page.mouse.move(600, 300);
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

await page.locator('//span[normalize-space()="text input"]').hover();
await page.mouse.down();
await page.mouse.move(600, 360);
await page.mouse.up();

const countTextInputsOnPage = async (pageNumber) => page.evaluate((targetPageNumber) => {
  const pageElement = Array.from(
    document.querySelectorAll(`.react-pdf__Page[data-page-number="${targetPageNumber}"]`)
  ).sort((firstPage, secondPage) => secondPage.getBoundingClientRect().width - firstPage.getBoundingClientRect().width)[0];
  if (!pageElement) {
    return 0;
  }

  const pageRect = pageElement.getBoundingClientRect();
  const textInputs = Array.from(document.querySelectorAll('.select-none-cls')).filter((widget) =>
    widget.textContent.trim().startsWith('text input')
  );

  let count = 0;
  for (const widget of textInputs) {
    const widgetRect = widget.getBoundingClientRect();
    const widgetCenterX = widgetRect.left + widgetRect.width / 2;
    const widgetCenterY = widgetRect.top + widgetRect.height / 2;

    if (
      widgetCenterX >= pageRect.left &&
      widgetCenterX <= pageRect.right &&
      widgetCenterY >= pageRect.top &&
      widgetCenterY <= pageRect.bottom
    ) {
      count += 1;
    }
  }

  return count;
}, pageNumber);

await expect.poll(() => countTextInputsOnPage(1), { timeout: 10000 }).toBe(1);

while (true) {
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').filter({ visible: true }).first().dblclick();

  if (await page.locator('//h3[text()="Copy widget to"]').isVisible()) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break;
  }

  await page.waitForTimeout(500);
}

await page.getByText('All pages but last').click();
await page.getByRole('button', { name: 'Apply' }).click();

await expect.poll(() => countTextInputsOnPage(1), { timeout: 10000 }).toBe(1);

await pageThumbnails.nth(1).click({
  position: { x: 49, y: 71 }
});
await expect.poll(() => countTextInputsOnPage(2), { timeout: 10000 }).toBe(1);

await pageThumbnails.nth(2).click({
  position: { x: 65, y: 59 }
});
await expect.poll(() => countTextInputsOnPage(3), { timeout: 10000 }).toBe(0);
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator("//dialog[@id='selectSignerModal']//h3[text()='Send Mail']")).toBeVisible({ timeout: 120000 });
});
test('Verify that textinput field widget Copy widget to all pages but first function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);

  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();

  await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');

  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));

  await page.locator('div').filter({ hasText: /^Signers\*Select\.\.\.$/ }).locator('svg').click();
  await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).waitFor({ timeout: 90000 });
  await page.getByRole('option', { name: 'Andy amaya<andyamaya@nxglabs.' }).click();

  await page.locator('input[name="Name"]').click();
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled({ timeout: 90000 });
  await page.getByRole('button', { name: 'Next' }).click();

  await page.waitForLoadState('networkidle');
  await page.waitForSelector("//div[@class='react-pdf__Document']", { timeout: 90000 });
await commonSteps.dragAndDropSignatureWidget('signature', 600, 300);
await page.locator('canvas').nth(2).click({
  position: {
    x: 65,
    y: 59
  }
});
  await page.locator('//span[normalize-space()="text input"]').hover();
  await page.mouse.down();
  await page.mouse.move(600, 400);
  await page.mouse.up();
  while (true) {
    await page
      .locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]')
      .filter({ visible: true })
      .first()
      .dblclick();

    if (await page.locator('//h3[text()="Copy widget to"]').isVisible()) {
      break;
    }

    await page.waitForTimeout(500);
  }

  await page.getByText('All pages but first').click();
  await page.getByRole('button', { name: 'Apply' }).click();
await expect(page.locator('//div[@data-page-number="3"]//div[contains(@class,"signYourselfBlock")][.//span[normalize-space()="text input-1"]]')).toBeVisible();
await page.locator('canvas').nth(1).click({
  position: {
    x: 65,
    y: 59
  }
});
await expect(page.locator('//div[@id="container" and @data-page-number="2"]//div[contains(@class,"signYourselfBlock")][.//span[starts-with(normalize-space(), "text input")]]')).toBeVisible();
 
await page.locator('canvas').nth(0).click({
  position: {
    x: 65,
    y: 59
  }
});
await expect(page.locator('//div[@id="container" and @data-page-number="2"]//div[contains(@class,"signYourselfBlock")][.//span[starts-with(normalize-space(), "text input")]]')).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator("//dialog[@id='selectSignerModal']//h3[text()='Send Mail']")).toBeVisible({ timeout: 120000 });
});
test('Verify that textinput field widget Copy widget next to current function correctly in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
//const title = await page.title()
  //Expects page to have a heading with the name of dashboard.
//expect(title).toBe('Dashboard - OpenSign™');
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Samplepdfs/Sample_Test_doc_line.pdf'));
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
  const rowLocator = page.locator("//div[contains(@class,'signYourselfBlock')]//div[contains(@class,'font-medium') and normalize-space()='signature-1']");

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
  await page.locator('//span[normalize-space()="text input"]').hover();
await page.mouse.down();
await page.mouse.move(800, 370);
await page.mouse.up();

while (true) {
  await page.locator('//i[contains(@class, "fa-copy") and contains(@class, "icon")]').dblclick();
  const isVisible = await page.locator('//h3[text()="Copy widget to"]').isVisible();
  if (isVisible) {
      console.log('"Copy widget to" is visible. Stopping the loop.');
      break; // Exit loop once the element is visible
  }
  await page.waitForTimeout(500); // Small delay to prevent rapid clicking
}
await page.getByText('Next to current widget').click();
await page.getByRole('button', { name: 'Apply' }).click();
const textInputLocators = page.locator('//div[contains(@class,"flex") and contains(@class,"justify-center")]//div[contains(@class,"select-none-cls")]//span[starts-with(normalize-space(),"text")]');
const count = await textInputLocators.count();
console.log(`Found ${count} "text input" widgets.`);

// Pass if count > 1
expect(count).toBeGreaterThan(1);
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator("//dialog[@id='selectSignerModal']//h3[text()='Send Mail']")).toBeVisible({ timeout: 120000 });
});
test('Verify that the document is not uploaded if its format is not supported in request signature.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  // Step 1: Navigate to Base URL and log in
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
await page.getByRole('menuitem', { name: 'Request signatures' }).click();
  await page.locator('input[name="Name"]').fill('Offer Letter for QA1144');
  await expect(page.locator('input[name="Note"]')).toHaveValue(/.+/, { timeout: 90000 });
  //select and try to upload the file format type json
  const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, '../TestData/Unsupported_fileFormats/Presentation1.pptx'));
page.on('dialog', async (dialog) => {
  console.log(`Dialog message: ${dialog.message()}`);
  if (dialog.message() === 'We are currently experiencing some issues with processing DOCX files. Please upload the PDF file or contact us on support@opensignlabs.com') {
    console.log('Dialog text matches the expected text.');
  } else {
    console.error('Dialog text does NOT match the expected text.');
  }
  await dialog.accept();
});
const fileChooserPromise2 = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser2 = await fileChooserPromise2;
await fileChooser2.setFiles(path.join(__dirname, '../TestData/Unsupported_fileFormats/PlanSheet.xlsx'));
page.on('dialog', async (dialog) => {
  console.log(`Dialog message: ${dialog.message()}`);
  if (dialog.message() === 'We are currently experiencing some issues with processing DOCX files. Please upload the PDF file or contact us on support@opensignlabs.com') {
    console.log('Dialog text matches the expected text.');
  } else {
    console.error('Dialog text does NOT match the expected text.');
  }
  await dialog.accept();
});
});
});

