import { test, expect } from "@playwright/test";
import { DataProviders } from "../../Utils/dataProviders.js";
import { PageObjectManager } from "../../pages/pageObjectManager.js";

const dataProviders = new DataProviders();
const negativeLoginData = dataProviders.getNegativeLoginData();

for (const data of negativeLoginData) {
  test(`Negative Login Test with ${data.testCase}`, async ({ page }) => {
    const pageObjectManager = new PageObjectManager(page, expect);
    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.goTo("https://www.saucedemo.com/");
    await loginPage.loginWithInvalidCredentials(data.username, data.password);
    await loginPage.validateErrorMessage(data.errorMessage);
  });
}
