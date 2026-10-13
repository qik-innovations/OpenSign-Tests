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
