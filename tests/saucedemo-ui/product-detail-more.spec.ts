import { test } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';
import { ProductDetailPage } from './pages/product-detail.page';

test('review multiple product detail pages and add items from detail view', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const productDetailPage = new ProductDetailPage(page);

  await loginPage.goto();
  await loginPage.expectLoaded();
  await loginPage.login();

  await inventoryPage.expectLoaded();
  await inventoryPage.openProductDetailById(4);
  await productDetailPage.expectProductName('Sauce Labs Backpack');
  await productDetailPage.expectProductDescription(
    'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
  );
  await productDetailPage.expectProductPrice('$29.99');
  await productDetailPage.expectAddToCartVisible();
  await productDetailPage.addToCart();
  await productDetailPage.expectInCart();
  await productDetailPage.goBackToProducts();

  await inventoryPage.expectLoaded();
  await inventoryPage.openProductDetailById(1);
  await productDetailPage.expectProductName('Sauce Labs Bolt T-Shirt');
  await productDetailPage.expectProductDescription(
    'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.'
  );
  await productDetailPage.expectProductPrice('$15.99');
  await productDetailPage.expectAddToCartVisible();
  await productDetailPage.addToCart();
  await productDetailPage.expectInCart();
  await productDetailPage.goBackToProducts();

  await inventoryPage.expectLoaded();
  await inventoryPage.expectCartCount(2);
});