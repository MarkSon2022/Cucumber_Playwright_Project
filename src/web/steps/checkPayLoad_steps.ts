import { expect, Page } from "@playwright/test";
import { LoginPage } from "../page_objects/loginPage";
import { Then, When } from "@cucumber/cucumber";

let loginPage: LoginPage;
let responseTime: number;

When(
  "I navigate to the login page for validation response",
  async function () {
    loginPage = new LoginPage(this.page);

    const start = Date.now();
    await loginPage.navigateToPage();
    responseTime = Date.now() - start;
  }
);

Then(
  "the page should render in less than {int} ms",
  async function (renderTime: number) {
    console.log("Response time: " + responseTime + "ms");
    expect(responseTime).toBeLessThan(renderTime);
  }
);

Then(
  "the page should fully load in less than {int} ms",
  async function (loadTime: number) {
    const start = Date.now();
    await loginPage.reloadPage();
    const loadDuration = Date.now() - start;

    console.log("Load time: " + loadDuration + "ms");
    expect(loadDuration).toBeLessThan(loadTime);
  }
);
