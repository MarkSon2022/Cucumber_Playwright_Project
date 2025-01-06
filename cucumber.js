module.exports = {
  default: {
    paths: ["src/web/feature/**/*.feature"], // Path to all feature files
    requireModule: ["ts-node/register"], // Use ts-node to transpile TypeScript to JavaScript at runtime
    require: [
      "src/web/steps/**/*.ts", // Path to step definition files
      "src/supports/**/*.ts", // Path to support files (hooks, world, etc.)
    ],
    format: [
      "progress-bar", // Output progress format during test execution
      "json:reporter/cucumber_report.json", // Output test results in JSON format for reporting
    ],
    parallel: 1, // Number of parallel threads to execute tests (1 means no parallel execution)
    retry: 2, // Retry failing scenarios up to 2 times
    // format: ['rerun:@rerun.txt'], // Rerun failed tests locally
  },
  rerun: {
    requireModule: ["ts-node/register"], // Use ts-node to transpile TypeScript to JavaScript at runtime
    require: [
      "src/web/steps/**/*.ts", // Path to step definition files
      "src/supports/**/*.ts", // Path to support files (hooks, world, etc.)
    ],
    format: [
      "progress-bar", // Output progress format during test execution
      "json:reporter/cucumber_report.json", // Output test results in JSON format for reporting
    ],
    parallel: 1, // Number of parallel threads to execute tests (1 means no parallel execution)
    retry: 2, // Retry failing scenarios up to 2 times
    // format: ['rerun:@rerun.txt'], // Rerun failed tests locally
  },
};
