import { expect, type Locator, type Page } from '@playwright/test';

class CheckoutInformationPageConstant {
  static readonly firstName = 'xpath=/html/body/div[@id="root"]//input[@id="first-name"]';
  static readonly lastName = 'xpath=/html/body/div[@id="root"]//input[@id="last-name"]';
  static readonly postalCode = 'xpath=/html/body/div[@id="root"]//input[@id="postal-code"]';
  static readonly continueButton = 'xpath=/html/body/div[@id="root"]//input[@id="continue"]';
}

export class CheckoutInformationPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isElementVisible(xpath: string): Promise<Locator> {
    const element = this.page.locator(xpath);
    await expect(element).toBeVisible();
    return element;
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.isElementVisible(CheckoutInformationPageConstant.firstName);
    await this.page.locator(CheckoutInformationPageConstant.firstName).fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.isElementVisible(CheckoutInformationPageConstant.lastName);
    await this.page.locator(CheckoutInformationPageConstant.lastName).fill(lastName);
  }

  async fillPostalCode(postalCode: string): Promise<void> {
    await this.isElementVisible(CheckoutInformationPageConstant.postalCode);
    await this.page.locator(CheckoutInformationPageConstant.postalCode).fill(postalCode);
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostalCode(postalCode);
  }

  async continue(): Promise<void> {
    await this.isElementVisible(CheckoutInformationPageConstant.continueButton);
    await this.page.locator(CheckoutInformationPageConstant.continueButton).click();
  }
}
