import { expect, Locator, Page } from "@playwright/test";
import { enviroment } from "../../testsite/env";


export class CheckoutPage {
  private page: Page; // Playwright Page object
  private cancelBtn: Locator; // Locator for the Cancel button
  private continueBtn: Locator; // Locator for the Continue button
  private subHeader: Locator; // Locator for the subheader text
  private firstNameInput: Locator; // Locator for the First Name input field
  private lastNameInput: Locator; // Locator for the Last Name input field
  private postalCodeInput: Locator; // Locator for the Postal Code input field
  private errorMessage: Locator; // Locator for the error message

  constructor(page: Page) {
    this.page = page;
    this.cancelBtn = this.page.locator(
      "//div[@class='checkout_buttons']/a[contains(text(),'CANCEL')]"
    );
    this.continueBtn = this.page.locator(
      "//div[@class='checkout_buttons']/input[@value='CONTINUE']"
    );
    this.subHeader = this.page.locator("//div[@class='subheader']");
    this.firstNameInput = this.page.locator("//input[@id='first-name']");
    this.lastNameInput = this.page.locator("//input[@id='last-name']");
    this.postalCodeInput = this.page.locator("//input[@id='postal-code']");
    this.errorMessage = this.page.locator("//form/h3[@data-test='error']");
  }

  /**
   * Navigates directly to the checkout page.
   */
  public async navigateToPage(): Promise<void> {
    await this.page.goto(enviroment.BASE_URL + "/v1/checkout-step-one.html");
  }

  /**
   * Fills the checkout information form.
   * @param firstname - First name of the customer
   * @param lastname - Last name of the customer
   * @param postalCode - Postal code of the customer
   */
  public async fillInformationForCheckout(
    firstname: string,
    lastname: string,
    postalCode: string
  ): Promise<void> {
    console.log("Fill information for checkout");
    await this.firstNameInput.fill(firstname);
    await this.lastNameInput.fill(lastname);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Clicks the Continue button to proceed with checkout.
   */
  public async continueSubmit() {
    console.log("Click Continue button to submit checkout");
    await this.continueBtn.click();
  }

  /**
   * Clicks the Cancel button to redirect back to the Cart page.
   */
  public async cancelToRedirectCart() {
    console.log("Click Cancel to redirect to Cart Page");
    await this.cancelBtn.click();
  }

  /**
   * Validates the error message displayed on the page.
   * @param message - Expected error message
   */
  public async validateErrorMessage(message: string) {
    const errorText = await this.errorMessage.textContent();
    console.log("Validate error message: " + errorText);
    await expect(errorText).toContain(message);
  }

  /**
   * Validates that the user is on the Checkout page and verifies page elements.
   */
  public async validateCheckoutPage(): Promise<void> {
    console.log("Validate Checkout Page: ");
    const subHeaderText = await this.subHeader.textContent();
    await expect(subHeaderText).toEqual("Checkout: Your Information");
    await expect(await this.page.url()).toContain("/v1/checkout-step-one.html");
  }
}
