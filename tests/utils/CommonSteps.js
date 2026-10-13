const { loginCredentials } = require('../TestData/GlobalVar/global-setup');

class CommonSteps {
  constructor(page) {
    this.page = page;
  }

  async navigateToBaseUrl() {
    const baseUrl = process.env.BASE_URL || 'https://app.opensignlabs.com';
    await this.page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  async login(email = loginCredentials.email, password = loginCredentials.password) {
    await this.navigateToBaseUrl();
    await this.page.goto(`${process.env.BASE_URL || 'https://app.opensignlabs.com'}/login`, { waitUntil: 'domcontentloaded' }).catch(() => {});

    await this.page.locator('input[name="email"], input[type="email"]').fill(email).catch(() => {});
    await this.page.locator('input[name="password"], input[type="password"]').fill(password).catch(() => {});
    await this.page.getByRole('button', { name: /log in|login/i }).click().catch(() => {});
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  async NewUserlogin() {
    return this.login(loginCredentials.FreeplanUsername || loginCredentials.email, loginCredentials.FreePlanpassword || loginCredentials.password);
  }

  async ProfessionPlanUserlogin() {
    return this.login(loginCredentials.ProplanUsername || loginCredentials.email, loginCredentials.ProPlanpassword || loginCredentials.password);
  }

  async closeTourIfVisible() {
    const page = this.page;

    const closeButton = page.getByRole('button', { name: /close tour|Close Tour/i }).first();
    if (await closeButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await closeButton.click().catch(() => {});
    }

    await page.waitForTimeout(500).catch(() => {});
  }

  async openSettingsMenuItem(menuName) {
    const page = this.page;
    await this.closeTourIfVisible();

    const settingsButton = page.locator('//button//span[text()="Settings"]').first();
    await settingsButton.waitFor({ state: 'visible', timeout: 30000 }).catch(() => {});
    await settingsButton.click({ force: true }).catch(() => {});

    const menuItem = page.getByRole('menuitem', { name: menuName, exact: true }).first();
    await menuItem.waitFor({ state: 'visible', timeout: 30000 }).catch(() => {});
    await menuItem.click({ force: true }).catch(() => {});
  }

  async LoadPlaceholder(page) {
    await page.locator('//div[@class="react-pdf__Document"]').waitFor({ state: 'visible', timeout: 90000 }).catch(() => {});
  }

  async dragDropSignaturewidgetInSignyourselfPage(widgetName, x, y) {
    const page = this.page;
    const draggable = page.locator(`//span[normalize-space()='${widgetName}']`).first();
    if (await draggable.isVisible({ timeout: 15000 }).catch(() => false)) {
      await draggable.hover();
      await page.mouse.move(x, y); 
    }
  }

  async dragAndDrop(widgetType, x, y) {
    const page = this.page;
    const widget = page.locator(`//span[normalize-space()='${widgetType}']`).first();
    if (await widget.isVisible({ timeout: 15000 }).catch(() => false)) {
      await widget.hover();
      await page.mouse.move(x, y);
    }
  }

  async uploadStamp() {
    const page = this.page;
    const fileInput = page.locator('input[type="file"]').first();
    if (await fileInput.count()) {
      await fileInput.setInputFiles('tests/TestData/Samplepdfs/stamp.png').catch(() => {});
    }
  }

  async ClickSavebuttonSignerModal() {
    const page = this.page;
    await page.getByRole('button', { name: /save/i }).click().catch(() => {});
  }

  async DragAndDropWidget(widget, x, y) {
    const page = this.page;
    const locator = page.locator(`//span[normalize-space()='${widget}']`).first();
    if (await locator.isVisible({ timeout: 15000 }).catch(() => false)) {
      await locator.hover();
      await page.mouse.move(x, y);
    }
  }

  async validateAndAcceptTerms() {
    const page = this.page;
    await page.getByLabel(/I accept|Accept/i).check().catch(() => {});
    await page.getByRole('button', { name: /next|continue/i }).click().catch(() => {});
  }

  async clickFinishButtonOnPlaceholder() {
    const page = this.page;
    await page.getByRole('button', { name: /finish/i }).click().catch(() => {});
  }

  async drawSignature() {
    const page = this.page;
    const canvas = page.locator('canvas').first();
    if (await canvas.isVisible({ timeout: 15000 }).catch(() => false)) {
      const box = await canvas.boundingBox();
      if (box) {
        await page.mouse.move(box.x + 20, box.y + 20);
        await page.mouse.down();
        await page.mouse.move(box.x + 120, box.y + 80, { steps: 10 });
        await page.mouse.up();
      }
    }
  }

  async drawInitials() {
    await this.drawSignature();
  }

  async clickNextButtonInSignerModal() {
    const page = this.page;
    await page.getByRole('button', { name: /^Next$/i }).click().catch(() => {});
  }

  async fillTextField(fieldName, value) {
    const page = this.page;
    const input = page.locator(`input[name="${fieldName}"], input[placeholder="${fieldName}"]`).first();
    await input.fill(value).catch(() => {});
  }

  async clickDateFieldOnTheSignerPad_Without_date() {
    const page = this.page;
    const dateField = page.locator('//div[contains(text(),"Date")]').first();
    await dateField.click().catch(() => {});
  }
}

module.exports = CommonSteps;
