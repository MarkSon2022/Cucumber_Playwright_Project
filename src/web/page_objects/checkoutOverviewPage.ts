import { expect, Locator, Page } from "@playwright/test";

export class CheckoutOverviewPage {
  private page: Page; // Playwright for page object
  private cancelBtn: Locator; // Locator for cancel button
  private finishBtn: Locator; // Locator for finish button
  private subHeader: Locator; // Locator for sub header in page
  private itemTotalInfo: Locator; // Locator for total price of items
  private taxInfo: Locator; // Locator for total tax price of items
  private totalInfo: Locator; // Locator for total price

  constructor(page: Page) {
    this.page = page;
    this.cancelBtn = this.page.locator("//a[contains(text(),'CANCEL')]");
    this.finishBtn = this.page.locator("//a[contains(text(),'FINISH')]");
    this.subHeader = this.page.locator("//div[@class='subheader']");
    this.itemTotalInfo = this.page.locator(
      "//div[@class='summary_info']/div[@class='summary_subtotal_label']"
    );
    this.taxInfo = this.page.locator(
      "//div[@class='summary_info']/div[@class='summary_tax_label']"
    );
    this.totalInfo = this.page.locator(
      "//div[@class='summary_info']/div[@class='summary_total_label']"
    );
  }

  // Locator for the item name
  public titleItem(itemName: string): Locator {
    return this.page.locator(`//div[contains(text(),'${itemName}')]`);
  }

  // Locator for the attribute of item including quanitty, description, price
  public attributeItem(itemName: string, classType: string): Locator {
    //summary_quantity, inventory_item_desc, inventory_item_price
    return this.page.locator(
      `//div[contains(text(),'${itemName}') and @class="inventory_item_name"]/ancestor::div[@class="cart_item"]//div[@class='${classType}']`
    );
  }

  // Locator for the payment title or type of shipping title
  public paymentOrShippingInfo(title: string): Locator {
    return this.page.locator(
      `//div[contains(text(),'${title}')]/following-sibling::div[@class='summary_value_label'][1]`
    );
  }

  // Cancel to Checkout Overview and Redirect to HomePage
  public async cancelAndRedirectToHomePage(): Promise<void> {
    console.log("Click cancel button to return to Home Page");
    await this.cancelBtn.click();
  }

  //Click finish button
  public async finishSubmit(): Promise<void> {
    console.log("Click finish button on CheckoutOverview Page");
    await this.finishBtn.click();
  }

  /**
   *  Validate the quantity of item
   * @param itemName - The expected name of item
   * @param quantity - The expected quantity of item
   */
  public async validateQuantityItem(
    itemName: string,
    quantity: string
  ): Promise<void> {
    console.log(
      "Validate the quanity of the item: " + itemName + " is " + quantity
    );
    await expect(
      await this.attributeItem(itemName, "summary_quantity").textContent()
    ).toEqual(quantity);
  }

  /**
   *  Validate if the item is visible and exist in the page
   * @param itemName - The expected name of item
   */
  public async validateItemVisible(itemName: string): Promise<void> {
    console.log("Validate if the item: " + itemName + " visible in the list");
    await expect(this.titleItem(itemName)).toBeVisible();
    await expect(
      this.attributeItem(itemName, "inventory_item_desc")
    ).toBeVisible();
    await expect(
      this.attributeItem(itemName, "inventory_item_price")
    ).toBeVisible();
  }

  /**
   * Validates that total price of items
   * @param price - The expected price
   */
  public async validateTotalItemPrice(price: string): Promise<void> {
    const totalPrice = await this.itemTotalInfo.textContent();
    console.log("Validate the Total Price of Items: " + totalPrice);
    await expect(totalPrice).toContain(price);
  }

  /**
   * Validates that total tax of items
   * @param price - The expected price
   */
  public async validateTax(price: string): Promise<void> {
    const totalTax = await this.taxInfo.textContent();
    console.log("Validate the Total Tax Price of Items: " + totalTax);
    await expect(totalTax).toContain(price);
  }

  /**
   * Validates that total price
   * @param price - The expected price
   */
  public async validateTotalPrice(price: string): Promise<void> {
    const total = await this.totalInfo.textContent();
    console.log("Validate the Total Price of Order: " + total);
    await expect(total).toContain(price);
  }

  //Validate the checkout page by URL and subheader
  public async validateCheckoutPage(): Promise<void> {
    console.log("Validate Checkout Overview Page: ");
    await expect(await this.subHeader.textContent()).toEqual(
      "Checkout: Overview"
    );
    await expect(await this.page.url()).toContain("/v1/checkout-step-two.html");
  }
}
