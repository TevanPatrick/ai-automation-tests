import { test } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';
import { ProductDetailPage } from './pages/product-detail.page';

test('review Sauce Labs Bike Light detail page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const productDetailPage = new ProductDetailPage(page);

  await loginPage.goto();
  await loginPage.expectLoaded();
  await loginPage.login();

  await inventoryPage.expectLoaded();
  await inventoryPage.openProductDetailById(0);

  await productDetailPage.expectProductName('Sauce Labs Bike Light');
  await productDetailPage.expectProductDescription(
    "A red light isn't the desired state in testing but it sure helps when riding your bike at night"
  );
  await productDetailPage.expectProductPrice('$9.99');
  await productDetailPage.expectAddToCartVisible();
  await productDetailPage.expectImageVisible();

  await productDetailPage.addToCart();
  await productDetailPage.expectInCart();
  await productDetailPage.expectCartBadge(1);

  await productDetailPage.goBackToProducts();
  await inventoryPage.expectLoaded();
});