import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';

test.describe('SauceDemo menu actions', () => {
  test('logout returns to login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.login();
    await inventoryPage.expectLoaded();

    await page.locator('#react-burger-menu-btn').click();
    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page.locator('input[name="login-button"]')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('reset app state clears cart and returns inventory', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.login();
    await inventoryPage.expectLoaded();
    await inventoryPage.addProduct('sauce-labs-backpack');
    await inventoryPage.expectCartCount(1);

    await page.locator('#react-burger-menu-btn').click();
    await page.getByRole('link', { name: 'Reset App State' }).click();

    await inventoryPage.expectLoaded();
    const badgeCount = await page.locator('.shopping_cart_badge').count();
    expect(badgeCount).toBe(0);
  });

  test('all items menu link returns to inventory', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.login();
    await inventoryPage.expectLoaded();

    await page.locator('#react-burger-menu-btn').click();
    await page.getByRole('link', { name: 'All Items' }).click();

    await inventoryPage.expectLoaded();
    await expect(page).toHaveURL(/inventory\.html$/);
  });
});