import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';
import { CartPage } from './pages/cart.page';
import { CheckoutPage } from './pages/checkout.page';

test.describe('SauceDemo checkout validation', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.login();
    await inventoryPage.expectLoaded();
    await inventoryPage.addProduct('sauce-labs-backpack');
    await inventoryPage.goToCart();
  });

  test('checkout step one requires first name', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.waitForURL('**/checkout-step-one.html');
    await checkoutPage.continueButton.click();
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Error: First Name is required'
    );
  });

  test('checkout step one requires last name', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.waitForURL('**/checkout-step-one.html');
    await checkoutPage.firstNameInput.fill('John');
    await checkoutPage.continueButton.click();
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Error: Last Name is required'
    );
  });

  test('checkout step one requires postal code', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.waitForURL('**/checkout-step-one.html');
    await checkoutPage.firstNameInput.fill('John');
    await checkoutPage.lastNameInput.fill('Doe');
    await checkoutPage.continueButton.click();
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Error: Postal Code is required'
    );
  });

  test('cancel on checkout step one returns to cart', async ({ page }) => {
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.waitForURL('**/checkout-step-one.html');
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.waitForURL('**/cart.html');
    await expect(page.locator('.cart_list')).toBeVisible();
  });
});