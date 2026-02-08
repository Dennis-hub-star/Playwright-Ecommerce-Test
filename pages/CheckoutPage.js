class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async fillCheckoutInformation() {
    await this.page.locator("#first-name").fill("Dennis");
    await this.page.locator("#last-name").fill("Jones");
    await this.page.locator("#postal-code").fill("12345");
  }

  async checkout() {
    await this.page.locator("#continue").click();
  }
}

export { CheckoutPage };
