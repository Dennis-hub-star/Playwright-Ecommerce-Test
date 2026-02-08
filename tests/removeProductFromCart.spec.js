import { test, expect } from "@playwright/test";
import { DataProviders } from "../Utils/dataProviders.js";
import { PageObjectManager } from "../pages/pageObjectManager.js";

const dataProviders = new DataProviders();
const removeProductFromCartData = dataProviders.getRemoveProductFromCartData();

for (const data of removeProductFromCartData) {
  test(`From products page, remove product from cart for user: ${data.username}`, async ({
    page,
  }) => {
    const pageObjectManager = new PageObjectManager(page, expect);
    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.goTo("https://www.saucedemo.com/");
    await loginPage.loginWithValidCredentials(data.username, data.password);
    const productsPage = pageObjectManager.getProductsPage();
    await productsPage.resetAppState();
    await productsPage.addProductToCart(data.productName);
    await productsPage.removeProductFromCart(data.productName);
    await productsPage.validateProductRemovedFromCart(data.productName);
  });
}

for (const data of removeProductFromCartData) {
  test(`From cart page, remove product from cart for user: ${data.username}`, async ({
    page,
  }) => {
    const pageObjectManager = new PageObjectManager(page, expect);
    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.goTo("https://www.saucedemo.com/");
    await loginPage.loginWithValidCredentials(data.username, data.password);
    const productsPage = pageObjectManager.getProductsPage();
    await productsPage.resetAppState();
    await productsPage.addProductToCart(data.productName);
    await productsPage.gotoCart();
    const cartPage = pageObjectManager.getCartPage();
    await cartPage.validateProductInCart(data.productName);
    await cartPage.removeItemFromCart(data.productName);
    await cartPage.validateProductRemovedFromCart(data.productName);
  });
}
