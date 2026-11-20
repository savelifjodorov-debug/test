const { test, expect } = require('@playwright/test');

const TODO_URL = 'https://demo.playwright.dev/todomvc/';

// TEST 1 – NÄIDIS: kasutaja saab ülesande lisada.
test('kasutaja saab lisada ülesande', async ({ page }) => {
  await page.goto(TODO_URL);

  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Õpi UI testimist');
  await input.press('Enter');

  await expect(page.getByText('Õpi UI testimist')).toBeVisible();
});

// TEST 2 – ÕPILANE: kasutaja saab ülesande lõpetatuks märkida.
test('kasutaja saab ülesande lõpetatuks märkida', async ({ page }) => {
  await page.goto(TODO_URL);

  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Esimene test');
  await input.press('Enter');

  const task = page.getByRole('listitem').filter({
    hasText: 'Esimene test'
  });
  const checkbox = task.getByRole('checkbox');

  await checkbox.check();
  await expect(checkbox).toBeChecked();
});

// TEST 3 – ÕPILANE: kasutaja saab ülesande kustutada.
test('kasutaja saab ülesande kustutada', async ({ page }) => {
  await page.goto(TODO_URL);

  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Kustutatav ülesanne');
  await input.press('Enter');

  const task = page.getByRole('listitem').filter({
    hasText: 'Kustutatav ülesanne'
  });

  await task.hover();
  await task.locator('button.destroy').click();

  await expect(page.getByText('Kustutatav ülesanne')).toHaveCount(0);
});
