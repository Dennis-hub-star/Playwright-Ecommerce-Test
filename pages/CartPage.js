class CartPage {
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
    this.cartItems = page.locator(".cart_item");
  }

  async validateProductInCart(productName) {
    const productTitle = this.page.locator(".inventory_item_name");
    await this.expect(productTitle).toHaveText(productName);
  }

  async validateProductQuantity() {
    const quantity = await this.page
      .locator(".shopping_cart_badge")
      .textContent();

    const cartItemCount = await this.cartItems.count();
    this.expect(quantity).toBe(`${cartItemCount}`);
  }

  getCartProductBtn(productName) {
    return this.cartItems
      .filter({
        hasText: productName,
      })
      .locator("button");
  }

  async removeItemFromCart(productName) {
    const removeProductBtn = this.getCartProductBtn(productName);
    await removeProductBtn.click();
  }

  async validateProductRemovedFromCart() {
    const cartBadge = this.page.locator(".shopping_cart_badge");
    await this.expect(cartBadge).not.toBeVisible();
  }

  async validateProductPrice() {
    const productPrice = this.page.locator(".inventory_item_price");
    await this.expect(productPrice).toHaveText("$49.99");
  }

  async gotoCheckoutPage() {
    await this.page.getByRole("button", { name: "Checkout" }).click();
  }
}
export { CartPage };
