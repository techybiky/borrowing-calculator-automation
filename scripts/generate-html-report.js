#!/usr/bin/env node
// scripts/generate-html-report.js

const fs = require('fs');
const path = require('path');

const reportsDir = path.join(__dirname, '../reports');
const resultsFile = path.join(reportsDir, 'results.json');

// Ensure reports directory exists
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Read results
let results = [];
if (fs.existsSync(resultsFile)) {
  const content = fs.readFileSync(resultsFile, 'utf8');
  try {
    results = JSON.parse(content);
  } catch (e) {
    console.error('Error parsing results JSON:', e);
  }
}

// Generate HTML report
const html = generateHTMLReport(results);
const htmlFile = path.join(reportsDir, 'report.html');
fs.writeFileSync(htmlFile, html);
console.log(`HTML report generated: ${htmlFile}`);

function generateHTMLReport(results) {
  let totalScenarios = 0;
  let passedScenarios = 0;
  let failedScenarios = 0;
  let scenarios = [];

  results.forEach((feature) => {
    if (feature.elements) {
      feature.elements.forEach((scenario) => {
        totalScenarios++;
        let passed = true;
        let steps = [];

        if (scenario.steps) {
          scenario.steps.forEach((step) => {
            const status = step.result?.status || 'unknown';
            steps.push({
              keyword: step.keyword,
              name: step.name,
              status: status,
              error: step.result?.error_message || '',
            });
            if (status === 'failed') {
              passed = false;
            }
          });
        }

        if (passed) {
          passedScenarios++;
        } else {
          failedScenarios++;
        }

        scenarios.push({
          name: scenario.name,
          passed: passed,
          steps: steps,
          feature: feature.name,
        });
      });
    }
  });

  const failureRate = totalScenarios > 0 ? ((failedScenarios / totalScenarios) * 100).toFixed(2) : 0;
  const passRate = totalScenarios > 0 ? ((passedScenarios / totalScenarios) * 100).toFixed(2) : 0;

  const scenarioRows = scenarios
    .map((scenario) => {
      const statusClass = scenario.passed ? 'passed' : 'failed';
      const statusText = scenario.passed ? '✓ PASSED' : '✗ FAILED';
      const stepsHtml = scenario.steps
        .map((step) => {
          const stepStatusClass = step.status === 'passed' ? 'step-passed' : step.status === 'failed' ? 'step-failed' : 'step-skipped';
          const errorMsg = step.error ? `<div class="error-message">${escapeHtml(step.error)}</div>` : '';
          return `
        <tr class="${stepStatusClass}">
          <td colspan="3">
            <span class="step-keyword">${escapeHtml(step.keyword)}</span>
            <span class="step-name">${escapeHtml(step.name)}</span>
            ${errorMsg}
          </td>
        </tr>
      `;
        })
        .join('');

      return `
      <tr class="scenario ${statusClass}">
        <td class="feature-name">${escapeHtml(scenario.feature)}</td>
        <td class="scenario-name">${escapeHtml(scenario.name)}</td>
        <td class="status ${statusClass}">${statusText}</td>
      </tr>
      ${stepsHtml}
    `;
    })
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Report - Borrowing Calculator</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            color: #333;
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        header {
            background: linear-gradient(135deg, #0066cc 0%, #003d99 100%);
            color: white;
            padding: 30px;
            border-radius: 8px;
            margin-bottom: 30px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        header h1 {
            font-size: 28px;
            margin-bottom: 10px;
        }

        header p {
            font-size: 14px;
            opacity: 0.9;
        }

        .summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }

        .summary-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .summary-card .number {
            font-size: 36px;
            font-weight: bold;
            color: #0066cc;
        }

        .summary-card .label {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
            text-transform: uppercase;
        }

        .summary-card.passed .number {
            color: #28a745;
        }

        .summary-card.failed .number {
            color: #dc3545;
        }

        .progress-bar {
            width: 100%;
            height: 30px;
            background-color: #e9ecef;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 30px;
        }

        .progress-bar-fill {
            height: 100%;
            background-color: #28a745;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
        }

        .results-table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
        }

        .results-table thead {
            background-color: #f8f9fa;
            border-bottom: 2px solid #dee2e6;
        }

        .results-table th {
            padding: 15px;
            text-align: left;
            font-weight: 600;
            color: #495057;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .results-table td {
            padding: 15px;
            border-bottom: 1px solid #dee2e6;
        }

        .results-table tr.scenario.passed td {
            background-color: #f0f7f4;
        }

        .results-table tr.scenario.failed td {
            background-color: #fdf3f3;
        }

        .results-table tr.step-passed {
            background-color: #e8f5e9;
        }

        .results-table tr.step-failed {
            background-color: #ffebee;
        }

        .results-table tr.step-skipped {
            background-color: #fff9c4;
        }

        .status {
            font-weight: 600;
            border-radius: 4px;
            padding: 4px 8px;
            text-align: center;
            font-size: 12px;
        }

        .status.passed {
            color: #28a745;
            background-color: #d4edda;
        }

        .status.failed {
            color: #dc3545;
            background-color: #f8d7da;
        }

        .feature-name {
            font-weight: 500;
            color: #0066cc;
        }

        .scenario-name {
            color: #495057;
        }

        .step-keyword {
            font-weight: 600;
            color: #6c757d;
            margin-right: 5px;
        }

        .step-name {
            color: #495057;
        }

        .error-message {
            color: #dc3545;
            font-size: 12px;
            margin-top: 5px;
            padding: 5px;
            background-color: rgba(220, 53, 69, 0.1);
            border-left: 2px solid #dc3545;
            margin-left: 20px;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            word-break: break-word;
        }

        footer {
            text-align: center;
            color: #6c757d;
            font-size: 12px;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
        }

        @media (max-width: 768px) {
            .summary {
                grid-template-columns: repeat(2, 1fr);
            }

            header h1 {
                font-size: 20px;
            }

            .results-table {
                font-size: 12px;
            }

            .results-table th,
            .results-table td {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🧪 Test Report</h1>
            <p>Borrowing Calculator - Automated Tests</p>
        </header>

        <div class="summary">
            <div class="summary-card">
                <div class="number">${totalScenarios}</div>
                <div class="label">Total Scenarios</div>
            </div>
            <div class="summary-card passed">
                <div class="number">${passedScenarios}</div>
                <div class="label">Passed</div>
            </div>
            <div class="summary-card failed">
                <div class="number">${failedScenarios}</div>
                <div class="label">Failed</div>
            </div>
            <div class="summary-card">
                <div class="number">${passRate}%</div>
                <div class="label">Pass Rate</div>
            </div>
        </div>

        <div class="progress-bar">
            <div class="progress-bar-fill" style="width: ${passRate}%">${passRate}% Passed</div>
        </div>

        <table class="results-table">
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>Scenario / Step</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${scenarioRows}
            </tbody>
        </table>

        <footer>
            <p>Report generated on ${new Date().toLocaleString()}</p>
        </footer>
    </div>
</body>
</html>
  `;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
