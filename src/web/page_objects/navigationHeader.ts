import { Locator, Page } from "@playwright/test";


export class NavigationHeader {
  private page: Page; // Playwright Page object
  private cartLink: Locator; // Locator for the shopping cart link
  private menuBtn: Locator; // Locator for the menu button
  private logOutBtn: Locator; // Locator for the logout button
  private homeLink: Locator; // Locator for the home link in the menu

  constructor(page: Page) {
    this.page = page;
    this.cartLink = this.page.locator(
      "//div[@id='shopping_cart_container']/a[contains(@class,'shopping_cart_link')]"
    );
    this.menuBtn = this.page.locator("//button[contains(text(),'Open Menu')]");
    this.logOutBtn = this.page.locator("//a[@id='logout_sidebar_link']");
    this.homeLink = this.page.locator("//a[@id='inventory_sidebar_link']");
  }

  /**
   * Logs out the user by clicking the menu button and then the logout link.
   */
  public async logOutAccount(): Promise<void> {
    console.log("Logout Account Step");
    console.log("Click menu button");
    await this.menuBtn.click(); // Open the menu
    console.log("Click log out button");
    await this.logOutBtn.click(); // Click the logout button
  }

  /**
   * Redirects the user to the cart page by clicking the cart link.
   */
  public async redirectToCartPage(): Promise<void> {
    console.log("Click cart link to redirect to cart page");
    await this.cartLink.click(); // Click the cart link
  }

  /**
   * Redirects the user to the home page via the menu.
   */
  public async redirectToHomePage(): Promise<void> {
    console.log("Click home link to redirect to home page");
    console.log("Click menu button");
    await this.menuBtn.click(); // Open the menu
    console.log("Click home button");
    await this.homeLink.click(); // Click the home link
  }
}
