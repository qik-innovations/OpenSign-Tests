import { allure } from "allure-playwright";
const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const path = require('path');
require('dotenv').config();
const BASEURL = process.env.BASEURL;

if (!BASEURL) {
  throw new Error('BASEURL is not defined in the .env file');
}

const locators = {
  createAccountButton: 'button[name="Create account"]',
  nameInput: 'input[placeholder="Full Name"]',
  emailInput: '#email',
  phoneInput: 'input[type="tel"]',
  companyInput: 'input[placeholder="Company"]',
  jobTitleInput: 'input[placeholder="Job Title"]',
  passwordInput: 'input[name="password"]',
  termsCheckbox: 'input[id="termsandcondition"]',
  registerButton: '//button[contains(.,\'Register\')]',
  freePlanButton: 'li:has-text("OPENSIGN™ FREEFreeBilled") button',
  professionalPlanButton: 'li:has-text("OPENSIGN™ PROFESSIONAL$9.99/") button',
  proceedButton: "//span[@class='btn-txt' and text()='Proceed']",
  addressField: '#billing_street',
  cityField: '#billing_city',
  zipCodeField: '#billing_zip',
  sameAsBillingCheckbox: 'input[name="sameasbillingaddress"]',
  reviewOrderButton: '//button[@class="btn-txt" and text() ="Review Order"]',
};

const fillSignupForm = async (page, { name, email, phone, company, jobTitle, password }) => {
  await page.locator(locators.nameInput).fill(name);
  await page.locator(locators.emailInput).fill(email);
  await page.locator(locators.phoneInput).fill(phone);
  await page.locator(locators.companyInput).fill(company);
  await page.locator(locators.jobTitleInput).fill(jobTitle);
  await page.locator(locators.passwordInput).fill(password);
  await page.locator(locators.termsCheckbox).click();
};

test.beforeEach(async ({ browserName, browser }) => {
  const browserVersion = await browser.version();
  const osPlatform = process.platform;
  allure.label("Browser Name", browserName);
  allure.label("Browser Version", browserVersion);
  allure.label("OS", osPlatform);
  console.log(`Browser: ${browserName}, Version: ${browserVersion}, OS: ${osPlatform}`);
});

export class CommonSteps {
  constructor(page) {
    this.page = page;
  }

  async navigateToBaseUrl() {
    await this.page.goto(BASEURL, { timeout: 120000 });
  }
  async login() {
    await this.page.locator('#email').fill(loginCredentials.email);
    await this.page.locator('#password').fill(loginCredentials.password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async ProfessionPlanUserlogin() {
    await this.page.locator('#email').fill(loginCredentials.ProplanUsername);
    await this.page.locator('#password').fill(loginCredentials.ProPlanpassword);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async NewUserlogin() {
    if (!loginCredentials.FreeplanUsername) {
      console.log('FreeplanUsername is empty. Running signup test...');
      await this.signupTestFreeUser(this.page);
    } else {
      console.log(`FreeplanUsername exists: ${loginCredentials.FreeplanUsername}`);
      await this.page.locator('#email').fill(loginCredentials.FreeplanUsername);
      await this.page.locator('#password').fill(loginCredentials.FreePlanpassword);
      await this.page.getByRole('button', { name: 'Login' }).click();
    }
  }

  async verifyPageTitle(expectedTitle) {
    const title = await this.page.title();
    if (title === expectedTitle) {
      console.log(`Page title is correct: ${expectedTitle}`);
    } else {
      console.error(`Page title is incorrect. Expected: "${expectedTitle}", Got: "${title}"`);
    }
  }

  async signupTestFreeUser(page) {
    await page.getByRole('button', { name: 'Create account' }).click({ timeout: 120000 });
    await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible({ timeout: 120000 });

    const email = `pravin+${Math.random()}@nxglabs.in`;
    loginCredentials.FreeplanUsername = email;
    loginCredentials.FreePlanpassword = 'Nxglabs@123';

    await fillSignupForm(page, {
      name: 'Mathew Wade',
      email,
      phone: '8238988998',
      company: 'qikAi.com',
      jobTitle: 'HrExecative',
      password: loginCredentials.FreePlanpassword,
    });

    await page.locator(locators.registerButton).click();
    await expect(page.getByRole('heading', { name: 'OPENSIGN™ FREE' })).toBeVisible({ timeout: 120000 });
    await page.locator(locators.freePlanButton).click();
    await page.getByLabel('Close').click();
    await expect(page.locator('//div[@id="profile-menu"]//parent::button[text()="Upgrade now"]')).toBeVisible();

    const title = await page.title();
    expect(title).toBe('Dashboard - OpenSign™');
    console.log(`✅ Signup successful. User: ${loginCredentials.FreeplanUsername}`);
  }

  // ↓↓↓ ADDED ALL CommonMethods METHODS ↓↓↓
  async validateAndAcceptTerms() {
    const page = this.page;
    await allure.step('Agree to Digital Signing Agreement', async () => {
      await expect(page.getByRole('button', { name: 'Agree & Continue' })).toBeVisible({ timeout: 120000 });
      await expect(page.locator('body')).toContainText('I confirm that I have read and understood the Electronic Record and Signature Disclosure and consent to use electronic records and signatures.');
      await expect(page.locator("//div[@class='mt-2  text-base-content']//span[@class='text-[11px]']")).toContainText('Note: Agreeing to this does not mean you are signing the document immediately. This only allows you to review the document electronically. You will have the opportunity to read it in full and decide whether to sign it afterward.');
      await page.locator('//span[@class="text-red-500 text-sm font-bold" and text()="X"]').click();
      await page.getByRole('button', { name: 'Agree & Continue' }).click();
    });
  }

  async clickSignatureWidgetAndDraw() {
    const page = this.page;
    await page.locator('//div[@id="container"]//div[text()="signature"]').click();
    console.log('Signature widget clicked');
    await this.drawSignature();
  }
async drawSignature() {
    const page = this.page;
    await allure.step('Sign Signature Widget', async () => {
      const canvasLocator = page.locator("//canvas[contains(@class, 'signatureCanvas')]");
      await canvasLocator.waitFor({ state: 'visible' });
      const box = await canvasLocator.boundingBox();
      if (!box) throw new Error('Canvas bounding box not found.');
      const clickX = box.x + box.width * 0.3;
      const clickY = box.y + box.height * 0.6;
      await page.mouse.click(clickX, clickY);
      await page.mouse.down();
      await page.mouse.move(clickX + 5, clickY);
      await page.mouse.up();
    });
  }
  async clickSignatureWidgetAndType() {
    const page = this.page;
    await page.locator('//div[@id="container"]//div[text()="signature"]').click();
    console.log('Signature widget clicked');
    await page.locator('//input[@id="signature"]').fill('Mathew Wade');
    console.log('Signature typed in input field');
  }
  async clickSignatureWidgetAndUpload() {
    const page = this.page;
    await page.locator('//div[@id="container"]//div[text()="signature"]').click();
    console.log('Signature widget clicked');
    const filePath = path.join(__dirname, '../../../tests/TestData/Images/signature.png');
    await page.locator('//input[@id="signature"]').setInputFiles(filePath);
    console.log('Signature uploaded from file');
  }
  async clickSignatureWidgetAndDraw() {
    const page = this.page;
    await page.locator('//div[@id="container"]//div[text()="signature"]').click();
    console.log('Signature widget clicked');
    await this.drawSignature();
  }

  async drawSignature() {
    const page = this.page;
    await allure.step('Sign Signature Widget', async () => {
      const canvasLocator = page.locator("//canvas[contains(@class, 'signatureCanvas')]");
      await canvasLocator.waitFor({ state: 'visible' });
      const box = await canvasLocator.boundingBox();
      if (!box) throw new Error('Canvas bounding box not found.');
      const clickX = box.x + box.width * 0.3;
      const clickY = box.y + box.height * 0.6;
      await page.mouse.click(clickX, clickY);
      await page.mouse.down();
      await page.mouse.move(clickX + 5, clickY);
      await page.mouse.up();
    });
  }

  async clickStampWidgetAndUpload() {
    const page = this.page;
    await page.locator('//div[@id="container"]//div[text()="stamp"]').click();
    console.log('Stamp widget clicked on the placeholder.');
    await this.uploadStamp();
  }

  async uploadStamp() {
    const page = this.page;
    await allure.step('Upload Stamp Image', async () => {
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.locator('//i[@class="fa-light fa-cloud-upload-alt uploadImgLogo"]').click();
      const imagePath = path.resolve(__dirname, '../TestData/Images/stamp.jpg');
      console.log("Image Path:", imagePath);
      await fileChooserPromise.then(fileChooser => fileChooser.setFiles(imagePath));
      console.log('Stamp image uploaded successfully.');
    });
  }

  async clickInitialsWidgetAndDraw() {
    const page = this.page;
    await page.locator('//div[@id="container"]//div[text()="initials"]').click();
    console.log('Initials widget clicked on the placeholder.');
    await this.drawInitials();
  }

  async drawInitials() {
    const page = this.page;
    await allure.step('Draw Initials', async () => {
      const canvasLocator = page.locator('//canvas[contains(@class, "intialSignatureCanvas")]');
      await canvasLocator.waitFor({ state: 'visible' });
      const box = await canvasLocator.boundingBox();
      if (!box) throw new Error('Initials canvas bounding box not found.');
      const clickX = box.x + box.width * 0.3;
      const clickY = box.y + box.height * 0.6;
      await page.mouse.click(clickX, clickY);
      await page.mouse.down();
      await page.mouse.move(clickX + 5, clickY);
      await page.mouse.up();
    });
  }

  async clickImageWidgetAndUpload() {
    const page = this.page;
    await page.locator('//div[contains(text(),"image")]').click();
    console.log('Image widget clicked on the placeholder.');
    await this.uploadImage();
  }

  async uploadImage() {
    const page = this.page;
    await allure.step('Upload Designer Image', async () => {
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.locator('//i[@class="fa-light fa-cloud-upload-alt uploadImgLogo"]').click();
      const imagePath = path.resolve(__dirname, '../TestData/Images/DesignerImage.png');
      await fileChooserPromise.then(fileChooser => fileChooser.setFiles(imagePath));
      console.log('Image uploaded successfully.');
    });
  }

  async clickDropdownAndSelect(dropdownId, value) {
    const page = this.page;
    await allure.step(`Select '${value}' from dropdown '${dropdownId}'`, async () => {
      await page.locator("//div[@class='signYourselfBlock react-draggable']//div[@class='select-none-cls flex justify-between items-center' and text()='Choose One']").click();
      console.log(`Dropdown clicked on the placeholder with placeholder name Choose One.`);
      await page.locator(`//select[@id='${dropdownId}']`).selectOption(value);
      console.log(`Selected value '${value}' from dropdown with id '${dropdownId}'.`);
      await this.clickNextButtonInSignerModal();
      await this.clickCloseButtonInSignerModal();
    });
  }

  async selectFromDropdown(dropdownId, value) {
    const page = this.page;
    await allure.step(`Select '${value}' from dropdown '${dropdownId}'`, async () => {
      await page.locator(`//select[@id='${dropdownId}']`).selectOption(value);
      console.log(`Selected value '${value}' from dropdown with id '${dropdownId}'.`);
      await this.clickNextButtonInSignerModal();
    });
  }

  async clickCheckboxAndSelect(labelText) {
    const page = this.page;
    await allure.step(`Select checkbox with label '${labelText}'`, async () => {
      await page.locator(`//div[@class='select-none-cls pointer-events-none']//span[text()='${labelText}']`).click({ force: true });
      console.log(`Checkbox with label '${labelText}' clicked.`);
      await page.locator(`//div[@class='flex justify-center']//label[contains(., '${labelText}')]/input[@type='checkbox']`).click({ force: true });
      console.log(`Checkbox with label '${labelText}' selected.`);  
    
    });
  }

  async selectCheckbox(labelText) {
    const page = this.page;
    await allure.step(`Select checkbox with label '${labelText}'`, async () => {
      await page.locator(`//div[@class='flex justify-center']//label[contains(., '${labelText}')]/input[@type='checkbox']`).click({ force: true });
      console.log(`Checkbox with label '${labelText}' selected.`);
      await this.clickNextButtonInSignerModal();
    });
  }

  async clickRadioButtonAndSelect(label) {
    const page = this.page;
    await page.locator(`//span[text()='female']/preceding-sibling::input[@type='radio']`).click({ force: true });
    console.log(`Radio button with label '${label}' clicked.`);
    await page.locator(`//div[@class='flex justify-center']//label[contains(., '${label}')]/input[@type='radio']`).click();
    console.log(`Radio button with label '${label}' selected.`);
    await this.clickNextButtonInSignerModal();
    await this.clickCloseButtonInSignerModal();
  }

  async selectRadioButton(label) {
    const page = this.page;
    await page.locator(`//div[@class='flex justify-center']//label[contains(., '${label}')]/input[@type='radio']`).click();
    console.log(`Radio button with label '${label}' selected.`);
    await this.clickNextButtonInSignerModal();
  }

  async clickTextWidgetAndFill(placeholder, value) {
    const page = this.page;
    await page.locator(`//div[@class="signYourselfBlock react-draggable" and .//textarea[@placeholder='${placeholder}']]`).click();
    console.log(`'${placeholder}' widget clicked on the placeholder.`);
    await page.locator(`//input[@placeholder='${placeholder}']`).fill(value);
    console.log(`Filled '${placeholder}' widget with value '${value}'.`);
    await this.clickNextButtonInSignerModal();
    await this.clickCloseButtonInSignerModal();
  }

  async fillTextField(placeholder, value) {
    const page = this.page;
    await page.locator(`//dialog[@id='selectSignerModal']//input[@placeholder='${placeholder}']`).fill(value);
       console.log(`Filled '${placeholder}' widget with value '${value}'.`);
   
  }

  async clickEmailWidgetAndFill(placeholder, value) {
    const page = this.page;
    await page.locator(`//div[contains(@class, "justify-center") and .//textarea[@placeholder="${placeholder}"]]`).click({ force: true });
    console.log(`Email widget clicked on the placeholder.`);
    await page.locator(`//input[@type='email' and @placeholder='${placeholder}']`).fill(value);
    console.log(`Filled Email widget with value '${value}'.`);
  }

  async fillEmailField(placeholder, value) {
    const page = this.page;
    await page.locator(`//input[@type='email' and @placeholder='${placeholder}']`).fill(value);
    console.log(`Filled Email field with value '${value}'.`);
  }

  async clickDateField(dateString) {
    const page = this.page;
    await allure.step(`Select date field with value '${dateString}'`, async () => {
      await page.locator(`//div[text()="${dateString}"]`).dblclick();
      console.log(`Date widget on the placeholder with value '${dateString}' clicked.`);
      await page.locator(`//div[@class='flex justify-center']//div[@class='react-datepicker__input-container']//div[contains(text(), '${dateString}')]`).click({ force: true });
      console.log(`Date field with value '${dateString}' clicked on the signer modal.`);
    });
  }
 async clickDateFieldOnTheSignerPad(dateString) {
    const page = this.page;
    await allure.step(`Select date field with value '${dateString}'`, async () => {
      await page.locator(`//div[@class='flex justify-center']//div[@class='react-datepicker__input-container']//div[contains(text(), '${dateString}')]`).click({ force: true });
      console.log(`Date field with value '${dateString}' clicked on the signer modal.`);
    });
  }
  async selectCalendarDateByLabel(label) {
    const page = this.page;
    await allure.step(`Select date from calendar by aria-label '${label}'`, async () => {
      const targetXPath = `//div[@aria-label="${label}"]`;
      await page.locator(targetXPath).click();
      console.log(`Date with aria-label '${label}' selected from the calendar.`);
    });
  }

  async fillGenericTextWidget(placeholder, value) {
    const page = this.page;
    await allure.step(`Fill generic text widget '${placeholder}'`, async () => {
      await page.locator(`//div[@class="signYourselfBlock react-draggable" and .//textarea[@placeholder="${placeholder}"]]`).click();
      await page.locator(`//span[text()="Text"]/ancestor::div[contains(@class, "p-1")]//input[@type="text" and @placeholder="${placeholder}"]`).fill(value);
    });
  }

  async clickNextButtonInSignerModal() {
    await this.page.getByRole('button', { name: 'Next Field ' }).click();
    console.log('Next button in signer modal clicked.');
  }

  async clickCloseButtonInSignerModal() {
    await this.page.getByRole('button', { name: '✕' }).click();
    console.log('Close button in signer modal clicked.');
  }

  async clickFinishButtonInSignerModal() {
    await this.page.locator('#selectSignerModal').getByRole('button', { name: 'Finish' }).click();
    console.log('Finish button in signer modal clicked.');
  }

  async clickFinishButtonOnPlaceholder() {
    await this.page.getByRole('button', { name: 'Finish' }).click();
    console.log('Finish button on placeholder clicked.');
  }
async ClickSavebuttonSignerModal() {
  await this.page.locator(`//dialog[@id='selectSignerModal']//button[text()='Save']`).click();
    console.log('Save button in signer modal clicked.');
  }

  async dragAndDrop(label, x, y) {
    const locator = this.page.locator(`//div[@data-tut="addWidgets"]//span[normalize-space()="${label}"]`);
    await locator.hover();
    await this.page.mouse.down();
    await this.page.mouse.move(x, y);
    await this.page.mouse.up();
    console.log(`Dragged and dropped widget with label '${label}' to coordinates (${x}, ${y}).`);
  }

  async getWidgetIdByLabel(label) {
    return await this.page.evaluate((labelText) => {
      const xpath = labelText === 'Choose One'
        ? `//div[div[text()='${labelText}']]/ancestor::div[contains(@class, 'signYourselfBlock')]`
        : `//div[span[text()='${labelText}']]/ancestor::div[contains(@class, 'signYourselfBlock')]`;
      const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      return element ? element.id : null;
    }, label);
  }

  async getWidgetIdByType(type) {
    return await this.page.evaluate((typeText) => {
      const element = document.evaluate(
        `//input[@type='${typeText}' and contains(@id, '${typeText}-')]/ancestor::div[contains(@class, 'signYourselfBlock')]`,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      return element ? element.id : null;
    }, type);
  }

  async selectDateWidgets(requestBody) {
    const page = this.page;

    await allure.step('Select Date Widgets', async () => {
      const widgets = requestBody.signers.flatMap((signer) => signer.widgets || []);
      const defaultDateString = widgets.find((w) => w.type === 'date' && w.options?.default)?.options?.default ?? null;

      let baseDate = new Date();
      if (defaultDateString) {
        const [month, day, year] = defaultDateString.split('-').map(Number);
        baseDate = new Date(year, month - 1, day);
      }

      const selectedDate = new Date(baseDate);
      selectedDate.setDate(baseDate.getDate() + 2);

      function getDayWithSuffix(day) {
        if (day >= 11 && day <= 13) return `${day}th`;
        switch (day % 10) {
          case 1: return `${day}st`;
          case 2: return `${day}nd`;
          case 3: return `${day}rd`;
          default: return `${day}th`;
        }
      }

      for (const widget of widgets) {
        if (widget.type === 'date' && widget.options?.format) {
          const dayOfWeek = selectedDate.toLocaleString('default', { weekday: 'long' });
          const month = selectedDate.toLocaleString('default', { month: 'long' });
          const day = selectedDate.getDate();
          const year = selectedDate.getFullYear();
          const dayWithSuffix = getDayWithSuffix(day);
          const ariaLabelValue = `Choose ${dayOfWeek}, ${month} ${dayWithSuffix}, ${year}`;
          const targetXPath = `//div[@aria-label="${ariaLabelValue}"]`;

          console.log("Target XPath for date selection:", targetXPath);

          await allure.step(`Click on date: ${ariaLabelValue}`, async () => {
            await page.locator(targetXPath).click({ force: true });
          });
        }
      }
    });
   }
}

module.exports = CommonSteps;

