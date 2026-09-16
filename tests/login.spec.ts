import { test } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';

test.describe('Login', () => {
  test('Ensure User Able To Login with Valid Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.expectLoaded();
  });

  test('Ensure User Able To Login with Invalid Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open('https://www.saucedemo.com/');
    await loginPage.login('', 'secret_sauce');

    await loginPage.expectLoginError('Username is required');
  });
});
