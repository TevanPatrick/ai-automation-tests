import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';

test.describe('SauceDemo negative scenarios', () => {
  test('direct cart access without login shows login page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/cart.html');
    await expect(page.locator('input[name="login-button"]')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('direct checkout access without login shows login page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await expect(page.locator('input[name="login-button"]')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('refresh inventory after adding a product retains cart count', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.login();
    await inventoryPage.expectLoaded();
    await inventoryPage.addProduct('sauce-labs-backpack');
    await inventoryPage.expectCartCount(1);

    await page.reload();
    await inventoryPage.expectLoaded();
    await inventoryPage.expectCartCount(1);
  });

  test('browser back from checkout complete returns to overview', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.login();
    await inventoryPage.expectLoaded();
    await inventoryPage.addProduct('sauce-labs-backpack');
    await inventoryPage.goToCart();

    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.waitForURL('**/checkout-step-one.html');
    await page.locator('input[name="firstName"]').fill('John');
    await page.locator('input[name="lastName"]').fill('Doe');
    await page.locator('input[name="postalCode"]').fill('12345');
    await page.locator('input#continue').click();
    await page.waitForURL('**/checkout-step-two.html');
    await page.locator('button#finish').click();
    await page.waitForURL('**/checkout-complete.html');

    await page.goBack();
    await expect(page.locator('text=Checkout: Overview')).toBeVisible();
  });
});