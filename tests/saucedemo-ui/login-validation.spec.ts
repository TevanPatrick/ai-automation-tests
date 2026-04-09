import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';

test.describe('SauceDemo login validation', () => {
  test('valid login with standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.login();
    await inventoryPage.expectLoaded();
  });

  test('invalid username shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.usernameInput.fill('bad_user');
    await loginPage.passwordInput.fill('secret_sauce');
    await loginPage.loginButton.click();

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('invalid password shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.usernameInput.fill('standard_user');
    await loginPage.passwordInput.fill('bad_password');
    await loginPage.loginButton.click();

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('empty credentials show required error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.loginButton.click();

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Epic sadface: Username is required'
    );
  });

  test('locked out user sees lockout message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.usernameInput.fill('locked_out_user');
    await loginPage.passwordInput.fill('secret_sauce');
    await loginPage.loginButton.click();

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  test('problem user can log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.login('problem_user', 'secret_sauce');
    await inventoryPage.expectLoaded();
  });

  test('performance glitch user eventually lands on inventory', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.usernameInput.fill('performance_glitch_user');
    await loginPage.passwordInput.fill('secret_sauce');
    await loginPage.loginButton.click();
    await page.waitForURL('**/inventory.html', { timeout: 15000 });
    await inventoryPage.expectLoaded();
  });
});