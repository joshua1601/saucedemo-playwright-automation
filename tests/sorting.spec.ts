import { test } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';

test.describe('Product sorting', () => {
  test('Price high to low menampilkan item termahal pada urutan pertama', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectLoaded();

    await inventoryPage.sortPriceHighToLow();
    await inventoryPage.expectFirstProductIsMostExpensive();
  });
});
