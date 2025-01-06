import { expect, Locator, Page } from "@playwright/test";
import { enviroment } from "../../testsite/env";


export class LoginPage {
  private page: Page; // Playwright Page object
  private usernameInput: Locator; // Locator for the username input field
  private passwordInput: Locator; // Locator for the password input field
  private loginButton: Locator; // Locator for the login button
  private errorMessage: Locator; // Locator for the error message element

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = this.page.locator("//input[@id='user-name']");
    this.passwordInput = this.page.locator("//input[@id='password']");
    this.loginButton = this.page.locator("//input[@id='login-button']");
    this.errorMessage = this.page.locator("//form/h3[@data-test='error']");
  }

  /**
   * Waits for the page to fully load.
   */
  public async reloadPage(): Promise<void> {
    await this.page.waitForLoadState("load");
  }

  /**
   * Navigates to the login page using the base URL from the environment file.
   */
  public async navigateToPage(): Promise<void> {
    console.log("Navigate to Login page");
    await this.page.goto(enviroment.BASE_URL + "/v1/");
  }

  /**
   * Fills in the username and password input fields.
   * @param username - The username to input
   * @param password - The password to input
   */
  public async inputWithCredentials(
    username: string,
    password: string
  ): Promise<void> {
    console.log("Input username");
    await this.usernameInput.fill(username);

    console.log("Input password");
    await this.passwordInput.fill(password);
  }

  /**
   * Clicks the login button to submit the form.
   */
  public async sumbitLogin(): Promise<void> {
    console.log("Click login button");
    await this.loginButton.click();
  }

  /**
   * Validates that the user is on the login page.
   */
  public async validateLoginPage(): Promise<void> {
    const currentPage = this.page.url();
    console.log("Validate the login page: " + currentPage);
    await expect(currentPage).toContain(enviroment.BASE_URL + "/v1/");
  }

  /**
   * Validates that the login was successful by checking the redirect URL.
   */
  public async validateLoginSuccess(): Promise<void> {
    const currentPage = this.page.url();
    console.log("Validate redirect to home page with link: " + currentPage);
    await expect(currentPage).toContain("/v1/inventory.html");
  }

  /**
   * Validates that the login failed by checking the error message.
   * @param errorMessage - The expected error message
   */
  public async validateLoginFail(errorMessage: string): Promise<void> {
    const message = await this.errorMessage.textContent();
    console.log("Validate error message: " + message);
    expect(message).toContain(errorMessage);
  }
}
