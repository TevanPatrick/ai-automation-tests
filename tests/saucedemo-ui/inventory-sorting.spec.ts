import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';

test.describe('SauceDemo inventory sorting', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.login();
  });

  const getProductNames = async (page) => {
    return page.locator('.inventory_item_name').allTextContents();
  };

  test('sorts products A to Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.expectLoaded();
    await page.selectOption('.product_sort_container', 'az');
    const names = await getProductNames(page);
    expect(names[0]).toBe('Sauce Labs Backpack');
    expect(names[names.length - 1]).toBe('Test.allTheThings() T-Shirt (Red)');
  });

  test('sorts products Z to A', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.expectLoaded();
    await page.selectOption('.product_sort_container', 'za');
    const names = await getProductNames(page);
    expect(names[0]).toBe('Test.allTheThings() T-Shirt (Red)');
    expect(names[names.length - 1]).toBe('Sauce Labs Backpack');
  });

  test('sorts products by price low to high', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.expectLoaded();
    await page.selectOption('.product_sort_container', 'lohi');
    const prices = await page.locator('.inventory_item_price').allTextContents();
    expect(prices[0]).toBe('$7.99');
    expect(prices[prices.length - 1]).toBe('$49.99');
  });

  test('sorts products by price high to low', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.expectLoaded();
    await page.selectOption('.product_sort_container', 'hilo');
    const prices = await page.locator('.inventory_item_price').allTextContents();
    expect(prices[0]).toBe('$49.99');
    expect(prices[prices.length - 1]).toBe('$7.99');
  });
});