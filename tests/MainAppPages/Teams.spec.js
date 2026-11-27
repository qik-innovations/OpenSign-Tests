const { loginCredentials } = require('../TestData/GlobalVar/global-setup');
const { test, expect } = require('@playwright/test');
const CommonSteps = require('../utils/CommonSteps');

const waitForTeamsPage = async (page) => {
  await page.waitForSelector('#renderList i', { timeout: 120000 }).catch(() => {});
  await page.locator('table tbody tr').first().waitFor({ state: 'visible', timeout: 120000 }).catch(() => {});
};

// Test for Free user
test('Verify that a new free user cannot add a team and is prompted to upgrade to a Teams plan.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  await commonSteps.navigateToBaseUrl();
  await commonSteps.NewUserlogin();
  await commonSteps.closeTourIfVisible();
  await commonSteps.openSettingsMenuItem('Teams');

  const title = await page.title();
  expect(title).toBe('Teams - OpenSign™');

  await expect(page.getByRole('heading', { name: 'Upgrade to TEAMS Plan' })).toBeVisible();
  await page.getByText('Unlock the full power of').click();
  await expect(page.locator('#renderList').getByRole('button', { name: 'Upgrade now' })).toBeVisible();
  await page.locator("//button[@class='op-btn op-btn-accent' and text()='Upgrade now']").click();
});

test('Verify that professional plan user cannot add a team and is prompted to upgrade to a Teams plan.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  await commonSteps.navigateToBaseUrl();
  await commonSteps.ProfessionPlanUserlogin();
  await commonSteps.closeTourIfVisible();
  await commonSteps.openSettingsMenuItem('Teams');

  const title = await page.title();
  expect(title).toBe('Teams - OpenSign™');

  await expect(page.getByRole('heading', { name: 'Upgrade to TEAMS Plan' })).toBeVisible();
  await page.getByText('Unlock the full power of').click();
  await expect(page.locator('#renderList').getByRole('button', { name: 'Upgrade now' })).toBeVisible();
  await page.locator("//button[@class='op-btn op-btn-accent' and text()='Upgrade now']").click();
});

test('Verify that a Teams plan user can add a team and add the user under the newly created team.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
  await commonSteps.closeTourIfVisible();
  await commonSteps.openSettingsMenuItem('Teams');
  await waitForTeamsPage(page);

  const title = await page.title();
  expect(title).toBe('Teams - OpenSign™');
  await expect(page.locator("//div[@class='font-light' and normalize-space(text())='Teams']")).toBeVisible();

  await page.locator("//div[@class='cursor-pointer'][i[contains(@class,'fa-square-plus')]]").click();
  await expect(page.getByRole('heading', { name: 'Add team' })).toBeVisible();

  const teamName = `Test Team ${Date.now()}`;
  await page.locator('input[name="name"]').fill(teamName);
  await page.locator('input[name="name"]').pressSequentially('A');
  await page.locator("//label[normalize-space(text())='Parent team']/following-sibling::select[@name='team']").selectOption({ label: 'All Users' });
  await page.locator("//button[@type='submit' and contains(@class,'op-btn-primary')]").click();

  await expect(page.getByText('Team created successfully.')).toBeVisible({ timeout: 30000 });

  const teamRow = page.locator('table tbody tr', { hasText: teamName });
  await expect(teamRow).toBeVisible({ timeout: 30000 });

  const toggle = teamRow.locator('input[type="checkbox"].op-toggle');
  if (!(await toggle.isChecked())) {
    await toggle.check();
  }

  await commonSteps.openSettingsMenuItem('Users');
  await page.waitForSelector('#renderList i');

  const actionIcon = page.locator('#renderList i').nth(1);
  if (await actionIcon.count() > 0) {
    await actionIcon.click();
  }

  const proceedButton = page.getByRole('button', { name: 'Proceed' });
  try {
    await expect(proceedButton).toBeVisible({ timeout: 90000 });
    await proceedButton.click();
  } catch {
    console.log("'Proceed' button did not appear.");
  }

  const email = `pravin+${Math.random()}@nxglabs.in`;
  await page.locator('input[name="name"]').waitFor({ timeout: 180000 });
  await page.locator('input[name="name"]').fill('Karl Vanderson');
  await page.locator('input[name="email"]').fill(email);

  const randomPass = await page.locator("//div[@class='break-all']").textContent();
  await page.locator('select[name="team"]').selectOption({ label: `${teamName}A` });
  await page.locator('#selectSignerModal i').click();
  await page.locator('select[name="role"]').selectOption('User');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByRole('cell', { name: email })).toBeVisible();
  await expect(page.getByRole('cell', { name: `${teamName}A` })).toBeVisible();
});

test('Verify pagination works in Teams page when multiple teams are present', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
  await commonSteps.closeTourIfVisible();
  await commonSteps.openSettingsMenuItem('Teams');

  const title = await page.title();
  expect(title).toBe('Teams - OpenSign™');
  const pagination = page.locator('.pagination');
  if (await pagination.count() > 0) {
    const nextPageButton = pagination.locator('button', { hasText: 'Next' });
    if (await nextPageButton.isEnabled()) {
      await nextPageButton.click();
      const currentPage = pagination.locator('.current-page');
      await expect(currentPage).toHaveText('2');
    }
  }
});

test('Verify that a Teams plan user can disable and enable a team from the Teams list.', async ({ page }) => {
  const commonSteps = new CommonSteps(page);
  await commonSteps.navigateToBaseUrl();
  await commonSteps.login();
  await commonSteps.closeTourIfVisible();
  await commonSteps.openSettingsMenuItem('Teams');

  const title = await page.title();
  expect(title).toBe('Teams - OpenSign™');
  await expect(page.locator("//div[@class='font-light' and normalize-space(text())='Teams']")).toBeVisible();

  const firstTeamRow = page.locator('table tbody tr').first();
  const teamName = await firstTeamRow.locator('td').first().textContent();
  console.log(`Toggling team: ${teamName}`);

  const toggleLabel = firstTeamRow.locator('td label.cursor-pointer');
  if (await firstTeamRow.locator('input[type="checkbox"].op-toggle').isChecked()) {
    await toggleLabel.click();
    await page.locator('//div[@class="flex items-center mt-3 gap-2 text-white"]//button[text()="Yes"]').click();
    await expect(page.getByText('Team disabled')).toBeVisible();
    await expect(firstTeamRow.locator('input[type="checkbox"].op-toggle')).not.toBeChecked();
  }

  if (!(await firstTeamRow.locator('input[type="checkbox"].op-toggle').isChecked())) {
    await toggleLabel.click();
    await page.locator('//div[@class="flex items-center mt-3 gap-2 text-white"]//button[text()="Yes"]').click();
    await expect(firstTeamRow.locator('input[type="checkbox"].op-toggle')).toBeChecked();
  }
});
