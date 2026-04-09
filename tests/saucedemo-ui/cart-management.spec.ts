import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';
import { CartPage } from './pages/cart.page';

test('SauceDemo cart management maintains item state after remove and continue shopping', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.expectLoaded();
  await loginPage.login();

  await inventoryPage.expectLoaded();
  await inventoryPage.addProduct('sauce-labs-backpack');
  await inventoryPage.addProduct('sauce-labs-bike-light');
  await inventoryPage.addProduct('sauce-labs-bolt-t-shirt');
  await inventoryPage.expectCartCount(3);

  await inventoryPage.goToCart();
  await cartPage.expectItemCount(3);
  await page.locator('button[name="remove-sauce-labs-bike-light"]').click();
  await expect(page.getByRole('link', { name: 'Sauce Labs Bike Light' })).toHaveCount(0);
  await cartPage.expectItemCount(2);
  await expect(page.locator('.shopping_cart_badge')).toContainText('2');

  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.waitForURL('**/inventory.html');
  await inventoryPage.expectLoaded();
  await inventoryPage.expectCartCount(2);
});