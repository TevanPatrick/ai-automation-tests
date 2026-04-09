import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="user-name"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[name="login-button"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async expectLoaded() {
    await expect(this.page).toHaveTitle('Swag Labs');
  }

  async login(username = 'standard_user', password = 'secret_sauce') {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('**/inventory.html');
    await this.page.waitForLoadState('networkidle');
  }
}