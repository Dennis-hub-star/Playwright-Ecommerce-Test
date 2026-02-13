class LoginPage {
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
  }

  async goTo(url) {
    await this.page.goto(url);
  }

  async loginWithValidCredentials(username, password) {
    await this.page.locator("#user-name").fill(username);
    await this.page.locator("#password").fill(password);
    await this.page.locator("#login-button").click();
  }

  async loginWithInvalidCredentials(username, password) {
    await this.loginWithValidCredentials(username, password);
  }

  async validateErrorMessage(expectedMessage) {
    const errorMessage = this.page.locator(".error h3");
    await this.expect(errorMessage).toHaveText(expectedMessage);
  }
}

export { LoginPage };
