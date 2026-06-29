const reporter = require("multiple-cucumber-html-reporter");

reporter.generate({
    jsonDir: "./reports",
    reportPath: "./reports/html",
    reportName: "Borrowing Calculator Report",
    pageTitle: "Automation Report",
    openReportInBrowser: true
});