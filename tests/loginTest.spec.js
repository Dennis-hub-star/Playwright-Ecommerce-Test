import { test, expect } from "@playwright/test";
import { DataProviders } from "../Utils/dataProviders.js";
import { PageObjectManager } from "../pages/pageObjectManager.js";

const dataProviders = new DataProviders();
const loginData = dataProviders.getLoginData();

for (const data of loginData) {
  test(`Login with user: ${data.username}`, async ({ page }) => {
    const pageObjectManager = new PageObjectManager(page);
    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.goTo("https://www.saucedemo.com/");
    await loginPage.loginWithValidCredentials(data.username, data.password);
  });
}
