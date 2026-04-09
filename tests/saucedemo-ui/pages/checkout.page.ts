import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly stepOneHeader: Locator;
  readonly overviewHeader: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.postalCodeInput = page.locator('input[name="postalCode"]');
    this.continueButton = page.locator('input#continue');
    this.finishButton = page.locator('button#finish');
    this.stepOneHeader = page.locator('text=Checkout: Your Information');
    this.overviewHeader = page.locator('text=Checkout: Overview');
    this.completeHeader = page.locator('.complete-header');
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
    await this.page.waitForURL('**/checkout-step-two.html');
  }

  async expectStepOneLoaded() {
    await expect(this.stepOneHeader).toBeVisible();
  }

  async expectOverviewLoaded() {
    await expect(this.overviewHeader).toBeVisible();
  }

  async finishCheckout() {
    await this.finishButton.click();
    await this.page.waitForURL('**/checkout-complete.html');
  }

  async expectOrderComplete() {
    await expect(this.completeHeader).toContainText('Thank you for your order!');
  }
}