class ConfirmationPage {
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
  }

  async validateCheckedOutProduct() {
    const productTitle = this.page.locator(".inventory_item_name");
    await this.expect(productTitle).toHaveText("Sauce Labs Fleece Jacket");
  }

  async confirmOrder() {
    await this.page.locator("#finish").click();
  }
}

export { ConfirmationPage };
