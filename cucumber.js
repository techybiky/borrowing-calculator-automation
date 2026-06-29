module.exports = {
  require: ['features/step_definitions/**/*.js'],
  format: [
    'progress-bar',
    'json:reports/results.json',
    'message:reports/results.ndjson',
    'junit:reports/results.xml'
  ],
  formatOptions: {
    snippetInterface: 'async-await'
  }
};
