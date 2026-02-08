class ProductsPage {
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
    this.products = page.locator(".inventory_item");
    this.sideMenuBtns = page.locator(".bm-item-list a");
  }

  async resetAppState() {
    await this.page.locator("#react-burger-menu-btn").click();
    await this.sideMenuBtns.filter({ hasText: "Reset App State" }).click();
    // refresh the page
    await this.page.reload();
  }

  async getProductBtn(productName) {
    const selectProduct = await this.products
      .filter({
        hasText: productName,
      })
      .locator("button");
    return selectProduct;
  }

  async addProductToCart(productName) {
    // const products = this.page.locator(".inventory_item");
    await this.products.nth(0).first().waitFor();

    // const selectProduct = await this.products
    //   .filter({
    //     hasText: productName,
    //   })
    //   .locator("button");
    const addProductBtn = await this.getProductBtn(productName);
    await addProductBtn.click();
  }

  async removeProductFromCart(productName) {
    const removeProductBtn = await this.getProductBtn(productName);
    await removeProductBtn.click();
  }

  async validateProductRemovedFromCart() {
    const cartBadge = this.page.locator(".shopping_cart_badge");

    // expecting cartBadge to be not available in the dom
    await this.expect(cartBadge).toBeHidden();
  }

  async gotoCart() {
    await this.page.locator("#shopping_cart_container").click();
  }

  // Sort prices
  async sortByPrice(sortOption) {
    // sortOption: "Price (low to high)" or "Price (high to low)"
    await this.page.locator(".product_sort_container").click();
    await this.page.locator(".product_sort_container").selectOption(sortOption);
    // Wait for products to be re-rendered
    await this.page.waitForTimeout(500);
  }

  // Get all product prices from the page
  async getProductPrices() {
    const priceElements = await this.page
      .locator(".inventory_item_price")
      .allTextContents();
    // Extract numeric values from price strings like "$29.99"
    return priceElements.map((price) => parseFloat(price.replace("$", "")));
  }

  // Validate prices are in ascending order
  async validatePricesSortedAscending() {
    const prices = await this.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);

    await this.expect(JSON.stringify(prices)).toBe(
      JSON.stringify(sortedPrices),
    );
    console.log("✓ Prices are sorted in ascending order:", prices);
  }

  // Validate prices are in descending order
  async validatePricesSortedDescending() {
    const prices = await this.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);

    await this.expect(JSON.stringify(prices)).toBe(
      JSON.stringify(sortedPrices),
    );
    console.log("✓ Prices are sorted in descending order:", prices);
  }
}

export { ProductsPage };
