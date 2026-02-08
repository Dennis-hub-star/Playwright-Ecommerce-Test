import { test, expect } from "@playwright/test";
import { PageObjectManager } from "../pages/pageObjectManager.js";

test.describe("Price Sorting Filter Tests", () => {
  test("Sort products by price in ascending order (Low to High)", async ({
    page,
  }) => {
    const pageObjectManager = new PageObjectManager(page, expect);
    const loginPage = pageObjectManager.getLoginPage();

    // Login to the application
    await loginPage.goTo("https://www.saucedemo.com/");
    await loginPage.loginWithValidCredentials("standard_user", "secret_sauce");

    const productsPage = pageObjectManager.getProductsPage();

    // Reset app state to ensure clean state
    await productsPage.resetAppState();

    // Sort prices from low to high
    await productsPage.sortByPrice("lohi");

    // Validate prices are in ascending order
    await productsPage.validatePricesSortedAscending();
  });

  test("Sort products by price in descending order (High to Low)", async ({
    page,
  }) => {
    const pageObjectManager = new PageObjectManager(page, expect);
    const loginPage = pageObjectManager.getLoginPage();

    // Login to the application
    await loginPage.goTo("https://www.saucedemo.com/");
    await loginPage.loginWithValidCredentials("standard_user", "secret_sauce");

    const productsPage = pageObjectManager.getProductsPage();

    // Reset app state to ensure clean state
    await productsPage.resetAppState();

    // Sort prices from high to low
    await productsPage.sortByPrice("hilo");

    // Validate prices are in descending order
    await productsPage.validatePricesSortedDescending();
  });

  test("Verify price sorting between both options", async ({ page }) => {
    const pageObjectManager = new PageObjectManager(page, expect);
    const loginPage = pageObjectManager.getLoginPage();

    await loginPage.goTo("https://www.saucedemo.com/");
    await loginPage.loginWithValidCredentials("standard_user", "secret_sauce");

    const productsPage = pageObjectManager.getProductsPage();
    await productsPage.resetAppState();

    // Get prices in original order
    const originalPrices = await productsPage.getProductPrices();
    console.log("Original prices:", originalPrices);

    // Sort ascending and validate
    await productsPage.sortByPrice("lohi");
    await productsPage.validatePricesSortedAscending();

    // Sort descending and validate
    await productsPage.sortByPrice("hilo");
    await productsPage.validatePricesSortedDescending();
  });
});
