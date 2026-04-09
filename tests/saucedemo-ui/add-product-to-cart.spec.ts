import { test } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';
import { CartPage } from './pages/cart.page';

test('login to saucedemo with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.expectLoaded();
  await loginPage.login();

  await inventoryPage.expectLoaded();
  await inventoryPage.addProduct('sauce-labs-backpack');
  await inventoryPage.expectRemoveButton('sauce-labs-backpack');
  await inventoryPage.expectCartCount(1);

  await inventoryPage.goToCart();
  await cartPage.expectItemInCart('Sauce Labs Backpack');
  await cartPage.expectItemCount(1);
});
