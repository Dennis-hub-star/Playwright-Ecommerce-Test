import { test, expect } from "@playwright/test";
import { DataProviders } from "../Utils/dataProviders.js";
import { PageObjectManager } from "../pages/pageObjectManager.js";

const dataProviders = new DataProviders();
const productsSortingData = dataProviders.getProductsSortingData();

for (const data of productsSortingData) {
  test(`Product Sorting By ${data.clearSort}`, async ({ page }) => {
    const pageObjectManager = new PageObjectManager(page, expect);
    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.goTo("https://www.saucedemo.com/");
    await loginPage.loginWithValidCredentials(data.username, data.password);
    const productsPage = pageObjectManager.getProductsPage();
    await productsPage.resetAppState();
    await productsPage.sortItemsBy(data.sortBy);

    // Verify based on the sort type
    if (data.sortBy.includes("lohi") || data.sortBy.includes("hilo")) {
      await productsPage.verifyPriceSorting();
    } else if (data.sortBy.includes("az") || data.sortBy.includes("za")) {
      await productsPage.verifyNameSorting();
    }
  });
}
