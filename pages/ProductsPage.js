class ProductsPage {
  sortedPrices;
  sortedNames;
  uiSortedPrices;
  uiSortedNames;

  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
    this.products = page.locator(".inventory_item");
    this.productsNames = page.locator(".inventory_item_name");
    this.sideMenuBtns = page.locator(".bm-item-list a");
    this.pricesLocator = page.locator(".inventory_item_price");
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
    await this.products.nth(0).first().waitFor();
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

  async getPrices() {
    const prices = await this.pricesLocator.allTextContents();
    const priceList = prices.map((element) =>
      parseFloat(element.replace("$", "")),
    );

    return priceList;
  }
  async getProductsNames() {
    const names = await this.productsNames.allTextContents();

    return names;
  }
  async sortItemsBy(sortOption) {
    const namesBeforeSorting = await this.getProductsNames();
    // console.log(`These are unsorted names ${namesBeforeSorting}`);
    const pricesBeforeSorting = await this.getPrices();
    // console.log(`These are unsorted prices ${pricesBeforeSorting}`);
    await this.page.locator(".product_sort_container").click();
    await this.page.locator(".product_sort_container").selectOption(sortOption);

    if (sortOption.includes("lohi")) {
      this.sortedPrices = [...pricesBeforeSorting].sort((a, b) => a - b);
      // console.log(`These are sorted prices ${this.sortedPrices}`);
    }

    if (sortOption.includes("hilo")) {
      this.sortedPrices = [...pricesBeforeSorting].sort((a, b) => b - a);
      // console.log(`These are sorted prices ${this.sortedPrices}`);
    }
    if (sortOption.includes("az")) {
      this.sortedNames = [...namesBeforeSorting].sort();
      // console.log(`These are sorted names ${this.sortedNames}`);
    }
    if (sortOption.includes("za")) {
      this.sortedNames = [...namesBeforeSorting].sort().reverse();
      // console.log(`These are sorted names ${this.sortedNames}`);
    }
    this.uiSortedPrices = await this.getPrices();
    // console.log(`These are UI sorted prices ${this.uiSortedPrices}`);
    this.uiSortedNames = await this.getProductsNames();
    // console.log(`These are UI sorted names ${this.uiSortedNames}`);
  }

  // The use of JSON.stringify is to compare the contents of the arrays rather than their references in memory. In JavaScript, two different arrays with the same contents are not considered equal when compared directly (e.g., [1, 2, 3] === [1, 2, 3] is false). By converting both arrays to JSON strings, we can compare their contents as strings, which will be equal if the arrays have the same elements in the same order.
  async verifyPriceSorting() {
    await this.expect(this.uiSortedPrices).toEqual(this.sortedPrices);
    console.log("✓ Prices are sorted correctly:", this.uiSortedPrices);
  }

  async verifyNameSorting() {
    await this.expect(this.uiSortedNames).toEqual(this.sortedNames);
    console.log("✓ Names are sorted correctly:", this.uiSortedNames);
  }
}

export { ProductsPage };
