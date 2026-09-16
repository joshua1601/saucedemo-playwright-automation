import { test } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { CheckoutCompletePage } from '../pages/checkout-complete.page';
import { CheckoutInformationPage } from '../pages/checkout-information.page';
import { CheckoutOverviewPage } from '../pages/checkout-overview.page';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';
import { CheckoutCalculation } from '../models/checkout-calculation.model';

test.describe('Checkout', () => {
  test('standard_user menyelesaikan checkout dua produk', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    const checkoutCalculation = new CheckoutCalculation();

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectLoaded();

    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();
    await inventoryPage.openCart();
    await cartPage.expectItems();
    checkoutCalculation.itemPrices = await cartPage.getItemPrices();
    await cartPage.checkout();

    await checkoutInformationPage.fillCustomerInformation('Joshua', 'Tester', '12345');
    await checkoutInformationPage.continue();

    await checkoutOverviewPage.validateOrderSummary(checkoutCalculation);
    await checkoutOverviewPage.finish();
    await checkoutCompletePage.expectOrderSuccess();
  });
});
