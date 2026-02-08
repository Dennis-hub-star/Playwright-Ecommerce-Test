class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goTo(url) {
    await this.page.goto(url);
  }

  async loginWithValidCredentials(username, password) {
    await this.page.locator("#user-name").fill(username);
    await this.page.locator("#password").fill(password);
    await this.page.locator("#login-button").click();
  }
}

export { LoginPage };
