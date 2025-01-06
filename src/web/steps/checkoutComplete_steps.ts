import { Then, When } from "@cucumber/cucumber";
import { CheckoutOverviewPage } from "../page_objects/checkoutOverviewPage";
import { CheckoutCommpletePage } from "../page_objects/checkoutCompletePage";
import { expect } from "@playwright/test";

let checkoutOverviewPage: CheckoutOverviewPage;
let checkoutCompletePage: CheckoutCommpletePage;

When("Clicks Finish button", async function () {
  checkoutOverviewPage = new CheckoutOverviewPage(this.page);
  checkoutCompletePage = new CheckoutCommpletePage(this.page);

  await checkoutOverviewPage.finishSubmit();
});

Then("Validate Checkout Complete page", async function () {
  await checkoutCompletePage.validateCheckoutCompletePage();
});

Then("Validate Order Success information", async function () {
  await checkoutCompletePage.validateOrderSuccessInfo();
});

Then(
  "Validate Ponny Express Image visible and have the right source image",
  async function () {
    await checkoutCompletePage.validatePonyExpressImage();
  }
);
