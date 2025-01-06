const fs = require("fs");
const path = require("path");
const reporter = require("multiple-cucumber-html-reporter");


// Generate the report
reporter.generate({
    jsonDir: "reporter", // Path of the .json file (ensure this exists)
    reportPath: "reporter/report/cucumber-html-report", // Path to the directore where the HTML report will be saved
    metadata: {
        browser: {
            name: "chrome", // Browser name during testing
            version: "latest", // Browser version used
        },
        device: "Local test machine", // Name/Descriptioni of the test enviroment
        platform: {
            name: "Windows", // Operating system name
            version: "11", // Operating system version
        },
    },
    customData: {
        title: "Test Execution Info", // Title for the custom data section in the report
        data: [
            { label: "Project", value: "Cucumber-Playwright Swag Labs Demo" }, // Project name
            { label: "Release", value: "1.0.0" }, // Release version for testing
            { label: "Execution Start Time", value: new Date().toLocaleString() }, // Current execution start time
        ],
    },
    openReportInBrowser: true, // Automatically open the report after generation
});

// Log a success message to indicate that the report was generated success
console.log("Report generated successfully.");
