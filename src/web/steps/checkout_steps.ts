import { Then, When } from "@cucumber/cucumber";
import { HomePage } from "../page_objects/homePage";
import { CartPage } from "../page_objects/cartPage";
import { NavigationHeader } from "../page_objects/navigationHeader";
import { CheckoutPage } from "../page_objects/checkoutPage";
import { CheckoutOverviewPage } from "../page_objects/checkoutOverviewPage";

let navigateHeader: NavigationHeader;
let cartPage: CartPage;
let homePage: HomePage;
let checkoutPage: CheckoutPage;
let checkoutOverviewPage: CheckoutOverviewPage;

When(
  "The user clicks the Add to Cart button for the {string} item",
  async function (itemName: string) {
    homePage = new HomePage(this.page);
    navigateHeader = new NavigationHeader(this.page);
    cartPage = new CartPage(this.page);
    checkoutPage = new CheckoutPage(this.page);
    checkoutOverviewPage = new CheckoutOverviewPage(this.page);
    
    await homePage.addItem(itemName);
  }
);

When("The user navigates to the cart", async function () {
  await navigateHeader.redirectToCartPage();
  await cartPage.validateCartPage();
});

When(
  "The user clicks Checkout button to go to the checkout page",
  async function () {
    await cartPage.checkoutSubmit();
    await checkoutPage.validateCheckoutPage();
  }
);

When(
  "The user fills in the required information firstname: {string} lastname:{string} and postalcode: {string}",
  async function (firstname: string, lastname: string, postalCode: string) {
    await checkoutPage.fillInformationForCheckout(
      firstname,
      lastname,
      postalCode
    );
  }
);

When("Clicks Continue button", async function () {
  await checkoutPage.continueSubmit();
});

Then("Redirect to checkout overview page", async function () {
  await checkoutOverviewPage.validateCheckoutPage();
});

Then("Validate error message: {string}", async function (errorMessage: string) {
  await checkoutPage.validateErrorMessage(errorMessage);
});
