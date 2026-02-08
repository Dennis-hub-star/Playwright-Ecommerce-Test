class ThankYouPage {
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
  }

  async orderSuccessConfirmation() {
    const thankYouMessage = this.page.locator(".complete-header");
    await this.expect(thankYouMessage).toHaveText("Thank you for your order!");
  }
}

export { ThankYouPage };
