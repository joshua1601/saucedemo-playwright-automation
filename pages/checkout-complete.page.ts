import { expect, type Locator, type Page } from '@playwright/test';

class CheckoutCompletePageConstant {
  static readonly completeContainer = 'xpath=//div[@id="checkout_complete_container"]';
  static readonly completeHeader = 'xpath=//h2[@data-test="complete-header"]';
  static readonly backHomeButton = 'xpath=//button[@id="back-to-products"]';
}

export class CheckoutCompletePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isElementVisible(xpath: string): Promise<Locator> {
    const element = this.page.locator(xpath);
    await expect(element).toBeVisible();
    return element;
  }

  async expectOrderSuccess(): Promise<void> {
    await this.isElementVisible(CheckoutCompletePageConstant.completeContainer);
    await this.isElementVisible(CheckoutCompletePageConstant.completeHeader);
    await expect(this.page.locator(CheckoutCompletePageConstant.completeHeader)).toHaveText('Thank you for your order!');
  }

  async backHome(): Promise<void> {
    await this.isElementVisible(CheckoutCompletePageConstant.backHomeButton);
    await this.page.locator(CheckoutCompletePageConstant.backHomeButton).click();
  }
}
