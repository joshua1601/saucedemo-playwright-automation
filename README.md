# SauceDemo Automation Framework — Playwright + TypeScript

A Playwright TypeScript test automation project for [SauceDemo](https://www.saucedemo.com). The framework uses the Page Object Model (POM), XPath locators, explicit visibility assertions, and HTML reporting.

## Prerequisites

- Node.js 20 or later (`node --version`)
- npm (installed together with Node.js)

Install project dependencies and the Playwright browser once:

```powershell
npm.cmd install
npx.cmd playwright install
```

## Run tests

```powershell
# Run every test: login, checkout, and sorting
npm.cmd test

# Run one test file
npx.cmd playwright test tests/checkout.spec.ts

# Run with a visible browser
npm.cmd run test:headed
```

> Use the `.cmd` suffix if PowerShell blocks `npm.ps1` or `npx.ps1` script execution.

## Test report

Every run produces an HTML report in `playwright-report/`. Open the most recent report with:

```powershell
npx.cmd playwright show-report
```

The framework also prints concise results to the console. On failures, Playwright keeps screenshots, video, and trace files for investigation.

## Project structure

```text
models/                # Data models used for calculated test data
  checkout-calculation.model.ts
pages/                 # One Page Object class per page
  login.page.ts
  inventory.page.ts
  cart.page.ts
  checkout-information.page.ts
  checkout-overview.page.ts
  checkout-complete.page.ts
tests/                 # Test scenarios; no page locators here
  login.spec.ts
  checkout.spec.ts
  sorting.spec.ts
```

## Test coverage

### Login

- Successful login as `standard_user`.
- Validation for an empty username.
- Validation for an empty password.
- Rejection of `locked_out_user`.

### End-to-end checkout

1. Log in as `standard_user`.
2. Add Sauce Labs Backpack and Sauce Labs Bike Light to the cart.
3. Confirm both items appear in the cart.
4. Complete the customer-information form.
5. Read product prices from the UI and calculate the item total.
6. Verify that the displayed item total matches the calculated item total.
7. Verify the critical formula: `Item Total + Tax = Total`.
8. Complete the order and verify the confirmation message.

### Product sorting

1. Select **Price (high to low)**.
2. Read the prices from the product list.
3. Verify that the first product has the highest price.

SauceDemo demo credentials: `standard_user` / `secret_sauce`.

## Page Object conventions

Each Page Object contains a `PageConstant` class at the top of the file. It keeps XPath locators in one place. The Page Object constructor stores the Playwright page using `this.page = page`.

```ts
class LoginPageConstant {
  static readonly username =
    'xpath=//input[@id="user-name"]';
}

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillUsername(username: string): Promise<void> {
    await this.isElementVisible(LoginPageConstant.username);
    await this.page.locator(LoginPageConstant.username).fill(username);
  }
}
```

## Reliability approach

- No `waitForTimeout()` or hard-coded sleeps.
- Every `fill()` and `click()` is preceded by `isElementVisible()`, which uses `expect(locator).toBeVisible()`.
- The global test timeout is 30 seconds. Assertions and actions use 10-second timeouts, configured in `playwright.config.ts`.
- Failed runs retain useful evidence: screenshots, videos, and traces.
