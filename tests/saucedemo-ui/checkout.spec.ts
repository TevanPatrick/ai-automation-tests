import { test } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';
import { CartPage } from './pages/cart.page';
import { CheckoutPage } from './pages/checkout.page';

test('checkout with 3 products added to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.expectLoaded();
  await loginPage.login();

  await inventoryPage.expectLoaded();
  await inventoryPage.addProduct('sauce-labs-backpack');
  await inventoryPage.addProduct('sauce-labs-bike-light');
  await inventoryPage.addProduct('sauce-labs-bolt-t-shirt');
  await inventoryPage.expectCartCount(3);

  await inventoryPage.goToCart();
  await cartPage.expectItemInCart('Sauce Labs Backpack');
  await cartPage.expectItemInCart('Sauce Labs Bike Light');
  await cartPage.expectItemInCart('Sauce Labs Bolt T-Shirt');
  await cartPage.expectItemCount(3);

  await cartPage.startCheckout();
  await checkoutPage.expectStepOneLoaded();

  await checkoutPage.fillCustomerInformation('John', 'Doe', '12345');
  await checkoutPage.continue();
  await checkoutPage.expectOverviewLoaded();

  await checkoutPage.finishCheckout();
  await checkoutPage.expectOrderComplete();
});
