const fs = require("fs");
const path = require("path");
const reporter = require("multiple-cucumber-html-reporter");

const reportsDir = path.join(process.cwd(), "reports");
const htmlDir = path.join(reportsDir, "html");
const resultsJsonPath = path.join(reportsDir, "results.json");

fs.mkdirSync(reportsDir, { recursive: true });
fs.mkdirSync(htmlDir, { recursive: true });

if (!fs.existsSync(resultsJsonPath)) {
    const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Borrowing Calculator Report</title>
  </head>
  <body>
    <h1>Borrowing Calculator Report</h1>
    <p>No Cucumber JSON results were found, so no detailed report could be generated.</p>
  </body>
</html>`;

    fs.writeFileSync(path.join(htmlDir, "index.html"), fallbackHtml);
    console.log("No results.json found; wrote a fallback HTML report.");
    process.exit(0);
}

reporter.generate({
    jsonDir: reportsDir,
    reportPath: htmlDir,
    reportName: "Borrowing Calculator Report",
    pageTitle: "Automation Report",
    openReportInBrowser: false
});