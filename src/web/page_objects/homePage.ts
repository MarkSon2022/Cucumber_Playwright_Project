import { expect, Locator, Page } from "@playwright/test";
import { enviroment } from "../../testsite/env";


export class HomePage {
  private page: Page; // Playwright Page object reference

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Locator for the "Add to Cart" button of a specific item by its name.
   * @param name - The name of the item
   * @returns Locator for the "Add to Cart" button
   */
  public addToCartBtn(name: string): Locator {
    return this.page.locator(
      `//div[@class='inventory_item_name' and text()='${name}']/ancestor::div[@class='inventory_item']//button`
    );
  }

  /**
   * Locator for the title of a specific item by its name.
   * @param name - The name of the item
   * @returns Locator for the item title
   */
  public itemTitle(name: string): Locator {
    return this.page.locator(
      `//div[@class='inventory_item_name' and text()='${name}']`
    );
  }

  /**
   * Navigates to the Home page.
   */
  public async navigateToPage(): Promise<void> {
    console.log("Navigating to the Home Page");
    await this.page.goto(enviroment.BASE_URL + "/v1/inventory.html");
  }

  /**
   * Adds an item to the cart by clicking its "Add to Cart" button.
   * @param itemName - The name of the item to add
   */
  public async addItem(itemName: string): Promise<void> {
    console.log("Adding item to cart: " + itemName);
    await this.addToCartBtn(itemName).click();
  }

  /**
   * Validates that a specific item is visible on the Home page.
   * @param itemName - The name of the item to validate
   */
  public async validateItemExist(itemName: string): Promise<void> {
    console.log("Validating the item is visible: " + itemName);
    await expect(this.itemTitle(itemName)).toBeVisible();
  }
}
