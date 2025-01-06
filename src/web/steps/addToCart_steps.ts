import { Given, Then, When } from "@cucumber/cucumber";
import { NavigationHeader } from "../page_objects/navigationHeader";
import { HomePage } from "../page_objects/homePage";
import { CartPage } from "../page_objects/cartPage";
import { LoginPage } from "../page_objects/loginPage";

let navigateHeader: NavigationHeader;
let cartPage: CartPage;
let homePage: HomePage;
let loginPage: LoginPage;

Given(
  "the user has already logged in with username {string} and password {string}",
  async function (username: string, password: string) {
    loginPage = new LoginPage(this.page);
    homePage = new HomePage(this.page);

    await loginPage.navigateToPage();
    await loginPage.inputWithCredentials(username, password);
    await loginPage.sumbitLogin();
  }
);

Given("the user is on the home page", async function () {
  await homePage.navigateToPage();
});

When(
  "User click to Add to Card button of {string} item",
  async function (itemName: string) {
    navigateHeader = new NavigationHeader(this.page);
    cartPage = new CartPage(this.page);
    await homePage.addItem(itemName);
  }
);

When("User click to cart", async function () {
  await navigateHeader.redirectToCartPage();
  await cartPage.validateCartPage();
});

Then(
  "The item {string} is on the cart page.",
  async function (itemName: string) {
    await cartPage.validateItemInCart(itemName);
  }
);
