import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async expectLoaded() {
    await expect(this.inventoryList).toBeVisible();
  }

  async addProduct(slug: string) {
    const button = this.page.locator(`button[name="add-to-cart-${slug}"]`);
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeEnabled();
    await button.click();
  }

  async expectRemoveButton(slug: string) {
    await expect(this.page.locator(`button[name="remove-${slug}"]`)).toBeVisible();
  }

  async openProductDetailById(id: number) {
    await this.page.locator(`[data-test="item-${id}-title-link"]`).click();
  }

  async expectCartCount(count: number) {
    await expect(this.cartBadge).toContainText(String(count));
  }

  async goToCart() {
    await this.cartLink.click();
    await this.page.waitForURL('**/cart.html');
  }
}