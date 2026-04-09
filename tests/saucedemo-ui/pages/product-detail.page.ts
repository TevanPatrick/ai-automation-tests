import { expect, Locator, Page } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly description: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly image: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.description = page.locator('.inventory_details_desc');
    this.price = page.locator('.inventory_details_price');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.image = page.locator('.inventory_details_img');
    this.backButton = page.locator('button#back-to-products');
  }

  async expectProductName(name: string) {
    await expect(this.page.locator('[data-test="inventory-item-name"]')).toContainText(name);
  }

  async expectProductDescription(text: string) {
    await expect(this.description).toContainText(text);
  }

  async expectProductPrice(price: string) {
    await expect(this.price).toContainText(price);
  }

  async expectAddToCartVisible() {
    await expect(this.addToCartButton).toBeVisible();
  }

  async expectImageVisible() {
    await expect(this.image).toBeVisible();
  }

  async expectCartBadge(count: number) {
    await expect(this.page.locator('.shopping_cart_badge')).toContainText(String(count));
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async expectInCart() {
    await expect(this.removeButton).toBeVisible();
  }

  async goBackToProducts() {
    await this.backButton.click();
    await this.page.waitForURL('**/inventory.html');
  }
}