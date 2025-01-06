import { World, setWorldConstructor } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext, Page } from "playwright";

export class CustomWorld extends World {
  // Static browser instance for reuse across tests
  static browser: Browser;
  // Browser context for isolating different test scenarios
  context!: BrowserContext;
  // Page instance for interacting with the browser
  page!: Page;

  // Method to initialize the browser, context, and page for each scenario
  async init(): Promise<void> {
    // If browser is not already launched, launch it
    if (!CustomWorld.browser) {
      CustomWorld.browser = await chromium.launch({
        headless: true, // Set to true for headless mode
        //slowMo: 1000, // Make the actions slow for 1 second -> for debugging
        //args: ["--start-maximized"], // Start the window maximized
      });
    }

    // Create a new browser context (isolated environment for each test)
    this.context = await CustomWorld.browser.newContext({
      recordVideo: { dir: "reporter/videos/" },
    });

    // Create a new page in the context
    this.page = await this.context.newPage();
    
    // Force resize to a known resolution
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  // Method to close the browser context and page after each scenario
  async close(): Promise<void> {
    // Close the page if it exists
    if (this.page) await this.page.close();
    // Close the browser context if it exists
    if (this.context) await this.context.close();
  }

  // Close the browser after all scenarios
  static async closeBrowser(): Promise<void> {
    if (CustomWorld.browser) {
      await CustomWorld.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
