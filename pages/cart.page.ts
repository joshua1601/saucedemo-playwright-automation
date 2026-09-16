import { expect, type Locator, type Page } from '@playwright/test';

class CartPageConstant {
  static readonly cartList = 'xpath=//div[@data-test="cart-list"]';
  static readonly backpackItem = 'xpath=//div[@data-test="inventory-item-name" and text()="Sauce Labs Backpack"]';
  static readonly bikeLightItem = 'xpath=//div[@data-test="inventory-item-name" and text()="Sauce Labs Bike Light"]';
  static readonly backpackPrice = 'xpath=//div[@data-test="inventory-item" and .//div[@data-test="inventory-item-name" and text()="Sauce Labs Backpack"]]//div[@data-test="inventory-item-price"]';
  static readonly bikeLightPrice = 'xpath=//div[@data-test="inventory-item" and .//div[@data-test="inventory-item-name" and text()="Sauce Labs Bike Light"]]//div[@data-test="inventory-item-price"]';
  static readonly checkoutButton = 'xpath=//button[@id="checkout"]';
}

export class CartPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isElementVisible(xpath: string): Promise<Locator> {
    const element = this.page.locator(xpath);
    await expect(element).toBeVisible();
    return element;
  }

  async expectItems(): Promise<void> {
    await this.isElementVisible(CartPageConstant.cartList);
    await this.isElementVisible(CartPageConstant.backpackItem);
    await this.isElementVisible(CartPageConstant.bikeLightItem);
  }

  async checkout(): Promise<void> {
    await this.isElementVisible(CartPageConstant.checkoutButton);
    await this.page.locator(CartPageConstant.checkoutButton).click();
  }

  async getItemPrices(): Promise<number[]> {
    await this.isElementVisible(CartPageConstant.backpackPrice);
    await this.isElementVisible(CartPageConstant.bikeLightPrice);

    const backpackPrice = await this.getCurrencyValue(CartPageConstant.backpackPrice);
    const bikeLightPrice = await this.getCurrencyValue(CartPageConstant.bikeLightPrice);

    return [backpackPrice, bikeLightPrice];
  }

  private async getCurrencyValue(xpath: string): Promise<number> {
    const priceText = await this.page.locator(xpath).textContent();
    if (priceText === null) {
      throw new Error(`Price tidak ditemukan untuk locator: ${xpath}`);
    }

    return Number(priceText.replace('$', '').trim());
  }
}
