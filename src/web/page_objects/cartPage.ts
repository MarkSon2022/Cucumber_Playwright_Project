import { expect, Locator, Page } from "@playwright/test";
import { enviroment } from "../../testsite/env";


export class CartPage {
  private page: Page; // Playwright Page object reference
  private continueShoppingBtn: Locator; // Locator for the "Continue Shopping" button
  private checkoutBtn: Locator; // Locator for the "Checkout" button
  private subHeader: Locator; // Locator for the subheader text

  constructor(page: Page) {
    this.page = page;
    this.continueShoppingBtn = this.page.locator(
      "//div[@class='cart_footer']/a[contains(text(),'Continue Shopping')]"
    );
    this.checkoutBtn = this.page.locator(
      "//div[@class='cart_footer']/a[contains(@class,'checkout_button')]"
    );
    this.subHeader = this.page.locator("//div[@class='subheader']");
  }

  /**
   * Locator for the remove button of a specific item in the cart.
   * @param name - The name of the item
   * @returns Locator for the remove button
   */
  public removeBtn(name: string): Locator {
    return this.page.locator(
      `//div[contains(text(),'${name}') and @class="inventory_item_name"]/ancestor::div[@class="cart_item"]//button`
    );
  }

  /**
   * Locator for the title of a specific item in the cart.
   * @param name - The name of the item
   * @returns Locator for the item title
   */
  public itemTitle(name: string): Locator {
    return this.page.locator(
      `//div[contains(text(),'${name}') and @class="inventory_item_name"]`
    );
  }

  /**
   * Navigates to the Cart page.
   */
  public async navigateToPage(): Promise<void> {
    console.log("Navigate to the Cart Page");
    await this.page.goto(enviroment.BASE_URL + "/v1/cart.html");
  }

  /**
   * Clicks the Checkout button to proceed to the next step.
   */
  public async checkoutSubmit(): Promise<void> {
    console.log("Click Checkout button");
    await this.checkoutBtn.click();
  }

  /**
   * Redirects to the Home page by clicking the "Continue Shopping" button.
   */
  public async continueShopRedirect(): Promise<void> {
    console.log("Redirect to Home Page");
    await this.continueShoppingBtn.click();
  }

  /**
   * Removes a specified item from the cart by clicking the Remove button.
   * @param itemName - The name of the item to remove
   */
  public async removeItemFromCart(itemName: string): Promise<void> {
    console.log("Click Remove button to remove item: " + itemName);
    await this.removeBtn(itemName).click();
  }

  /**
   * Validates that a specific item is visible in the cart.
   * @param itemName - The name of the item to validate
   */
  public async validateItemInCart(itemName: string): Promise<void> {
    console.log(`Validate item: ${itemName} is present in the cart`);
    await expect(this.itemTitle(itemName)).toBeVisible();
  }

  /**
   * Validates the Cart page by checking the subheader text and the URL.
   */
  public async validateCartPage(): Promise<void> {
    console.log("Validate Cart Page");
    const subHeaderText = await this.subHeader.textContent();
    await expect(subHeaderText).toEqual("Your Cart");
    await expect(this.page.url()).toContain("/v1/cart.html");
  }
}
