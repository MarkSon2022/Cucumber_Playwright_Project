import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import path from "path";
import fs from "fs";
import { CustomWorld } from "./customWorld";

let startTime: number;

BeforeAll(async function () {
  // Placeholder log to indicate the browser will be launched
  console.log("Launch Browser");
});

AfterAll(async function () {
  // Log to indicate the browser is closing after all tests
  console.log("Closing Browser");
  // Close the browser after all tests are finished using the static method in CustomWorld
  await CustomWorld.closeBrowser();
});

Before(async function (this: CustomWorld, scenario) {
  // Extract the scenario name from the Cucumber pickle object
  const scenarioName = scenario.pickle.name;
  // Record the current time when the scenario starts
  startTime = Date.now();
  // Log the scenario name and starting time
  console.log(`\n\nThe scenario: ${scenarioName} starting: \n`);

  // Log the individual steps of the scenario for debugging purposes
  scenario.pickle.steps.forEach((step, index) => {
    console.log(`Step ${index + 1}: ${step.text}`);
  });
  console.log("\n");

  // Initialize the browser context and page for the scenario using the custom world (CustomWorld)
  await this.init();
});

After(async function (this: CustomWorld, scenario) {
  // Extract the scenario name from the Cucumber pickle object
  const scenarioName = scenario.pickle.name;
  // Calculate the time taken for the scenario to run
  const duration = Date.now() - startTime;
  console.log(
    `\n\nThe scenario: ${scenarioName} ending with duration ${duration} ms\n`
  );

  // If the scenario fails, capture a screenshot for reporting purposes
  if (scenario.result?.status == Status.FAILED) {
    // Define the directory where screenshots will be saved
    const dir = path.resolve(`reporter/images`);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Define the screenshot file path using the scenario name
    const screenshotPath = path.join(dir, `${scenarioName}.png`);
    // Capture and save the screenshot
    const images = await this.page.screenshot({
      path: screenshotPath,
      type: "png",
      fullPage: true,
    });
    await this.attach(images, "image/png");

    // close after video
    await this.close();

    // Video handling and attach it into reporter
    const videoPath = await this.page.video()?.path();
    console.log("Video path:", videoPath);
    if (videoPath && fs.existsSync(videoPath)) {
      console.log("Video path exists:", videoPath);
      await this.attach(fs.readFileSync(videoPath), "video/webm");
    } else {
      console.error("Video path does not exist:", videoPath);
    }
  } else {
    // If not fail just close it
    await this.close();

    // // remove unattach video
    // const videoPath = await this.page.video()?.path();
    // console.log("Video path:", videoPath);
    // if (videoPath && fs.existsSync(videoPath)) {
    //   console.log("Video path exists:", videoPath);
    //   await fs.unlinkSync(videoPath);
    // } else {
    //   console.error("Video path does not exist:", videoPath);
    // }
  }
});
