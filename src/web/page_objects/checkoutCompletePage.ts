import { expect, Locator, Page } from "@playwright/test";

export class CheckoutCommpletePage {
  private page: Page; //Playwright for page object
  private completeHeader: Locator; // Locator for header of success order
  private completeText: Locator; // Locator for description of success order
  private subHeader: Locator; // Locator for subheader of checkout complete page
  private completeImg: Locator; // Locator for image of success order

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = this.page.locator(
      "//div[@id='checkout_complete_container']/h2[@class='complete-header']"
    );
    this.completeText = this.page.locator(
      "//div[@id='checkout_complete_container']/div[@class='complete-text']"
    );
    this.subHeader = this.page.locator("//div[@class='subheader']");
    this.completeImg = this.page.locator(
      "//div[@id='checkout_complete_container']/img[@class='pony_express']"
    );
  }

  // Validate the title and description of success order
  public async validateOrderSuccessInfo() {
    console.log("Validate the title and desciption of successOrder");
    await expect(await this.completeHeader.textContent()).toContain(
      "THANK YOU FOR YOUR ORDER"
    );
    await expect(await this.completeText.textContent()).toContain(
      "Your order has been dispatched"
    );
  }

  // Validate the pony express of success order
  public async validatePonyExpressImage() {
    console.log("Validate the image Pony Express");
    const srcImage =await this.completeImg.getAttribute("src");
    await expect(srcImage).toContain("img/pony-express.png");
    await expect(this.completeImg).toBeVisible();
  }

  // Validate the Checkout Complete Page by subheader text and the page URL
  public async validateCheckoutCompletePage() {
    console.log("Validate Checkout Complete Page");
    await expect(await this.subHeader.textContent()).toEqual("Finish");
    await expect(await this.page.url()).toContain("/v1/checkout-complete.html");
  }
}
