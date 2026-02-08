import { LoginPage } from "./LoginPage";
import { ProductsPage } from "./ProductsPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { ConfirmationPage } from "./ConfirmationPage";
import { ThankYouPage } from "./ThankYouPage";

class PageObjectManager {
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
  }

  getLoginPage() {
    return new LoginPage(this.page);
  }

  getProductsPage() {
    return new ProductsPage(this.page, this.expect);
  }

  getCartPage() {
    return new CartPage(this.page, this.expect);
  }

  getCheckoutPage() {
    return new CheckoutPage(this.page);
  }

  getConfirmationPage() {
    return new ConfirmationPage(this.page, this.expect);
  }

  getThankYouPage() {
    return new ThankYouPage(this.page, this.expect);
  }
}

export { PageObjectManager };
