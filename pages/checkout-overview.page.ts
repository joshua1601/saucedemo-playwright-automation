import { expect, type Locator, type Page } from '@playwright/test';
import { CheckoutCalculation } from '../models/checkout-calculation.model';

class CheckoutOverviewPageConstant {
  static readonly cartList = 'xpath=/html/body/div[@id="root"]//div[@data-test="cart-list"]';
  static readonly summaryInfo = 'xpath=/html/body/div[@id="root"]//div[@class="summary_info"]';
  static readonly itemTotal = 'xpath=/html/body/div[@id="root"]//div[@data-test="subtotal-label"]';
  static readonly tax = 'xpath=/html/body/div[@id="root"]//div[@data-test="tax-label"]';
  static readonly total = 'xpath=/html/body/div[@id="root"]//div[@data-test="total-label"]';
  static readonly finishButton = 'xpath=/html/body/div[@id="root"]//button[@id="finish"]';
}

export class CheckoutOverviewPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isElementVisible(xpath: string): Promise<Locator> {
    const element = this.page.locator(xpath);
    await expect(element).toBeVisible();
    return element;
  }

  async validateOrderSummary(calculation: CheckoutCalculation): Promise<void> {
    await this.isElementVisible(CheckoutOverviewPageConstant.cartList);
    await this.isElementVisible(CheckoutOverviewPageConstant.summaryInfo);
    await this.isElementVisible(CheckoutOverviewPageConstant.itemTotal);
    await this.isElementVisible(CheckoutOverviewPageConstant.tax);
    await this.isElementVisible(CheckoutOverviewPageConstant.total);

    calculation.displayedItemTotal = await this.getCurrencyValue(CheckoutOverviewPageConstant.itemTotal);
    calculation.tax = await this.getCurrencyValue(CheckoutOverviewPageConstant.tax);
    calculation.displayedTotal = await this.getCurrencyValue(CheckoutOverviewPageConstant.total);

    // Harga dua item Cart harus menghasilkan Item total yang ditampilkan.
    expect(calculation.calculatedItemTotal.toFixed(2)).toBe(calculation.displayedItemTotal.toFixed(2));
    // Critical assertion: Item Total + Tax harus sama dengan Total tampilan.
    expect((calculation.displayedItemTotal + calculation.tax).toFixed(2)).toBe(
      calculation.displayedTotal.toFixed(2)
    );
  }

  private async getCurrencyValue(xpath: string): Promise<number> {
    const labelText = await this.page.locator(xpath).textContent();
    if (labelText === null) {
      throw new Error(`Nilai harga tidak ditemukan untuk locator: ${xpath}`);
    }

    const matchedCurrency = labelText.match(/\$([\d.]+)/);
    if (matchedCurrency === null) {
      throw new Error(`Format harga tidak valid: ${labelText}`);
    }

    return Number(matchedCurrency[1]);
  }

  async finish(): Promise<void> {
    await this.isElementVisible(CheckoutOverviewPageConstant.finishButton);
    await this.page.locator(CheckoutOverviewPageConstant.finishButton).click();
  }
}
