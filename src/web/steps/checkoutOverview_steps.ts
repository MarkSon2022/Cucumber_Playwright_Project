import { Given, Then, When } from "@cucumber/cucumber";
import { NavigationHeader } from "../page_objects/navigationHeader";
import { CartPage } from "../page_objects/cartPage";
import { HomePage } from "../page_objects/homePage";
import { LoginPage } from "../page_objects/loginPage";
import { CheckoutPage } from "../page_objects/checkoutPage";
import { CheckoutOverviewPage } from "../page_objects/checkoutOverviewPage";
import { expect } from "@playwright/test";

let checkoutOverviewPage: CheckoutOverviewPage;

Then(
  "Validate the item {string} is exist and visible",
  async function (itemName: string) {
    checkoutOverviewPage = new CheckoutOverviewPage(this.page);

    await checkoutOverviewPage.validateItemVisible(itemName);
  }
);

Then(
  "Validate the item {string} has the quantity is {string}",
  async function (itemName: string, quantity: string) {
    await checkoutOverviewPage.validateQuantityItem(itemName, quantity);
  }
);

Then(
  "Validate the price of the total item: {string}",
  async function (totalItemPrice: string) {
    await checkoutOverviewPage.validateTotalItemPrice(totalItemPrice);
  }
);

Then("Validate the price of the tax: {string}", async function (tax: string) {
  await checkoutOverviewPage.validateTax(tax);
});

Then("Validate the total price: {string}", async function (totalPrice: string) {
  await checkoutOverviewPage.validateTotalPrice(totalPrice);
  await expect(true).toBe(false);
});
