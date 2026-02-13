import { Utilities } from "./Utilities.js";

class DataProviders {
  // constructor(filePath) {
  //   this.utilities = new Utilities(filePath);
  // }

  getLoginData() {
    const utilities = new Utilities("../testData/loginData.json");
    const loginData = utilities.getTestData();
    return loginData;
  }

  getRemoveProductFromCartData() {
    const utilities = new Utilities("../testData/removeProductFromCart.json");
    const removeProductFromCartData = utilities.getTestData();
    return removeProductFromCartData;
  }

  getProductsSortingData() {
    const utilities = new Utilities("../testData/productsSortingData.json");
    const productsSortingData = utilities.getTestData();
    return productsSortingData;
  }

  getNegativeLoginData() {
    const utilities = new Utilities(
      "../testData/negativeTestData/negativeLogin.json",
    );
    const negativeLoginData = utilities.getTestData();
    return negativeLoginData;
  }
}

export { DataProviders };
