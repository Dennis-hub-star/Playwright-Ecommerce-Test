import { test, expect } from "@playwright/test";
import { DataProviders } from "../../Utils/dataProviders.js";
import { PageObjectManager } from "../../pages/pageObjectManager.js";

const dataProviders = new DataProviders();
// const negativeLoginData = dataProviders.getNegativeLoginData();
const loginData = dataProviders.getLoginData();

for (const data of loginData) {
  test(`Proceed to checkout with empty cart for user ${data.username}`, async ({
    page,
  }) => {
    const pageObjectManager = new PageObjectManager(page, expect);
    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.goTo("https://www.saucedemo.com/");
    await loginPage.loginWithValidCredentials(data.username, data.password);
    const productsPage = pageObjectManager.getProductsPage();
    await productsPage.resetAppState();
    await productsPage.gotoCart();
    const cartPage = pageObjectManager.getCartPage();
    await cartPage.confirmCartIsEmpty();
    await cartPage.gotoCheckoutPage();
    await cartPage.confirmPageUrlNotChanged(
      "https://www.saucedemo.com/cart.html",
    );
  });
}
