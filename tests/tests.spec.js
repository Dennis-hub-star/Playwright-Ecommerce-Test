import { test, expect } from "@playwright/test";
import { PageObjectManager } from "../pages/pageObjectManager";

test("Ecommerce login", async ({ page }) => {
  // await page.goto("https://www.saucedemo.com/");
  // await page.locator("#user-name").fill("standard_user");
  // await page.locator("#password").fill("secret_sauce");
  // await page.locator("#login-button").click();

  const pageObjectManager = new PageObjectManager(page, expect);
  const loginPage = pageObjectManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.loginWithValidCredentials();
  const productsPage = pageObjectManager.getProductsPage();
  await productsPage.addProductToCart();
  await productsPage.gotoCart();

  const cartPage = pageObjectManager.getCartPage();
  await cartPage.validateProductInCart();
  await cartPage.validateProductPrice();
  await cartPage.validateProductQuantity();
  await cartPage.gotoCheckoutPage();
  const checkoutPage = pageObjectManager.getCheckoutPage();
  await checkoutPage.fillCheckoutInformation();
  await checkoutPage.checkout();

  const confirmationPage = pageObjectManager.getConfirmationPage();
  await confirmationPage.validateCheckedOutProduct();
  await confirmationPage.confirmOrder();

  const thankYouPage = pageObjectManager.getThankYouPage();
  await thankYouPage.orderSuccessConfirmation();

  // const products = page.locator(".inventory_item");
  // await products.nth(0).first().waitFor();

  // const selectProduct = await products
  //   .filter({
  //     hasText: "Sauce Labs Fleece Jacket",
  //   })
  //   .locator("button")
  //   .click();

  // await page.locator("#shopping_cart_container").click();
  // await page.getByRole("button", { name: "Checkout" }).click();
  // await page.locator("#first-name").fill("Dennis");
  // await page.locator("#last-name").fill("Jones");
  // await page.locator("#postal-code").fill("12345");
  // await page.locator("#continue").click();
  // const productTitle = page.locator(".inventory_item_name");
  // await expect(productTitle).toHaveText("Sauce Labs Fleece Jacket");
  // await page.locator("#finish").click();
  // const thankYouMessage = page.locator(".complete-header");
  // await expect(thankYouMessage).toHaveText("Thank you for your order!");
});
