import { expect, type Locator, type Page } from '@playwright/test';

class LoginPageConstant {
  static readonly username = 'xpath=//input[@id="user-name"]';
  static readonly password = 'xpath=//input[@id="password"]';
  static readonly loginButton = 'xpath=//input[@id="login-button"]';
  static readonly errorMessage = 'xpath=//h3[@data-test="error"]';
}

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(link = '/'): Promise<void> {
    await this.page.goto(link);
  }

  async isElementVisible(xpath: string): Promise<Locator> {
    const element = this.page.locator(xpath);
    await expect(element).toBeVisible();
    return element;
  }

  async fillUsername(username: string): Promise<void> {
    await this.isElementVisible(LoginPageConstant.username);
    await this.page.locator(LoginPageConstant.username).fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.isElementVisible(LoginPageConstant.password);
    await this.page.locator(LoginPageConstant.password).fill(password);
  }

  async submit(): Promise<void> {
    await this.isElementVisible(LoginPageConstant.loginButton);
    await this.page.locator(LoginPageConstant.loginButton).click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }

  async expectLoginError(message: string): Promise<void> {
    await this.isElementVisible(LoginPageConstant.errorMessage);
    await expect(this.page.locator(LoginPageConstant.errorMessage)).toContainText(message);
  }
}
