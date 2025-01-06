import { Given, Then, When } from "@cucumber/cucumber";
import { LoginPage } from "../page_objects/loginPage";

let loginPage: LoginPage;

Given("User navigates to the application", async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.navigateToPage();
});

When(
  "User enter valid credentials : username as {string} and password as {string}",
  async (username: string, password: string) => {
    await loginPage.inputWithCredentials(username, password);
  }
);

When("User click on the login button", async function () {
  await loginPage.sumbitLogin();
});

Then("Login should be success", async function () {
  await loginPage.validateLoginSuccess();
});

Then(
  "It still remain in login page with error message: {string}",
  async function (errorMessage: string) {
    await loginPage.validateLoginPage();
    await loginPage.validateLoginFail(errorMessage);
  }
);
