import { expect, type Locator, type Page } from '@playwright/test';

class InventoryPageConstant {
  static readonly pageTitle = 'xpath=//span[@data-test="title"]';
  static readonly shoppingCart = 'xpath=//a[@data-test="shopping-cart-link"]';
  static readonly productList = 'xpath=//div[@data-test="inventory-list"]';
  static readonly backpackAddButton =
    'xpath=//button[@id="add-to-cart-sauce-labs-backpack"]';
  static readonly bikeLightAddButton =
    'xpath=//button[@id="add-to-cart-sauce-labs-bike-light"]';
  static readonly sortDropdown =
    'xpath=//select[@data-test="product-sort-container"]';
  static readonly productPrices =
    'xpath=//div[@data-test="inventory-item-price"]';
}

export class InventoryPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isElementVisible(xpath: string): Promise<Locator> {
    const element = this.page.locator(xpath);
    await expect(element).toBeVisible();
    return element;
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await this.isElementVisible(InventoryPageConstant.pageTitle);
    await expect(this.page.locator(InventoryPageConstant.pageTitle)).toContainText('Products');
    await this.isElementVisible(InventoryPageConstant.productList);
  }

  async addBackpackToCart(): Promise<void> {
    await this.isElementVisible(InventoryPageConstant.backpackAddButton);
    await this.page.locator(InventoryPageConstant.backpackAddButton).click();
  }

  async addBikeLightToCart(): Promise<void> {
    await this.isElementVisible(InventoryPageConstant.bikeLightAddButton);
    await this.page.locator(InventoryPageConstant.bikeLightAddButton).click();
  }

  async openCart(): Promise<void> {
    await this.isElementVisible(InventoryPageConstant.shoppingCart);
    await this.page.locator(InventoryPageConstant.shoppingCart).click();
  }

  async sortPriceHighToLow(): Promise<void> {
    await this.isElementVisible(InventoryPageConstant.sortDropdown);
    await this.page.locator(InventoryPageConstant.sortDropdown).selectOption('hilo');
    await expect(this.page.locator(InventoryPageConstant.sortDropdown)).toHaveValue('hilo');
  }

  async expectFirstProductIsMostExpensive(): Promise<void> {
    await this.isElementVisible(InventoryPageConstant.productPrices);
    const priceTexts = await this.page.locator(InventoryPageConstant.productPrices).allTextContents();
    const prices = priceTexts.map((priceText) => Number(priceText.replace('$', '').trim()));
    expect(prices.length).toBeGreaterThan(0);
    const firstProductPrice = prices[0];
    const highestPrice = Math.max(...prices);

    expect(firstProductPrice).toBe(highestPrice);
  }
}
